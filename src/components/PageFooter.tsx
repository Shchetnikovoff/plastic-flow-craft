import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const PageFooter = () => (
  <footer className="mt-12 bg-slate-900 text-slate-300">
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand + description */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-9 w-9 rounded-lg bg-amber-500 text-slate-900 flex items-center justify-center font-bold text-sm">
              СЗ
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Пласт-Металл ПРО</p>
              <p className="text-slate-400 text-[11px] leading-tight">ООО СЗПК</p>
            </div>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            Производство оборудования из полимеров. Работаем по всей России.
          </p>
          <p className="text-slate-500 text-[11px] mt-3">ИНН: 7806634460</p>
        </div>

        {/* Contacts */}
        <div>
          <h3 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Контакты</h3>
          <div className="space-y-2 text-xs">
            <a href="tel:+79633225540" className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors">
              <Phone className="h-3.5 w-3.5 shrink-0" />
              +7 (963) 322-55-40
            </a>
            <a href="mailto:osobenkov@list.ru" className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              osobenkov@list.ru
            </a>
            <div className="flex items-start gap-2 text-slate-400">
              <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span>Ленинградская обл., д. Разметелево, ул. Строителей 27</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Разделы</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
            <Link to="/catalog/emkosti" className="text-slate-300 hover:text-amber-400 transition-colors">Ёмкости</Link>
            <Link to="/catalog/vodoochistka" className="text-slate-300 hover:text-amber-400 transition-colors">Водоочистка</Link>
            <Link to="/catalog/gazoochistka" className="text-slate-300 hover:text-amber-400 transition-colors">Газоочистка</Link>
            <Link to="/catalog/ventilyatsiya" className="text-slate-300 hover:text-amber-400 transition-colors">Вентиляция</Link>
            <Link to="/catalog/kns" className="text-slate-300 hover:text-amber-400 transition-colors">КНС</Link>
            <Link to="/catalog/reaktory" className="text-slate-300 hover:text-amber-400 transition-colors">Реакторы</Link>
            <Link to="/chemical-resistance" className="text-slate-300 hover:text-amber-400 transition-colors">Хим. стойкость</Link>
            <Link to="/about" className="text-slate-300 hover:text-amber-400 transition-colors">О компании</Link>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-5 border-t border-slate-800 text-center text-[11px] text-slate-500">
        © {new Date().getFullYear()} ООО СЗПК «Пласт-Металл Про». Все права защищены.
      </div>
    </div>
  </footer>
);

export default PageFooter;
