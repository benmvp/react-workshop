# Step 8 - Search Focus

When we submit the search form by clicking the "Search" button, the search button now becomes the focused element. But we want the focus to go back to the query field so that we can easily type a new search.

By default, when we develop in React, we're never touching any actual DOM. Instead we're rendering UI that React efficiently applies to the DOM. But there are rare times where we'll need to interact with the DOM directly in order to mutate it in ways that React doesn't support.

🏅 So the goal of this step is to use this "escape hatch" in order to focus the search query imperatively.

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

<details>
  <summary><b>Help! I didn't finish the previous step! 🚨</b></summary>

If you didn't successfully complete the previous step, you can jump right in by copying the step.

Complete the [setup instructions](../../README.md#setup) if you have not yet followed them.

Re-run the setup script, but use the previous step as a starting point:

```sh
npm run setup -- src/07-prop-types
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

- Interacting with the DOM directly with `useRef` hook

## 📝 Tasks

In [`SearchForm.js`](./SearchForm.js), Import the `useRef` hook from `react`:

```js
import React, { Fragment, useState, useEffect, useRef } from 'react' // 👈🏾 new import
```

Create a ref within `SearchForm` after all of the state variables:

```js
const [inputValue, setInputValue] = useState(initialSearchQuery)
const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
const [showInstant, setShowInstant] = useState(initialShowInstant)
const [searchRating, setSearchRating] = useState(initialRating)
const [searchLimit, setSearchLimit] = useState(initialLimit)
const realSearchQuery = showInstant ? inputValue : searchQuery

// new ref 👇🏾
const queryFieldEl = useRef(null)
```

Add the ref as the `ref` prop to the query field:

```js
<input
  type="search"
  placeholder="Search Giphy"
  value={inputValue}
  onChange={(e) => {
    setInputValue(e.target.value)
  }}
  className="input-group-field"
  ref={queryFieldEl} // 👈🏾 ref is here
/>
```

Back in `handleSubmit`, focus the field on submission of the form by accessing `queryFieldEl.current`:

```js
const handleSubmit = (e) => {
  e.preventDefault()
  setSearchQuery(inputValue)

  // focus the query field after submitting
  // to make easier to quickly search again
  // 👇🏾
  queryFieldEl.current.focus()
}
```

Now when we submit the field with the "Search" button the query field goes back to being focused, just like if we submitted by pressing ENTER in the field.

## 💡 Exercises

- Add a "To top" button at the bottom of the results that when clicked jumps the user to the top of the results
  - 🔑 _HINT:_ [`element.scrollIntoView(true)`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) will align the top of element in the window
- 🤓 **BONUS:** Animate the scrolling so it's smooth instead of a jump

## 🧠 Elaboration & Feedback

After you're done with the exercise and before jumping to the next step, please fill out the [elaboration & feedback form](https://docs.google.com/forms/d/e/1FAIpQLScRocWvtbrl4XmT5_NRiE8bSK3CMZil-ZQByBAt8lpsurcRmw/viewform?usp=pp_url&entry.1671251225=React+FUNdamentals+Workshop&entry.1984987236=Step+8+-+Search+Focus). It will help seal in what you've learned.

## 👉🏾 Next Step

Go to [Step 9 - Custom Hook](../09-custom-hook/).

## 📕 Resources

- [`useRef` API Reference](https://reactjs.org/docs/hooks-reference.html#useref)
- [Introduction to useRef Hook](https://dev.to/dinhhuyams/introduction-to-useref-hook-3m7n)
- [Using `useRef` as an "instance variable"](https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables)

## ❓ Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
