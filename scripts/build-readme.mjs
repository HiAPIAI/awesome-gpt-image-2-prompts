#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const data = JSON.parse(fs.readFileSync(path.join(root, "data", "prompts.json"), "utf8"));

const hiapi = {
  zh: {
    home: "https://www.hiapi.ai/zh",
    key: "https://www.hiapi.ai/zh/register",
    model: "https://www.hiapi.ai/zh/models/gpt-image-2",
  },
  en: {
    home: "https://www.hiapi.ai/en",
    key: "https://www.hiapi.ai/en/register",
    model: "https://www.hiapi.ai/en/models/gpt-image-2",
  },
  docs: "https://docs.hiapi.ai",
  skill: "https://github.com/HiAPIAI/hiapi-gpt-image-2-skill",
};

const sourceUrl = "https://waytoagi.feishu.cn/wiki/PjxpwWFXriCdQnkVXBecyGqZnIe";
const sourceUrl2 = "https://waytoagi.feishu.cn/wiki/CjY1wfzWdiIyAIkpp5ScPSuQnMc";

const copy = {
  zh: {
    file: "README.zh-CN.md",
    title: "Awesome GPT Image 2 Prompts",
    subtitle: "一份精选的 GPT Image 2 提示词画廊。",
    languageLabel: "English",
    languageTarget: "README.md",
    nav: {
      home: "HiAPI",
      key: "API Key",
      model: "GPT Image 2",
      docs: "文档",
      skill: "Skill",
    },
    badges: {
      cases: `${data.items.length} 个提示词`,
      categories: `${data.categories.length} 个分类`,
      images: "真实案例图",
      copy: "复制 Prompt",
    },
    intro:
      `## 创意工坊 | GPT Image 2 视觉生成案例库

探索 ${data.items.length} 个精选视觉创作案例，涵盖人物肖像、商业海报、角色设定、界面设计和模型测试等场景。每个案例都附带真实效果图、完整 Prompt、原作者署名与原帖链接，帮助你快速拆解并复用 AI 视觉创作技巧。

## 为什么使用这个案例库？

- 真实案例展示，先看效果再复制 Prompt。
- 完整提示词可直接展开查看，适合学习、改写和复用。
- 覆盖热门视觉风格与常见创作场景，便于快速找到参考方向。

## 使用指南

1. 浏览 Gallery，找到喜欢的视觉风格。
2. 点击缩略图，将自动跳转至 HiAPI 打开对应提示词。
3. 点击“提示词”查看本仓库里的完整内容。
4. 替换人物、产品、城市、品牌和文案，打造自己的作品。`,
    tipTitle: `由 <a href="${hiapi.zh.home}">HiAPI</a> 驱动 — 一个 API，所有 AI 模型`,
    tipText:
      `<br><a href="${hiapi.zh.model}">立即免费试用 GPT-Image-2 →</a>`,
    sourceNote:
      `内容改编自<br><a href="${sourceUrl}">${sourceUrl}</a><br><a href="${sourceUrl2}">${sourceUrl2}</a><br>保留原作者署名与原帖链接；Prompt 文本和案例图片版权归原权利人所有。`,
    categoriesTitle: "按类型浏览",
    promptLink: "提示词",
    fullTitle: "完整 Prompt",
    detailsHint: "每个案例都配有真实效果图、来源和作者。点击图片可在 HiAPI 预填生成；也可以复制 Prompt，把主题、人物、产品、城市或文案换成自己的内容。",
    promptSummary: "展开并复制 Prompt",
    source: "来源",
    author: "作者",
    ratio: "比例",
    language: "语言",
    sourceTitle: "来源说明",
    sourceText:
      "本仓库是带署名的提示词索引与案例画廊，所有案例均保留原作者署名、作者主页链接和原帖链接。HiAPI 不主张拥有 Prompt 文本、案例图片、作者身份、第三方品牌名称或平台名称的权利，也不代表原作者或相关权利方授权商用复用。本仓库仅展示来源文档和原帖中已经公开的作者昵称、作者主页和公开帖子链接，不收集私人联系方式、私密主页或其他非公开个人信息。如果你是原作者或权利方，希望调整署名、移除链接、删除可能涉及隐私的信息，或下架某个案例，请发邮件至 support@hiapi.ai。",
    licenseTitle: "授权说明",
    licenseText:
      "仓库代码、脚本、JSON 字段结构（key 名称和文件格式）、README 排版适用 MIT License。JSON 中的 Prompt 内容、案例图片、作者署名、第三方品牌名称及平台名称不属于 MIT 授权范围，版权归原权利人所有，除非其另行授权。请不要把本仓库理解为对 Prompt 文本、案例图片或第三方素材的再授权；公开展示、复制、改编或商业使用时，请遵守原作者、发布平台和相关权利方的要求。",
    ctaTitle: "找到满意的效果了？去生成吧。",
    ctaText: "GPT Image 2、Flux 等主流图像模型，一个 API Key 统一接入，按量计费无需订阅。",
    ctaButton: "在 HiAPI 生成图像 →",
    ctaBrowse: "浏览图像模型",
    ctaDocs: "API 文档",
    ctaSkill: "安装 Skill",
    thanksTitle: "致谢",
    thanksText: "感谢所有公开分享案例的创作者。",
    countSuffix: "个案例",
  },
  en: {
    file: "README.md",
    title: "Awesome GPT Image 2 Prompts",
    subtitle: "A curated GPT Image 2 prompt gallery.",
    languageLabel: "简体中文",
    languageTarget: "README.zh-CN.md",
    nav: {
      home: "HiAPI",
      key: "API Key",
      model: "GPT Image 2",
      docs: "Docs",
      skill: "Skill",
    },
    badges: {
      cases: `${data.items.length} Prompts`,
      categories: `${data.categories.length} Categories`,
      images: "Real Images",
      copy: "Copy Prompts",
    },
    intro:
      `## Creative Workshop | GPT Image 2 Visual Prompt Gallery

Explore ${data.items.length} curated visual generation cases across portraits, commercial posters, character design, interface design, and model tests. Each case includes a real output image, full prompt, creator attribution, and original post link so you can study, adapt, and reuse practical AI visual creation patterns.

## Why Use This Gallery?

- Real generated results: inspect the output before copying the prompt.
- Full prompts are available in expandable sections for learning, editing, and reuse.
- Popular visual styles and common creative scenarios are organized for quick browsing.

## How To Use

1. Browse the Gallery and find a visual style you like.
2. Click a thumbnail to open the matching prompt on HiAPI automatically.
3. Click “Prompt” to read the full prompt inside this repository.
4. Replace the character, product, city, brand, or copy to create your own result.`,
    tipTitle: `Powered by <a href="${hiapi.en.home}">HiAPI</a> — One API, All AI Models`,
    tipText:
      `<br><a href="${hiapi.en.model}">Try GPT-Image-2 for free →</a>`,
    sourceNote:
      `Adapted from<br><a href="${sourceUrl}">${sourceUrl}</a><br><a href="${sourceUrl2}">${sourceUrl2}</a><br>Creator attribution and original post links are preserved; prompt text and example images remain with their original rightsholders.`,
    categoriesTitle: "Browse By Type",
    promptLink: "Prompt",
    fullTitle: "Full Prompts",
    detailsHint: "Each case includes the real result image, source, and creator. Click an image to prefill the prompt on HiAPI, or copy the prompt and swap in your own topic, character, product, city, or copy.",
    promptSummary: "Open And Copy Prompt",
    source: "Source",
    author: "Author",
    ratio: "Ratio",
    language: "Language",
    sourceTitle: "Source Notes",
    sourceText:
      "This repository is an attribution-preserving prompt index and example gallery. Every case keeps the original creator handle, creator profile link, and original post link. HiAPI does not claim ownership of prompt text, example images, creator identities, third-party brand names, or platform names, and it does not represent commercial reuse permission from the original creators or rightsholders. The repository only shows public creator handles, public creator profiles, and public post links that were already present in the source documents and original posts; it does not collect private contact details, private profiles, or other non-public personal information. If you are a creator or rightsholder and want attribution adjusted, a link removed, potentially private information removed, or an entry taken down, email support@hiapi.ai.",
    licenseTitle: "License",
    licenseText:
      "Repository code, scripts, JSON field structure (key names and file format), and README layout are MIT licensed. Prompt content inside the JSON, example images, creator attribution, third-party brand names, and platform names are not covered by the MIT license; copyright belongs to the original rightsholders unless separately licensed. Do not treat this repository as a relicensing of prompt text, example images, or third-party material. For public display, copying, adaptation, or commercial use, follow the requirements of the original creators, publishing platforms, and relevant rightsholders.",
    ctaTitle: "Found a prompt you like? Go generate.",
    ctaText: "GPT Image 2, Flux, and more — one API key for all major image models, pay as you go.",
    ctaButton: "Generate on HiAPI →",
    ctaBrowse: "Browse image models",
    ctaDocs: "API Docs",
    ctaSkill: "Install Skill",
    thanksTitle: "Acknowledgements",
    thanksText: "Thanks to all creators who shared these cases publicly.",
    countSuffix: "cases",
  },
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeSummary(value) {
  return escapeHtml(value).replace(/\n/g, " ");
}

function imagePath(item) {
  return `./${item.image.replace(/^\.\//, "")}`;
}

function sourceHref(item) {
  return item.source_url;
}

function encodePromptForUrl(prompt) {
  return Buffer.from(prompt, "utf8").toString("base64");
}

function generationHref(item, locale, prompt = item.prompt) {
  const params = new URLSearchParams({
    p: encodePromptForUrl(prompt),
    m: data.model,
    utm_source: "awesome-gpt-image-2-prompts",
    utm_medium: "github_readme",
    utm_campaign: locale === "zh" ? "zh_gallery" : "en_gallery",
  });

  if (item.aspect_ratio && item.aspect_ratio !== "auto" && item.aspect_ratio !== "mixed") {
    params.set("s", item.aspect_ratio);
  }

  return `https://www.hiapi.ai/draw?${params.toString()}`;
}

function titleFor(item, locale) {
  return locale === "zh" ? item.title_zh : item.title_en;
}

function categoryName(category, locale) {
  return locale === "zh" ? category.zh : category.en;
}

function categoryDescription(category, locale) {
  return locale === "zh" ? category.description_zh : category.description_en;
}

function languageLabel(language) {
  const labels = {
    zh: "中文",
    en: "English",
    ja: "日本語",
    ko: "한국어",
  };
  return labels[language] || language;
}

function categoryCounts() {
  return new Map(
    data.categories.map((category) => [
      category.id,
      data.items.filter((item) => item.category === category.id).length,
    ])
  );
}

function writeCover() {
  const count = data.items.length;
  const englishSvg = `<svg width="1400" height="520" viewBox="0 0 1400 520" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title-en desc-en">
  <title id="title-en">Awesome GPT Image 2 Prompts</title>
  <desc id="desc-en">Cover image for the HiAPI GPT Image 2 prompt gallery.</desc>

  <rect width="1400" height="520" fill="#fff7ed"/>
  <rect x="28" y="28" width="1344" height="464" rx="36" fill="#ffffff" stroke="#fed7aa" stroke-width="2"/>

  <circle cx="112" cy="106" r="8" fill="#f97316"/>
  <text x="132" y="114" fill="#9a3412" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="800">HiAPI</text>

  <rect x="1072" y="80" width="76" height="34" rx="17" fill="#f97316"/>
  <text x="1110" y="102" text-anchor="middle" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-size="15" font-weight="700">EN</text>
  <rect x="1160" y="80" width="94" height="34" rx="17" fill="#111827"/>
  <text x="1207" y="102" text-anchor="middle" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-size="15" font-weight="700">中文</text>

  <text x="96" y="196" fill="#111827" font-family="Inter, Arial, sans-serif" font-size="54" font-weight="800">GPT Image 2 Prompts</text>
  <text x="96" y="244" fill="#52525b" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="500">${count} real examples · Copy prompts · Generate on HiAPI</text>
  <text x="96" y="300" fill="#f97316" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="700">Browse the result first, then copy</text>

  <rect x="96"  y="348" width="128" height="42" rx="21" fill="#fff7ed" stroke="#fed7aa" stroke-width="1.5"/>
  <text x="160" y="374" text-anchor="middle" fill="#9a3412" font-family="Inter, Arial, sans-serif" font-size="16" font-weight="700">${count} cases</text>
  <rect x="240" y="348" width="152" height="42" rx="21" fill="#fff7ed" stroke="#fed7aa" stroke-width="1.5"/>
  <text x="316" y="374" text-anchor="middle" fill="#9a3412" font-family="Inter, Arial, sans-serif" font-size="16" font-weight="700">5 categories</text>
  <rect x="408" y="348" width="138" height="42" rx="21" fill="#fff7ed" stroke="#fed7aa" stroke-width="1.5"/>
  <text x="477" y="374" text-anchor="middle" fill="#9a3412" font-family="Inter, Arial, sans-serif" font-size="16" font-weight="700">real images</text>
  <rect x="562" y="348" width="138" height="42" rx="21" fill="#fff7ed" stroke="#fed7aa" stroke-width="1.5"/>
  <text x="631" y="374" text-anchor="middle" fill="#9a3412" font-family="Inter, Arial, sans-serif" font-size="16" font-weight="700">copy prompts</text>

  <rect x="810" y="118" width="390" height="278" rx="24" fill="#111827"/>
  <rect x="840" y="150" width="52" height="10" rx="5" fill="#ef4444"/>
  <rect x="904" y="150" width="52" height="10" rx="5" fill="#f59e0b"/>
  <rect x="968" y="150" width="52" height="10" rx="5" fill="#22c55e"/>
  <text x="840" y="200" fill="#c4b5fd" font-family="Menlo, Consolas, 'Courier New', monospace" font-size="18">model:</text>
  <text x="920" y="200" fill="#fdba74" font-family="Menlo, Consolas, 'Courier New', monospace" font-size="18">gpt-image-2</text>
  <text x="840" y="244" fill="#c4b5fd" font-family="Menlo, Consolas, 'Courier New', monospace" font-size="18">prompt:</text>
  <rect x="840" y="266" width="290" height="11" rx="5" fill="#fb923c"/>
  <rect x="840" y="294" width="220" height="11" rx="5" fill="#fed7aa"/>
  <rect x="840" y="322" width="260" height="11" rx="5" fill="#fde68a"/>
  <rect x="840" y="350" width="180" height="11" rx="5" fill="#86efac"/>

  <rect x="1222" y="180" width="88" height="88" rx="22" fill="#f97316"/>
  <path d="M1248 236C1260 208 1283 202 1294 226C1274 216 1258 220 1248 236Z" fill="#ffffff"/>
  <rect x="1218" y="310" width="74" height="74" rx="16" fill="#ffedd5" stroke="#fdba74" stroke-width="1.5"/>
  <path d="M1234 347H1278" stroke="#f97316" stroke-width="7" stroke-linecap="round"/>
  <path d="M1256 325V369" stroke="#f97316" stroke-width="7" stroke-linecap="round"/>
</svg>
`;

  const chineseSvg = `<svg width="1400" height="520" viewBox="0 0 1400 520" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title-zh desc-zh">
  <title id="title-zh">Awesome GPT Image 2 Prompts 中文提示词画廊</title>
  <desc id="desc-zh">HiAPI GPT Image 2 提示词画廊封面图</desc>

  <rect width="1400" height="520" fill="#fff7ed"/>
  <rect x="28" y="28" width="1344" height="464" rx="36" fill="#ffffff" stroke="#fed7aa" stroke-width="2"/>

  <circle cx="112" cy="106" r="8" fill="#f97316"/>
  <text x="132" y="114" fill="#9a3412" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="800">HiAPI</text>

  <rect x="1072" y="80" width="76" height="34" rx="17" fill="#111827"/>
  <text x="1110" y="102" text-anchor="middle" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-size="15" font-weight="700">EN</text>
  <rect x="1160" y="80" width="94" height="34" rx="17" fill="#f97316"/>
  <text x="1207" y="102" text-anchor="middle" fill="#ffffff" font-family="'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif" font-size="15" font-weight="700">中文</text>

  <text x="96" y="196" fill="#111827" font-family="'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', Inter, Arial, sans-serif" font-size="50" font-weight="800">GPT Image 2 提示词画廊</text>
  <text x="96" y="244" fill="#52525b" font-family="'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', Inter, Arial, sans-serif" font-size="20" font-weight="500">${count} 个社区真实案例 · 复制 Prompt，立即生成</text>
  <text x="96" y="300" fill="#f97316" font-family="'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', Inter, Arial, sans-serif" font-size="26" font-weight="700">先看效果图，再复制提示词</text>

  <rect x="96"  y="348" width="136" height="42" rx="21" fill="#fff7ed" stroke="#fed7aa" stroke-width="1.5"/>
  <text x="164" y="374" text-anchor="middle" fill="#9a3412" font-family="'Noto Sans SC', 'PingFang SC', Arial, sans-serif" font-size="16" font-weight="700">${count} 个案例</text>
  <rect x="248" y="348" width="128" height="42" rx="21" fill="#fff7ed" stroke="#fed7aa" stroke-width="1.5"/>
  <text x="312" y="374" text-anchor="middle" fill="#9a3412" font-family="'Noto Sans SC', 'PingFang SC', Arial, sans-serif" font-size="16" font-weight="700">5 大分类</text>
  <rect x="392" y="348" width="148" height="42" rx="21" fill="#fff7ed" stroke="#fed7aa" stroke-width="1.5"/>
  <text x="466" y="374" text-anchor="middle" fill="#9a3412" font-family="'Noto Sans SC', 'PingFang SC', Arial, sans-serif" font-size="16" font-weight="700">真实效果图</text>
  <rect x="556" y="348" width="128" height="42" rx="21" fill="#fff7ed" stroke="#fed7aa" stroke-width="1.5"/>
  <text x="620" y="374" text-anchor="middle" fill="#9a3412" font-family="'Noto Sans SC', 'PingFang SC', Arial, sans-serif" font-size="16" font-weight="700">复制 Prompt</text>

  <rect x="810" y="118" width="390" height="278" rx="24" fill="#111827"/>
  <rect x="840" y="150" width="52" height="10" rx="5" fill="#ef4444"/>
  <rect x="904" y="150" width="52" height="10" rx="5" fill="#f59e0b"/>
  <rect x="968" y="150" width="52" height="10" rx="5" fill="#22c55e"/>
  <text x="840" y="200" fill="#c4b5fd" font-family="Menlo, Consolas, 'Courier New', monospace" font-size="18">model:</text>
  <text x="920" y="200" fill="#fdba74" font-family="Menlo, Consolas, 'Courier New', monospace" font-size="18">gpt-image-2</text>
  <text x="840" y="244" fill="#c4b5fd" font-family="Menlo, Consolas, 'Courier New', monospace" font-size="18">prompt:</text>
  <rect x="840" y="266" width="290" height="11" rx="5" fill="#fb923c"/>
  <rect x="840" y="294" width="220" height="11" rx="5" fill="#fed7aa"/>
  <rect x="840" y="322" width="260" height="11" rx="5" fill="#fde68a"/>
  <rect x="840" y="350" width="180" height="11" rx="5" fill="#86efac"/>

  <rect x="1222" y="180" width="88" height="88" rx="22" fill="#f97316"/>
  <path d="M1248 236C1260 208 1283 202 1294 226C1274 216 1258 220 1248 236Z" fill="#ffffff"/>
  <rect x="1218" y="310" width="74" height="74" rx="16" fill="#ffedd5" stroke="#fdba74" stroke-width="1.5"/>
  <path d="M1234 347H1278" stroke="#f97316" stroke-width="7" stroke-linecap="round"/>
  <path d="M1256 325V369" stroke="#f97316" stroke-width="7" stroke-linecap="round"/>
</svg>
`;

  fs.writeFileSync(path.join(root, "images", "cover.svg"), englishSvg);
  fs.writeFileSync(path.join(root, "images", "cover.zh-CN.svg"), chineseSvg);
}

function statsTable(locale, t) {
  const counts = categoryCounts();
  const rows = data.categories
    .map((category) => {
      const name = categoryName(category, locale);
      const count = counts.get(category.id);
      return `| [${name}](#gallery-${category.id}) | ${count} | ${categoryDescription(category, locale)} |`;
    })
    .join("\n");
  const headers = locale === "zh"
    ? "| 分类 | 数量 | 适合做什么 |\n| --- | ---: | --- |"
    : "| Category | Count | Best For |\n| --- | ---: | --- |";
  return `${headers}\n${rows}`;
}

function galleryTable(items, locale, t) {
  const rows = [];
  for (let i = 0; i < items.length; i += 3) {
    const chunk = items.slice(i, i + 3);
    rows.push(
      "  <tr>\n" +
        chunk
          .map((item) => {
            const title = titleFor(item, locale);
            return `    <td align="center" width="33%" valign="top"><a href="${escapeHtml(generationHref(item, locale))}"><img src="${imagePath(item)}" width="250" alt="${escapeHtml(title)}"></a><br><sub><b>Case ${String(item.case_number).padStart(3, "0")}</b> · <a href="#${item.id}">${t.promptLink}</a></sub><br><sub><a href="${escapeHtml(sourceHref(item))}">${escapeHtml(title)}</a> · <a href="${escapeHtml(item.author_url)}">${escapeHtml(item.author)}</a></sub></td>`;
          })
          .join("\n") +
        "\n  </tr>"
    );
  }
  return `<table>\n${rows.join("\n")}\n</table>`;
}

function galleryBlocks(locale, t) {
  return data.categories
    .map((category) => {
      const items = data.items.filter((item) => item.category === category.id);
      return `<a id="gallery-${category.id}"></a>

### ${categoryName(category, locale)} · ${items.length} ${t.countSuffix}

${categoryDescription(category, locale)}

${galleryTable(items, locale, t)}`;
    })
    .join("\n\n");
}

function variantTable(item, title, t, locale) {
  if (!item.prompt_variants) {
    return `<p align="center"><a href="${escapeHtml(generationHref(item, locale))}"><img src="${imagePath(item)}" width="560" alt="${escapeHtml(title)}"></a></p>`;
  }

  const rows = [];
  for (let i = 0; i < item.prompt_variants.length; i += 2) {
    const chunk = item.prompt_variants.slice(i, i + 2);
    rows.push(
      "  <tr>\n" +
        chunk
          .map((variant) => `    <td align="center" width="50%" valign="top"><a href="${escapeHtml(generationHref(item, locale, variant.prompt))}"><img src="./${variant.image}" width="320" alt="${escapeHtml(`${title} ${t.promptLink} ${variant.label}`)}"></a><br><sub><b>${t.promptLink} ${variant.label}</b></sub></td>`)
          .join("\n") +
        "\n  </tr>"
    );
  }

  return `<table>\n${rows.join("\n")}\n</table>`;
}

function promptCodeBlock(item, t) {
  if (!item.prompt_variants) {
    return `\`\`\`text
${item.prompt}
\`\`\``;
  }

  return item.prompt_variants
    .map((variant) => `#### ${t.promptLink} ${variant.label}

\`\`\`text
${variant.prompt}
\`\`\``)
    .join("\n\n");
}

function promptDetails(locale, t) {
  return data.categories
    .map((category) => {
      const items = data.items.filter((item) => item.category === category.id);
      const itemBlocks = items
        .map((item) => {
          const title = titleFor(item, locale);
          return `<a id="${item.id}"></a>

### Case ${String(item.case_number).padStart(3, "0")}: [${title}](${sourceHref(item)})

${t.author}: [${item.author}](${item.author_url}) · ${t.ratio}: \`${item.aspect_ratio}\` · ${t.language}: \`${languageLabel(item.prompt_language)}\`

${variantTable(item, title, t, locale)}

<details>
<summary><b>${escapeSummary(t.promptSummary)}</b></summary>

${promptCodeBlock(item, t)}

</details>`;
        })
        .join("\n\n");
      return `<a id="details-${category.id}"></a>

## ${categoryName(category, locale)}

${itemBlocks}`;
    })
    .join("\n\n");
}

function readme(locale) {
  const t = copy[locale];
  const links = hiapi[locale];
  const coverFile = locale === "zh" ? "cover.zh-CN.svg" : "cover.svg";
  const categoryLinks = data.categories
    .map((category) => `[${categoryName(category, locale)}](#gallery-${category.id})`)
    .join(" · ");

  return `<div align="center">

<a href="${links.home}"><img src="./images/${coverFile}" alt="Awesome GPT Image 2 Prompts" width="100%"></a>

[![HiAPI](https://img.shields.io/badge/HiAPI-One%20API%2C%20All%20AI%20Models-f97316?style=for-the-badge)](${links.home})
[![${t.nav.key}](https://img.shields.io/badge/API%20Key-Free-111827?style=for-the-badge)](${links.key})
[![${t.nav.model}](https://img.shields.io/badge/GPT%20Image%202-Open-f97316?style=for-the-badge)](${links.model})
[![${t.nav.docs}](https://img.shields.io/badge/Docs-HiAPI-111827?style=for-the-badge)](${hiapi.docs})

![${t.badges.cases}](https://img.shields.io/badge/${encodeURIComponent(t.badges.cases)}-f97316)
![${t.badges.categories}](https://img.shields.io/badge/${encodeURIComponent(t.badges.categories)}-111827)
![${t.badges.images}](https://img.shields.io/badge/${encodeURIComponent(t.badges.images)}-16a34a)
![${t.badges.copy}](https://img.shields.io/badge/${encodeURIComponent(t.badges.copy)}-f59e0b)

# ${t.title}

**${t.subtitle}**

[${t.nav.home}](${links.home}) · [${t.nav.model}](${links.model}) · [${t.nav.key}](${links.key}) · [${t.nav.skill}](${hiapi.skill}) · [${t.languageLabel}](${t.languageTarget})

</div>

---

${t.intro}

<div align="center">

<b>${t.tipTitle}</b><br>
${t.tipText}

</div>

> <sub>${t.sourceNote}</sub>

## ${t.categoriesTitle}

${categoryLinks}

${statsTable(locale, t)}

${galleryBlocks(locale, t)}

# ${t.fullTitle}

${t.detailsHint}

${promptDetails(locale, t)}

## ${t.sourceTitle}

${t.sourceText}

- [NOTICE.md](NOTICE.md)

## ${t.licenseTitle}

${t.licenseText}

---

<div align="center">

**${t.ctaTitle}**

${t.ctaText}

**[${t.ctaButton}](${links.model})**

[${t.ctaBrowse}](${links.home}) · [${t.ctaDocs}](${hiapi.docs}) · [${t.ctaSkill}](${hiapi.skill})

</div>

## ${t.thanksTitle}

${t.thanksText}
`;
}

writeCover();
fs.writeFileSync(path.join(root, copy.zh.file), readme("zh"));
fs.writeFileSync(path.join(root, copy.en.file), readme("en"));

console.log(`Built bilingual README files for ${data.items.length} prompt examples.`);
