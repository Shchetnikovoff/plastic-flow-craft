import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import CorporatePageShell from "@/components/corporate/CorporatePageShell";

function renderShell(props = {}) {
  const defaultProps = {
    breadcrumbs: [{ label: "Каталог", href: "/catalog" }, { label: "Ёмкости" }],
    title: "Ёмкости из",
    accentWord: "полипропилена",
    subtitle: "От 50 л до 300 м³",
    seo: { title: "Ёмкости", description: "Тест", keywords: "тест" },
    ...props,
  };
  return render(
    <MemoryRouter>
      <CorporatePageShell {...defaultProps}>
        <div data-testid="child-content">Контент</div>
      </CorporatePageShell>
    </MemoryRouter>
  );
}

describe("CorporatePageShell", () => {
  it("renders title with accent word", () => {
    renderShell();
    expect(screen.getByText("Ёмкости из")).toBeInTheDocument();
    expect(screen.getByText("полипропилена")).toBeInTheDocument();
  });

  it("renders subtitle", () => {
    renderShell();
    expect(screen.getByText("От 50 л до 300 м³")).toBeInTheDocument();
  });

  it("renders children", () => {
    renderShell();
    expect(screen.getByTestId("child-content")).toBeInTheDocument();
  });

  it("renders badge when provided", () => {
    renderShell({ badge: "30+ лет" });
    expect(screen.getByText("30+ лет")).toBeInTheDocument();
  });

  it("renders stats bar when stats provided", () => {
    renderShell({
      stats: [
        { value: "500+", label: "проектов" },
        { value: "5 лет", label: "гарантия" },
      ],
    });
    expect(screen.getByText("500+")).toBeInTheDocument();
    expect(screen.getByText("проектов")).toBeInTheDocument();
  });

  it("does not render stats bar when no stats", () => {
    renderShell({ stats: undefined });
    expect(screen.queryByText("проектов")).not.toBeInTheDocument();
  });

  it("renders CTA section with phone", () => {
    renderShell();
    expect(screen.getByText("Готовы обсудить проект?")).toBeInTheDocument();
    const phoneLinks = screen.getAllByText("+7 (812) 242-60-06");
    expect(phoneLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("hides CTA when hideCTA is true", () => {
    renderShell({ hideCTA: true });
    expect(screen.queryByText("Готовы обсудить проект?")).not.toBeInTheDocument();
  });

  it("renders breadcrumbs", () => {
    renderShell();
    // "Каталог" appears in both header nav and breadcrumbs
    const katalogLinks = screen.getAllByText("Каталог");
    expect(katalogLinks.length).toBeGreaterThanOrEqual(1);
    // "Ёмкости" appears in breadcrumb and footer product links
    const yomkostiElements = screen.getAllByText("Ёмкости");
    expect(yomkostiElements.length).toBeGreaterThanOrEqual(1);
    // Breadcrumb last item has aria-current="page"
    const breadcrumbPage = yomkostiElements.find(
      (el) => el.getAttribute("aria-current") === "page"
    );
    expect(breadcrumbPage).toBeTruthy();
    // "Главная" is always rendered as first breadcrumb
    expect(screen.getAllByText("Главная").length).toBeGreaterThanOrEqual(1);
  });
});
