# Spendly

A lightweight personal finance web app for tracking income and expenses, visualizing categories, and inspecting transaction history.

## Features

- Track income and expenses by category and date
- Monthly and yearly views with charts and summaries
- Category breakdowns with pie and line charts
- Responsive UI with light/dark support

## Tech Stack

- React
- ECharts (echarts-for-react)
- Redux / Redux Toolkit
- Tailwind CSS

## Prerequisites

- Node.js >= 16
- npm or yarn

## Setup

1. Clone the repository

   git clone https://github.com/AjithkumarJM/Spendly
   cd Spendly

2. Install dependencies

   npm install
   # or
   yarn install

3. Run the app locally

   npm start
   # or
   yarn start

The app will run on http://localhost:3000 by default.

## Build

   npm run build
   # or
   yarn build

## Scripts

- start: start the dev server
- build: create a production build
- lint: run linter (if configured)
- test: run tests (if configured)

## Development notes

- UI styling uses Tailwind utility classes.
- Charts are implemented with ECharts via the `echarts-for-react` wrapper.
- Date handling in the codebase uses the native Date API; consider using date-fns or Luxon for consistent timezone handling.
- Screen-size detection reads `document.documentElement.classList` for dark mode and may need SSR guards if server-side rendering is introduced.

## Planned enhancements

A short list of planned enhancements to improve stability, performance, and the developer experience:

- Improve performance by memoizing expensive derived data and optimizing component renders.
- Standardize date handling and timezone normalization using a dedicated date library (e.g. date-fns or Luxon).
- Enhance SSR-safety by avoiding direct access to window/document during initial render.
- Add type checking (PropTypes or a gradual migration to TypeScript) to clarify component contracts.
- Add unit tests, linting, and CI to maintain long-term code quality.
- Continue incremental UX and accessibility improvements.

If you'd like, I can open a targeted PR that implements one or more of these enhancements.

## Contributing

Contributions are welcome. Please open an issue or a pull request with a clear description of the change.

## License

This project is provided as-is. Add a license as appropriate.
