# Step 9 - Loading States

Up to this point, we've assumed that the Giphy API will quickly respond and never fail. But no matter how great the uptime of an API is, the user's internet connection can determine how long it takes to get a response and if the request fails or not.

The goal of this exercise is to add loading and error states to our app.

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

<details>
  <summary><b>Help! I didn't finish the previous step!</b></summary>

If you didn't successfully complete the previous step, you can jump right in by copying the step.

Complete the [setup instructions](../00-begin) if you have not yet followed them.

Ensure you're in the root folder of the repo:

```sh
cd react-workshop
```

Remove the existing workshop directory if you had previously started elsewhere:

```sh
rm -rf src/workshop
```

Copy the previous step as a starting point:

```sh
cp -r src/react/08-custom-hook src/workshop
```

Ensure [`src/index.js`](../../index.js#L3) is still pointing to the `workshop` App:

```js
import App from './workshop/App'
```

Start the app:

```sh
npm start
```

After the app is initially built, a new browser window should open up at [http://localhost:3000/](http://localhost:3000/), and you should be able to continue on with the tasks below.

</details>

## Jump Around

[Concepts](#concepts) | [Tasks](#tasks) | [Exercises](#exercises) | [Resources](#resources)

## Concepts

- Managing loading & error states
- Using `useReducer`

## Tasks

### With `useState()`

Update `useGiphy` to keep track of the `status` of the API response and return it along with `results` & `setSearchParams`:

```js
const useGiphy = () => {
  const [searchParams, setSearchParams] = useState({})
  const [results, setResults] = useState([])
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setStatus('pending')

        const apiResponse = await getResults(searchParams)

        setResults(apiResponse.results)
        setStatus('resolved')
      } catch (err) {
        console.error(err)
      }
    }

    fetchResults()
  }, [searchParams])

  // returning `status` & `results` together as an object
  return [{ status, results }, setSearchParams]
}
```

Update `App` with the new return value from `useGiphy()` and pass `status` to `<Results />`:

```js
const App = () => {
  // Converted to object literal destructuring in order to get
  // out the 3 properties
  const [{ status, results }, setSearchParams] = useGiphy()

  return (
    <main>
      <h1>Giphy Search!</h1>

      <SearchForm
        onChange={setSearchParams}
        initialSearchQuery="friend"
        initialLimit={6}
      />
      <Results items={results} status={status} />
    </main>
  )
}
```

Now display the loading indicator in `Results`:

```js
const Results = ({ items, status }) => {
  const isLoading = status === 'idle' || status === 'pending'

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
  status: PropTypes.oneOf(['idle', 'pending', 'resolved']).isRequired,
}
```

> NOTE: You can change the value to `wait()` in [`api.js`](./api.js) to be higher to simulate a slow API response.

Display the loading indicator as well as the previous results:

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
        <section className="callout primary">
          {items.map((item) => (
            <ResultsItem
              key={item.id}
              id={item.id}
              title={item.title}
              url={item.url}
              rating={item.rating}
              previewUrl={item.previewUrl}
            />
          ))}
        </section>
      )}
    </>
  )
}
```

---

### With `useReducer()`

In [`useGiphy.js`](./useGiphy.js), refactor the two `useState()` calls for `status` & `results` to a single call to `useReducer()`:

```js
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
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  useEffect(() => {
    const fetchResults = async () => {
      try {
        dispatch({ type: 'started' })

        const apiResponse = await getResults(searchParams)

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

## Exercises

- Display an error state if the API fails to successfully return
  - Can display with the previous results, but should hide when new results are requested
  - Use the `'rejected'` status
  - _Hint:_ `throw new Error('Fake error!')` in [`api.js`](./api.js) to simulate this case

## Next

Go to [Step 10 - Quiz](../10-quiz/).

## Resources

- [`useReducer` API reference](https://reactjs.org/docs/hooks-reference.html#usereducer)
- [Fragments](https://reactjs.org/docs/fragments.html)
- [Stop using isLoading booleans](https://kentcdodds.com/blog/stop-using-isloading-booleans)
- [Don't Sync State. Derive It](https://kentcdodds.com/blog/dont-sync-state-derive-it)
- [Should I useState or useReducer](https://kentcdodds.com/blog/should-i-usestate-or-usereducer)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
