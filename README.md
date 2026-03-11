![ci](https://github.com/bndw/wifi-card/workflows/ci/badge.svg)

# <img width="32px" src="./public/images/wifi.png"> WiFi Card

https://wificard.io

Print a simple card with your WiFi login details. Tape it to the fridge, keep it in your wallet, hang on the wall for guests at home or in the hotel, etc.

<a href="https://wificard.io/">
   <img alt="wificard" src="https://user-images.githubusercontent.com/48166553/129261875-169841ab-e997-4596-af7f-ada0f68cd230.gif">
</a>

<a href="https://thiswebsitedoesnottrackyou.com/">
   <img width="402" alt="This website does not track you" src="https://user-images.githubusercontent.com/4248167/184430158-849d4b2c-de43-483f-86fe-0743b23bc40c.png">
</a>

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

1. Add a translation to [`./src/translations.js`](./src/translations.js). Here's an example of the German translation:

   ```
   {
      id: 'de-DE',              // locale code
      name: 'German - Deutsch', // Display name in the format 'latinName - nativeName'
      rtl: false,               // Optional, true if this is a right-to-left language
      translation: {
         ...
      }
   }
   ```

2. Append an entry to the [Supported Languages](#supported-languages) table below.

## Supported Languages

| Language                     | Author Credit                                      |
| ---------------------------- | -------------------------------------------------- |
| Arabic                       | [Ahmed Tokyo](https://github.com/a-tokyo)          |
| Bangla                       | [Tarek Hasan](https://github.com/Tarek-Hasan)      |
| Catalan                      | [aniol](https://github.com/aniol)                  |
| Cantonese Simplified         | [ous50](https://github.com/ous50)                  |
| Chinese                      | [Baoyuantop](https://github.com/Baoyuantop)        |
| Chinese Traditional (Taiwan) | [Dxball](https://github.com/dxball)                |
| Danish                       | [dk90103](https://github.com/dk90103)              |
| Dutch                        | [wouterbrink](https://github.com/wouterbrink)      |
| English                      | [bndw](https://github.com/bndw)                    |
| Esperanto                    | [zeecho](https://github.com/zeecho)                |
| French                       | [Divlo](https://github.com/Divlo)                  |
| German                       | [devofthings](https://github.com/devofthings)      |
| German (Swiss)               | [NZehnder](https://github.com/NZehnder)            |
| Greek                        | [nautilus7](https://github.com/nautilus7)          |
| Hebrew                       | [Ido Bronfeld](https://github.com/HelloWorldIL)    |
| Hindi                        | [Pushpender](https://github.com/PushpenderSaini0)  |
| Hungarian                    | [munkacsimark](https://github.com/munkacsimark)    |
| Indonesia                    | [nyancodeid](https://github.com/nyancodeid)        |
| Italian                      | [Domenico Pascucci](https://github.com/pasmimmo)   |
| Japanese                     | [hatsu38](https://github.com/hatsu38)              |
| Korean                       | [Seungbin Oh](https://github.com/sboh1214)         |
| Malagasy                     | [mpilasy](https://github.com/mpilasy)              |
| Malay (Malaysia)             | [hh-shiung](https://github.com/hh-shiung)          |
| Norwegian                    | [tplive](https://github.com/tplive)                |
| Occitan                      | [ensag-dev](https://github.com/ensag-dev)          |
| Persian                      | [Ramin](https://github.com/raminr77)               |
| Polish                       | [olekstomek](https://github.com/olekstomek)        |
| Portuguese                   | [pedrorenan](https://github.com/pedrorenan)        |
| Portuguese (Brazil)          | [ismaelpereira](https://github.com/ismaelpereira)  |
| Punjabi                      | [phoenixgill34](https://github.com/phoenixgill34)  |
| Russian                      | [Teraskull](https://github.com/Teraskull)          |
| Serbian                      | [demanderbag](https://github.com/demanderbag)      |
| Slovak                       | [matejkubinec](https://github.com/matejkubinec)    |
| Spanish                      | [oscfdezdz](https://github.com/oscfdezdz)          |
| Swedish                      | [ddund](https://github.com/ddund)                  |
| Thai                         | [l2D](https://github.com/l2D)                      |
| Turkish                      | [Riza Ergun](https://github.com/rizaergun)         |
| Ukrainian                    | [Teraskull](https://github.com/Teraskull)          |
| Urdu                         | [mHassan11](https://github.com/mHassan11)          |
