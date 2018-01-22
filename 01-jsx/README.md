# Step 1 - JSX

The goal of this step is to practice with [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html), syntactic sugar for the plain JavaScript function [`React.createElement()`](https://facebook.github.io/react/docs/react-api.html#createelement). React elements are the smallest building blocks of React apps that describe what you want to see on the screen.

Unlike browser DOM elements, React elements are plain objects, and are cheap to create. [`ReactDOM`](https://facebook.github.io/react/docs/react-dom.html) takes care of updating the DOM to match the React elements.

> NOTE: One might confuse elements with a more widely known concept of "components". We will look at components in the [next section](../02-components/). Elements are what components are "made of."

If you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](src/App.js).

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

Try adding classes to JSX markup, or a `<label>` to connect inputs:

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

## Exercises

Add the skeleton markup to begin our email application:

```js
export default class App extends PureComponent {
  render() {
    return (
      <main className="app">
        <ul className="email-list">
          <li>
            <div className="email-list-item">
              <span>alittle0@chronoengine.com</span>
              <span>Mauris lacinia sapien quis libero</span>
            </div>
          </li>
          <li>
            <div className="email-list-item">
              <span>amurray1@mit.edu</span>
              <span>Mauris ullamcorper purus sit amet nulla</span>
            </div>
          </li>
          <li>
            <div className="email-list-item">
              <span>dmccoy2@bluehost.com</span>
              <span>Suspendisse potenti</span>
            </div>
          </li>
          <li>
            <div className="email-list-item">
              <span>raustin3@hexun.com</span>
              <span>Maecenas rhoncus aliquam lacus</span>
            </div>
          </li>
          <li>
            <div className="email-list-item">
              <span>rwagner4@instagram.com</span>
              <span>Pellentesque ultrices mattis odio</span>
            </div>
          </li>
        </ul>
        <div className="email-view">
          <h2>View selected email</h2>
        </div>
        <div className="email-form">
          <h2>Add a new email</h2>
        </div>
      </main>
    );
  }
}
```

## Next

Go to [Step 2 - Components](../02-components/).

## Resources

- [Rendering Elements](https://facebook.github.io/react/docs/rendering-elements.html)
- [Introducing JSX](https://facebook.github.io/react/docs/introducing-jsx.html)
- [JSX in Depth](https://facebook.github.io/react/docs/jsx-in-depth.html)
- [React without JSX](https://facebook.github.io/react/docs/react-without-jsx.html)
- [Babel REPL](http://babeljs.io/repl/)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
