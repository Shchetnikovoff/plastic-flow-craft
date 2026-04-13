

## Plan: Align KNS SVT table section with KNS PP

### What changes
The KNS SVT table is already structurally identical to KNS PP. The only missing element is the helper note below the table.

### Change

**`src/pages/KnsSvtPage.tsx`** — Add the note paragraph after the closing `</div>` of the table (after line 106):

```tsx
<p className="text-xs text-muted-foreground mt-3">Изготовление КНС нестандартных размеров — по запросу. Свяжитесь с нами для расчёта.</p>
```

One line addition, no other changes needed.

