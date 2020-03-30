# Step 3 - API

🏅 The goal of this step is to retrieve a list of giphy images based on the query typed in the query input field from [Step 2](../02-query-field). We'll do this by using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and [ES6 Promises](http://www.benmvp.com/learning-es6-promises/) to retrieve the data from the [Giphy API](https://developers.giphy.com/docs/api/endpoint/), and then store the data in app state.

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

<details>
  <summary><b>Help! I didn't finish the previous step! 🚨</b></summary>

If you didn't successfully complete the previous step, you can jump right in by copying the step.

Complete the [setup instructions](../../README.md#setup) if you have not yet followed them.

Re-run the setup script, but use the previous step as a starting point:

```sh
npm run setup -- src/02-query-field
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

- Making API calls with the `useEffect` hook
- Using Promises & `async`/`await`
- Maintaining app state with the `useState` hook

## 📝 Tasks

Import the `getResults` API helper along with `useEffect` from React. Then call `getResults()` within `useEffect()`, passing in the value of the input field:

```js
import React, { useState, useEffect } from 'react'
import { getResults } from './api'
// 👆🏾 new imports

const App = () => {
  const [inputValue, setInputValue] = useState('')

  // 👇🏾 call API w/ useEffect
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

Check the Network panel of your Developer Tools to see that it is making an API call for every character typed within the query input field. The path to interactivity has begun.

In order to render the giphy images we need to store the results in state, once again leveraging `useState`:

```js
const [inputValue, setInputValue] = useState('')
const [results, setResults] = useState([])
// 👆🏾 new state variable to contain the search results

useEffect(() => {
  // resolve the promise to get the results 👇🏾
  getResults({ searchQuery: inputValue }).then((apiResponse) =>
    setResults(apiResponse.results),
  )
}, [inputValue])

// 👇🏾 logging the results for now
console.log({ inputValue, results })
```

If you prefer to use [`async` functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) over Promises, you can do that too:

```js
useEffect(() => {
  const fetchResults = async () => {
    // add async 👆🏾
    try {
      // 👆🏾 try above, 👇🏾 await below
      const apiResponse = await getResults({ searchQuery: inputValue })

      setResults(apiResponse.results)
    } catch (err) {
      console.error(err)
    }
  }

  fetchResults()
}, [inputValue])

console.log({ inputValue, results })
```

## 💡 Exercises

- Type in different search queries and verify the results by digging into the log and navigating to URLs
- Take a look at [`api.js`](./api.js) and see what the API helper does, particularly the other search filters it supports
  - Pass in hard-coded values for the other search filters to `getResults()` and see how the logged data changes

## 🧠 Elaboration & Feedback

After you're done with the exercise and before jumping to the next step, please fill out the [elaboration & feedback form](https://docs.google.com/forms/d/e/1FAIpQLScRocWvtbrl4XmT5_NRiE8bSK3CMZil-ZQByBAt8lpsurcRmw/viewform?usp=pp_url&entry.1671251225=React+FUNdamentals+Workshop&entry.1984987236=Step+3+-+API). It will help seal in what you've learned.

## 👉🏾 Next Step

Go to [Step 4 - Lists](../04-lists/).

## 📕 Resources

- [Using the Effect Hook](https://reactjs.org/docs/hooks-effect.html)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) & Github's [`fetch` polyfill](https://github.com/github/fetch)
  - [Learning ES6: Promises](http://www.benmvp.com/learning-es6-promises/)
  - [Async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
  - [HTTP Methods](http://restfulapi.net/http-methods/)
  - [Postman](https://www.getpostman.com/)

## ❓ Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
