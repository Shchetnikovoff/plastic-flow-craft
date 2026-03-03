

## Plan: Remove table PDF download

Remove the "Скачать таблицу (PDF)" button from `src/pages/Index.tsx` and delete the unused `src/lib/generateTablePdf.ts` utility.

**Changes:**

1. **`src/pages/Index.tsx`**:
   - Remove `generateTablePdf` import
   - Remove the "Скачать таблицу (PDF)" `<Button>` from the download buttons section
   - Keep only the "Скачать страницу (PDF)" button

2. **`src/lib/generateTablePdf.ts`**: Delete file (no longer used)

