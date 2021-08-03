![ci](https://github.com/bndw/wifi-card/workflows/ci/badge.svg)

# <img width="32px" src="./public/images/wifi.png"> WiFi Card

https://wificard.io

Print a simple card with your WiFi login details. Tape it to the fridge, keep it in your wallet, hang on the wall for guests at home or in the hotel, etc.

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

This project uses [Prettier](https://prettier.io/) formatting. All pull requests must pass the automated lint checks before merging. Prettier format is run automatically as a pre-commit hook.

## Language Contribution Guide

We would love for you to contribute to different languages and help make it even better than it is today! As a language contributor, here are some steps we would like you to follow:

1. Add a translation to [`./src/i18n.js`](./src/i18n.js)
2. Add the language option to [`./src/App.js`](./src/App.js) in the format `latinName - nativeName`, e.g. `French - Français`
3. If the languages added require RTL direction, add the language keys to RTL_LANGUAGES constant in ./src/App.js.
4. Add an entry to the translation-table in README.md.

## Supported Languages

| Language            | Author Credit                                     |
| ------------------- | ------------------------------------------------- |
| English             | [bndw](https://github.com/bndw)                   |
| Chinese             | [Baoyuantop](https://github.com/Baoyuantop)       |
| Spanish             | [oscfdezdz](https://github.com/oscfdezdz)         |
| Portuguese          | [pedrorenan](https://github.com/pedrorenan)       |
| Portuguese (Brazil) | [ismaelpereira](https://github.com/ismaelpereira) |
| Japanese            | [hatsu38](https://github.com/hatsu38)             |
| Russian             | [Teraskull](https://github.com/Teraskull)         |
| Ukrainian           | [Teraskull](https://github.com/Teraskull)         |
| Dutch               | [wouterbrink](https://github.com/wouterbrink)     |
| French              | [Divlo](https://github.com/Divlo)                 |
| Turkish             | [Riza Ergun](https://github.com/rizaergun)        |
| Hindi               | [Pushpender](https://github.com/PushpenderSaini0) |
| Catalan             | [aniol](https://github.com/aniol)                 |
| German              | [devofthings](https://github.com/devofthings)     |
| Indonesia           | [nyancodeid](https://github.com/nyancodeid)       |
| Polish              | [olekstomek](https://github.com/olekstomek)       |
| Arabic              | [Ahmed Tokyo](https://github.com/a-tokyo)         |
| Occitan             | [ensag-dev](https://github.com/ensag-dev)         |
| Italian             | [Domenico Pascucci](https://github.com/pasmimmo)  |
| Norwegian           | [tplive](https://github.com/tplive)               |
| Korean              | [Seungbin Oh](https://github.com/sboh1214)        |
