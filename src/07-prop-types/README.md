# Step 7 - Prop Types

Components that accept props will define the types of props they accept. This serves two purposes:

1. Declare the public API of the component
2. Validate the props being passed in by the parent

The goal of this step is to learn how to define prop types for a component.

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

<details>
  <summary><b>Help! I didn't finish the previous step! 🚨</b></summary>

If you didn't successfully complete the previous step, you can jump right in by copying the step.

Complete the [setup instructions](../../#setup) if you have not yet followed them.

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
cp -r src/06-components src/workshop
```

Ensure [`src/index.js`](../index.js#L3) is still pointing to the `workshop` App:

```js
import App from './workshop/App'
```

Start the app:

```sh
npm start
```

After the app is initially built, a new browser window should open up at [http://localhost:3000/](http://localhost:3000/), and you should be able to continue on with the tasks below.

</details>

## 🐇 Jump Around

[Concepts](#concepts) | [Tasks](#tasks) | [Exercises](#exercises) | [Resources](#resources)

## ⭐ Concepts

- Type-checking props

## 📝 Tasks

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
  ).isRequired,
}

export default Results
```

## 💡 Exercises

- Add make all of the props for `ResultsItem` required
- Add 4 additional _optional_ props to `SearchForm`: `initialSearchQuery`, `initialShowInstant`, `initialRating` & `initialLimit`
  - These will set the initial values of the corresponding state variables (`useState(XXX)`)
  - _HINT:_ Use [`defaultProps`](https://reactjs.org/docs/typechecking-with-proptypes.html#default-prop-values) to set the default values when the props are not specified
- Use the React Developer Tools to add some of the `initial*` props to `<SearchForm />` in `App` to see how the initial UI changes

## 🧠 Elaboration & Feedback

After you're done with the exercise and before jumping to the next step, please fill out the [elaboration & feedback form](https://docs.google.com/forms/d/e/1FAIpQLScRocWvtbrl4XmT5_NRiE8bSK3CMZil-ZQByBAt8lpsurcRmw/viewform?usp=pp_url&entry.1671251225=React+FUNdamentals+Workshop&entry.1984987236=Step+7+-+Prop+Types)

## 👉🏾 Next Step

Go to [Step 8 - Custom Hook](../08-custom-hook/).

## 📕 Resources

- [Typechecking with PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)
- [Custom Prop Types](https://github.com/airbnb/prop-types)

## ❓ Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
