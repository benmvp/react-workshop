# Step 1 - JSX

The goal of this step is to practice with [JSX](https://reactjs.org/docs/jsx-in-depth.html), syntactic sugar for the plain JavaScript function [`React.createElement()`](https://reactjs.org/docs/react-api.html#createelement). React elements are the smallest building blocks of React apps that describe what you want to see on the screen.

Unlike browser DOM elements, React elements are plain objects, and are cheap to create. [`ReactDOM`](https://reactjs.org/docs/react-dom.html) takes care of updating the DOM to match the React elements.

> NOTE: One might confuse elements with a more widely known concept of "components." We will look closer at creating and composing components in the [Step 6](../06-components/). Elements are what components are "made of."

If you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

## Jump Around

[Concepts](#concepts) | [Tasks](#tasks) | [Exercises](#exercises) | [Resources](#resources)

## Concepts

- Rendering elements with JSX
- Handling special element attribute names
- Adding inline styles

## Tasks

In [`App.js`](App.js), replace `null` with JSX markup. For example:

```js
const App = () => {
  return <div>Giphy Search!</div>
}
```

You will need to import `React` in order use JSX.

```js
import React from 'react'

const App = () => {
  return <main>Giphy Search!</main>
}
```

This is because JSX elements are transpiled to regular `React.createElement()` calls:

```js
import React from 'react'

const App = () => {
  return React.createElement('main', null, 'Giphy Search!')
}
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
    </m>
  )
}
```

Notice that instead of `class` it's `className` and `htmlFor` instead of just `for`.

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

The `style` prop in React JSX takes an **object**, not a string like the HTML style property. The property names within the object are `camelCase` like JavaScript DOM notation (such as `backgroundColor`), instead of `kebab-case` like the property names in traditional CSS (such as `background-color`). If you pass a number to a property that takes a unit (such as `marginTop`), React will add `px` to the end for you if you specify a number for a size property.

## Exercises

Remove all the practice JSX, leaving the skeleton of our Giphy search app:

```js
const App = () => {
  return (
    <main>
      <h1>Giphy Search!</h1>
    </main>
  )
}
```

## Next

Go to [Step 2 - Query Field](../02-query-field/).

## Resources

- [Rendering Elements](https://reactjs.org/docs/rendering-elements.html)
- [Introducing JSX](https://reactjs.org/docs/introducing-jsx.html)
- [JSX in Depth](https://reactjs.org/docs/jsx-in-depth.html)
- [React without JSX](https://reactjs.org/docs/react-without-jsx.html)
- [Babel REPL](http://babeljs.io/repl/)
- [Inline Styles](https://reactjs.org/docs/dom-elements.html#style)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
