from services.postprocess import parse_markers, ParsedResponse


def test_plain_text_no_markers():
    r = parse_markers("Рекомендую ёмкость ЕВПП-5000 из PPH.")
    assert r.text == "Рекомендую ёмкость ЕВПП-5000 из PPH."
    assert r.lead is False
    assert r.kp_articles == []
    assert r.escalate_reason is None


def test_lead_marker():
    r = parse_markers("Рекомендую ЕВПП-5000.\n[LEAD]")
    assert r.text == "Рекомендую ЕВПП-5000."
    assert r.lead is True


def test_kp_marker_single():
    r = parse_markers("Вот подборка.\n[KP:СЗПК.ЕВПП.5000]")
    assert r.text == "Вот подборка."
    assert r.kp_articles == ["СЗПК.ЕВПП.5000"]


def test_kp_marker_multiple():
    r = parse_markers("Две позиции.\n[KP:СЗПК.ЕВПП.5000,СЗПК.ЕВПП.3000]")
    assert r.kp_articles == ["СЗПК.ЕВПП.5000", "СЗПК.ЕВПП.3000"]


def test_escalate_marker():
    r = parse_markers("Не могу ответить.\n[ESCALATE:нестандартная конфигурация]")
    assert r.text == "Не могу ответить."
    assert r.escalate_reason == "нестандартная конфигурация"


def test_multiple_markers():
    r = parse_markers("Рекомендую ЕВПП-5000.\n[KP:СЗПК.ЕВПП.5000]\n[LEAD]")
    assert r.lead is True
    assert r.kp_articles == ["СЗПК.ЕВПП.5000"]
