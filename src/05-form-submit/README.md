# Step 5 - Form Submit

You will notice that so far we've been getting "instant" results when typing in the search query field. This means that while we're typing a search query, we're getting intermediate results for word partials. In the real word, this could hammer an API unnecessarily. In addition, by the time we get the results, we've already typed the next character so the UI feels a bit jumpy.

🏅 So the goal of this step is to require submitting the search query field in order to trigger retrieval of new results.

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

<details>
  <summary><b>Help! I didn't finish the previous step! 🚨</b></summary>

If you didn't successfully complete the previous step, you can jump right in by copying the step.

Complete the [setup instructions](../../README.md#setup) if you have not yet followed them.

Re-run the setup script, but use the previous step as a starting point:

```sh
npm run setup -- src/04-lists
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

- Handling client-side form submission
- Maintaining UI state
- Applying component styling with CSS classes

## 📝 Tasks

Add a new state variable to maintain the submitted search query (calling it `searchQuery`):

```js
const [inputValue, setInputValue] = useState('')
const [searchQuery, setSearchQuery] = useState('') // 👈🏾 NEW!
const [searchLimit, setSearchLimit] = useState(12)
const [results, setResults] = useState([])
```

Add an `onSubmit` handler to the `<form>` tag, setting the search query to the current `inputValue`:

```js
const handleSubmit = (e) => {
  e.preventDefault() // 👈🏾 IMPORTANT!
  setSearchQuery(inputValue)
}

return (
  <main>
    <h1>Giphy Search!</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Search Giphy"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
        }}
      />
      ...
    </form>
    ...
  </main>
)
```

Use the Developer Tools to see how the `inputValue` & `searchQuery` state variables update at different times.

> NOTE: We need to make sure to call `e.preventDefault()` in the handler, otherwise the browser will try to do a server-side form submission.

Now, update the `useEffect()` call to pass the `searchQuery` state variable to the `getResults()` API call, replacing `inputValue`:

```js
useEffect(() => {
  const fetchResults = async () => {
    try {
      // replace `inputValue` with `searchQuery` 👇🏾
      const apiResponse = await getResults({ searchQuery, limit: searchLimit })

      setResults(apiResponse.results)
    } catch (err) {
      console.error(err)
    }
  }

  fetchResults()
}, [searchQuery, searchLimit])
```

It's not easily discoverable that you have to press ENTER to submit the search query field. Add a submit button by wrapping the search query field in additional markup:

```js
<section className="input-group">
  <input
    type="search"
    placeholder="Search Giphy"
    value={inputValue}
    onChange={(e) => {
      setInputValue(e.target.value)
    }}
    className="input-group-field"
  />
  <aside className="input-group-button">
    <button type="submit" className="button">
      Search
    </button>
  </aside>
</section>
```

> NOTE: We're making use of [Foundation](https://get.foundation/sites/docs/forms.html) classes available for [forms](https://get.foundation/sites/docs/forms.html). The Foundation CSS is included in the [`index.html`](../../public/index.html).

## 💡 Exercises

- Add a checkbox to the search box that toggles on/off "instant search" results
  ```js
  <section>
    <input
      type="checkbox"
      id="instant-results"
      name="instant-results"
      checked={ ... }
      onChange={(e) => {
        // use e.target.checked
      }}
    />
    <label htmlFor="instant-results">Show instant results?</label>
  </section>
  ```
- Add dividers (`<hr />`) between the form fields
- Add a radio button group that allows for filtering the search results by `rating`
  - Options: All (empty string), `g`, `pg`, `pg-13` & `r`

## 🧠 Elaboration & Feedback

After you're done with the exercise and before jumping to the next step, please fill out the [elaboration & feedback form](https://docs.google.com/forms/d/e/1FAIpQLScRocWvtbrl4XmT5_NRiE8bSK3CMZil-ZQByBAt8lpsurcRmw/viewform?usp=pp_url&entry.1671251225=React+FUNdamentals+Workshop&entry.1984987236=Step+5+-+Form+Submit). It will help seal in what you've learned.

## 👉🏾 Next Step

Go to [Step 6 - Components](../06-components/).

## 📕 Resources

- [Forms](https://reactjs.org/docs/forms.html)
- [Fragments](https://reactjs.org/docs/fragments.html)
- [DOM Elements](https://reactjs.org/docs/dom-elements.html)
- [Inline Styles](https://reactjs.org/docs/dom-elements.html#style)
  - [Foundation for sites](https://get.foundation/sites/docs/)
  - [`classnames` library](https://github.com/JedWatson/classnames)
  - [Introduction to BEM](http://getbem.com/introduction/)
  - [`glamorous` library](https://github.com/paypal/glamorous)
  - [CSS Modules: Welcome to the Future](http://glenmaddern.com/articles/css-modules)
  - [Using CSS flexible boxes](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)

## ❓ Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
