import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SpecTable from "@/components/corporate/sections/SpecTable";

const headers = ["Параметр", "Значение", "Ед. изм."];
const rows = [
  ["Объём", 500, "л"],
  ["Давление", 1.6, "МПа"],
  ["Температура", 95, "°C"],
];

function renderTable(props = {}) {
  return render(
    <SpecTable title="Характеристики" headers={headers} rows={rows} {...props} />
  );
}

describe("SpecTable", () => {
  it("renders title", () => {
    renderTable();
    expect(screen.getByText("Характеристики")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    renderTable({ subtitle: "Основные параметры" });
    expect(screen.getByText("Основные параметры")).toBeInTheDocument();
  });

  it("does not render subtitle when not provided", () => {
    const { container } = renderTable();
    const subtitles = container.querySelectorAll("[data-testid='section-subtitle']");
    expect(subtitles.length).toBe(0);
  });

  it("renders all headers", () => {
    renderTable();
    expect(screen.getByText("Параметр")).toBeInTheDocument();
    expect(screen.getByText("Значение")).toBeInTheDocument();
    expect(screen.getByText("Ед. изм.")).toBeInTheDocument();
  });

  it("renders all row data", () => {
    renderTable();
    expect(screen.getByText("Объём")).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByText("1.6")).toBeInTheDocument();
    expect(screen.getByText("°C")).toBeInTheDocument();
  });

  it("renders caption when provided", () => {
    renderTable({ caption: "* Данные при 20°C" });
    expect(screen.getByText("* Данные при 20°C")).toBeInTheDocument();
  });

  it("does not render caption when not provided", () => {
    renderTable();
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });
});
