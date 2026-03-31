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
        <p className="text-6xl font-bold text-slate-300 mb-4">404</p>
        <p className="text-slate-500 mb-6">
          Запрашиваемая страница не существует или была перемещена.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 transition-colors"
        >
          Вернуться на главную
        </Link>
      </section>
    </CorporatePageShell>
  );
};

export default NotFound;
