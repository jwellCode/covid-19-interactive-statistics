# COVID-19 Interactive Statistics

## Prerequisites

- [Node.js](https://nodejs.org/) 14 (or later)

## Local setup

### Dependencies

To install all of the app's dependencies, run:

```sh
npm install
```

## Scripts

The [`package.json`](/package.json) provides various different scripts that
simplify development and deployment.

The scripts can be run like this:

```sh
npm run <script>
```

The following scripts are currently available:

| Script     | Description                                                                          |
| ---------- | ------------------------------------------------------------------------------------ |
| `fmt`      | Formats all files with [Prettier](https://prettier.io/).                             |
| `dev`      | Starts the development server.                                                       |
| `build`    | Builds the app for production.                                                       |
| `start`    | Runs the production app.                                                             |
| `generate` | Generates the app statically for production (Requires a `npm run build` step first). |

## License

[MIT License](/LICENSE)

Copyright © 2021 [Heinrich Grothe](https://github.com/justheinze),
[Judith Herrchen](https://github.com/zi-mt),
[Jason Theiler](https://github.com/jasontheiler),
[Justin Weller](https://github.com/jwellCode)
