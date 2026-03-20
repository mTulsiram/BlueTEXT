# BlueTEXT

BlueTEXT is a purely client-side Single-Page Application (SPA) suite of web tools, intended to run entirely in the browser with zero backend server dependencies. It includes a vast collection of tools, games, and resources, mobile and desktop friendly.

## Features

- **Tools**: Includes a Calculator, Markdown Editor, JSON Formatter, Password Generator, GitHub README Generator, Regex Tester, and more.
- **Games**: Features classic games like 2048, Snake, Minesweeper, Tic-Tac-Toe, and Connect 4.
- **Learn**: Offers guides and tutorials for HTML, CSS, JavaScript, Web APIs, and Git.
- **Zero Backend**: All processing happens securely in your browser.
- **Client-Side Includes**: Dynamic components like headers and footers are fetched on the fly (`scripts/includes.js`).
- **Custom SPA Router**: A lightweight vanilla JS router (`scripts/router.js`) handles navigation without page reloads.

## Development

BlueTEXT follows modern ES6+ JavaScript standards and utilizes pure vanilla HTML, CSS, and JS with **no external frameworks**.

### Running Locally

To run the site locally and avoid CORS issues with client-side includes, use a local web server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## Security

User input sanitization is carefully handled with vanilla JavaScript, avoiding dependencies on external libraries. Strict allowlisting and escaping are implemented where necessary (e.g., in the mathematical expression evaluation for the Calculator).
