# Step 8 - Custom Hook

We've been able to greatly reduce the scope of the top-level `App` by breaking it down into several components. However, it still directly makes the API call in order to maintain the app-level state.

🏅 The goal of this step is to learn how to create our own custom hooks composed of the base hooks like `useState` & `useEffect`. This allows us to extract component logic into reusable functions.

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

<details>
  <summary><b>Help! I didn't finish the previous step! 🚨</b></summary>

If you didn't successfully complete the previous step, you can jump right in by copying the step.

Complete the [setup instructions](../../README.md#setup) if you have not yet followed them.

Re-run the setup script, but use the previous step as a starting point:

```sh
npm run setup -- src/08-search-focus
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

- Creating async custom hooks

## 📝 Tasks

Create a new file called `useGiphy.js` which will contain our custom hook that will take in search parameters, make an API call and return results:

```js
import { useState, useEffect } from 'react'
import { getResults } from './api'

const useGiphy = () => {
  return null
}

export default useGiphy
```

A custom hook is a normal JavaScript function whose name starts with `use*` and may call other hooks like `useState` & `useEffect`.

Copy over all the hooks-related code from `App.js` into `useGiphy.js`:

```js
const useGiphy = () => {
  const [searchParams, setSearchParams] = useState({})
  const [results, setResults] = useState([])

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const apiResponse = await getResults(searchParams)

        setResults(apiResponse.results)
      } catch (err) {
        console.error(err)
      }
    }

    fetchResults()
  }, [searchParams])

  return [results, setSearchParams]
}
```

Now `useGiphy()` can easily be used w/in other components because all of the state management and side-effect API logic have been abstracted away.

## 💡 Exercises

- Back in `App` make use of `useGiphy()`
- Compare the current version of [`App.js`](./App.js) with the [Step 5 `App.js`](../05-form-submit/App.js)

## 🧠 Elaboration & Feedback

After you're done with the exercise and before jumping to the next step, please fill out the [elaboration & feedback form](https://docs.google.com/forms/d/e/1FAIpQLScRocWvtbrl4XmT5_NRiE8bSK3CMZil-ZQByBAt8lpsurcRmw/viewform?usp=pp_url&entry.1671251225=React+FUNdamentals+Workshop&entry.1984987236=Step+9+-+Custom+Hook). It will help seal in what you've learned.

## 👉🏾 Next Step

Go to [Step 10 - Loading States](../10-loading-states/).

## 📕 Resources

- [Building Your Own Hooks](https://reactjs.org/docs/hooks-custom.html)
- [How to test custom React hooks](https://kentcdodds.com/blog/how-to-test-custom-react-hooks)

## ❓ Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
