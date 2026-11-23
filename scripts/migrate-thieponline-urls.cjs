#!/usr/bin/env node
/**
 * Rewrite thieponline.app URLs already stored in the database to the
 * self-hosted local paths under /public (assets were mirrored into the repo).
 *
 * Touches:
 *   - Wedding.gallery (Json), Wedding.typography (Json, deep), Wedding.gifting (Json, deep),
 *     Wedding.backgroundMusic, Wedding.ogImage
 *   - Template.thumbnail, Template.previewUrl, Template.config (Json, deep)
 *
 * Idempotent: rows that no longer contain "thieponline.app" are skipped, and
 * rewritten values never contain it, so re-running is a no-op.
 *
 * Usage (DATABASE_URL must point at the target DB):
 *   node scripts/migrate-thieponline-urls.cjs            # dry run, prints what would change
 *   node scripts/migrate-thieponline-urls.cjs --apply    # write changes
 *
 * Take a DB backup before running with --apply on production.
 */
const { PrismaClient } = require("@prisma/client");

// Exact URL -> local path for files that could not live at their mirrored
// path (name collision with an existing different file, cdn root files,
// tracks renamed upstream). Checked before the generic host rules below.
const OVERRIDES = {
  "https://cdn.thieponline.app/1c35899b-5f58-4932-927b-ad04290a94db.jpg": "/thieponline-assets/cdn/1c35899b-5f58-4932-927b-ad04290a94db.jpg",
  "https://cdn.thieponline.app/219939b2-0e03-4b19-98bc-54cc1dcf1951.jpg": "/thieponline-assets/cdn/219939b2-0e03-4b19-98bc-54cc1dcf1951.jpg",
  "https://cdn.thieponline.app/277d05e1-07f1-4203-a725-9da037ca48cd.jpg": "/thieponline-assets/cdn/277d05e1-07f1-4203-a725-9da037ca48cd.jpg",
  "https://cdn.thieponline.app/2fa38545-9b66-4b9f-bfa2-9cb58f3dd4e4.jpg": "/thieponline-assets/cdn/2fa38545-9b66-4b9f-bfa2-9cb58f3dd4e4.jpg",
  "https://cdn.thieponline.app/42cdbbfc-e7d3-4bce-9b7f-f9fed8d7d4f8.jpg": "/thieponline-assets/cdn/42cdbbfc-e7d3-4bce-9b7f-f9fed8d7d4f8.jpg",
  "https://cdn.thieponline.app/4365c2e1-4471-4f00-adbf-ce62d9784035.jpg": "/thieponline-assets/cdn/4365c2e1-4471-4f00-adbf-ce62d9784035.jpg",
  "https://cdn.thieponline.app/4888536c-3816-4fe5-9df8-0719b5d848f5.jpg": "/thieponline-assets/cdn/4888536c-3816-4fe5-9df8-0719b5d848f5.jpg",
  "https://cdn.thieponline.app/59b33a01-fa02-49ef-a2e2-8d7cd503cbae.jpg": "/thieponline-assets/cdn/59b33a01-fa02-49ef-a2e2-8d7cd503cbae.jpg",
  "https://cdn.thieponline.app/5effac34-799e-42d1-93fc-aad3f7f2f293.jpg": "/thieponline-assets/cdn/5effac34-799e-42d1-93fc-aad3f7f2f293.jpg",
  "https://cdn.thieponline.app/67342231-8e4c-40a9-988e-c2572cd29cf1.jpg": "/thieponline-assets/cdn/67342231-8e4c-40a9-988e-c2572cd29cf1.jpg",
  "https://cdn.thieponline.app/6b6db143-b5d7-463f-85b8-8ae7fb661bb8.jpg": "/thieponline-assets/cdn/6b6db143-b5d7-463f-85b8-8ae7fb661bb8.jpg",
  "https://cdn.thieponline.app/72a83d28-da41-45a0-bcd2-36374eaf3aad.jpg": "/thieponline-assets/cdn/72a83d28-da41-45a0-bcd2-36374eaf3aad.jpg",
  "https://cdn.thieponline.app/89353e05-8c6c-4145-967d-76099caa6262.jpg": "/thieponline-assets/cdn/89353e05-8c6c-4145-967d-76099caa6262.jpg",
  "https://cdn.thieponline.app/8e9cb6a3-e0be-4c83-8162-4e38259863ce.jpg": "/thieponline-assets/cdn/8e9cb6a3-e0be-4c83-8162-4e38259863ce.jpg",
  "https://cdn.thieponline.app/8f49a3b6-b7c7-4d47-9aee-132262d19e9f.jpg": "/thieponline-assets/cdn/8f49a3b6-b7c7-4d47-9aee-132262d19e9f.jpg",
  "https://cdn.thieponline.app/a9c12eb9-13c6-4596-bd07-dcd46204036c.jpg": "/thieponline-assets/cdn/a9c12eb9-13c6-4596-bd07-dcd46204036c.jpg",
  "https://cdn.thieponline.app/b7423bd8-19e6-4f22-82ea-234bad640a7a.jpg": "/thieponline-assets/cdn/b7423bd8-19e6-4f22-82ea-234bad640a7a.jpg",
  "https://cdn.thieponline.app/bad58a77-5ee5-46f7-b724-874e6c7f9faa.jpg": "/thieponline-assets/cdn/bad58a77-5ee5-46f7-b724-874e6c7f9faa.jpg",
  "https://cdn.thieponline.app/d00b6728-5148-4b0c-b702-b19e796c4c98.jpg": "/thieponline-assets/cdn/d00b6728-5148-4b0c-b702-b19e796c4c98.jpg",
  "https://cdn.thieponline.app/fba6aef6-d3f4-4d7d-9717-05ed67744e75.jpg": "/thieponline-assets/cdn/fba6aef6-d3f4-4d7d-9717-05ed67744e75.jpg",
  "https://cdn.thieponline.app/fefb7e55-1797-4f98-98e2-9175de760e5d.jpg": "/thieponline-assets/cdn/fefb7e55-1797-4f98-98e2-9175de760e5d.jpg",
  "https://thieponline.app/images/themes/song-hy-red/sunburst.svg": "/thieponline-assets/images/themes/song-hy-red/sunburst.svg",
  "https://thieponline.app/music/hon-ca-yeu.mp3": "/music/hon-ca-yeu-duc-phuc.mp3",
  "https://thieponline.app/music/marry-you.mp3": "/Marry%20You.mp3",
};

const OVERRIDE_ENTRIES = Object.entries(OVERRIDES).sort((a, b) => b[0].length - a[0].length);

function rewriteString(s) {
  if (typeof s !== "string" || !s.includes("thieponline.app")) return s;
  let out = s;
  for (const [from, to] of OVERRIDE_ENTRIES) if (out.includes(from)) out = out.split(from).join(to);
  return out
    .split("https://music.thieponline.app/library/").join("/music/")
    .split("https://music.thieponline.app").join("/music")
    .split("http://cdn.thieponline.app").join("")
    .split("https://cdn.thieponline.app").join("")
    .split("http://thieponline.app").join("")
    .split("https://thieponline.app").join("");
}

function rewriteDeep(v) {
  if (typeof v === "string") return rewriteString(v);
  if (Array.isArray(v)) return v.map(rewriteDeep);
  if (v && typeof v === "object") {
    const o = {};
    for (const [k, val] of Object.entries(v)) o[k] = rewriteDeep(val);
    return o;
  }
  return v;
}

const has = (v) => v != null && JSON.stringify(v).includes("thieponline.app");

async function main() {
  const apply = process.argv.includes("--apply");
  const prisma = new PrismaClient();
  let weddings = 0;
  let templates = 0;
  try {
    const ws = await prisma.wedding.findMany({
      select: { id: true, slug: true, gallery: true, typography: true, gifting: true, backgroundMusic: true, ogImage: true },
    });
    for (const w of ws) {
      const data = {};
      for (const f of ["gallery", "typography", "gifting"]) if (has(w[f])) data[f] = rewriteDeep(w[f]);
      for (const f of ["backgroundMusic", "ogImage"]) if (has(w[f])) data[f] = rewriteString(w[f]);
      if (!Object.keys(data).length) continue;
      weddings++;
      console.log(`${apply ? "update" : "would update"} wedding ${w.slug}: ${Object.keys(data).join(", ")}`);
      if (apply) await prisma.wedding.update({ where: { id: w.id }, data });
    }
    const ts = await prisma.template.findMany({ select: { id: true, slug: true, thumbnail: true, previewUrl: true, config: true } });
    for (const t of ts) {
      const data = {};
      for (const f of ["thumbnail", "previewUrl"]) if (has(t[f])) data[f] = rewriteString(t[f]);
      if (has(t.config)) data.config = rewriteDeep(t.config);
      if (!Object.keys(data).length) continue;
      templates++;
      console.log(`${apply ? "update" : "would update"} template ${t.slug}: ${Object.keys(data).join(", ")}`);
      if (apply) await prisma.template.update({ where: { id: t.id }, data });
    }
    console.log(`${apply ? "Updated" : "Dry run:"} ${weddings} wedding(s), ${templates} template(s).${apply ? "" : " Re-run with --apply to write."}`);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

module.exports = { rewriteString, rewriteDeep };
