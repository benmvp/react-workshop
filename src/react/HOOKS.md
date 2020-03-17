# Hooks-based workshop

Rendering giphy search results

## Steps:

0.  Begin
1.  JSX
1.  Query Field

- `useState` to maintain controlled query component
- Exercise:

3.  API

- `useEffect` to call API
- Promise-based approach first
- `console.log` the results
- async-based approach next

4.  Lists

- Display `<video>` for each result
- Use `key`
- Exercise: Link title to URL & display rating
- Exercise: Add limits <select>
- Notice: When we change limits, the UI doesn't re-render

5.  Form Submit

- Add `onSubmit`
- Add `useState` for searchQuery to switch from instant results
- Add Go submit button
- Exercise: instant search checkbox
- Bonus: Add rating radio

6.  Components

- Create `Results`
- Create `SearchForm` with `onChange` handler returning params (updated `useState`)
  - Mention `InputField`, `SelectField`, `RadioGroup` & `Checkbox` components would come from a component library
- Add PropTypes
- Exercise: Add `ResultsItem` component + Prop types
- Exercise: Add form field props to `SearchForm`
- Bonus: Clicking on `ResultsItem` stops auto-loop
- Bonus: Make `ResultsItem` look different when paused (use `classnames` lib)

7.  Custom Hook

- Create `useGiphy` hook, that takes in params, wraps `useState` + `useEffect`, returns results

8.  Loading States

- Switch over to `useReducer` (feels like overkill)
- Add in `status` + `error`, return object in `useGiphy`
- Display loading state in UI (use slower API function)
- Explain why we're not clearing the results when loading (see: https://kentcdodds.com/blog/stop-using-isloading-booleans)
- Exercise: Display error state w/o clearing results

Quiz / Homework: Pagination

- Exercise build a pagination component to display above and below results
- Has "Next" & "Previous" buttons/links
- Hook it into `offset` of `useGiphy`
- Bonus: Show first, last and some pages to jump to (based on `total_count` from API)
