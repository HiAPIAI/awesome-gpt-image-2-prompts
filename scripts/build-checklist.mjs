#!/usr/bin/env node
// Regenerates inbox/SUBMIT-CHECKLIST.md from inbox/slots.json.
// Source of truth lives in slots.json; the markdown is a human-friendly view.

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const slotsPath = path.join(root, "inbox", "slots.json");
const outPath = path.join(root, "inbox", "SUBMIT-CHECKLIST.md");

if (!fs.existsSync(slotsPath)) {
  console.error(`Not found: ${slotsPath}`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(slotsPath, "utf8"));

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

const lines = [];
lines.push("# Submit checklist");
lines.push("");
lines.push("> **Generated** from `inbox/slots.json`. Do not edit by hand — run `node scripts/build-checklist.mjs` after changing a prompt.");
lines.push("");
lines.push(`Total slots: **${data.slots.length}**.`);
lines.push("");
lines.push("Workflow: pick a slot → copy the prompt → generate at the aspect ratio shown → save as `inbox/images/<slot-id>.jpg|png|webp` → run `node scripts/import-inbox.mjs`.");
lines.push("");
lines.push("---");
lines.push("");

for (const group of groups) {
  const label = CATEGORY_LABELS[group.category] || group.category;
  lines.push(`## ${label} (${group.slots.length})`);
  lines.push("");
  for (const slot of group.slots) {
    lines.push(`### \`${slot.id}\` — ${slot.title_en}`);
    if (slot.title_zh) lines.push(`*${slot.title_zh}*`);
    lines.push("");
    lines.push(`- [ ] Generated and saved as \`inbox/images/${slot.id}.jpg\` (or .png / .webp)`);
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
console.log(`Wrote ${path.relative(root, outPath)} with ${data.slots.length} slots across ${groups.length} categories.`);
