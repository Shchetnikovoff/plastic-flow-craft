import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { Shield, Wrench, Clock } from "lucide-react";
import AdvantagesGrid from "@/components/corporate/sections/AdvantagesGrid";

const items = [
  { icon: Shield, title: "Надёжность", text: "Гарантия 5 лет" },
  { icon: Wrench, title: "Сервис", text: "Обслуживание 24/7", href: "/service" },
  { icon: Clock, title: "Сроки", text: "Точно в срок" },
];

function renderGrid(props = {}) {
  return render(
    <MemoryRouter>
      <AdvantagesGrid items={items} {...props} />
    </MemoryRouter>
  );
}

describe("AdvantagesGrid", () => {
  it("renders default title when none provided", () => {
    renderGrid();
    expect(screen.getByText("Почему выбирают нас")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    renderGrid({ title: "Наши преимущества" });
    expect(screen.getByText("Наши преимущества")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    renderGrid({ subtitle: "Качество и опыт" });
    expect(screen.getByText("Качество и опыт")).toBeInTheDocument();
  });

  it("renders all items", () => {
    renderGrid();
    expect(screen.getByText("Надёжность")).toBeInTheDocument();
    expect(screen.getByText("Сервис")).toBeInTheDocument();
    expect(screen.getByText("Сроки")).toBeInTheDocument();
  });

  it("renders item text", () => {
    renderGrid();
    expect(screen.getByText("Гарантия 5 лет")).toBeInTheDocument();
    expect(screen.getByText("Обслуживание 24/7")).toBeInTheDocument();
  });

  it("renders link when href provided", () => {
    renderGrid();
    const links = screen.getAllByRole("link");
    expect(links.length).toBe(1);
    expect(links[0]).toHaveAttribute("href", "/service");
  });

  it("renders div (not link) when no href", () => {
    render(
      <MemoryRouter>
        <AdvantagesGrid items={[{ icon: Shield, title: "Тест", text: "Текст" }]} />
      </MemoryRouter>
    );
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
