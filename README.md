# <img width="32" src="./public/images/wifi.png" alt=""> WiFi Card

Print a card with a QR code so guests can join your WiFi. Your details never leave your browser.

**[wificard.io](https://wificard.io)**

[![Demo of filling in and printing a WiFi card](./docs/demo.gif)](https://wificard.io)

## Features

- **Private:** your WiFi details are never sent to a server, with no tracking or analytics
- **Scan to connect:** works with WPA/WPA2/WPA3, WPA2-EAP, WEP, open and hidden networks
- **Print your way:** landscape or portrait, multiple cards, optional hidden password
- **40+ languages,** including right-to-left, thanks to our contributors

## Self-host

```sh
docker run --rm -p 8080:80 bndw/wifi-card
```

Then open http://localhost:8080.

## Development

With [Yarn](https://yarnpkg.com/) installed, start the live-reload server on http://localhost:3000:

```sh
make dev
```

[Prettier](https://prettier.io/) runs as a pre-commit hook and in CI. Use `make fmt.write` to format your changes.

## Translating

Translations are welcome, and new labels are often a good place to start: anything not yet translated falls back to English.

1. Add or update your language in [`src/translations.js`](./src/translations.js):

   ```js
   {
     id: 'de-DE', // Locale code
     name: 'German - Deutsch', // Format: 'latinName - nativeName'
     rtl: false, // Optional, true for right-to-left languages
     translation: {
       // ...
     },
   }
   ```

2. Add a new language to the table below.

## Languages

<details>
<summary>42 languages, translated by our contributors</summary>

| Language                         | Author Credit                                     |
| -------------------------------- | ------------------------------------------------- |
| Arabic                           | [Ahmed Tokyo](https://github.com/a-tokyo)         |
| Bangla                           | [Tarek Hasan](https://github.com/Tarek-Hasan)     |
| Cantonese (Simplified)           | [ous50](https://github.com/ous50)                 |
| Catalan                          | [aniol](https://github.com/aniol)                 |
| Chinese (Simplified)             | [Baoyuantop](https://github.com/Baoyuantop)       |
| Chinese (Traditional, Hong Kong) | [YuetAu](https://github.com/YuetAu)               |
| Chinese (Traditional, Taiwan)    | [Dxball](https://github.com/dxball)               |
| Czech                            | [yukidevv](https://github.com/yukidevv)           |
| Danish                           | [dk90103](https://github.com/dk90103)             |
| Dutch                            | [wouterbrink](https://github.com/wouterbrink)     |
| English                          | [bndw](https://github.com/bndw)                   |
| Esperanto                        | [zeecho](https://github.com/zeecho)               |
| French                           | [Divlo](https://github.com/Divlo)                 |
| German                           | [devofthings](https://github.com/devofthings)     |
| German (Swiss)                   | [NZehnder](https://github.com/NZehnder)           |
| Greek                            | [nautilus7](https://github.com/nautilus7)         |
| Hebrew                           | [Ido Bronfeld](https://github.com/HelloWorldIL)   |
| Hindi                            | [Pushpender](https://github.com/PushpenderSaini0) |
| Hungarian                        | [munkacsimark](https://github.com/munkacsimark)   |
| Indonesian                       | [nyancodeid](https://github.com/nyancodeid)       |
| Italian                          | [Domenico Pascucci](https://github.com/pasmimmo)  |
| Japanese                         | [hatsu38](https://github.com/hatsu38)             |
| Korean                           | [Seungbin Oh](https://github.com/sboh1214)        |
| Malagasy                         | [mpilasy](https://github.com/mpilasy)             |
| Malay (Malaysia)                 | [hh-shiung](https://github.com/hh-shiung)         |
| Norwegian                        | [tplive](https://github.com/tplive)               |
| Occitan                          | [ensag-dev](https://github.com/ensag-dev)         |
| Persian                          | [Ramin](https://github.com/raminr77)              |
| Polish                           | [olekstomek](https://github.com/olekstomek)       |
| Portuguese                       | [pedrorenan](https://github.com/pedrorenan)       |
| Portuguese (Brazil)              | [ismaelpereira](https://github.com/ismaelpereira) |
| Punjabi                          | [phoenixgill34](https://github.com/phoenixgill34) |
| Russian                          | [Teraskull](https://github.com/Teraskull)         |
| Serbian (Cyrillic)               | [demanderbag](https://github.com/demanderbag)     |
| Serbian (Latin)                  | [demanderbag](https://github.com/demanderbag)     |
| Slovak                           | [matejkubinec](https://github.com/matejkubinec)   |
| Spanish                          | [oscfdezdz](https://github.com/oscfdezdz)         |
| Swedish                          | [ddund](https://github.com/ddund)                 |
| Thai                             | [l2D](https://github.com/l2D)                     |
| Turkish                          | [Riza Ergun](https://github.com/rizaergun)        |
| Ukrainian                        | [Teraskull](https://github.com/Teraskull)         |
| Urdu                             | [mHassan11](https://github.com/mHassan11)         |

</details>

## License

[MIT](./LICENSE.md)
