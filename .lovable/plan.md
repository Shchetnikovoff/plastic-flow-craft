

## Plan: Fix Cyrillic text in PDF generation

**Problem:** jsPDF's built-in `helvetica` font has no Cyrillic glyphs, causing hieroglyphs in all PDF downloads. The DOCX generation uses the `docx` library which references system fonts by name — it should work correctly (Arial supports Cyrillic). If DOCX also shows issues, it's likely a viewer problem, not a generation problem.

**Solution:** Embed a Cyrillic-compatible font (PT Sans from Google Fonts — free, professional, supports full Cyrillic range) into all three PDF generation files.

### Changes

**1. Create `src/lib/pdfFonts.ts`**
- Fetch PT Sans Regular and Bold `.ttf` files from Google Fonts CDN at runtime
- Convert to base64 and register with jsPDF via `doc.addFileToVFS()` + `doc.addFont()`
- Export a helper: `async function registerCyrillicFont(doc: jsPDF)` that registers both weights

**2. Update `src/lib/generateLetterheadPdf.ts`**
- Import and call `registerCyrillicFont(doc)` after creating the jsPDF instance
- Replace all `doc.setFont("helvetica", ...)` with `doc.setFont("PTSans", ...)`

**3. Update `src/lib/generateSpecPdf.ts`**
- Same font registration and replacement

**4. Update `src/lib/generateFullPagePdf.ts`**
- Same font registration and replacement

### Files modified
- `src/lib/pdfFonts.ts` — new shared font loader
- `src/lib/generateLetterheadPdf.ts` — use PT Sans
- `src/lib/generateSpecPdf.ts` — use PT Sans
- `src/lib/generateFullPagePdf.ts` — use PT Sans

