# Step 1 - JSX

[JSX](https://reactjs.org/docs/jsx-in-depth.html) is syntactic sugar for the plain JavaScript function [`React.createElement()`](https://reactjs.org/docs/react-api.html#createelement). React elements are the smallest building blocks of React apps that describe what you want to see on the screen.

Unlike browser DOM elements, React elements are plain objects, and are cheap to create. [`ReactDOM`](https://reactjs.org/docs/react-dom.html) takes care of updating the DOM to match the React elements.

🏅 The goal of this step is to practice with JSX.

> NOTE: One might confuse elements with a more widely known concept of "components." We will look closer at creating and composing components in the [Step 6](../06-components/). Elements are what components are "made of."

If you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

## 🐇 Jump Around

[Concepts](#-concepts) | [Tasks](#-tasks) | [Exercises](#-exercises) | [Elaboration & Feedback](#-elaboration--feedback) | [Resources](#-resources)

## ⭐ Concepts

- Rendering elements with JSX
- Handling special element attribute names
- Adding inline styles

## 📝 Tasks

In [`src/workshop/App.js`](App.js), replace `null` with JSX markup. For example:

```js
const App = () => {
  return <main>Giphy Search!</main>
}
```

You will need to import `React` in order use JSX.

```js
import React from 'react'

const App = () => {
  return <main>Giphy Search!</main>
}

export default App
```

Add nested JSX markup. For example:

```js
const App = () => {
  return (
    <main>
      <h1>Giphy Search!</h1>
      <p>This is a paragraph of text written in React</p>
    </main>
  )
}
```

Add attributes to the nested JSX markup. For example:

```js
const App = () => {
  return (
    <main>
      <h1>Giphy Search!</h1>
      <p>This is a paragraph of text written in React</p>
      <aside>
        <input type="text" id="input" placeholder="Fill me in please" />
      </aside>
    </main>
  )
}
```

Try adding classes to JSX markup, or a `<label>` to connect inputs:

```js
const App = () => {
  return (
    <main>
      <h1>Giphy Search!</h1>
      <p className="text-center">
        This is a paragraph of text written in React
      </p>
      <label htmlFor="input">
        Input label
        <input type="text" id="input" placeholder="Fill me in please" />
      </label>
    </main>
  )
}
```

There is a slightly different syntax to pass variables to props:

```js
const App = () => {
  const contents = 'This is a paragraph of text written in React'
  const inputId = 'input'
  const numItems = 3

  return (
    <main>
      <h1>Giphy Search!</h1>
      <p className="text-center">{contents}</p>
      <label htmlFor={inputId}>
        Input label
        <input
          type="text"
          id={inputId}
          placeholder={`Search ${numItems} items`}
        />
      </label>
    </main>
  )
}
```

Lastly, add inline styles to some elements by passing an object to the `style` prop:

```js
const App = () => {
  return (
    <main>
      <h1 style={{ fontSize: '5em' }}>Giphy Search!</h1>
      <p className="text-center" style={{ backgroundColor: 'lightgrey' }}>
        This is a paragraph of text written in React
      </p>
      <label htmlFor="input">
        Input label
        <input
          type="text"
          id="input"
          placeholder="Fill me in please"
          style={{ color: 'darkblue', marginTop: 30 }}
        />
      </label>
    </main>
  )
}
```

## 💡 Exercises

- Create two `const` variables, `GIPHY_SRC` ([this url](https://media.giphy.com/media/l41lXGxBwXYFcJoJ2/giphy.gif)) and `GIPHY_LINK` ([this url](https://gph.is/1IOrWO2))
  - Render an image with its `src` as `GIPHY_SRC`
  - Link the image to its page using `GIPHY_LINK` and open a new
- 🤓 **BONUS:** Render a `<p>`
  - Create `const attrs = { style: {color: 'blue' }, children: 'Hello' }`
  - Add `attrs` to the `<p>` **without** adding them individually
- Remove all the practice JSX, leaving the skeleton of our Giphy search app:
  ```js
  const App = () => {
    return (
      <main>
        <h1>Giphy Search!</h1>
      </main>
    )
  }
  ```

## 🧠 Elaboration & Feedback

After you're done with the exercise and before jumping to the next step, please fill out the [elaboration & feedback form](https://docs.google.com/forms/d/e/1FAIpQLScRocWvtbrl4XmT5_NRiE8bSK3CMZil-ZQByBAt8lpsurcRmw/viewform?usp=pp_url&entry.1671251225=React+FUNdamentals+Workshop&entry.1984987236=Step+1+-+JSX). It will help seal in what you've learned.

## 👉🏾 Next Step

Go to [Step 2 - Query Field](../02-query-field/).

## 📕 Resources

- [Rendering Elements](https://reactjs.org/docs/rendering-elements.html)
- [Introducing JSX](https://reactjs.org/docs/introducing-jsx.html)
- [JSX in Depth](https://reactjs.org/docs/jsx-in-depth.html)
- [React without JSX](https://reactjs.org/docs/react-without-jsx.html)
- [Babel REPL](http://babeljs.io/repl/)
- [Inline Styles](https://reactjs.org/docs/dom-elements.html#style)

## ❓ Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
