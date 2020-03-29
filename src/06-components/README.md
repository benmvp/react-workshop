# Step 6 - Components

At this point we have a full app. It's a mini-app, but it's still fully-functional. However, in it's currently structure, as more features are added, maintaining it will become very challenging. This is because all the functionality is in the one `App` component. The form UI, results UI, app state, and API call all live within `App`. For such a small app, having everything in one place has been convenient, but it'll scale poorly.

So, the goal of this step is to practice creating and composing [React components](https://reactjs.org/docs/components-and-props.html). Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. Components can refer to other components in their output. This lets us use the same component abstraction for any level of detail. A button, a form, a dialog, a screen, etc. In React apps, all of these are commonly expressed as components.

Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called "props") and return React elements describing what should appear on the screen.

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

<details>
  <summary><b>Help! I didn't finish the previous step! 🚨</b></summary>

If you didn't successfully complete the previous step, you can jump right in by copying the step.

Complete the [setup instructions](../../README.md#setup) if you have not yet followed them.

Re-run the setup script, but use the previous step as a starting point:

```sh
npm run setup -- src/05-form-submit
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

- Creating and composing React components
- Configuring components via passing props

## 📝 Tasks

### `Results`

Start by creating a new `Results.js` file to contain a new `Results` component:

```js
import React from 'react'

const Results = () => {
  return null
}

export default Results
```

Next, move over the results display code:

```js
const Results = () => {
  return (
    results.length > 0 && (
      <section className="callout primary">
        {results.map((item) => (
          <section
            key={item.id}
            className="card"
            style={{
              width: '300px',
              display: 'inline-block',
              marginRight: '16px',
            }}
          >
            <video src={item.previewUrl} alt={item.title} loop autoPlay />
            <section className="card-section">
              <h5>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>{' '}
                ({item.rating})
              </h5>
            </section>
          </section>
        ))}
      </section>
    )
  )
}
```

Back in `App.js`, we'll import `Results.js` at the top of the file:

```js
import React, { useState, useEffect } from 'react'
import { getResults } from './api'
import Results from './Results'
```

In place of where the results display code used to be, we'll render `<Results />`:

```js
return (
  <main>
    <h1>Giphy Search!</h1>

    <form>...</form>

    <Results items={results} />
  </main>
)
```

We need to update `Results.js` to support this new `items` prop:

```js
const Results = (props) => {
  const { items } = props

  return (
    items.length > 0 && (
      <section className="callout primary">
        {items.map((item) => (
          ...
        ))}
      </section>
    )
  )
}
```

---

### `SearchForm`

Let's turn our attention to the search form. Start by creating a new `SearchForm.js` file to contain a new `SearchForm` component:

```js
import React, { Fragment, useState } from 'react'

const SearchForm = () => {
  return null
}

export default SearchForm
```

Next copy over all of the form-related code:

```js
const RATINGS = [
  { value: '', label: 'All' },
  { value: 'g', label: 'G' },
  { value: 'pg', label: 'PG' },
  { value: 'pg-13', label: 'PG-13' },
  { value: 'r', label: 'R' },
]
const LIMITS = [6, 12, 18, 24, 30]

const SearchForm = () => {
  const [inputValue, setInputValue] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showInstant, setShowInstant] = useState(false)
  const [searchRating, setSearchRating] = useState('')
  const [searchLimit, setSearchLimit] = useState(12)
  const realSearchQuery = showInstant ? inputValue : searchQuery

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchQuery(inputValue)
  }

  return (
    <form onSubmit={handleSubmit}>
      <section className="input-group">
        <input
          type="search"
          ...
        />
        ...
      </section>
      <section>
        <input
          type="checkbox"
          ...
        />
        ...
      </section>
      <hr />
      <fieldset>
        <legend>Choose a rating</legend>
        ...
      </fieldset>
      <hr />
      <label>
        # of Results
        ...
      </label>
    </form>
  )
}
```

Back in `App.js`, we'll import the `SearchForm` component at the top of the file:

```js
import React, { useState, useEffect } from 'react'
import { getResults } from './api'
import Results from './Results'
import SearchForm from './SearchForm'
```

And in place of the `<form>` tag we'll render `<SearchForm />`:

```js
return (
  <main>
    <h1>Giphy Search!</h1>
    <SearchForm />
    <Results items={results}>
  </main>
)
```

Add a new `formValues` state variable and new `onChange` handler for `<SearchForm />`:

```js
const App = () => {
  const [formValues, setFormValues] = useState({})
  const [results, setResults] = useState([])

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const apiResponse = await getResults(formValues)

        setResults(apiResponse.results)
      } catch (err) {
        console.error(err)
      }
    }

    fetchResults()
  }, [formValues])

  return (
    <main>
      <h1>Giphy Search!</h1>

      <SearchForm onChange={setFormValues} />
      <Results items={results} />
    </main>
  )
}
```

We now need `SearchForm` to have a new `onChange` prop that it calls whenever its fields change, passing the same object properties that `getResults` expects (`searchQuery`, `limit` & `rating`):

```js
const SearchForm = (pros) => {
  const { onChange } = props
  const [inputValue, setInputValue] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showInstant, setShowInstant] = useState(false)
  const [searchRating, setSearchRating] = useState('')
  const [searchLimit, setSearchLimit] = useState(12)
  const realSearchQuery = showInstant ? inputValue : searchQuery

  useEffect(() => {
    onChange({
      searchQuery: realSearchQuery,
      rating: searchRating,
      limit: searchLimit,
    })
  }, [onChange, realSearchQuery, searchRating, searchLimit])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchQuery(inputValue)
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

> NOTE: `SearchForm` has an `<input type="search">` element for the query search field, an `<input type="checkbox">` element for the instant results toggle, multiple connected `<input type="radio">` elements for the rating picker, and a `<select>` for the number of results switcher. Normally you would use a component library like [Material-UI](https://material-ui.com/) that would have those reusable components for you.

## 💡 Exercises

- From `Results`, pull out a `ResultsItem` component into `ResultsItem.js` with 5 props: `id`, `title`, `url`, `rating` & `previewUrl`.
- Use the React Developer Tools to inspect the component hierarchy, including the props being passed to the `SearchForm` & `ResultsItem` components.

## 🧠 Elaboration & Feedback

After you're done with the exercise and before jumping to the next step, please fill out the [elaboration & feedback form](https://docs.google.com/forms/d/e/1FAIpQLScRocWvtbrl4XmT5_NRiE8bSK3CMZil-ZQByBAt8lpsurcRmw/viewform?usp=pp_url&entry.1671251225=React+FUNdamentals+Workshop&entry.1984987236=Step+6+-+Components). It will help seal in what you've learned.

## 👉🏾 Next Step

Go to [Step 7 - Prop Types](../07-prop-types/).

## 📕 Resources

- [Components and Props](https://reactjs.org/docs/components-and-props.html)
- [Material-UI](https://material-ui.com/)
  - [React + Foundation](https://react.foundation/)
  - [React Bootstrap](https://react-bootstrap.github.io/)
  - [Tailwind CSS](https://tailwindcss.com/)

## ❓ Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
