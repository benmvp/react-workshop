# Step 5 - Form Submit

You will notice that so far we've been getting instant results when typing in the search query field. This means that while we're typing a search query, we're getting intermediate results for word partials. In the real word, this could hammer an API unnecessarily.

So the goal of this step is to require submitting the search query field in order to trigger retrieval of new results.

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
cp -r src/react/04-lists src/workshop
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

- Handling client-side form submission
- Maintaining UI state
- Applying component styling with CSS classes

## Tasks

Add a new state variable to maintain the submitted search query (calling it `searchQuery`):

```js
const [inputValue, setInputValue] = useState('')
const [searchQuery, setSearchQuery] = useState('')
const [searchLimit, setSearchLimit] = useState(10)
const [results, setResults] = useState([])
```

Add an `onSubmit` handler to the `<form>` tag:

```js
const handleSubmit = (e) => {
  e.preventDefault()
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

We set the `searchQuery` state variable whenever the form submits, which we can trigger by pressing ENTER within the search query field. Use the Developer Tools to see how the `inputValue` & `searchQuery` state variables update at different times.

> NOTE: We need to make sure to call `e.preventDefault()` in the handler, otherwise the browser will try to do a server-side form submission.

Now, update the `useEffect()` call to pass the `searchQuery` state variable to the `getResults()` API call, replacing `inputValue`:

```js
useEffect(() => {
  const fetchResults = async () => {
    setResults(await getResults({ searchQuery, limit: searchLimit }))
  }

  fetchResults()
}, [searchQuery, searchLimit])
```

`useEffect()` will now be called whenever `searchQuery` changes (i.e. when the form is submitted) instead of when `inputValue` changes (aka typing in the field). As a result, the results are only retrieved when the form is submitted (and number of results field changes). The API is no longer being hammered.

It's not easily discoverable that you have to press ENTER to submit the search query field. Let's add a submit button by wrapping the search query field in additional markup:

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

We're making use of [Foundation](https://get.foundation/sites/docs/forms.html) classes available for [forms](https://get.foundation/sites/docs/forms.html). The Foundation CSS is included in the [`index.html`](../../../public/index.html).

## Exercises

- Add a checkbox to the search box that toggles on/off "instant search" results
  ```js
  <section>
    <input
      type="checkbox"
      id="instant-results"
      name="instant-results"
      checked={ ... }
      onChange={(e) => {
        // e.target.checked
      }}
    />
    <label htmlFor="instant-results">Show instant results?</label>
  </section>
  ```
- Add dividers (`<hr />`) between the form fields
- **BONUS:** Add a radio button group that allows for filtering the search results by `rating`. Options: All (empty string), `g`, `pg`, `pg-13` & `r`

## Next

Go to [Step 6 - Components](../06-components/).

## Resources

- [Forms](https://reactjs.org/docs/forms.html)
- [Fragments](https://reactjs.org/docs/fragments.html)
- [DOM Elements](https://reactjs.org/docs/dom-elements.html)
- [Foundation for sites](https://get.foundation/sites/docs/)
- [`classnames` library](https://github.com/JedWatson/classnames)
- [Introduction to BEM](http://getbem.com/introduction/)
- [`glamorous` library](https://github.com/paypal/glamorous)
- [Inline Styles](https://reactjs.org/docs/dom-elements.html#style)
- [CSS Modules: Welcome to the Future](http://glenmaddern.com/articles/css-modules)
- [Using CSS flexible boxes](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
