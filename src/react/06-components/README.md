# Step 6 - Components

At this point we have a full app. It's a mini-app, but it's still fully-functional. However, in it's currently structure, as more features are added, maintaining it will become very challenging. This is because all the functionality is in the one `App` component. The form UI, results UI, app state, and API call all live within `App`. For such a small app, having everything in one place has been convenient, but it'll scale poorly.

So, the goal of this step is to practice creating and composing [React components](https://reactjs.org/docs/components-and-props.html). Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. Components can refer to other components in their output. This lets us use the same component abstraction for any level of detail. A button, a form, a dialog, a screen, etc. In React apps, all of these are commonly expressed as components.

Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called "props") and return React elements describing what should appear on the screen.

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
cp -r src/react/05-form-submit src/workshop
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

- Creating and composing React components
- Configuring components via passing props
- Type-checking props

## Tasks

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

Notice that we're passing the `results` state variable to `<Results />` as its `items` prop. This is how we're able to pass data down to child components that we've created.

We need to update `Results.js` to support this new prop:

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

`Results` now accepts a `props` argument which is an object of all the props its parent passes to it. In this case we want to retrieve the `items` prop out of it. Then we use it to render out the UI.

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

You will notice that `App` no longer has the `realSearchQuery`, `searchLimit` & `searchRating` variables needed for the call to `useEffect()`. `App` needs to get them from its rendered `<SearchForm />`. Parent components can receive values from rendered children components by passing callback handlers (similar to `onChange` we passed to the form elements).

Add a new `formValues` state variable and new `onChange` handler for `<SearchFor />`:

```js
const App = () => {
  const [formValues, setFormValues] = useState({})
  const [results, setResults] = useState([])

  useEffect(() => {
    const fetchResults = async () => {
      setResults(await getResults(formValues))
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

`App` no longer maintains all the UI for the search form and results, but offloads it to the corresponding components. It now is only responsible for maintaining the `results` app state. We'll make this separation even clearer in the [next step](../07-custom-hook/).

But first, we now need `SearchForm` to have a new `onChange` prop that it calls whenever the fields change, passing the same object properties that `getResults` expects (`searchQuery`, `limit` & `rating`):

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

`SearchForm` now defines the `onChange` prop. We use it within a `useEffect()` call that is very similar to the `useEffect()` we had in `App`, except this time we're calling the `onChange()` prop with the three pieces of information in an object: `searchForm`, `rating` & `limit`.

`SearchForm` has an `<input type="search">` element for the query search field, an `<input type="checkbox">` element for the instant results toggle, multiple connected `<input type="radio">` elements for the rating picker, and a `<select>` for the number of results switcher. Normally you would use a component library like [Material-UI](https://material-ui.com/) that would have those reusable components for you.

---

### `PropTypes`

Components that accept props will define the types of props they accept. This serves two purposes: 1) declare the public API of the component; and 2) validate the props being passed in by the parent.

Using the [`prop-types`](https://reactjs.org/docs/typechecking-with-proptypes.html) package, add a prop type in `SearchForm` for the `onChange` callback prop:

```js
import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

...

const SearchForm = (props) => {
  const { onChange } = props

  ...
}

SearchForm.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default SearchForm
```

This dictates that the `onChange` prop must always be passed and must be a function. Prop types unfortunately doesn't describe the parameters and return value of the function.

Now add a prop type in `Results` for the `items` prop:

```js
import React from 'react'
import PropTypes from 'prop-types'

const Results = (props) => {
  const { items } = props

  ...

}

Results.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string,
      rating: PropTypes.oneOf(['G', 'PG', 'PG-13', 'R']),
      previewUrl: PropTypes.string,
    }),
  ),
}

export default Results
```

This dictates that the `items` prop is required to be passed and is an array of objects. Going deeper, each object has 5 properties, `id`, `title`, `url`, `rating` & `previewUrl`, all of which are required to be in each object. The `rating` prop is limited to only 4 strings: `'G'`, `'PG'`, `'PG-13'`, and `'R'`.

## Exercises

- From `Results`, pull out a `ResultsItem` component into `ResultsItem.js` with 5 **required** props: `id`, `title`, `url`, `rating` & `previewUrl`.
- Add 4 additional _optional_ props to `SearchForm`: `initialSearchQuery`, `initialShowInstant`, `initialRating` & `initialLimit`
  - These will set the initial values of the corresponding state variables (`useState(XXX)`)
  - _HINT:_ Use [`defaultProps`](https://reactjs.org/docs/typechecking-with-proptypes.html#default-prop-values) to set the default values when the props are not specified
- Use the React Developer Tools to inspect the component hierarchy, including the props being passed to the `SearchForm` & `ResultsItem` components.
  - Add some of the `initial*` props to `<SearchForm />` in `App` to see how the initial UI changes

## Next

Go to [Step 7 - Custom Hook](../07-custom-hook/).

## Resources

- [Components and Props](https://reactjs.org/docs/components-and-props.html)
- [Typechecking with PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)
  - [Custom Prop Types](https://github.com/airbnb/prop-types)
- [Material-UI](https://material-ui.com/)
  - [React + Foundation](https://react.foundation/)
  - [React Bootstrap](https://react-bootstrap.github.io/)
  - [Tailwind CSS](https://tailwindcss.com/)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
