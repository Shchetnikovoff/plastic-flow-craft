const PageFooter = () => (
  <footer className="border-t border-border pt-6 pb-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-muted-foreground">
      <div>
        <p className="font-semibold text-foreground mb-1">ООО СЗПК «Пласт-Металл Про»</p>
        <p>ИНН: 7806634460</p>
        <p>Ленинградская область, д. Разметелево, ул. Строителей 27</p>
      </div>
      <div className="sm:text-right">
        <p>Тел.: <a href="tel:+79633225540" className="hover:text-primary">+7 (963) 322-55-40</a></p>
        <p>E-mail: <a href="mailto:osobenkov@list.ru" className="hover:text-primary">osobenkov@list.ru</a></p>
      </div>
    </div>
  </footer>
);

export default PageFooter;
