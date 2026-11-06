---
name: pr-demo
description: Record a demo GIF of a visual change and add it to the PR. Use for any PR that changes what users see, including layout, styling, copy and print output.
---

# PR demo GIFs

A demo shows a reviewer the change without running the branch. Keep it to the
change itself, not a tour of the app.

You need `ffmpeg`, ImageMagick and Chromium. `make demo` installs Playwright
into the ignored `.cache/` folder, so it never becomes a project dependency.

## Steps

1. Write a story in `scripts/demo/stories/<name>.mjs`, using `card-styles.mjs`
   as the example. Name it after the feature.
2. Record it:

   ```sh
   make demo STORY=<name>
   ```

3. Read `.cache/demo/out/<name>.sheet.png`, which shows nine frames from the
   GIF. Check that nothing is clipped and each step shows what you intended.
   Fix the story and record again if not.
4. Open the PR, then publish:

   ```sh
   make demo.publish STORY=<name> PR=<number>
   ```

   This uploads the GIF to the `pr-assets` branch and adds it to the top of
   the PR description. Run it again to replace the GIF.

5. Commit the story with the change, so the demo can be recorded again.

Never commit GIFs for PRs to the repo. `docs/demo.gif` is the README's GIF, and
the only one that belongs on master.

## Writing a story

A story exports `alt`, a description of the GIF, and a default async function
that receives these helpers:

| Helper             | What it does                                    |
| ------------------ | ----------------------------------------------- |
| `moveTo(selector)` | Glides the cursor to an element                 |
| `click()`          | Clicks where the cursor is                      |
| `type(text)`       | Types into the focused element, one frame a key |
| `hold(frames)`     | Pauses, at 12.5 frames per second               |
| `place(x, y)`      | Moves the cursor instantly                      |
| `showPrint()`      | Ends on the real print output                   |
| `page`             | The Playwright page                             |

Export `viewport` to change the 1100×790 default. Use a taller one if a
portrait card gets cut off.

## Guidelines

- Aim for 10–20 seconds. Hold on each result for at least a second.
- End on the result of the change.
- Use made-up network details, such as `MyGuestNetwork`. Never use real ones.
- Skip anything already covered, such as by filling fields with `page.fill`.
- For print changes, finish with `showPrint()`. Headless Chromium has no print
  dialog, so it shows the print output as a sheet of paper. Say so in the PR.
- Say in the PR if anything else in the GIF isn't the literal app UI.
- If a change also affects phones, record a story with an iPhone-size
  `viewport`, and check it in the sheet.
