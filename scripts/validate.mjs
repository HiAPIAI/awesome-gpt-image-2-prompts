#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const promptPath = path.join(root, "data", "prompts.json");

const requiredItemFields = [
  "id",
  "category",
  "category_case_number",
  "case_number",
  "source_case_number",
  "source_title",
  "source_url",
  "title_zh",
  "title_en",
  "author",
  "author_url",
  "image",
  "aspect_ratio",
  "prompt_language",
  "prompt",
];

const forbiddenStrings = [
  ["Evo", "LinkAI"].join(""),
  ["Api", "MartAI"].join(""),
  ["evo", "link", ".ai"].join(""),
  ["api", "mart", ".ai"].join(""),
  ["github.com/", "Evo", "LinkAI"].join(""),
  ["github.com/orgs/", "Api", "MartAI"].join(""),
];

const secretLikePatterns = [
  new RegExp(["(?<![A-Za-z])", "s", "k", "-", "[A-Za-z0-9_-]{20,}"].join("")),
  new RegExp(["g", "hp", "_", "[A-Za-z0-9_]{20,}"].join("")),
  new RegExp(["g", "ho", "_", "[A-Za-z0-9_]{20,}"].join("")),
  new RegExp(["0L13", "XITP0QrlbA1rY2AyEKkABL82oKBAW0hqumuAl0s2e2Ju"].join("")),
];

const allowedDuplicateImagePairs = new Set();

const expectedTotalItems = 101;
const expectedCategoryCounts = new Map([
  ["portrait-photography", 18],
  ["poster-illustration", 40],
  ["character-design", 7],
  ["ui-social", 21],
  ["comparison-community", 15],
]);

const expectedVariantCounts = new Map([
  ["ui-case-5-multi-platform-content-screenshots-by-mrlarus", 4],
  ["ui-case-39-trump-and-kim-livestream-pk-screenshot-by-alanlovelq", 4],
  ["comparison-case-33-multi-concept-battle-poster-set-by-joshesye", 4],
]);

const expectedAspectRatios = new Map([
  ["poster-case-5-2026-spring-guangzhou-city-poster-by-liyueai", "9:16"],
  ["ui-case-5-multi-platform-content-screenshots-by-mrlarus", "9:16"],
  ["ui-case-39-trump-and-kim-livestream-pk-screenshot-by-alanlovelq", "mixed"],
  ["comparison-case-33-multi-concept-battle-poster-set-by-joshesye", "mixed"],
]);

const requiredRightsLanguage = new Map([
  ["README.md", ["original rightsholders", "private", "support@hiapi.ai"]],
  ["README.zh-CN.md", ["原权利人", "非公开个人信息", "support@hiapi.ai"]],
  ["NOTICE.md", ["not a relicensing", "非公开个人信息", "support@hiapi.ai"]],
  ["LICENSE", ["Prompt text", "example images", "original rightsholders"]],
  ["llms.txt", ["not as HiAPI ownership", "non-public profile information", "support@hiapi.ai"]],
]);

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if ([".git", "node_modules"].includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

const data = JSON.parse(fs.readFileSync(promptPath, "utf8"));
const categoryIds = new Set(data.categories.map((category) => category.id));

if (data.model !== "gpt-image-2") {
  fail("data.model must be gpt-image-2");
}

if (!Array.isArray(data.items) || data.items.length !== expectedTotalItems) {
  fail(`Expected ${expectedTotalItems} prompt items, found ${data.items?.length ?? 0}`);
}

for (const [categoryId, expectedCount] of expectedCategoryCounts) {
  const actualCount = data.items.filter((item) => item.category === categoryId).length;
  if (actualCount !== expectedCount) {
    fail(`Expected ${expectedCount} items in ${categoryId}, found ${actualCount}`);
  }
}

const seenIds = new Set();
for (const item of data.items) {
  for (const field of requiredItemFields) {
    if (!(field in item)) {
      fail(`Missing field ${field} in item ${item.id ?? "<unknown>"}`);
    }
  }

  if (seenIds.has(item.id)) {
    fail(`Duplicate id: ${item.id}`);
  }
  seenIds.add(item.id);

  if (!categoryIds.has(item.category)) {
    fail(`Unknown category ${item.category} in item ${item.id}`);
  }

  if (!/^@[\w-]+$/.test(item.author)) {
    fail(`Invalid author handle for ${item.id}: ${item.author}`);
  }

  if (!/^https:\/\/x\.com\/[^/]+\/status\/\d+/.test(item.source_url)) {
    fail(`Invalid source_url for ${item.id}: ${item.source_url}`);
  }

  if (!/^https:\/\/x\.com\/[^/]+/.test(item.author_url)) {
    fail(`Invalid author_url for ${item.id}: ${item.author_url}`);
  }

  if (!Number.isInteger(item.case_number) || item.case_number <= 0) {
    fail(`Invalid case_number for ${item.id}: ${item.case_number}`);
  }

  if (!["zh", "en", "ja", "ko"].includes(item.prompt_language)) {
    fail(`Invalid prompt_language for ${item.id}: ${item.prompt_language}`);
  }

  const imagePath = path.join(root, item.image);
  if (!fs.existsSync(imagePath)) {
    fail(`Missing image for ${item.id}: ${item.image}`);
  } else if (fs.statSync(imagePath).size < 1024) {
    fail(`Image is too small for ${item.id}: ${item.image}`);
  }

  if (typeof item.prompt !== "string" || item.prompt.trim().length < 4) {
    fail(`Item ${item.id} must include a usable prompt`);
  }

  if ("prompt_versions" in item) {
    fail(`Item ${item.id} must not include prompt_versions`);
  }

  if ("source_unavailable" in item) {
    fail(`Item ${item.id} must not include source_unavailable`);
  }
}

const seenPrompts = new Map();
for (const item of data.items) {
  const key = item.prompt.trim();
  if (seenPrompts.has(key)) {
    fail(`Duplicate prompt text between ${seenPrompts.get(key)} and ${item.id}`);
  }
  seenPrompts.set(key, item.id);

  const nonBlankLines = item.prompt.split(/\r?\n/).filter((line) => line.trim());
  const numberedLines = nonBlankLines.filter((line) => /^\s*\d+[、.．)]/.test(line));
  if (numberedLines.length >= 2 && numberedLines.length === nonBlankLines.length && !item.prompt_variants) {
    fail(
      `Item ${item.id} has multiple standalone numbered prompts and must include prompt_variants`
    );
  }

  const expectedVariantCount = expectedVariantCounts.get(item.id);
  if (expectedVariantCount && item.prompt_variants?.length !== expectedVariantCount) {
    fail(`Item ${item.id} must include ${expectedVariantCount} prompt_variants`);
  }

  const expectedAspectRatio = expectedAspectRatios.get(item.id);
  if (expectedAspectRatio && item.aspect_ratio !== expectedAspectRatio) {
    fail(`Item ${item.id} aspect_ratio must be ${expectedAspectRatio}`);
  }

  if (item.prompt_variants) {
    if (!Array.isArray(item.prompt_variants) || item.prompt_variants.length < 2) {
      fail(`Item ${item.id} prompt_variants must contain at least two variants`);
    } else {
      if (item.image !== item.prompt_variants[0].image) {
        fail(`Item ${item.id} gallery image must match the first prompt variant image`);
      }
      const variantImages = new Set();
      for (const variant of item.prompt_variants) {
        if (typeof variant.prompt !== "string" || variant.prompt.trim().length < 4) {
          fail(`Item ${item.id} has an invalid prompt variant`);
        }
        if (typeof variant.image !== "string" || !fs.existsSync(path.join(root, variant.image))) {
          fail(`Item ${item.id} has a missing prompt variant image: ${variant.image}`);
        }
        if (variantImages.has(variant.image)) {
          fail(`Item ${item.id} reuses a prompt variant image: ${variant.image}`);
        }
        variantImages.add(variant.image);
      }
    }
  }
}

const imageHashes = new Map();
for (const item of data.items) {
  const imagePath = path.join(root, item.image);
  const hash = crypto.createHash("sha256").update(fs.readFileSync(imagePath)).digest("hex");
  const existing = imageHashes.get(hash);
  if (existing) {
    const pairKey = [existing.id, item.id].sort().join("|");
    if (!allowedDuplicateImagePairs.has(pairKey)) {
      fail(`Duplicate image file between ${existing.id} and ${item.id}`);
    }
  } else {
    imageHashes.set(hash, item);
  }
}

const textFileExtensions = new Set([".js", ".json", ".md", ".txt", ".svg"]);
const publicFiles = walk(root).filter((file) => {
  const relative = path.relative(root, file);
  return (
    (!relative.startsWith("data/") || relative === "data/prompts.json") &&
    textFileExtensions.has(path.extname(file))
  );
});

for (const file of publicFiles) {
  const content = fs.readFileSync(file, "utf8");
  for (const forbidden of forbiddenStrings) {
    if (content.toLowerCase().includes(forbidden.toLowerCase())) {
      fail(`Forbidden competitor reference found in ${path.relative(root, file)}`);
    }
  }
  for (const pattern of secretLikePatterns) {
    if (pattern.test(content)) {
      fail(`Secret-like token found in ${path.relative(root, file)}: ${pattern}`);
    }
  }
}

for (const [relativePath, phrases] of requiredRightsLanguage) {
  const content = fs.readFileSync(path.join(root, relativePath), "utf8");
  for (const phrase of phrases) {
    if (!content.includes(phrase)) {
      fail(`Missing rights/privacy language in ${relativePath}: ${phrase}`);
    }
  }
}

if (process.exitCode) {
  process.exit();
}

console.log(`Validated ${data.items.length} prompt templates across ${data.categories.length} categories.`);
