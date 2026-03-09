

## Plan: Fix tab scroll position reset on navigation

### Problem
The desktop category navigation bar (line 127 in `Header.tsx`) uses `overflow-x-auto` for horizontal scrolling. When clicking a tab (like КНС or tabs further right), the page navigates to a new route, the component re-renders, and the scroll position of the nav container resets to 0 — forcing users to scroll right again.

### Solution
After render, scroll the active tab into view using `scrollIntoView()` on the active category link. This way, when a new route loads, the nav bar automatically scrolls to show the selected tab.

### Changes in `src/components/Header.tsx`
1. Add a `useEffect` that runs when `location.pathname` changes
2. Find the active tab element inside the nav container (the one with `border-primary`)
3. Call `element.scrollIntoView({ inline: "center", behavior: "instant" })` to center the active tab in the scrollable area without animation jank

This is a ~10-line change in a single file.

