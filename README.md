![ci](https://github.com/bndw/wifi-card/workflows/ci/badge.svg)

# <img width="32px" src="./public/images/wifi.png"> WiFi Card

https://wificard.io

Print a simple card with your WiFi login details. Tape it to the fridge, keep it in your wallet, etc.

![wificard](https://user-images.githubusercontent.com/4248167/125180713-2f5d3d00-e1b2-11eb-88f8-be5b4db4e0b1.gif)

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
