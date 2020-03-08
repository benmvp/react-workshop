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
- async-based approach next
- `console.log` the results
- Exercise:

4.  Form Submit

- Add form wrapper
- Add Go submit button
- Add `useState` for searchQuery to switch from instant results
- Exercise/Bonus: instant search checkbox

5.  Lists

- Display `<video>` for each result
- Use `key`
- Exercise: Add limits <select>
- Bonus: Add rating radio
- Notice: When we change limits, the UI doesn't re-render

6.  Components

- Create `SearchForm` with `onChange` handler returning params (updated `useState`)
- Create `GiphyResults` & `GiphyItem` components
- Add PropTypes
- Exercise: Add props to App
- Exercise: Make `InputField`, `SelectField`, `RadioGroup` & `Checkbox` components
- Bonus: Clicking on `GiphyItem` stops auto-loop

7.  Custom Hook

- Create `useGiphy` hook, that takes in params, wraps `useState` + `useEffect`, returns results

8.  Styling

- Layout the `SearchForm` nicely
- Layout the `GiphyResults` in flex-wrap
- Make `GiphyItem` look different when paused (use `classnames` lib)

9.  Loading States

- Switch over to `useReducer` (feels like overkill)
- Add in `status` + `error`, return object in `useGiphy`
- Display loading state in UI (use slower API function)
- Explain why we're not clearing the results when loading (see: https://kentcdodds.com/blog/stop-using-isloading-booleans)
- Exercise: Display error state w/o clearing results

10. Pagination

- Exercise build a pagination component to display above and below results
- Has "Next" & "Previous" buttons/links
- Hook it into `offset` of `useGiphy`
- Bonus: Show first, last and some pages to jump to based (on `total_count` from API)
