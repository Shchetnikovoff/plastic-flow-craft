import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  { name: "Алексей Петров", role: "Главный инженер", company: "Гальванопроизводство, Санкт-Петербург", text: "Оборудование СЗПК работает на наших объектах более 10 лет без единой замены. Качество сварных швов и подбор материалов — на высшем уровне.", avatar: "https://i.pravatar.cc/80?img=11" },
  { name: "Марина Козлова", role: "Директор по производству", company: "Химический завод, Нижний Новгород", text: "Заказали ёмкости для серной кислоты — всё сделали точно по ТЗ. Монтаж за 3 дня, документация в порядке. Рекомендуем.", avatar: "https://i.pravatar.cc/80?img=5" },
  { name: "Дмитрий Васильев", role: "Технический директор", company: "Водоканал, Казань", text: "Установили ФФУ от СЗПК на очистных — эффективность очистки выросла до 95%. Оборудование компактное и надёжное.", avatar: "https://i.pravatar.cc/80?img=12" },
  { name: "Елена Сидорова", role: "Начальник цеха", company: "Фармацевтическое производство, Москва", text: "Полипропиленовые реакторы превзошли ожидания. Химстойкость отличная, обслуживание минимальное. Спасибо команде СЗПК.", avatar: "https://i.pravatar.cc/80?img=9" },
  { name: "Игорь Новиков", role: "Главный энергетик", company: "Металлургический комбинат, Челябинск", text: "Скрубберы работают на полную мощность уже 5 лет. Степень очистки газов стабильно 99,5%. Сервис оперативный.", avatar: "https://i.pravatar.cc/80?img=14" },
  { name: "Ольга Белова", role: "Руководитель проекта", company: "ЖКХ, Екатеринбург", text: "КНС в корпусе SVT — отличное решение. Установили за неделю, работает без нареканий. Документация и сертификаты в комплекте.", avatar: "https://i.pravatar.cc/80?img=20" },
  { name: "Сергей Кузнецов", role: "Инженер-проектировщик", company: "Проектный институт, Новосибирск", text: "Сотрудничаем с СЗПК уже 8 лет. Всегда точные сроки, грамотное проектирование, качественные материалы.", avatar: "https://i.pravatar.cc/80?img=15" },
  { name: "Анна Морозова", role: "Директор", company: "Пищевое производство, Краснодар", text: "Жироуловители от СЗПК решили нашу проблему с очисткой стоков полностью. Обслуживание простое, цена адекватная.", avatar: "https://i.pravatar.cc/80?img=25" },
  { name: "Виктор Соколов", role: "Начальник отдела снабжения", company: "НПЗ, Уфа", text: "Ёмкости для нефтепродуктов — отличное качество. Полиэтилен выдерживает нагрузки, антикоррозийные свойства подтверждены.", avatar: "https://i.pravatar.cc/80?img=33" },
  { name: "Наталья Волкова", role: "Эколог", company: "Целлюлозно-бумажный комбинат, Архангельск", text: "Газоочистное оборудование позволило нам пройти экологическую проверку без замечаний. Инвестиция окупилась за год.", avatar: "https://i.pravatar.cc/80?img=32" },
  { name: "Андрей Лебедев", role: "Главный технолог", company: "Гальванический участок, Тула", text: "Вентиляция из полипропилена — идеальное решение для нашего производства. Химстойкость ПП оправдала себя полностью.", avatar: "https://i.pravatar.cc/80?img=51" },
  { name: "Татьяна Ильина", role: "Зам. директора", company: "Водоочистная станция, Самара", text: "Ламельный отстойник от СЗПК — в 4 раза компактнее предыдущего. Качество очистки выросло, затраты на обслуживание снизились.", avatar: "https://i.pravatar.cc/80?img=44" },
  { name: "Михаил Федоров", role: "Начальник ОКС", company: "Строительная компания, Ростов-на-Дону", text: "Пожарные ёмкости на 100 м³ — установили на объекте за 2 дня. Качество изготовления на высоте, соответствие нормам подтверждено.", avatar: "https://i.pravatar.cc/80?img=53" },
  { name: "Юлия Григорьева", role: "Менеджер по закупкам", company: "Молочный завод, Воронеж", text: "Ёмкости для молока и кисломолочной продукции — гладкая поверхность, легко моются. Все санитарные сертификаты в наличии.", avatar: "https://i.pravatar.cc/80?img=47" },
  { name: "Константин Павлов", role: "Главный механик", company: "Металлообрабатывающий завод, Пермь", text: "Станции дозирования реагентов работают безотказно. Автоматика точная, материалы стойкие к агрессивным средам.", avatar: "https://i.pravatar.cc/80?img=60" },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      goNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const goNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Show 3 on desktop, 1 on mobile
  const getVisible = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(testimonials[(current + i) % testimonials.length]);
    }
    return items;
  };

  const visible = getVisible();

  return (
    <div className="relative">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {visible.map((t, i) => (
          <div
            key={`${current}-${i}`}
            className="rounded-xl bg-slate-800 border border-slate-700 p-6 flex flex-col justify-between animate-in fade-in-0 duration-500"
          >
            {/* Stars */}
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            {/* Quote */}
            <p className="text-slate-300 text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
            {/* Author */}
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-700">
              <img
                src={t.avatar}
                alt={t.name}
                className="h-10 w-10 rounded-full object-cover border-2 border-slate-600"
              />
              <div>
                <div className="text-white text-sm font-semibold">{t.name}</div>
                <div className="text-slate-500 text-xs">{t.role}</div>
                <div className="text-slate-500 text-xs">{t.company}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={goPrev}
          className="h-10 w-10 rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-amber-500 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-1.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-amber-500" : "w-2 bg-slate-600 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>
        <button
          onClick={goNext}
          className="h-10 w-10 rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-amber-500 transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
