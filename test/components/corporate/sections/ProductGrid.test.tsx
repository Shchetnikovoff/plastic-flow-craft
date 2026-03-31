import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import ProductGrid from "@/components/corporate/sections/ProductGrid";

const items = [
  { name: "Ёмкости", desc: "От 50 до 300 м³", image: "/img/1.jpg", href: "/cat/1" },
  { name: "Реакторы", desc: "Химстойкие", image: "/img/2.jpg", href: "/cat/2" },
  { name: "Скрубберы", desc: "Очистка газов", image: "/img/3.jpg", href: "/cat/3" },
];

function renderGrid(props = {}) {
  return render(
    <MemoryRouter>
      <ProductGrid title="Каталог продукции" items={items} {...props} />
    </MemoryRouter>
  );
}

describe("ProductGrid", () => {
  it("renders title", () => {
    renderGrid();
    expect(screen.getByText("Каталог продукции")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    renderGrid({ subtitle: "Выберите категорию" });
    expect(screen.getByText("Выберите категорию")).toBeInTheDocument();
  });

  it("does not render subtitle when not provided", () => {
    const { container } = renderGrid();
    // No subtitle paragraph beyond the title
    const subtitles = container.querySelectorAll("[data-testid='section-subtitle']");
    expect(subtitles.length).toBe(0);
  });

  it("renders all items", () => {
    renderGrid();
    expect(screen.getByText("Ёмкости")).toBeInTheDocument();
    expect(screen.getByText("Реакторы")).toBeInTheDocument();
    expect(screen.getByText("Скрубберы")).toBeInTheDocument();
  });

  it("renders links with correct hrefs", () => {
    renderGrid();
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/cat/1");
    expect(hrefs).toContain("/cat/2");
    expect(hrefs).toContain("/cat/3");
  });

  it("renders item descriptions", () => {
    renderGrid();
    expect(screen.getByText("От 50 до 300 м³")).toBeInTheDocument();
    expect(screen.getByText("Химстойкие")).toBeInTheDocument();
  });

  it("renders images with alt text", () => {
    renderGrid();
    const imgs = screen.getAllByRole("img");
    expect(imgs.length).toBe(3);
    expect(imgs[0]).toHaveAttribute("alt", "Ёмкости");
  });
});
