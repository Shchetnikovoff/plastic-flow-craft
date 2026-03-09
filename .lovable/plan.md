

## Plan: Fix horizontal scroll reset on category tab click

### Problem
When clicking a category tab (e.g., "Услуги") in the desktop horizontal navigation bar, the page navigates to a new route. This causes the Header to re-render and the horizontal scroll container (`overflow-x-auto`) resets to the beginning, hiding the clicked tab.

### Solution
Add a `useEffect` that scrolls the active category tab into view whenever the route changes. This keeps the clicked tab visible in the scrollbar.

### Changes

**File: `src/components/Header.tsx`**

1. Add a ref to the scrollable container (`scrollContainerRef`)
2. Add a `useEffect` that, on `location.pathname` change, finds the active category element and calls `scrollIntoView({ inline: "center", block: "nearest", behavior: "instant" })` on it
3. Add `data-cat-slug` attributes to each category `<div>` for easy lookup

Roughly 10 lines of new code, no structural changes.

