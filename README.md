![ci](https://github.com/bndw/wifi-card/workflows/ci/badge.svg)

# <img width="32px" src="./public/images/wifi.png"> WiFi Card

https://wificard.io

Print a simple card with your WiFi login details. Tape it to the fridge, keep it in your wallet, etc.

![wificard](https://user-images.githubusercontent.com/48166553/125853182-49fd361d-5797-4989-afbf-e6a617945be2.gif)

## Running locally

Run the official Docker image on http://localhost:8080

```
make run
```

## Development

1. Make sure you have `yarn` installed
2. Run the live-reload server on http://localhost:3000
   ```
   make dev
   ```

This project uses [Prettier](https://prettier.io/) formatting and all pull requests must pass
the automated lint checks prior to merging.

Run the lint check with:

```
make fmt
```

Rewrite the files to resolve any style issues with:

```
make fmt.write
```

## Language Contribution Guide

We would love for you to contribute to different languages and help make it even better than it is today! As a language contributor, here are some steps we would like you to follow:

1. Add a translation to [`./src/i18n.js`](./src/i18n.js)
2. Add the language option to `./src/App.js`. Use the format e.g. `French (Français)`
3. If the languages added require RTL direction, add the language keys to RTL_LANGUAGES constant in ./src/App.js.
4. Add an entry to the translation-table in README.md.

## Supported Languages

| Language   | Author Credit                                 |
| ---------- | --------------------------------------------- |
| English    | [bndw](https://github.com/bndw)               |
| Chinese    | [Baoyuantop](https://github.com/Baoyuantop)   |
| Spanish    | [oscfdezdz](https://github.com/oscfdezdz)     |
| Portuguese | [pedrorenan](https://github.com/pedrorenan)   |
| Japanese   | [hatsu38](https://github.com/hatsu38)         |
| Russian    | [Teraskull](https://github.com/Teraskull)     |
| Ukrainian  | [Teraskull](https://github.com/Teraskull)     |
| Dutch      | [wouterbrink](https://github.com/wouterbrink) |
| French     | [Divlo](https://github.com/Divlo)             |
| Turkish    | [Riza Ergun](https://github.com/rizaergun)    |
