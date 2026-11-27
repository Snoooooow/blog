import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";
import process from "node:process";

const repoRoot = resolve(import.meta.dirname, "..");
const coverDir = resolve(repoRoot, "assets/books/douban");
const outputPath = resolve(repoRoot, "douban-books.js");

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

function cleanAuthor(publication = "") {
  return publication.split(" / ")[0]?.trim() || "";
}

function subjectId(url = "") {
  return url.match(/\/subject\/(\d+)/)?.[1] || "";
}

function coverExtension(url = "") {
  const extension = extname(new URL(url).pathname).toLowerCase();
  return [".jpg", ".jpeg", ".png", ".webp"].includes(extension) ? extension : ".jpg";
}

async function downloadCover(book) {
  if (!book.image || !book.subjectId) return null;

  const extension = coverExtension(book.image);
  const relativePath = `douban/${book.subjectId}${extension}`;
  const destination = resolve(coverDir, `${book.subjectId}${extension}`);

  try {
    await readFile(destination);
    return relativePath;
  } catch {
    // Download only when the local cover is missing.
  }

  const response = await fetch(book.image, {
    headers: {
      Referer: "https://book.douban.com/",
      "User-Agent": "Mozilla/5.0"
    }
  });

  if (!response.ok) throw new Error(`Cover download failed (${response.status}): ${book.image}`);
  await writeFile(destination, Buffer.from(await response.arrayBuffer()));
  return relativePath;
}

async function mapWithConcurrency(items, concurrency, task) {
  const results = new Array(items.length);
  let cursor = 0;

  async function worker() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await task(items[index], index);
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));
  return results;
}

const input = JSON.parse(await readStdin());
await mkdir(coverDir, { recursive: true });

const prepared = input.map((book) => ({
  ...book,
  subjectId: subjectId(book.url)
}));

const coverPaths = await mapWithConcurrency(prepared, 8, async (book) => {
  try {
    return await downloadCover(book);
  } catch (error) {
    console.warn(error.message);
    return null;
  }
});

const imported = prepared.map((book, index) => ({
  titleZh: book.title,
  titleEn: book.title,
  authorZh: cleanAuthor(book.pub),
  authorEn: cleanAuthor(book.pub),
  cover: coverPaths[index],
  status: "read",
  rating: book.rating,
  doubanUrl: book.url,
  doubanSubjectId: book.subjectId,
  readAt: book.date
}));

const source = `// Generated from Snoooow's public Douban \"读过\" shelf.\nconst doubanReadingBooks = ${JSON.stringify(imported, null, 2)};\n`;
await writeFile(outputPath, source);

const downloaded = coverPaths.filter(Boolean).length;
console.log(`Imported ${imported.length} books and resolved ${downloaded} covers.`);
