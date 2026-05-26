#!/usr/bin/env node
// Scans inbox/images/ for files named <slot-id>.{jpg,jpeg,png,webp},
// matches them to entries in inbox/slots.json, moves the images into
// images/<category>_case<N>/output.<ext>, appends to data/prompts.json,
// and triggers the build-readme step.
//
// Designed to be re-runnable. If an image for a slot is already imported
// (its id exists in prompts.json), it is skipped with a warning.

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const slotsPath = path.join(root, "inbox", "slots.json");
const promptsPath = path.join(root, "data", "prompts.json");
const inboxImagesDir = path.join(root, "inbox", "images");
const imagesRoot = path.join(root, "images");

function fail(msg) {
  console.error(`❌ ${msg}`);
  process.exit(1);
}

if (!fs.existsSync(slotsPath)) fail(`Not found: ${slotsPath}`);
if (!fs.existsSync(promptsPath)) fail(`Not found: ${promptsPath}`);
if (!fs.existsSync(inboxImagesDir)) {
  console.log(`No inbox/images/ directory — nothing to import.`);
  process.exit(0);
}

const slots = JSON.parse(fs.readFileSync(slotsPath, "utf8"));
const prompts = JSON.parse(fs.readFileSync(promptsPath, "utf8"));

const slotById = new Map(slots.slots.map((s) => [s.id, s]));
const validCategories = new Set(prompts.categories.map((c) => c.id));

// Discover candidate files.
const allowedExt = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const candidates = fs
  .readdirSync(inboxImagesDir)
  .filter((name) => allowedExt.has(path.extname(name).toLowerCase()))
  .map((name) => ({
    file: name,
    fullPath: path.join(inboxImagesDir, name),
    slotId: path.basename(name, path.extname(name)),
    ext: path.extname(name).toLowerCase(),
  }));

if (candidates.length === 0) {
  console.log(`No image files in inbox/images/ — nothing to import.`);
  process.exit(0);
}

// Build a "slot id -> generated id we will assign in prompts.json" map
// so the case_number stays contiguous within a category.
function nextCaseNumberFor(category) {
  const used = prompts.items
    .filter((it) => it.category === category)
    .map((it) => it.category_case_number || 0);
  return used.length === 0 ? 1 : Math.max(...used) + 1;
}

const existingSlotIds = new Set(
  prompts.items
    .map((it) => it.id)
    .filter(Boolean)
);

let imported = 0;
let skipped = 0;
let errors = 0;

for (const cand of candidates) {
  const slot = slotById.get(cand.slotId);
  if (!slot) {
    console.warn(`⚠️  Skipping ${cand.file}: no matching slot \`${cand.slotId}\` in inbox/slots.json.`);
    skipped++;
    continue;
  }
  if (!validCategories.has(slot.category)) {
    console.error(`❌ Slot ${slot.id} declares category \`${slot.category}\` which is not in prompts.json categories. Add it first.`);
    errors++;
    continue;
  }

  // Build the final image path. Use the same naming convention
  // already used in this repo: images/<category-with-underscores>_case<N>/output.<ext>.
  // The category folder convention in this repo varies (e.g. portrait_case1, poster_case1),
  // so we mirror that by snake-casing the category id and appending caseN.
  const caseNumber = nextCaseNumberFor(slot.category);
  const categoryPrefix = slot.category.replace(/-/g, "_");
  const targetDir = path.join(imagesRoot, `${categoryPrefix}_case${caseNumber}`);
  const targetFile = path.join(targetDir, `output${cand.ext}`);
  const relativeImagePath = path.relative(root, targetFile);

  // Compose the new prompts.json entry.
  const entryId = `${slot.category}-case-${caseNumber}-${slugify(slot.title_en)}`;
  if (existingSlotIds.has(entryId)) {
    console.warn(`⚠️  Skipping ${cand.file}: entry id \`${entryId}\` already in prompts.json.`);
    skipped++;
    continue;
  }

  const entry = {
    id: entryId,
    category: slot.category,
    category_case_number: caseNumber,
    title_en: slot.title_en,
    title_zh: slot.title_zh || slot.title_en,
    source_url: slot.source_url || slots.default_source_url,
    author: slot.author || slots.default_author,
    author_url: slot.author_url || `https://x.com/${(slot.author || slots.default_author).replace(/^@/, "")}`,
    image: relativeImagePath,
    aspect_ratio: slot.aspect_ratio,
    prompt_language: detectLanguage(slot.prompt),
    prompt: slot.prompt,
  };

  // Move image into place.
  fs.mkdirSync(targetDir, { recursive: true });
  fs.renameSync(cand.fullPath, targetFile);

  prompts.items.push(entry);
  existingSlotIds.add(entryId);
  imported++;
  console.log(`✅ ${cand.file} → ${relativeImagePath} (slot \`${slot.id}\`, case #${caseNumber})`);
}

if (imported === 0) {
  console.log(`\nNothing imported. ${skipped} skipped, ${errors} errors.`);
  process.exit(errors > 0 ? 1 : 0);
}

// Persist prompts.json with stable 2-space indent + trailing newline.
fs.writeFileSync(promptsPath, JSON.stringify(prompts, null, 2) + "\n");
console.log(`\n📝 Updated ${path.relative(root, promptsPath)} (+${imported} entries).`);

// Re-run build.
console.log(`\n🔨 Rebuilding README + case pages...`);
try {
  execSync(`node scripts/build-readme.mjs`, { cwd: root, stdio: "inherit" });
} catch (err) {
  console.error(`build-readme.mjs failed — review prompts.json manually.`);
  process.exit(1);
}

console.log(`\nDone. ${imported} imported, ${skipped} skipped, ${errors} errors.`);
console.log(`Next: run \`node scripts/validate.mjs\`, review \`git diff\`, then commit in a small batch.`);

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function detectLanguage(text) {
  // Naive: if 30%+ of characters are CJK, call it zh; otherwise en.
  const cjk = (text.match(/[一-鿿]/g) || []).length;
  return cjk / text.length > 0.3 ? "zh" : "en";
}
