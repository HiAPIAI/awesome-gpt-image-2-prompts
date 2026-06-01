# CODEX-RUN — Batch 2 image generation

> **For the Codex agent**: read this file top to bottom and execute it. This file is the only thing you need.

The goal: generate 36 images for this repo (one per remaining slot), import them, commit, and push.

---

## 1. Get the repo

If you don't already have it locally:

```bash
git clone https://github.com/HiAPIAI/awesome-gpt-image-2-prompts.git
cd awesome-gpt-image-2-prompts
```

If you already have it, `cd` to the repo root and `git pull` first.

Confirm push works (HiAPIAI org write access is required):

```bash
gh auth status   # if not signed in: `gh auth login`
```

---

## 2. The 36 slots

Open `inbox/slots.json`. Take every slot whose `category` is one of:

- `character-design` (10 slots — ids `char-01` … `char-10`)
- `portrait-photography` (8 slots — ids `port-01` … `port-08`)
- `poster-illustration` (8 slots — ids `post-01` … `post-08`)
- `ui-social` (10 slots — ids `uisoc-01` … `uisoc-10`)

That is **36 slots total**. The other slots (`ecom-*` and `ad-*`) are already imported from batch 1 — leave them alone.

You can also read the human-friendly view: `inbox/SUBMIT-CHECKLIST.md`. Slots already imported are marked ✅; the 36 you need to do are marked 🕒.

---

## 3. Generate

For each of the 36 slots, in id order
(char-01 → char-10 → port-01 → port-08 → post-01 → post-08 → uisoc-01 → uisoc-10):

1. Call your built-in GPT Image 2 generator with:
   - the slot's `prompt` field — **verbatim, do not edit a single word**
   - the slot's `aspect_ratio` field — one of `1:1`, `3:4`, `9:16`, `16:9`
2. Save the result inside the repo as:
   ```
   inbox/images/<slot-id>.png
   ```
   Examples: `inbox/images/char-01.png`, `inbox/images/uisoc-10.png`. PNG is preferred; JPG or WebP also accepted as long as the slot-id is the filename stem.

### Quality bar

If GPT Image 2 returns something obviously broken — gibberish text on a clean poster, mangled hands on a character sheet, wrong aspect ratio, blurred mess — regenerate up to **2 more attempts**. If still bad after 3 attempts total, **skip** that slot and remember its id for the final report. Do not save broken outputs.

---

## 4. Import + rebuild

Once you're done generating (whether you finished all 36 or skipped a few), from the repo root run:

```bash
node scripts/import-inbox.mjs
node scripts/validate.mjs
```

`import-inbox.mjs` moves each `inbox/images/<slot-id>.png` into `images/<category>_caseN/output.png`, appends a structured entry to `data/prompts.json`, then rebuilds the bilingual READMEs and case pages.

`validate.mjs` confirms `data/prompts.json` is still well-formed.

If validate fails, stop and read the error. Do **not** commit a broken prompts.json.

---

## 5. Commit and push

```bash
git status --short                              # sanity check — what will land
git add data/prompts.json images/ README.md README.zh-CN.md cases/ inbox/SUBMIT-CHECKLIST.md
git commit -m "feat: batch 2 — character/portrait/poster/ui imports"
git push origin main
```

If push fails on auth, run `gh auth login` and retry.

The repo has CI that will run `validate.mjs` + rebuild-and-diff. If it fails after push, look at the run, fix locally, and push again.

---

## 6. Report

When you're done, print one report exactly in this format:

```
Batch 2 complete.
- character-design:        X / 10 saved, Y skipped
- portrait-photography:    X / 8  saved, Y skipped
- poster-illustration:     X / 8  saved, Y skipped
- ui-social:               X / 10 saved, Y skipped
Skipped slot ids: <comma-separated list, or "none">
Commit: <short hash>
CI: <pass | fail | not-yet-run>
```

---

## Hard rules (do not break)

- **Do not edit** any slot's `prompt` text or `aspect_ratio` value.
- **Do not modify** `inbox/slots.json`.
- **Do not commit** `.DS_Store`, editor swap files, or any file outside the expected list in step 5.
- **One image per slot.** If you regenerate, overwrite `inbox/images/<slot-id>.png` in place; don't accumulate multiple takes.
- **Do not push** if `validate.mjs` reported any error or `import-inbox.mjs` exited with non-zero.
- **Do not skip step 4 or step 5.** Generating without importing leaves the repo in an inconsistent state.

---

## If anything is unclear

Stop and write back to the maintainer with the specific question. Don't guess on schema, paths, or rules — the import pipeline is strict and a bad guess will fail CI loudly anyway.
