# Batch generation inbox

This folder is the **landing strip** for the Step 4 prompt expansion. You run prompts in your generator of choice (Codex desktop, OpenAI Platform API, HiAPI API, etc.), drop the rendered images here under the agreed file names, and a script picks them up.

## Files

- `slots.json` — **source of truth**. 35 prompt slots (20 e-commerce + 15 ad-creative), each with `id`, `category`, `title_en`, `title_zh`, `aspect_ratio`, full `prompt` text.
- `SUBMIT-CHECKLIST.md` — human-readable view of `slots.json`, grouped by category, with copy-friendly prompt blocks and a checkbox to track what's done. **Generated** from `slots.json` via `node scripts/build-checklist.mjs`. Do not edit by hand.
- `images/` — drop your rendered images here named `<slot-id>.jpg|png|webp` (e.g. `ecom-01.jpg`, `ad-07.png`). The import script reads filenames to match slots.

## Workflow

1. **Open** `SUBMIT-CHECKLIST.md`. Pick a slot. Copy the full prompt.
2. **Generate** the image in Codex desktop (or any generator that uses GPT Image 2). Set the aspect ratio the slot asks for.
3. **Save** the output as `inbox/images/<slot-id>.<ext>` — for example `inbox/images/ecom-01.jpg`.
4. **Repeat** until you have all 35, or any contiguous batch.
5. **Run** `node scripts/import-inbox.mjs`. It will:
   - Match each file in `inbox/images/` to a slot in `slots.json`
   - Move the image to `images/<category>_case<N>/output.<ext>`
   - Write a new entry into `data/prompts.json` with the right metadata
   - Run `node scripts/build-readme.mjs` to refresh README + case pages
6. **Verify** with `npm test` (validate.mjs) and `git diff` — should look like new `data/prompts.json` entries + new images + regenerated README and case pages.
7. **Commit** in batches of 5-10 prompts. Easier to review, easier to revert.

## File naming rules

- Format: `<slot-id>.<jpg|png|webp>` — e.g. `ecom-01.jpg`, `ad-13.png`.
- One file per slot. If you generate multiple takes, keep the best one and rename it to the slot id.
- Anything else in `inbox/images/` (`.DS_Store`, draft renders, etc.) is ignored by the import script and not committed.

## Attribution

`slots.json` sets `default_author` to `@hiapi_ai`. If the prompt or the rendered image came from a community source, edit `slots.json` to override `author` and `source_url` on that specific slot **before** running the import script.

## When you're done with the 35

Once batch 1 lands cleanly, we move to batch 2: 36 more prompts to refill the existing 6 categories (`character-design` +10, `portrait-photography` +8, `poster-illustration` +8, `ui-social` +10). That brings the gallery from 118 to ~189.

## Notes for AI generators (Codex desktop / OpenAI / HiAPI / etc.)

- Aspect ratios in `slots.json` use the GPT Image 2 convention: `1:1`, `4:3`, `9:16`, `16:9`. Translate to the generator's UI as needed.
- Every prompt already ends with negative guidance (`no logo, no watermark`). Don't strip those.
- If a generation comes back with mangled text rendering, regenerate — text rendering quality is what we're showcasing.

## When to delete this folder

After all 71 expansion slots are landed and the plan in `docs/STEP4-PROMPT-EXPANSION-PLAN.md` is moved to `docs/archive/`, this `inbox/` folder can go too. It's a temporary loading bay, not a permanent part of the gallery.
