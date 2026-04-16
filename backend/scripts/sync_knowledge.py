"""Sync TypeScript product data into markdown knowledge base files."""
from __future__ import annotations

import ast
import re
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[2]
SOURCE_DIR = ROOT_DIR / "src" / "data"
OUTPUT_DIR = ROOT_DIR / "backend" / "knowledge" / "auto"

_FILE_MAP: dict[str, str] = {
    "catalog.ts": "catalog-overview",
    "chemicalResistance.ts": "chemical-resistance",
    "emkostiProducts.ts": "emkosti-evpp",
    "ffuProducts.ts": "vodoochistka-ffu",
    "fvgProducts.ts": "gazoochistka-fvg",
    "kapleulovitelProducts.ts": "gazoochistka-kapleuloviteli",
    "knsPpProducts.ts": "kns-pp",
    "knsSvtProducts.ts": "kns-svt",
    "lamelnyjProducts.ts": "vodoochistka-lamelnyj",
    "losProducts.ts": "los",
    "nutchFiltrProducts.ts": "gidrometallurgiya-nutch-filtr",
    "perelivnyeProducts.ts": "emkosti-perelivnye",
    "podzemnyeProducts.ts": "emkosti-podzemnye",
    "pozharnyeProducts.ts": "emkosti-pozharnye",
    "pryamougolnyeProducts.ts": "emkosti-pryamougolnye",
    "pryamougolnyeVertikalnyeProducts.ts": "emkosti-pryamougolnye-vertikalnye",
    "products.ts": "ventilation",
    "razdvizhnoyProducts.ts": "ventilation-razdvizhnoy",
    "reaktorOsazhdeniyaProducts.ts": "reaktory",
    "scrubberHorizProducts.ts": "gazoochistka-skrubbery-goriz",
    "scrubberProducts.ts": "gazoochistka-skrubbery",
    "sorbtsionnyeProducts.ts": "gidrometallurgiya-sorbtsionnye",
    "troynikProducts.ts": "ventilation-troynik",
    "vozdukhovodProducts.ts": "ventilation-vozdukhovod",
    "vyshchelachProducts.ts": "gidrometallurgiya-vyshchelach",
}

_EXPORT_RE = re.compile(r"export const (\w+)(?:\s*:[^=]+)?\s*=")
_LINE_COMMENT_RE = re.compile(r"//.*?$", re.MULTILINE)
_BLOCK_COMMENT_RE = re.compile(r"/\*.*?\*/", re.DOTALL)
_KEY_RE = re.compile(r'([{\[,]\s*)([A-Za-z_][A-Za-z0-9_]*)(\s*:)')
_TRAILING_COMMA_RE = re.compile(r",(\s*[}\]])")
_BOOL_NULL_REPLACEMENTS = {
    "true": "True",
    "false": "False",
    "null": "None",
}


def _strip_comments(text: str) -> str:
    text = _BLOCK_COMMENT_RE.sub("", text)
    return _LINE_COMMENT_RE.sub("", text)


def _skip_string(text: str, index: int) -> int:
    quote = text[index]
    index += 1
    while index < len(text):
        char = text[index]
        if char == "\\":
            index += 2
            continue
        if quote == "`" and char == "$" and index + 1 < len(text) and text[index + 1] == "{":
            return index
        if char == quote:
            return index + 1
        index += 1
    return index


def _extract_balanced(text: str, start: int) -> tuple[str, int]:
    opener = text[start]
    closer = "]" if opener == "[" else "}"
    depth = 0
    index = start
    while index < len(text):
        char = text[index]
        if char in ('"', "'", "`"):
            next_index = _skip_string(text, index)
            if next_index == index:
                break
            index = next_index
            continue
        if char == opener:
            depth += 1
        elif char == closer:
            depth -= 1
            if depth == 0:
                return text[start:index + 1], index + 1
        index += 1
    raise ValueError("unbalanced expression")


def _extract_exports(text: str) -> list[tuple[str, str]]:
    exports: list[tuple[str, str]] = []
    for match in _EXPORT_RE.finditer(text):
        name = match.group(1)
        index = match.end()
        while index < len(text) and text[index].isspace():
            index += 1
        if index >= len(text) or text[index] not in "[{":
            continue
        try:
            initializer, _ = _extract_balanced(text, index)
        except ValueError:
            continue
        exports.append((name, initializer))
    return exports


def _normalize_js_expression(expr: str) -> str:
    expr = _strip_comments(expr)
    expr = expr.replace(" as const", "")
    expr = expr.replace("undefined", "None")
    expr = expr.replace("`", '"')
    expr = _KEY_RE.sub(r'\1"\2"\3', expr)
    expr = _TRAILING_COMMA_RE.sub(r"\1", expr)
    for js_value, py_value in _BOOL_NULL_REPLACEMENTS.items():
        expr = re.sub(rf"\b{js_value}\b", py_value, expr)
    return expr


def _parse_expression(expr: str):
    normalized = _normalize_js_expression(expr)
    return ast.literal_eval(normalized)


def _stringify(value) -> str:
    if isinstance(value, float) and value.is_integer():
        return str(int(value))
    return str(value)


def _title_for_record(record: dict, fallback: str) -> str:
    for key in ("title", "name", "article", "id", "slug"):
        value = record.get(key)
        if isinstance(value, (str, int, float)) and str(value).strip():
            return str(value)
    return fallback


def _render_node(title: str, node, level: int = 2) -> list[str]:
    lines: list[str] = []
    heading = "#" * min(level, 6)

    if isinstance(node, dict):
        lines.append(f"{heading} {title}")
        nested: list[tuple[str, object]] = []
        for key, value in node.items():
            if isinstance(value, (str, int, float, bool)):
                lines.append(f"- {key}: {_stringify(value)}")
            elif isinstance(value, list) and value and all(not isinstance(item, (dict, list)) for item in value):
                joined = ", ".join(_stringify(item) for item in value)
                lines.append(f"- {key}: {joined}")
            elif isinstance(value, (dict, list)):
                nested.append((key, value))
        lines.append("")
        for key, value in nested:
            if isinstance(value, list):
                lines.extend(_render_list(key, value, level + 1))
            else:
                lines.extend(_render_node(key, value, level + 1))
        return lines

    if isinstance(node, list):
        return _render_list(title, node, level)

    lines.append(f"{heading} {title}")
    lines.append(f"- value: {_stringify(node)}")
    lines.append("")
    return lines


def _render_list(title: str, items: list, level: int) -> list[str]:
    lines: list[str] = []
    heading = "#" * min(level, 6)
    lines.append(f"{heading} {title}")
    lines.append("")
    for index, item in enumerate(items, 1):
        if isinstance(item, dict):
            record_title = _title_for_record(item, f"{title} {index}")
            lines.extend(_render_node(record_title, item, level + 1))
        elif isinstance(item, list):
            lines.extend(_render_list(f"{title} {index}", item, level + 1))
        else:
            lines.append(f"- {_stringify(item)}")
    lines.append("")
    return lines


def _render_markdown(topic: str, source_name: str, exports: list[tuple[str, object]]) -> str:
    lines = [f"# {topic}", "", f"- source: {source_name}", ""]
    for export_name, data in exports:
        lines.extend(_render_node(export_name, data, 2))
    return "\n".join(lines).strip() + "\n"


def _fallback_markdown(topic: str, source_name: str, text: str) -> str:
    literals = re.findall(r'"([^"\n]{3,200})"|\'([^\'\n]{3,200})\'', text)
    parts: list[str] = []
    seen: set[str] = set()
    for first, second in literals:
        value = first or second
        value = value.strip()
        if value and value not in seen:
            seen.add(value)
            parts.append(value)
        if len(parts) >= 40:
            break
    lines = [f"# {topic}", "", f"- source: {source_name}", "", "## raw-snippets", ""]
    lines.extend(f"- {part}" for part in parts)
    return "\n".join(lines).strip() + "\n"


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for ts_file in sorted(SOURCE_DIR.glob("*.ts")):
        topic = _FILE_MAP.get(ts_file.name, ts_file.stem)
        target = OUTPUT_DIR / f"{topic}.md"
        try:
            text = ts_file.read_text(encoding="utf-8")
            exports = _extract_exports(text)
            parsed_exports: list[tuple[str, object]] = []
            for export_name, expr in exports:
                try:
                    parsed_exports.append((export_name, _parse_expression(expr)))
                except Exception:
                    continue

            if parsed_exports:
                markdown = _render_markdown(topic, ts_file.name, parsed_exports)
            else:
                markdown = _fallback_markdown(topic, ts_file.name, text)

            target.write_text(markdown, encoding="utf-8")
            print(f"OK: {ts_file.name} -> {target.name}")
        except Exception as exc:
            print(f"WARNING: failed to process {ts_file.name}: {exc}")


if __name__ == "__main__":
    main()
