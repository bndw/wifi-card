// Records a demo GIF of the production build from a story in ./stories.
// Usage: make demo STORY=<name>
import { execFileSync } from 'node:child_process';
import {
  linkSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
} from 'node:fs';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '../..');
const cacheDir = path.join(repoRoot, '.cache/demo');
const FPS = 12.5;
const DEFAULT_VIEWPORT = { width: 1100, height: 790 };
const MAX_SECONDS = 25;
const CONTENT_TYPES = {
  '.css': 'text/css',
  '.gif': 'image/gif',
  '.html': 'text/html',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.otf': 'font/otf',
  '.png': 'image/png',
};

const run = (command, args, options) =>
  execFileSync(command, args, { encoding: 'utf8', ...options });

const hasCommand = (command) => {
  try {
    run('which', [command], { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
};

const serve = (root) =>
  new Promise((resolve) => {
    const server = createServer((request, response) => {
      const { pathname } = new URL(request.url, 'http://localhost');
      const relative = pathname === '/' ? 'index.html' : pathname.slice(1);
      const file = path.join(root, path.normalize(relative));
      try {
        const body = readFileSync(file);
        const contentType = CONTENT_TYPES[path.extname(file)];
        response.writeHead(
          200,
          contentType ? { 'Content-Type': contentType } : {}
        );
        response.end(body);
      } catch {
        response.writeHead(404);
        response.end();
      }
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
  });

const launchOptions = () => {
  const browser =
    process.env.DEMO_CHROMIUM ||
    ['chromium', 'chromium-browser', 'google-chrome'].find(hasCommand);
  return browser
    ? {
        executablePath: browser.includes('/')
          ? browser
          : run('which', [browser]).trim(),
      }
    : {};
};

const createDemo = async (page, framesDir, outputBase) => {
  let frame = 0;
  let x = 0;
  let y = 0;

  const framePath = (index) =>
    path.join(framesDir, `f${String(index).padStart(5, '0')}.png`);

  // One screenshot per frame keeps the timing the same on any machine.
  const hold = async (frames = 1) => {
    const first = framePath(frame++);
    await page.screenshot({ path: first, caret: 'initial' });
    for (let i = 1; i < frames; i++) {
      linkSync(first, framePath(frame++));
    }
  };

  const place = async (nextX, nextY) => {
    x = nextX;
    y = nextY;
    await page.mouse.move(x, y);
    await page.evaluate(
      ([left, top]) => {
        document.getElementById('demo-cursor').style.transform =
          `translate(${left}px, ${top}px)`;
      },
      [x, y]
    );
  };

  const moveTo = async (selector, steps = 9) => {
    const box = await page.locator(selector).first().boundingBox();
    const targetX = box.x + box.width / 2;
    const targetY = box.y + box.height / 2;
    const startX = x;
    const startY = y;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const eased = t * t * (3 - 2 * t);
      await place(
        startX + (targetX - startX) * eased,
        startY + (targetY - startY) * eased
      );
      await hold();
    }
  };

  const click = async () => {
    await page.mouse.down();
    await page.mouse.up();
    await page.waitForTimeout(60);
    await hold(2);
  };

  const type = async (text, { perFrame = 1 } = {}) => {
    for (let i = 0; i < text.length; i += perFrame) {
      await page.keyboard.type(text.slice(i, i + perFrame));
      await page.waitForTimeout(30);
      await hold();
    }
  };

  // Headless Chromium has no print dialog, so show the real print output as a
  // sheet of paper over the page.
  const showPrint = async (frames = 34) => {
    const pdf = `${outputBase}.pdf`;
    const png = `${outputBase}.print.png`;
    await page.emulateMedia({ media: 'print' });
    await page.pdf({
      path: pdf,
      format: 'Letter',
      printBackground: true,
      margin: { top: '0.4in', right: '0.4in', bottom: '0.4in', left: '0.4in' },
    });
    await page.emulateMedia({ media: 'screen' });
    run('magick', [
      '-density',
      '160',
      `${pdf}[0]`,
      '-background',
      'white',
      '-flatten',
      png,
    ]);
    const source = `data:image/png;base64,${readFileSync(png).toString('base64')}`;
    await page.evaluate((src) => {
      const paper = document.createElement('div');
      paper.id = 'demo-paper';
      paper.innerHTML = `<img src="${src}" alt="">`;
      document.body.append(paper);
    }, source);
    await place(-100, -100);
    await page.waitForTimeout(150);
    await hold(frames);
  };

  return {
    page,
    click,
    hold,
    moveTo,
    place,
    showPrint,
    type,
    frames: () => frame,
  };
};

const addCursor = async (page) => {
  await page.addStyleTag({
    content: `
      #demo-cursor { height: 22px; left: 0; pointer-events: none; position: fixed; top: 0; width: 22px; z-index: 99999; }
      #demo-paper { align-items: center; background: rgba(16, 24, 64, 0.55); display: flex; inset: 0; justify-content: center; position: fixed; z-index: 99998; }
      #demo-paper img { box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35); height: calc(100vh - 40px); }
      @media print { #demo-cursor, #demo-paper { display: none; } }`,
  });
  await page.evaluate(() => {
    const cursor = document.createElement('div');
    cursor.id = 'demo-cursor';
    cursor.innerHTML =
      '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M4 2l15 12-7 1 4 8-3 1-4-8-5 5z" fill="#101840" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg>';
    document.body.append(cursor);
  });
};

const encode = (framesDir, gif, sheet) => {
  run('ffmpeg', [
    '-v',
    'error',
    '-y',
    '-framerate',
    String(FPS),
    '-i',
    path.join(framesDir, 'f%05d.png'),
    '-vf',
    'scale=iw/2:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=128:stats_mode=full[p];[b][p]paletteuse=dither=none:diff_mode=rectangle',
    '-loop',
    '0',
    gif,
  ]);
  const frames = readdirSync(framesDir).sort();
  const samples = Array.from({ length: 9 }, (_, i) =>
    path.join(framesDir, frames[Math.round((i * (frames.length - 1)) / 8)])
  );
  run('magick', [
    'montage',
    ...samples,
    '-tile',
    '3x3',
    '-geometry',
    '620x+3+3',
    '-background',
    '#888',
    sheet,
  ]);
};

const main = async () => {
  const name = process.argv[2];
  if (!name) {
    throw new Error('Usage: make demo STORY=<name>');
  }
  const missing = ['ffmpeg', 'magick'].filter(
    (command) => !hasCommand(command)
  );
  if (missing.length) {
    throw new Error(`Install these first: ${missing.join(', ')}`);
  }
  const story = await import(
    pathToFileURL(path.join(scriptDir, 'stories', `${name}.mjs`)).href
  );
  const { chromium } = createRequire(`${cacheDir}/tools/`)('playwright');

  const distDir = path.join(cacheDir, 'dist');
  const outDir = path.join(cacheDir, 'out');
  const framesDir = path.join(cacheDir, 'frames', name);
  rmSync(framesDir, { recursive: true, force: true });
  mkdirSync(framesDir, { recursive: true });
  mkdirSync(outDir, { recursive: true });
  const outputBase = path.join(outDir, name);

  run(
    './node_modules/.bin/vite',
    ['build', '--outDir', distDir, '--emptyOutDir'],
    {
      stdio: 'pipe',
    }
  );
  const server = await serve(distDir);
  const browser = await chromium.launch(launchOptions());
  try {
    const context = await browser.newContext({
      viewport: story.viewport ?? DEFAULT_VIEWPORT,
      deviceScaleFactor: 2,
      locale: 'en-US',
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.addInitScript(() => {
      window.print = () => {};
    });
    await page.goto(`http://127.0.0.1:${server.address().port}/`, {
      waitUntil: 'networkidle',
    });
    await page.waitForSelector('#ssid-');
    await addCursor(page);
    const demo = await createDemo(page, framesDir, outputBase);
    await story.default(demo);
    if (errors.length) {
      throw new Error(`The page threw errors: ${errors.join('; ')}`);
    }

    const gif = `${outputBase}.gif`;
    const sheet = `${outputBase}.sheet.png`;
    encode(framesDir, gif, sheet);
    const seconds = demo.frames() / FPS;
    console.log(`GIF:   ${gif}`);
    console.log(`Sheet: ${sheet}`);
    console.log(
      `${seconds.toFixed(1)}s, ${Math.round(statSync(gif).size / 1024)} KB`
    );
    if (seconds > MAX_SECONDS) {
      console.warn(`Warning: longer than ${MAX_SECONDS}s. Trim the story.`);
    }
  } finally {
    await browser.close();
    server.close();
  }
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
