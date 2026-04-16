import tempfile
from pathlib import Path

from services.knowledge import KnowledgeBase


def _make_kb(files: dict[str, str]) -> KnowledgeBase:
    kb = KnowledgeBase()
    with tempfile.TemporaryDirectory() as td:
        for name, content in files.items():
            (Path(td) / f"{name}.md").write_text(content, encoding="utf-8")
        kb.load_all(Path(td))
    return kb


def test_load_all_reads_markdown_files():
    kb = _make_kb({"topic_a": "Content A", "topic_b": "Content B"})
    assert kb.get("topic_a") == "Content A"
    assert kb.get("topic_b") == "Content B"
    assert kb.get("nonexistent") is None


def test_get_relevant_matches_keywords():
    kb = _make_kb({
        "emkosti-evpp": "Вертикальные ёмкости ЕВПП...",
        "vodoochistka-ffu": "Флотационно-фильтрационные установки...",
        "faq": "Часто задаваемые вопросы...",
    })
    result = kb.get_relevant("нужна ёмкость на 5000 литров")
    assert "Вертикальные ёмкости ЕВПП" in result
    assert "Флотационно-фильтрационные установки" not in result


def test_get_relevant_returns_fallback_when_no_match():
    kb = _make_kb({
        "catalog-overview": "Общий каталог продукции...",
        "faq": "Часто задаваемые вопросы...",
    })
    result = kb.get_relevant("привет как дела")
    assert "Общий каталог продукции" in result


def test_get_relevant_limits_to_max_topics():
    files = {f"topic_{i}": f"Content {i}" for i in range(10)}
    kb = KnowledgeBase()
    with tempfile.TemporaryDirectory() as td:
        for name, content in files.items():
            (Path(td) / f"{name}.md").write_text(content, encoding="utf-8")
        kb.load_all(Path(td))
    kb._topic_keywords = {f"topic_{i}": ["тест"] for i in range(10)}
    result = kb.get_relevant("тест")
    assert result.count("---") <= 5
