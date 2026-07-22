# CONTEXT

Domain and convention notes for this Astro starter. Agents should follow these when writing or reviewing markup.

## Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/): a lowercase `type:` prefix followed by a concise, lowercase, imperative summary.

```
<type>: <summary>
```

Types in use: `feat:`, `fix:`, `docs:`, `build:`, `style:`, `chore:`, `refactor:`. Keep the summary short and in the imperative mood (e.g. `docs: add layout and spacing conventions`).

## Layout & spacing

Every top-level region uses a **two-element pattern**:

```
<section class="px-page">          ← OUTER: full-bleed, owns HORIZONTAL padding
  <div class="contained py-…">     ← INNER: max-width + centering, owns VERTICAL padding
    …content…
  </div>
</section>
```

- **Outer element** (`<section>` / `<footer>` / a wrapping `<div>` for the nav) is full-bleed and owns the **horizontal** padding via `px-page`. This guarantees a side gutter at every screen size so content never touches the edge.
- **Inner element** always carries `.contained` and owns the **vertical** padding via `py-*`.

### `.contained`

Defined in `src/styles/global.css` as `max-w-container mx-auto` → caps width at `--spacing-container` (**90rem**) and centers it. `px-page` acts as a **minimum** side gutter on small/medium screens; once the viewport exceeds 90rem, `mx-auto` absorbs the surplus and handles large screens. Use `.contained` on the inner element — never set a max-width ad hoc.

### Which token goes where

| Axis | Class | Lives on |
| --- | --- | --- |
| Horizontal | `px-page` (`--spacing-page`) | Outer, full-bleed element |
| Vertical (regions) | `py-section-{sm,md,lg}` (`--spacing-section-*`) | Inner `.contained` element |
| Vertical (smaller blocks) | `py-el-*` (`--spacing-el-*`) | Inner `.contained` element |

Spacing tokens are defined in the `@theme` block of `src/styles/global.css`.

### Fluid vs. fixed spacing

- The `page`, `section-*`, `el-*`, and `gutter` spacing variables are **fluid** (`clamp()` scaling from 640px → 1024px). Prefer these tokens over raw Tailwind spacing for anything that should scale with the viewport.
- **The navbar deliberately uses a fixed `py-4`, not a fluid `el-*` token** — the nav wants a stable, fixed height across breakpoints. This is intentional; do not "correct" it to a fluid token.

### Per-component reference

- `src/pages/index.astro` — canonical form: `<section class="px-page">` → `<div class="contained py-section-sm">`.
- `src/components/Footer.astro` — same shape, plus `mt-auto` (pins footer to the bottom via the `flex min-h-screen flex-col` body in `Layout.astro`); vertical padding is `py-el-lg`.
- `src/components/Navbar.astro` — outer is a plain `<div class="px-page">` wrapping `<nav class="contained …">`; fixed `py-4` (see above); `gap-gutter` for inter-item spacing; mobile menu uses `p-page` internally.
