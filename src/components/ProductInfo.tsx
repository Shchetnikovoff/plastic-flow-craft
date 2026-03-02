const ProductInfo = () => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
          Отвод 90° вентиляционный круглый: раструб
        </h1>
        <p className="mt-2 text-muted-foreground">
          Отвод вентиляционный круглого сечения служит для плавного поворота системы под углом 90°.
        </p>
      </div>

      <div className="rounded-lg border bg-card p-4">
        <h3 className="mb-2 font-semibold text-foreground">Используемые материалы</h3>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>• Листовой полипропилен блок-сополимер (PPC)</li>
          <li>• Листовой полиэтилен (PE 100)</li>
          <li>• Листовой полипропилен гомополимер (PPH)</li>
          <li>• Листовой полипропилен, не распространяющий горение (PPs)</li>
        </ul>
      </div>

      <div className="rounded-lg border bg-card p-4">
        <h3 className="mb-2 font-semibold text-foreground">Характеристики</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <span className="text-muted-foreground">Диаметр:</span>
          <span className="font-medium text-foreground">от 200 до 1200 мм</span>
          <span className="text-muted-foreground">Соединение:</span>
          <span className="font-medium text-foreground">Раструб</span>
          <span className="text-muted-foreground">Угол:</span>
          <span className="font-medium text-foreground">90°</span>
        </div>
      </div>

      {/* Schema image */}
      <div className="rounded-lg border bg-card p-4">
        <h3 className="mb-3 font-semibold text-foreground">Схема отвода</h3>
        <img
          src="/images/schema.png"
          alt="Схема отвода 90° с обозначением размеров"
          className="mx-auto max-h-64 object-contain"
        />
      </div>
    </div>
  );
};

export default ProductInfo;
