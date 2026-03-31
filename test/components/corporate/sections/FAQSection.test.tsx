import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FAQSection from "@/components/corporate/sections/FAQSection";

const items = [
  { q: "Какой срок изготовления?", a: "От 5 до 20 рабочих дней." },
  { q: "Есть ли доставка?", a: "Доставка по всей России." },
  { q: "Какая гарантия?", a: "Гарантия 5 лет на все изделия." },
];

function renderFAQ(props = {}) {
  return render(<FAQSection items={items} {...props} />);
}

describe("FAQSection", () => {
  it("renders default title when none provided", () => {
    renderFAQ();
    expect(screen.getByText("Частые вопросы")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    renderFAQ({ title: "Вопросы и ответы" });
    expect(screen.getByText("Вопросы и ответы")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    renderFAQ({ subtitle: "Мы ответим на всё" });
    expect(screen.getByText("Мы ответим на всё")).toBeInTheDocument();
  });

  it("renders all questions", () => {
    renderFAQ();
    expect(screen.getByText("Какой срок изготовления?")).toBeInTheDocument();
    expect(screen.getByText("Есть ли доставка?")).toBeInTheDocument();
    expect(screen.getByText("Какая гарантия?")).toBeInTheDocument();
  });

  it("answers are hidden by default", () => {
    renderFAQ();
    // Answers exist in DOM but are visually hidden (max-h-0 overflow-hidden)
    const answer = screen.getByText("От 5 до 20 рабочих дней.");
    expect(answer.closest("[data-state]")).toHaveAttribute("data-state", "closed");
  });

  it("click expands answer", () => {
    renderFAQ();
    const question = screen.getByText("Какой срок изготовления?");
    fireEvent.click(question);
    const answer = screen.getByText("От 5 до 20 рабочих дней.");
    expect(answer.closest("[data-state]")).toHaveAttribute("data-state", "open");
  });

  it("click again collapses answer", () => {
    renderFAQ();
    const question = screen.getByText("Какой срок изготовления?");
    fireEvent.click(question);
    fireEvent.click(question);
    const answer = screen.getByText("От 5 до 20 рабочих дней.");
    expect(answer.closest("[data-state]")).toHaveAttribute("data-state", "closed");
  });
});
