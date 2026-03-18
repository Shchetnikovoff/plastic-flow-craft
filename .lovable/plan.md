

## Plan: Unified Image Scaling Across All Pages

**Problem**: Images on most pages use fixed heights (`h-56`, `h-48`, `h-40`, `h-64`) with `object-cover`, which crops them. The FFU page was already fixed to use `object-contain` without fixed height — now all other pages need the same treatment.

**Change**: Replace `h-XX object-cover` with `object-contain` on all `<img>` tags across 17 page files, so images display in full without cropping, matching the FFU page style.

**Files to modify** (17 files, ~168 occurrences):

| File | Matches |
|------|---------|
| `GalvanikaPage.tsx` | hero images |
| `VodopodgotovkaPage.tsx` | hero images |
| `LabMebelPage.tsx` | hero images |
| `GazoochistkaSkrubbery.tsx` | hero + tab images |
| `VodoochistkaLos.tsx` | product grid |
| `GazoochistkaPage.tsx` | hero images |
| `GidrometallurgiyaPage.tsx` | hero images |
| `ShkafyUpravleniyaPage.tsx` | hero images |
| `Vodoochistka.tsx` | hero images |
| `ReaktoryPage.tsx` | hero images |
| `KnsPage.tsx` | hero images |
| `VentilyatsiyaPage.tsx` | hero images |
| `UslugiPage.tsx` | hero images |
| `EmkostiPodzemnye.tsx` | product grid |
| `EmkostiPryamougolnye.tsx` | product grid + material tabs |
| `EmkostiPozharnye.tsx` | product grid |
| `VodoochistkaZhirouloviteli.tsx` | hero image |

**Pattern** (same as FFU fix):
- Remove fixed height classes (`h-56`, `h-48`, `h-40`, `h-36`, `h-64`)
- Change `object-cover` → `object-contain`
- Images will auto-size to their natural aspect ratio within their containers

**Technical note**: For inline images in flex layouts (e.g. `GazoochistkaSkrubbery.tsx` tab content with `sm:w-48 h-36`), the fixed width will be kept but height constraint removed and `object-contain` applied.

