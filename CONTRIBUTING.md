# Contributing

Thanks for considering a contribution. This repository is a curated **GPT Image 2 prompt gallery** — every entry has a real output image, a runnable prompt, and clear attribution.

## What kind of contribution we accept

- ✅ **New prompts with real output images.** Your own generations are best. Community references are OK if the original creator is credited and the link is preserved.
- ✅ **Better attribution.** Fixing a missing creator handle, a broken source link, or a license note.
- ✅ **README / docs improvements.** Typos, clearer wording, missing translations.
- ❌ **AI-generated text without verified output.** Prompts that have never produced a real image will be closed.
- ❌ **Re-uploads of someone else's prompts without credit.** We mirror attribution; we don't strip it.

## Submit a new prompt

The fastest path is the [Submit a prompt issue template](https://github.com/HiAPIAI/awesome-gpt-image-2-prompts/issues/new?template=submit-a-prompt.yml). It asks for everything we need (prompt text, model, aspect ratio, output image, attribution) and a maintainer will turn it into a PR.

If you prefer to send a PR directly:

1. Fork the repo.
2. Add a new entry to `data/prompts.json` following the existing structure (`title_en`, `title_zh`, `category`, `prompt`, `ratio`, `image`, `source_url`, `author`).
3. Drop the output image into `images/<category>_caseN/output.{jpg,webp,png}`. Use the smallest size that stays visually crisp (≤ 250 KB ideal).
4. Run `node scripts/validate.mjs` then `node scripts/build-readme.mjs` to regenerate README + case pages.
5. Open a PR. Use the format `prompt: <short title>` in the title.

## Quality bar

- **Real output, not promises.** Each entry must include a real generated image.
- **Reproducible.** A reader pasting the prompt into HiAPI with the listed model + ratio should get a visually similar result.
- **Attribution preserved.** If the prompt or image originated elsewhere, link the source and the creator handle. We never strip credit.
- **English first, Chinese welcome.** Either `title_en` or `title_zh` is required; both is better.

## What happens after you submit

- We check the output image is real and the attribution is correct.
- We may tighten the prompt wording or move it to a better category.
- We squash and merge with the original author credited in the commit trailer.

## Reporting problems

Open an issue with the case ID (e.g. `portrait-case-3`) and what's wrong. We treat broken attribution as a P1.

## Code of conduct

Be kind. We're all here to learn what GPT Image 2 can actually do, not to score points.
