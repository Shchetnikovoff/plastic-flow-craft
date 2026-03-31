# Система генерации коммерческих предложений (КП)

**Дата:** 2026-03-31
**Beads epic:** plastic-flow-craft-1ix
**Ветка:** `feature/kp-system` от `ux-corporate-redesign`

## Обзор

Система позволяет менеджеру формировать КП в формате карточки товара (с фото, артикулом, характеристиками, ценой и условиями), вести реестр всех КП, и скачивать PDF. В будущем — клиент сможет оставлять заявку на КП с сайта.

**Сценарий MVP (фаза 1):** Менеджер выбирает товары на сайте → формирует КП → заполняет данные клиента, цену, условия → скачивает PDF → отправляет клиенту вручную.

**Фаза 2 (позже):** Клиент сам собирает корзину → оставляет заявку → менеджер получает и формирует КП.

## Модель данных

### KPProductItem — товар с сайта

```typescript
interface KPProductItem {
  id: string;                     // uuid
  type: 'product';
  article: string;                // СЗПК.ЕВПП.PPC.7032.5000
  name: string;                   // "Ёмкость вертикальная с плоским дном"
  imageUrl: string;               // путь к фото товара
  specs: Record<string, string>;  // {Объём: "5000 л", Диаметр: "1800 мм", ...}
  quantity: number;
  pricePerUnit: number;           // без НДС, вводится вручную
}
```

### KPCustomItem — ручная строка

```typescript
interface KPCustomItem {
  id: string;
  type: 'custom';
  name: string;                   // "Монтаж и пусконаладка"
  description?: string;
  quantity: number;
  pricePerUnit: number;           // без НДС
}
```

### KPItem

```typescript
type KPItem = KPProductItem | KPCustomItem;
```

### KPTerms — условия КП

```typescript
interface KPTerms {
  productionDays: number;         // срок изготовления (рабочие дни)
  warrantyMonths: number;         // гарантийный срок (месяцы)
  validUntil: string;             // срок действия предложения (ISO дата)
  paymentTerms: string;           // "предоплата 50%, 50% по готовности"
  projectSchedule?: string;       // график реализации проекта (свободный текст)
}
```

### KPClient — данные клиента

```typescript
interface KPClient {
  name: string;                   // ФИО контактного лица
  organization: string;           // ООО "Водоканал"
  inn?: string;                   // ИНН (10 или 12 цифр)
  email?: string;
  phone?: string;
}
```

### KPDocument — КП целиком

```typescript
interface KPDocument {
  id: string;                     // uuid
  number: string;                 // "КП-2026-0001" (автонумерация)
  date: string;                   // дата создания (ISO)
  client: KPClient;
  items: KPItem[];
  terms: KPTerms;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  totalWithoutVat: number;        // вычисляемое: сумма (quantity * pricePerUnit)
  vat: number;                    // вычисляемое: totalWithoutVat * 0.2
  totalWithVat: number;           // вычисляемое: totalWithoutVat + vat
  createdAt: string;              // ISO
  updatedAt: string;              // ISO
}
```

## Архитектура: KPContext

Единый React Context по паттерну существующего `CartContext`. Данные в localStorage.

```typescript
interface KPContextType {
  // Реестр
  documents: KPDocument[];

  // CRUD
  createKP: (client: KPClient, items: KPItem[], terms: KPTerms) => KPDocument;
  updateKP: (id: string, updates: Partial<KPDocument>) => void;
  deleteKP: (id: string) => void;
  duplicateKP: (id: string) => KPDocument;

  // Статусы
  setStatus: (id: string, status: KPDocument['status']) => void;

  // Поиск/фильтрация
  getByStatus: (status: KPDocument['status']) => KPDocument[];
  searchKP: (query: string) => KPDocument[];

  // Автонумерация
  nextNumber: () => string;       // "КП-2026-0042"

  // Экспорт
  exportToExcel: () => void;

  // Клиенты (автозаполнение)
  savedClients: KPClient[];
  saveClient: (client: KPClient) => void;
}
```

**Ключи localStorage:**
- `pfc-kp-registry` — массив KPDocument
- `pfc-kp-clients` — массив KPClient (для автозаполнения)
- `pfc-kp-counter` — счётчик для автонумерации `{year: 2026, counter: 42}`

## Страницы

### `/kp` — Реестр КП

Полноценная таблица со всеми КП:

| Колонка | Сортировка | Фильтр |
|---------|-----------|--------|
| № КП (`КП-2026-0001`) | да | текстовый поиск |
| Дата (`31.03.2026`) | да | диапазон дат |
| Клиент (организация + ФИО) | да | текстовый поиск |
| Позиций (число) | да | — |
| Сумма с НДС (`558 000 ₽`) | да | — |
| Статус (badge) | да | мульти-выбор |
| Действия | — | — |

**Действия в строке:** скачать PDF, дублировать, редактировать, удалить.

**Цвета статусов:** черновик — серый, отправлено — синий, принято — зелёный, отклонено — красный.

**Кнопки сверху:** "Создать КП", "Экспорт в Excel".

### `/kp/new` — Создание КП

Форма слева + live-превью PDF справа.

**Форма содержит:**
1. Блок клиента: организация, ФИО, ИНН, email, телефон. Автозаполнение из сохранённых клиентов.
2. Позиции: список KPItem с ценой, кол-вом. Кнопки "Добавить товар" (поиск по каталогу) и "Добавить строку" (ручная).
3. Условия: срок изготовления, гарантия, действие предложения, условия оплаты, график реализации.
4. Итого: автоматический расчёт без НДС / НДС 20% / с НДС.
5. Кнопки: "Сохранить черновик", "Скачать PDF".

### `/kp/:id` — Редактирование КП

Та же форма `KPForm`, загружает данные по id из реестра. Позволяет редактировать все поля и пересохранить.

## Компоненты

| Компонент | Расположение | Назначение |
|-----------|-------------|------------|
| `KPRegistry` | `/kp` | Таблица реестра с фильтрами, поиском, сортировкой |
| `KPForm` | `/kp/new`, `/kp/:id` | Форма создания/редактирования КП |
| `KPItemRow` | внутри KPForm | Строка позиции: название, артикул, цена, кол-во, сумма, удалить |
| `KPAddProductDialog` | внутри KPForm | Диалог поиска товара по артикулу/названию для добавления в КП |
| `KPAddCustomRow` | внутри KPForm | Инлайн-добавление ручной строки |
| `KPTermsForm` | внутри KPForm | Поля условий |
| `KPClientForm` | внутри KPForm | Поля клиента + автозаполнение |
| `KPPreview` | внутри KPForm | Live-превью PDF (HTML-рендер) |
| `KPQuickDialog` | Product.tsx | Быстрое КП на один товар: цена, клиент, условия → PDF |
| `ClientAutocomplete` | KPClientForm, KPQuickDialog | Dropdown сохранённых клиентов |

## PDF-генерация

Новый файл `src/lib/generateKPPdf.ts` на базе существующего `generateSpecPdf.ts` (jsPDF + PT Sans).

**Вход:** `KPDocument`

**Логика выбора шаблона:**
- 1 товарная позиция, 0 ручных строк → шаблон "Карточка" (крупное фото, артикул, характеристики, цена)
- Иначе → шаблон "Таблица" (строки с миниатюрами, итого)

**Структура PDF (оба шаблона):**
1. Шапка: логотип, реквизиты ООО СЗПК, номер КП, дата
2. Блок клиента: организация, ФИО, ИНН
3. Тело:
   - Карточка: фото слева, артикул + характеристики справа, цена снизу
   - Таблица: №, миниатюра, наименование/артикул/спеки, кол-во, цена, сумма
4. Итого: без НДС / НДС 20% / с НДС
5. Условия: срок, гарантия, действие, оплата, график
6. Подпись: директор
7. Подвал: реквизиты, ИНН, адрес, телефон, email

## Изменения в существующих файлах

- **`Product.tsx`** — заменить кнопку "Скачать КП" (бланк) на открытие `KPQuickDialog`
- **`Header`** — добавить ссылку "КП" в навигацию
- **`CartContext.tsx`** — добавить `getCartAsKPItems(): KPProductItem[]` для конвертации корзины
- **`App.tsx`** — добавить роуты `/kp`, `/kp/new`, `/kp/:id`, обернуть в `KPProvider`
- **`generateLetterheadPdf.ts`** — удалить (заменяется `generateKPPdf.ts`)

## Новые зависимости

- `xlsx` (SheetJS) — экспорт реестра в Excel
- ID генерируются через `crypto.randomUUID()` (нативный API браузера, без внешних зависимостей)

## Файловая структура новых файлов

```
src/
  contexts/
    KPContext.tsx              # KPProvider + useKP hook
  pages/
    KPRegistry.tsx             # /kp — реестр
    KPEditor.tsx               # /kp/new и /kp/:id — форма + превью
  components/kp/
    KPForm.tsx                 # основная форма
    KPItemRow.tsx              # строка позиции
    KPAddProductDialog.tsx     # поиск товара
    KPAddCustomRow.tsx         # ручная строка
    KPTermsForm.tsx            # условия
    KPClientForm.tsx           # данные клиента
    KPPreview.tsx              # HTML-превью PDF
    KPQuickDialog.tsx          # быстрое КП с товара
    ClientAutocomplete.tsx     # автозаполнение клиентов
    KPStatusBadge.tsx          # цветной badge статуса
  lib/
    generateKPPdf.ts           # PDF-генерация (карточка + таблица)
  types/
    kp.ts                      # все интерфейсы KP*
```
