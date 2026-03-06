

## Plan: Fix EmkostiPage sidebar to show subcategories inline (without navigation)

### Problem
On the EmkostiPage (`/catalog/emkosti`), the subcategory sidebar (lines 310-338) uses `<Link>` components that navigate to separate pages (e.g., `/catalog/emkosti/podzemnye`). This causes the page to reload and the sidebar to disappear. The user wants the same inline behavior as CatalogPage: clicking a subcategory highlights it in the sidebar and shows a detail card on the right, without navigating away.

### Solution
Modify `src/pages/EmkostiPage.tsx` — replace the subcategory section (lines 303-341) with the same inline pattern used in CatalogPage:

1. **Add state**: `const [selectedSubId, setSelectedSubId] = useState<string | null>(null)` (already exists or add near other state)
2. **Sidebar**: Replace `<Link>` with `<button onClick={() => setSelectedSubId(...)}>` — toggle selection on click, highlight active item
3. **Right content area**: 
   - If a subcategory is selected: show a detail card with image (if available), name, description ("Раздел в разработке..."), and a "Перейти на страницу" link for items that have `externalPath`
   - If nothing is selected: show the grid of subcategory cards (also as buttons, not links)

### Files Changed
- `src/pages/EmkostiPage.tsx` — rewrite lines 303-341 (subcategories section) to use buttons + inline detail card instead of Link navigation

