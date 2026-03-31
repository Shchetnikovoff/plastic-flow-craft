import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import CorporatePageShell from "@/components/corporate/CorporatePageShell";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <CorporatePageShell
      title="Страница"
      accentWord="не найдена"
      hideCTA
    >
      <section className="text-center py-10">
        <p className="text-6xl font-bold text-muted-foreground/30 mb-4">404</p>
        <p className="text-muted-foreground mb-6">
          Запрашиваемая страница не существует или была перемещена.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Вернуться на главную
        </Link>
      </section>
    </CorporatePageShell>
  );
};

export default NotFound;
