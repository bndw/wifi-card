// Uploads a recorded GIF to the pr-assets branch and adds it to the top of a
// PR description. Usage: make demo.publish STORY=<name> PR=<number>
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const BRANCH = 'pr-assets';
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(scriptDir, '../../.cache/demo/out');

const gh = (args, input) =>
  execFileSync('gh', args, { encoding: 'utf8', input, maxBuffer: 1 << 28 });

const main = async () => {
  const [name, pr] = process.argv.slice(2);
  if (!name || !/^\d+$/.test(pr ?? '')) {
    throw new Error('Usage: make demo.publish STORY=<name> PR=<number>');
  }
  const { alt } = await import(
    pathToFileURL(path.join(scriptDir, 'stories', `${name}.mjs`)).href
  );
  const repo = gh([
    'repo',
    'view',
    '--json',
    'nameWithOwner',
    '-q',
    '.nameWithOwner',
  ]).trim();
  const file = `pr-${pr}/${name}.gif`;

  let sha;
  try {
    sha = gh(
      ['api', `repos/${repo}/contents/${file}?ref=${BRANCH}`, '-q', '.sha'],
      ''
    ).trim();
  } catch {
    // The file is new.
  }
  const commit = JSON.parse(
    gh(
      ['api', '-X', 'PUT', `repos/${repo}/contents/${file}`, '--input', '-'],
      JSON.stringify({
        branch: BRANCH,
        content: readFileSync(path.join(outDir, `${name}.gif`)).toString(
          'base64'
        ),
        message: `chore: add ${name} demo for #${pr}`,
        sha,
      })
    )
  ).commit.sha;

  // Pin to the commit, so the image outlives later uploads to this path.
  const url = `https://raw.githubusercontent.com/${repo}/${commit}/${file}`;
  const start = `<!-- demo:${name} -->`;
  const end = '<!-- /demo -->';
  const block = `${start}\n![${alt}](${url})\n${end}`;
  const body = gh([
    'pr',
    'view',
    pr,
    '--json',
    'body',
    '-q',
    '.body',
  ]).trimEnd();
  const existing = new RegExp(`${start}[\\s\\S]*?${end}`);
  const updated = existing.test(body)
    ? body.replace(existing, block)
    : `${block}\n\n${body}`;
  gh(['pr', 'edit', pr, '--body-file', '-'], updated);
  console.log(url);
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
