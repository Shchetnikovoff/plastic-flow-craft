

## Plan: Add Commercial Proposal (КП) PDF Button to KNS PP Product Card

### Goal
Add a "Скачать коммерческое предложение (PDF)" button to KNS PP product detail pages, matching existing behavior on FFU, lamelnyj, and other product cards.

### Changes

**`src/pages/Product.tsx`** (single edit, ~3 lines)
- After the existing spec PDF button (line 914), add a new button calling `generateLetterheadPdf()` with a success toast — identical pattern to FFU/lamelnyj products (e.g. line 749).

```tsx
<Button variant="outline" className="gap-2 w-full mt-2" onClick={async () => {
  await generateLetterheadPdf();
  toast.success("Коммерческое предложение скачано");
}}>
  <FileDown className="h-4 w-4" />
  Скачать коммерческое предложение (PDF)
</Button>
```

No other files need changes — `generateLetterheadPdf` is already imported.

