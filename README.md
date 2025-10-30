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

## Known issues & suggested improvements

A short list of areas that have been identified for improvement:

- Fix duplicate onClose call in AddTransaction component (redundant invocation).
- Correct percent calculation in the stats pie chart (use the current slice amount, not an incorrect reference).
- Remove stray console.log statements left in chart formatters.
- Rename misspelled prop `isCompatabible` to `isCompatible` across components to avoid bugs.
- Memoize expensive derived data (grouping, filtering, aggregation) with React `useMemo` or `useCallback` to reduce repeated work on render.
- Avoid using `window` or `document` during initial render to keep components SSR-safe; initialize state and update in `useEffect`.
- Standardize date handling and normalization to avoid timezone-dependent bugs.
- Add PropTypes or migrate to TypeScript for clearer component contracts.
- Add unit tests for utilities and key components; add CI to run lint/tests on push.

If you'd like, I can open a targeted PR that implements the top-priority fixes above.

## Contributing

Contributions are welcome. Please open an issue or a pull request with a clear description of the change.

## License

This project is provided as-is. Add a license as appropriate.
