# Martins Store: Landing Page

A responsive landing page for **Martins Store**, a beer and beverage retailer in Idagba, Efon-Alaaye, Ekiti State. Built with HTML, CSS, and vanilla JavaScript.

## Features
- Fully responsive layout for phone, tablet, and desktop
- Hero section, seasonal discount banner, and services
- Searchable, filterable price lists for beers and beverages
- One-tap WhatsApp ordering with a pre-filled message for each product
- "Open now / Closed now" badge based on Nigerian time
- Brand strips and tickers between sections
- Photo gallery, contact cards, and a floating WhatsApp button
- Mobile menu, scroll animations, and reduced-motion support
- Local business structured data for search engines

## Project structure
```
index.html   Page content
style.css    All styling
script.js    Price lists and interactivity
images/      Logos and photos
```

## Updating prices
Open `script.js` and edit the `BEERS` and `BEVERAGES` lists at the top. Each line looks like this:

```js
{ b: "ib", n: "Trophy Lager", pack: "12 × 60cl", price: 9000 },
```
Add `approx: true` to show a price as approximate (≈).

## Run it locally
1. Download or clone this repository.
2. Open `index.html` in any browser (an internet connection is needed for fonts).

## Built with
HTML5 · CSS3 · JavaScript

## Author
**Ayodele John Olatunji**
