# Agent guide

WiFi Card is a React app built with Vite. It prints a card with a QR code for
joining a WiFi network, and everything runs in the browser.

## Commands

- `make dev`: start the dev server on http://localhost:3000
- `make fmt`: check formatting with Prettier
- `make fmt.write`: fix formatting

## Pull requests

- Use conventional commits.
- PRs are squash merged.
- Never send network details anywhere. The README promises they don't leave
  the browser.

## Visual changes

Any PR that changes what users see must include a demo GIF at the top of the
PR description. Use the `pr-demo` skill. This covers layout, styling, copy and
print output. Refactors with no visible change don't need one.
