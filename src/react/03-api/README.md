# Step 3 - API

The goal of this step is to retrieve a list of giphy images based on the query typed in the query input field from [Step 2](../02-query-field). We'll do this by using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and [ES6 Promises](http://www.benmvp.com/learning-es6-promises/) to retrieve the data from the [Giphy API](https://developers.giphy.com/docs/api/endpoint/), and then store the data in app state.

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
cp -r src/react/02-query-field src/workshop
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

- Making API calls with the `useEffect` hook
- Using Promises
- Maintaining app state with the `useState` hook

## Tasks

Import the `getResults` API helper with `useEffect` from React, and call `getResults` within `useEffect`, passing in the value of the input field:

```js
import React, { useState, useEffect } from 'react'
import { getResults } from './api'

const App = () => {
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    getResults({ searchQuery: inputValue })
  }, [inputValue])

  return (
    <main>
      <h1>Giphy Search!</h1>

      <form>
        <input
          type="search"
          placeholder="Search Giphy"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
          }}
        />
      </form>
    </main>
  )
}

export default App
```

> NOTE: Be sure to import `useEffect` from the `react` package.

The `useEffect` hook lets you perform side effects in your component. Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects. Because `getResults` is making an API call, we call it inside of `useEffect()`.

You can check the Network panel of your Developer Tools to see that it is making an API call for every character typed within the query input field. The path to interactivity has begun.

The second parameter to `useEffect()` is an array of its dependencies. It's all the variables that are used within the hook in order to determine when `useEffect()` should be called again. For instance, if you set the dependencies to `[]` it will only run one time.

In order to render the giphy images we need to store the results in state, once again leveraging `useState`:

```js
const [inputValue, setInputValue] = useState('')
const [results, setResults] = useState([])

useEffect(() => {
  getResults({ searchQuery: inputValue }).then((results) => setResults(results))
}, [inputValue])

console.log({ inputValue, results })
```

When the `Promise` returned by `getResults` resolves, we set the results in state using `setResults` that we got from our second call to `useState()`. When we log `inputValue` & `results` to the console, we see how they change over time as we type into the query input field. We're getting data back!

If you prefer to use [`async` functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) over Promises, you can do that too:

```js
useEffect(() => {
  const fetchResults = async () => {
    setResults(await getResults({ searchQuery: inputValue }))
  }

  fetchResults()
}, [inputValue])
```

You **cannot** make the `useEffect()` function `async` because its optional return value needs to be a ["cleanup" function](https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup). If you make the function `async`, you'll now be returning a `Promise`. Don't worry, the React code will catch this happening and warn you about it.

## Exercises

- Type in different search queries and verify the results by digging into the log and navigating to URLs
- Take a look at [`api.js`](./api.js) and see what the API helper does, particularly the other search filters it supports

## Next

Go to [Step 4 - Lists](../04-lists/).

## Resources

- [Using the Effect Hook](https://reactjs.org/docs/hooks-effect.html)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) & Github's [`fetch` polyfill](https://github.com/github/fetch)
  - [Learning ES6: Promises](http://www.benmvp.com/learning-es6-promises/)
  - [Async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
  - [HTTP Methods](http://restfulapi.net/http-methods/)
  - [Postman](https://www.getpostman.com/)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
