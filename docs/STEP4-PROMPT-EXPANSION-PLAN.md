# Step 4 — Prompt Expansion Plan (118 → ~189)

> Status: batch 1 complete — 35 images generated and imported locally on 2026-05-26
> Target: +71 high-intent prompts across 8 categories
> Source: cross-repo SEO/GEO plan, codex second-opinion modification (see `hiapi-content-lab/docs/github-repos-seo-geo-2026-05-26.md`)
> Progress: `e-commerce` 20 / 20 complete; `ad-creative` 15 / 15 complete; remaining planned follow-up slots: 36

## Why this shape

Audit of the existing 118 prompts surfaced three gaps:

1. **Commercial intent under-represented.** 40 / 118 are `poster-illustration` (33%) and 4 entries with the word "ad" are diluted inside that bucket. Searches like "GPT Image 2 e-commerce", "product photography prompt", "ad creative" land on nothing here.
2. **1:1 aspect ratio scarce.** Only 8 / 118 are 1:1 — the dominant e-commerce / Instagram format.
3. **`character-design` thin** (7 entries) compared to `poster-illustration` (40) and `ui-social` (21).

The expansion adds two new categories (`e-commerce`, `ad-creative`) and rebalances the others so the gallery covers paid-traffic search queries, not just creative exploration.

## New shape after expansion

| Category | Before | New | After |
|---|---:|---:|---:|
| `e-commerce` (new) | 0 | **20** | 20 |
| `ad-creative` (new) | 0 | **15** | 15 |
| `character-design` | 7 | +10 | 17 |
| `portrait-photography` | 18 | +8 | 26 |
| `poster-illustration` | 40 | +8 | 48 |
| `ui-social` | 21 | +10 | 31 |
| `comparison-community` | 15 | 0 | 15 |
| `community-reference` | 17 | 0 | 17 |
| **Total** | **118** | **+71** | **189** |

## Selection criteria for every new entry

Hard rules (any violation → reject):

- Real generated output (no placeholder, no AI-rewrite of someone else's image)
- Full prompt that reproduces the result on HiAPI `gpt-image-2`
- Aspect ratio is one of `1:1`, `16:9`, `9:16`, `3:4`, `4:3`
- English title required, Chinese title strongly preferred
- Attribution: `@hiapi` if we generated it from scratch, original handle + source URL if community-sourced

Quality bar (soft, but enforced at PR):

- Recognisable subject within 3 seconds (no abstract noise)
- Text rendering correct if text is part of the design
- No watermarks, no plastic skin, no AI-typical hand artefacts

## Topic list

Each line below is one prompt slot. Format:
`#NN [ratio] Title — short visual angle`

### 🛒 `e-commerce` (20)

1. `[1:1] Cream Skincare Bottle on Travertine` — minimalist studio still life, soft shadow, beige palette
2. `[1:1] Floating Sneaker on Pastel Gradient` — split lighting, levitating subject, gradient backdrop
3. `[1:1] Sushi Platter Top-Down with Chopsticks` — overhead grid, dark wood, garnish symmetry
4. `[1:1] Espresso Cup on Marble with Coffee Beans` — golden hour window light, single specular highlight
5. `[1:1] Glass Perfume Bottle in Cubic Light Shafts` — black background, hard edge reflections
6. `[1:1] Wireless Earbuds on Folded Towel` — Apple-style minimal product hero
7. `[4:3] Holiday Gift Box Stack` — seasonal red/green palette, ribbon detail, premium retail vibe
8. `[1:1] Lipstick Lineup on Velvet Tray` — beauty lineup, jewel tones, magazine layout
9. `[4:3] Linen Shirt Folded on Wood Surface` — Muji-style flat-lay
10. `[1:1] Ceramic Mug with Steam` — Notion / SaaS lifestyle still
11. `[9:16] Model Try-On — Oversized Linen Blazer` — street, golden hour, half-body crop
12. `[9:16] Model Try-On — Vintage Denim Jacket` — neutral wall, full-body, editorial film grain
13. `[1:1] Vegan Snack Bar Hero on Wooden Slat` — packaging mock-up, ingredient scatter
14. `[1:1] Whisky Bottle on Dark Bar with Bokeh` — moody product, soft halo backlight
15. `[1:1] Cold Brew Bottle in Ice Bath` — refreshing texture, condensation, blue cast
16. `[1:1] Hand Cream Tube with Botanical Sprig` — natural cosmetics, soft pastel palette
17. `[1:1] Smartwatch on Wrist with Forest Bokeh` — outdoor lifestyle, depth of field
18. `[1:1] Mooncake Gift Box Open Reveal` — Mid-Autumn festival, gold + crimson, traditional pattern
19. `[1:1] Premium Tea Tin Lifestyle` — Eastern minimalist, ceramic teapot, steam
20. `[1:1] Stationery Bundle Flat-Lay` — back-to-school, pastel palette, organised grid

### 📢 `ad-creative` (15)

21. `[9:16] Vertical Billboard — AI Coding Assistant Launch` — bold serif headline, single product render
22. `[16:9] Banner — Black Friday 70% Off Headphones` — split layout, percentage giant, product silhouette
23. `[9:16] Pre-Roll Frame — Eco Detergent Hero` — green palette, water splash, brand mark bottom-third
24. `[1:1] Social Square — App Update Announcement` — flat illustration, app icon, two-line headline
25. `[9:16] Story Ad — Fitness App Onboarding` — phone mock-up, gradient bg, CTA button
26. `[1:1] Square — SaaS Free Trial Offer` — minimalist, gradient mesh, generous whitespace
27. `[16:9] Hero — Electric Car Launch Cinematic` — film grain, low-angle, lens flare
28. `[9:16] Vertical — Coffee Chain Holiday Drink` — seasonal cup, snow particles, brand red
29. `[1:1] Square — Online Course Pre-Sale` — instructor portrait inset, headline curve typography
30. `[9:16] Story — Sneaker Drop Countdown` — neon overlay, product close-up
31. `[16:9] Banner — Investment App "Get Started" CTA` — chart line subtle bg, large CTA button
32. `[1:1] Square — Streaming Series Promo Frame` — character backlit silhouette, tagline italic
33. `[9:16] Vertical — Bubble Tea Summer Menu` — fruit explosion, vibrant red/orange
34. `[1:1] Square — Donation Campaign Visual` — single hand-drawn icon, large pledge headline
35. `[16:9] Web Banner — AI Image API "Try Free"` — gradient mesh, code snippet inset

### 🧝 `character-design` (+10, total 17)

36. `[16:9] Cyberpunk Bounty Hunter — Three-Quarter View` — neon-lit alley, kit detail, faction badge
37. `[9:16] Fantasy Druid Half-Body Portrait` — leaf armour, antler crown, forest bokeh
38. `[16:9] Sci-Fi Mech Pilot Full-Body Sheet` — front + side + back, technical drawing layout
39. `[9:16] Anime School Idol Concept Frame` — cherry blossom, uniform variants, expression strip
40. `[1:1] Cozy Bakery Owner Character Sticker` — chibi style, two pose options, transparent bg
41. `[16:9] Post-Apocalyptic Scavenger — Environment Hero` — dust, layered clothing, debris foreground
42. `[9:16] Detective Noir Half-Body — Cinematic` — low-key lighting, fedora silhouette, smoke
43. `[16:9] High-Fantasy Elf Archer — Action Pose` — drawing arrow, forest backdrop, motion blur
44. `[1:1] Mascot — Friendly Robot Coffee Barista` — clean isometric, brand-ready
45. `[9:16] Cottagecore Witch Apothecary Scene` — herbs, jars, warm interior

### 📸 `portrait-photography` (+8, total 26)

46. `[3:4] Editorial Female Portrait — Bauhaus Studio` — primary colours, geometric shadows
47. `[9:16] Street Portrait — Tokyo Shibuya Rain Night` — neon reflections, vertical phone-shot framing
48. `[3:4] Documentary-Style Chef Mid-Action` — kitchen heat, motion blur, candid expression
49. `[9:16] Skater Portrait — Half Pipe Backlight` — dust, low-sun rim light, kinetic
50. `[3:4] CEO Headshot — Modern Corporate` — natural window light, simple grey backdrop
51. `[9:16] Festival Portrait — Holi Color Powder` — bright primary, mid-action splash, joy expression
52. `[3:4] Athlete Portrait — Boxing Gym Sweat Detail` — dramatic Rembrandt lighting
53. `[16:9] Couple Portrait — Autumn Forest Path` — golden hour, walk-away framing

### 🏙️ `poster-illustration` (+8, total 48)

54. `[9:16] Lisbon Tram Spring Travel Poster` — pastel buildings, vintage typography
55. `[9:16] Kyoto Bamboo Forest Minimalist Poster` — single tone palette, large negative space
56. `[16:9] Tech Conference Keynote Poster` — gradient mesh, speaker silhouette
57. `[9:16] Indie Coffee Roastery Poster` — risograph texture, hand-drawn typography
58. `[9:16] City Marathon Event Poster` — bold runner silhouette, route line motif
59. `[9:16] Music Festival Headliner Poster` — duotone, large headline, lineup small print
60. `[9:16] Wine Tasting Event Poster` — botanical illustration, serif headline
61. `[9:16] Bookstore Anniversary Poster` — stacked books, warm interior glow

### 📱 `ui-social` (+10, total 31)

62. `[9:16] App Onboarding Screen — Wellness Tracker` — gradient, illustration, single CTA
63. `[9:16] Notion Template Cover — Project Tracker` — minimalist, soft palette, real layout
64. `[16:9] Twitter Thread Cover Card — AI Weekly Recap` — bold serif headline, screenshot inset
65. `[9:16] iOS Lock Screen Concept — Stoic Quote of the Day` — minimalist, soft gradient
66. `[9:16] Podcast Episode Cover Frame` — host portrait + episode number + show logo
67. `[1:1] Open Source Project README Hero` — repo name, tagline, abstract code geometry bg
68. `[9:16] Mobile Banking App Dashboard Mock` — fintech blue palette, chart, balance card
69. `[1:1] Newsletter Header Illustration — Tech Bulletin` — flat editorial, vector style
70. `[9:16] AI Chat App First-Run Screen` — conversation bubble, sample question chips
71. `[9:16] Music Player Now-Playing Screen` — album cover, gradient bg from cover

---

## Estimated cost (if we generate everything ourselves)

GPT Image 2 standard quality, 1K resolution: **$0.03 per image**.

| Attempt rate | Cost |
|---|---:|
| Best case (1 try per slot, 71 images) | ~$2.13 |
| Realistic (avg 2 tries per slot, 142 images) | ~$4.26 |
| Worst case (avg 3 tries per slot, 213 images) | ~$6.39 |

Time estimate: 30-60s per image generated by `gpt-image-2`. Sequential 71 prompts ≈ 1 hour wall clock; parallel 10-wide ≈ 7-10 minutes.

## Execution options

1. **AI generation, end-to-end.** Use `hiapi-gpt-image-2-skill` or direct `POST /v1/chat/completions` against `gpt-image-2` with the prompts derived from this list. Cost ≤ $10. Maintainer reviews each output, accepts / regenerates / discards.
2. **Community + AI hybrid.** Open 71 issues using `submit-a-prompt.yml`, invite the existing `@hiapi_ai` audience to claim slots, AI fills the unclaimed ones.
3. **Hold and review.** Don't generate yet; circulate this plan, refine the list with the team, then start.

Default recommendation: **option 1**, gated on the maintainer's approval of this plan and an explicit "go" with API key access. The output of each batch lands in `data/prompts.json` + `images/<category>_caseN/output.jpg` and goes through the existing `validate.mjs` + `build-readme.mjs` + the new CI sync check, so no quality regression on the build side is possible.

## Acceptance for this plan document

This document is "done" once:

- [x] Two new categories (`e-commerce`, `ad-creative`) added to `data/prompts.json` `categories` array
- [x] Maintainer (you) approves the topic list or hands back a revised list
- [x] An execution path is chosen (option 1 / 2 / 3 above)
- [x] Batch 1 generated with Codex built-in `image_gen`, imported through `node scripts/import-inbox.mjs`, and rebuilt into README + case pages

Batch 1 is now in the local git history target set. The remaining Step 4 follow-up is the planned +36 batch across `character-design`, `portrait-photography`, `poster-illustration`, and `ui-social`.
