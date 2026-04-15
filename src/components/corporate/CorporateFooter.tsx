import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const productLinks = [
  { name: "Ёмкости", href: "/catalog/emkosti" },
  { name: "Водоочистка", href: "/catalog/vodoochistka" },
  { name: "Газоочистка", href: "/catalog/gazoochistka" },
  { name: "Вентиляция", href: "/catalog/ventilyatsiya" },
  { name: "КНС", href: "/catalog/kns" },
  { name: "Реакторы", href: "/catalog/reaktory" },
];

const companyLinks = [
  { name: "О компании", href: "/about" },
  { name: "Каталог", href: "/catalog" },
  { name: "Хим. стойкость", href: "/chemical-resistance" },
  { name: "Услуги", href: "/catalog/uslugi" },
];

export default function CorporateFooter() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-10 py-12 md:py-16">
          {/* Company */}
          <div className="flex flex-col gap-5 max-w-[300px]">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-amber-500 flex items-center justify-center">
                <span className="text-slate-900 font-extrabold text-sm">СЗ</span>
              </div>
              <div>
                <span className="text-white text-base font-bold">Пласт-Металл ПРО</span>
                <span className="block text-[10px] text-slate-500 mt-0.5">ООО СЗПК</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Проектирование, производство и монтаж промышленного полимерного оборудования. Работаем по всей России.
            </p>
            <div className="flex flex-col gap-2.5 text-sm">
              <a href="tel:+78122426006" className="flex items-center gap-2.5 text-slate-300 hover:text-amber-400 transition-colors">
                <Phone className="h-4 w-4 shrink-0" /> +7 (812) 242-60-06
              </a>
              <a href="mailto:info@plast-metall.pro" className="flex items-center gap-2.5 text-slate-300 hover:text-amber-400 transition-colors">
                <Mail className="h-4 w-4 shrink-0" /> info@plast-metall.pro
              </a>
              <div className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                Ленинградская обл., д. Разметелево, ул. Строителей 27
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-10 md:gap-14">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Продукция</h3>
              <div className="flex flex-col gap-2.5">
                {productLinks.map((item) => (
                  <Link key={item.href} to={item.href} className="text-sm text-slate-300 hover:text-white transition-colors">{item.name}</Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Компания</h3>
              <div className="flex flex-col gap-2.5">
                {companyLinks.map((item) => (
                  <Link key={item.href} to={item.href} className="text-sm text-slate-300 hover:text-white transition-colors">{item.name}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500">
          <span>&copy; {new Date().getFullYear()} ООО СЗПК «Пласт-Металл Про». Все права защищены.</span>
          <span>ИНН: 7806634460</span>
        </div>
      </div>
    </footer>
  );
}
