"""Knowledge base: load markdown files + keyword-based RAG retrieval."""
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

_MAX_TOPICS = 6

_TOPIC_KEYWORDS: dict[str, list[str]] = {
    "emkosti-evpp": ["ёмкост", "емкост", "бак", "евпп", "вертикальн", "цистерн", "резервуар"],
    "emkosti-gorizontalnye": ["горизонтальн", "ёмкост горизонт", "лежач"],
    "emkosti-podzemnye": ["подземн", "заглублен"],
    "emkosti-pryamougolnye": ["прямоугольн"],
    "emkosti-pozharnye": ["пожарн", "противопожарн", "пожаротушен"],
    "emkosti-perelivnye": ["переливн", "бассейн"],
    "vodoochistka-ffu": ["водоочист", "ффу", "ffu", "флотац", "фильтрац"],
    "vodoochistka-lamelnyj": ["ламел", "отстойник", "тонкослойн"],
    "vodoochistka-obezvozhivatel": ["обезвожив", "мешочн", "шлам"],
    "vodoochistka-zhirouloviteli": ["жироулов", "жиро-улов", "grease"],
    "vodoochistka-dozirovanie": ["дозирован", "реагент"],
    "gazoochistka-skrubbery": ["скруббер", "газоочист", "scrubber"],
    "gazoochistka-fvg": ["фвг", "fvg", "волокнист фильтр"],
    "gazoochistka-kapleuloviteli": ["каплеулов", "капл", "demister"],
    "ventilation": ["вентиляц", "воздуховод", "отвод", "тройник", "раздвижн", "фитинг"],
    "kns": ["кнс", "канализ", "насосн станц"],
    "los": ["лос", "локальн очист", "очистн сооруж"],
    "reaktory": ["реактор", "химическ реактор"],
    "gidrometallurgiya": ["гидрометаллург", "нутч", "выщелач", "сорбцион"],
    "catalog-overview": ["каталог", "что производ", "продукц", "ассортимент"],
    "faq": ["срок", "гарантия", "доставк", "оплат", "цена", "стоимость", "сколько стоит", "почём"],
    "podbor-materiala": ["материал", "полипропилен", "pph", "ppc", "pe100", "pe 100", "кислот", "щёлоч", "щелоч", "химическ стойк", "коррозион"],
    "o-kompanii": ["компани", "пласт-металл", "контакт", "адрес", "телефон", "реквизит"],
}

_FALLBACK_TOPIC = "catalog-overview"


class KnowledgeBase:
    def __init__(self) -> None:
        self._data: dict[str, str] = {}

    def load_all(self, knowledge_dir: Path) -> None:
        self._data = {}
        for md_file in sorted(knowledge_dir.glob("*.md")):
            topic = md_file.stem
            self._data[topic] = md_file.read_text(encoding="utf-8").strip()
        logger.info("KB loaded: %d topics from %s", len(self._data), knowledge_dir)

    def get(self, topic: str) -> str | None:
        return self._data.get(topic)

    def get_relevant(self, user_message: str) -> str:
        msg_lower = user_message.lower()
        matched: set[str] = set()
        keywords = getattr(self, "_topic_keywords", _TOPIC_KEYWORDS)

        for topic, kws in keywords.items():
            if topic not in self._data:
                continue
            for kw in kws:
                if kw in msg_lower:
                    matched.add(topic)
                    break

        if not matched:
            if _FALLBACK_TOPIC in self._data:
                matched.add(_FALLBACK_TOPIC)
            elif self._data:
                matched.add(next(iter(self._data)))

        if len(matched) > _MAX_TOPICS:
            rest = sorted(matched, key=lambda t: len(self._data.get(t, "")))
            matched = set(rest[:_MAX_TOPICS])

        parts = [self._data[t] for t in sorted(matched) if t in self._data]
        result = "\n\n---\n\n".join(parts)
        logger.info("RAG: %d topics (%d chars): %s", len(matched), len(result), sorted(matched))
        return result

    def topics(self) -> list[str]:
        return list(self._data.keys())


kb = KnowledgeBase()
