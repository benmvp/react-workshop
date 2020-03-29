# Step 10 - Loading States

Up to this point, we've assumed that the Giphy API will quickly respond and never fail. But no matter how great the uptime of an API is, the user's internet connection can determine how long it takes to get a response and if the request fails or not.

🏅 The goal of this exercise is to add loading and error states to our app.

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

<details>
  <summary><b>Help! I didn't finish the previous step! 🚨</b></summary>

If you didn't successfully complete the previous step, you can jump right in by copying the step.

Complete the [setup instructions](../../README.md#setup) if you have not yet followed them.

Re-run the setup script, but use the previous step as a starting point:

```sh
npm run setup -- src/09-custom-hook
```

This will also back up your `src/workshop` folder, saving your work.

Now restart the app:

```sh
npm start
```

After some initial compiling, a new browser window should open up at http://localhost:3000/, and you should be able to continue on with the tasks below.

</details>

## 🐇 Jump Around

[Concepts](#-concepts) | [Tasks](#-tasks) | [Exercises](#-exercises) | [Elaboration & Feedback](#-elaboration--feedback) | [Resources](#-resources)

## ⭐ Concepts

- Managing loading & error states
- Using `useReducer`
- Leveraging ES6+ to maintain application state

## 📝 Tasks

### With `useState()`

Update `useGiphy` to keep track of the `status` of the API response and return it along with `results` & `setSearchParams`:

```js
const useGiphy = () => {
  const [searchParams, setSearchParams] = useState({})
  const [results, setResults] = useState([])
  const [status, setStatus] = useState('idle') // 👈🏾 NEW

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // 👇🏾 before API request
        setStatus('pending')

        const apiResponse = await getResults(searchParams)

        setResults(apiResponse.results)

        // 👇🏾 after successful API request
        setStatus('resolved')
      } catch (err) {
        console.error(err)
      }
    }

    fetchResults()
  }, [searchParams])

  // 👇🏾 returning `status` & `results` together as an object
  return [{ status, results }, setSearchParams]
}
```

Update `App` with the new return value from `useGiphy()` and pass `status` to `<Results />`:

```js
const App = () => {
  // Converted to object literal destructuring in order to get
  // out the 3 properties 👇🏾
  const [{ status, results }, setSearchParams] = useGiphy()

  return (
    <main>
      <h1>Giphy Search!</h1>

      <SearchForm
        onChange={setSearchParams}
        initialSearchQuery="friend"
        initialLimit={24}
      />
      {/* add status to Results 👇🏾 */}
      <Results items={results} status={status} />
    </main>
  )
}
```

Now display the loading indicator in `Results`:

```js
// new `status` prop added 👇🏾
const Results = ({ items, status }) => {
  const containerEl = useRef(null)
  const isLoading = status === 'idle' || status === 'pending'

  // 👇🏾 new loading indicator
  if (isLoading) {
    return (
      <section className="callout warning text-center">
        <p className="h3">Loading new results...</p>
      </section>
    )
  }

  return (
    items.length > 0 && (
      ...
    )
  )
}

Results.propTypes = {
  items: ...,
  // new prop type for `status` 👇🏾
  status: PropTypes.oneOf(['idle', 'pending', 'resolved']).isRequired,
}
```

> NOTE: You can change the value to `wait()` in [`api.js`](./api.js) to be higher to simulate a slow API response.

Display the loading indicator as well as the previous results using a Fragment:

```js
const Results = ({ items, status }) => {
  const isLoading = status === 'idle' || status === 'pending'

  return (
    <>
      {isLoading && (
        <section className="callout warning text-center">
          <p className="h3">Loading new results...</p>
        </section>
      )}
      {items.length > 0 && (
        ...
      )}
    </>
  )
}
```

---

### With `useReducer()`

In [`useGiphy.js`](./useGiphy.js), refactor the two `useState()` calls for `status` & `results` to a single call to `useReducer()`:

```js
const INITIAL_STATE = {
  status: 'idle',
  results: [],
}

// 👇🏾 brand new reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'started': {
      return {
        ...state,
        status: 'pending',
      }
    }
    case 'success': {
      return {
        ...state,
        status: 'resolved',
        results: action.results,
      }
    }
    default: {
      // In case we mis-type an action!
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const useGiphy = () => {
  const [searchParams, setSearchParams] = useState({})
  // 👇🏾 new reducer state
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // 👇🏾 dispatch action instead of directly setting state
        dispatch({ type: 'started' })

        const apiResponse = await getResults(searchParams)

        // 👇🏾 dispatched action will set two state properties
        dispatch({ type: 'success', results: apiResults })
      } catch (err) {
        console.error(err)
      }
    }

    fetchResults()
  }, [searchParams])

  return [state, setSearchParams]
}
```

## 💡 Exercises

- Display an error state if the API fails to successfully return
  - Can display with the previous results, but should hide when new results are requested
  - Use the `'rejected'` status
  - 🔑 _HINT:_ `throw new Error('Fake error!')` in [`api.js`](./api.js) to easily simulate this case

## 🧠 Elaboration & Feedback

After you're done with the exercise and before jumping to the next step, please fill out the [elaboration & feedback form](https://docs.google.com/forms/d/e/1FAIpQLScRocWvtbrl4XmT5_NRiE8bSK3CMZil-ZQByBAt8lpsurcRmw/viewform?usp=pp_url&entry.1671251225=React+FUNdamentals+Workshop&entry.1984987236=Step+10+-+Loading+States). It will help seal in what you've learned.

## 👉🏾 Next Step

Go to [Final Quiz!](../quiz/).

## 📕 Resources

- [`useReducer` API reference](https://reactjs.org/docs/hooks-reference.html#usereducer)
- [Fragments](https://reactjs.org/docs/fragments.html)
- [Stop using isLoading booleans](https://kentcdodds.com/blog/stop-using-isloading-booleans)
- [Don't Sync State. Derive It](https://kentcdodds.com/blog/dont-sync-state-derive-it)
- [Should I useState or useReducer](https://kentcdodds.com/blog/should-i-usestate-or-usereducer)

## ❓ Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
