#!/usr/bin/env node
// Regenerates inbox/SUBMIT-CHECKLIST.md from inbox/slots.json.
// Source of truth lives in slots.json; the markdown is a human-friendly view.

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const slotsPath = path.join(root, "inbox", "slots.json");
const promptsPath = path.join(root, "data", "prompts.json");
const outPath = path.join(root, "inbox", "SUBMIT-CHECKLIST.md");

if (!fs.existsSync(slotsPath)) {
  console.error(`Not found: ${slotsPath}`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(slotsPath, "utf8"));

// Build a set of "category||title_en" keys for prompts already imported,
// so the checklist can show ✅ next to slots that landed in batch 1.
const importedKeys = new Set();
if (fs.existsSync(promptsPath)) {
  const prompts = JSON.parse(fs.readFileSync(promptsPath, "utf8"));
  for (const item of prompts.items || []) {
    if (item.category && item.title_en) {
      importedKeys.add(`${item.category}||${item.title_en}`);
    }
  }
}

function isImported(slot) {
  return importedKeys.has(`${slot.category}||${slot.title_en}`);
}

// Group slots by category, preserving the order they appear in slots.json.
const groups = [];
const groupIndex = new Map();
for (const slot of data.slots) {
  if (!groupIndex.has(slot.category)) {
    groupIndex.set(slot.category, groups.length);
    groups.push({ category: slot.category, slots: [] });
  }
  groups[groupIndex.get(slot.category)].slots.push(slot);
}

const CATEGORY_LABELS = {
  "e-commerce": "🛒 E-commerce & Product",
  "ad-creative": "📢 Ad Creative",
  "character-design": "🧝 Character Design",
  "portrait-photography": "📸 Portrait & Photography",
  "poster-illustration": "🏙️ Poster & Illustration",
  "ui-social": "📱 UI & Social Mockups",
};

const doneCount = data.slots.filter(isImported).length;
const todoCount = data.slots.length - doneCount;

const lines = [];
lines.push("# Submit checklist");
lines.push("");
lines.push("> **Generated** from `inbox/slots.json` and `data/prompts.json`. Do not edit by hand — run `node scripts/build-checklist.mjs` after changing a prompt or after importing a batch.");
lines.push("");
lines.push(`Total slots: **${data.slots.length}** · Done: **${doneCount}** · Todo: **${todoCount}**.`);
lines.push("");
lines.push("Workflow: pick an open slot → copy the prompt → generate at the aspect ratio shown → save as `inbox/images/<slot-id>.jpg|png|webp` → run `node scripts/import-inbox.mjs`. Slots that are already imported into `data/prompts.json` show ✅.");
lines.push("");
lines.push("---");
lines.push("");

for (const group of groups) {
  const label = CATEGORY_LABELS[group.category] || group.category;
  const groupDone = group.slots.filter(isImported).length;
  lines.push(`## ${label} (${groupDone} / ${group.slots.length} done)`);
  lines.push("");
  for (const slot of group.slots) {
    const done = isImported(slot);
    const marker = done ? "✅" : "🕒";
    lines.push(`### ${marker} \`${slot.id}\` — ${slot.title_en}`);
    if (slot.title_zh) lines.push(`*${slot.title_zh}*`);
    lines.push("");
    if (done) {
      lines.push(`- [x] Already imported into \`data/prompts.json\`.`);
    } else {
      lines.push(`- [ ] Generated and saved as \`inbox/images/${slot.id}.jpg\` (or .png / .webp)`);
    }
    lines.push(`- Aspect ratio: \`${slot.aspect_ratio}\``);
    lines.push("");
    lines.push("**Prompt:**");
    lines.push("");
    lines.push("```");
    lines.push(slot.prompt);
    lines.push("```");
    lines.push("");
  }
  lines.push("---");
  lines.push("");
}

fs.writeFileSync(outPath, lines.join("\n") + "\n");
console.log(`Wrote ${path.relative(root, outPath)} with ${data.slots.length} slots across ${groups.length} categories (${doneCount} done, ${todoCount} todo).`);
