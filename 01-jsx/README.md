# Step 1 - JSX

The goal of this step is to practice with [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html), syntactic sugar for the plain JavaScript function [`React.createElement()`](https://facebook.github.io/react/docs/react-api.html#createelement). React elements are the smallest building blocks of React apps that describe what you want to see on the screen.

Unlike browser DOM elements, React elements are plain objects, and are cheap to create. [`ReactDOM`](https://facebook.github.io/react/docs/react-dom.html) takes care of updating the DOM to match the React elements.

> NOTE: One might confuse elements with a more widely known concept of "components". We will look at components in the [next section](../02-components/). Elements are what components are "made of".

## Tasks

In [`src/App.js`](src/App.js), replace `null` with JSX markup. For example:

```js
export default class App extends PureComponent {
  render() {
    return (
      <div>Hello world!</div>
    );
  }
}
```

Add nested JSX markup. For example:

```js
export default class App extends PureComponent {
  render() {
    return (
      <div>
        <h1>Hello world!</h1>
        <p>This is a paragraph of text written in React</p>
      </div>
    );
  }
}
```

Add attributes to the nested JSX markup. For example:

```js
export default class App extends PureComponent {
  render() {
    return (
      <div>
        <h1>Hello world!</h1>
        <p>This is a paragraph of text written in React</p>
        <aside>
          <input type="text" id="input" placeholder="Fill me in please" />
        </aside>
      </div>
    );
  }
}
```

Try adding classes to JSX markup or a `<label>` for inputs:

```js
export default class App extends PureComponent {
  render() {
    return (
      <div>
        <h1>Hello world!</h1>
        <p className="large">This is a paragraph of text written in React</p>
        <aside>
          <label htmlFor="input">Input label</label>
          <input type="text" id="input" placeholder="Fill me in please" />
        </aside>
      </div>
    );
  }
}
```

Notice that instead of `class` it's `className` and `htmlFor` instead of just `for`.

## Next

Go to [Step 2 - Components](../02-components/).

## Resources

- [Rendering Elements](https://facebook.github.io/react/docs/rendering-elements.html)
- [Introducing JSX](https://facebook.github.io/react/docs/introducing-jsx.html)
- [JSX in Depth](https://facebook.github.io/react/docs/jsx-in-depth.html)
- [React without JSX](https://facebook.github.io/react/docs/react-without-jsx.html)
- [Babel REPL](http://babeljs.io/repl/)
