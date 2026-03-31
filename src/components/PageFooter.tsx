import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const PageFooter = () => (
  <footer className="bg-slate-900 text-slate-300 mt-10">
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-10">
      <div className="flex flex-col sm:flex-row justify-between gap-8">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="h-7 w-7 rounded-md bg-amber-500 flex items-center justify-center">
              <span className="text-slate-900 font-extrabold text-[10px]">СЗ</span>
            </div>
            <span className="text-white text-sm font-bold">Пласт-Металл ПРО</span>
          </div>
          <p className="text-xs text-slate-500">ИНН: 7806634460</p>
          <div className="flex items-start gap-1.5 text-xs text-slate-500 mt-1">
            <MapPin className="h-3 w-3 shrink-0 mt-0.5" />
            Ленинградская обл., д. Разметелево, ул. Строителей 27
          </div>
        </div>
        <div className="flex flex-col gap-1.5 text-sm">
          <a href="tel:+78122426006" className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors">
            <Phone className="h-3.5 w-3.5" /> +7 (812) 242-60-06
          </a>
          <a href="mailto:info@plast-metall.pro" className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors">
            <Mail className="h-3.5 w-3.5" /> info@plast-metall.pro
          </a>
          <Link to="/" className="text-xs text-slate-500 hover:text-white mt-2 transition-colors">← На главную</Link>
        </div>
      </div>
    </div>
    <div className="border-t border-slate-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-4 text-xs text-slate-600 text-center">
        © {new Date().getFullYear()} ООО СЗПК «Пласт-Металл Про». Все права защищены.
      </div>
    </div>
  </footer>
);

export default PageFooter;
