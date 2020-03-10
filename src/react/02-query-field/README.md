# Step 2 - Query Field

The goal of this step is learning how to deal with forms. HTML form elements work a little bit differently from other DOM elements in React, because form elements naturally keep some internal state. Regular HTML forms _do_ work in React, but in most cases, it's convenient to have React keep track of the data that the user has entered into a form. The standard way to achieve this is with a technique called ["controlled components"](https://reactjs.org/docs/forms.html#controlled-components).

[Handling events](https://reactjs.org/docs/handling-events.html) within React elements is very similar to handling events on DOM elements. Event handlers will be passed instances of [`SyntheticEvent`](https://reactjs.org/docs/events.html), a cross-browser wrapper around the browser's native event. It has the same interface as the browser's native event (including`stopPropagation()` and `preventDefault()`) except the events work identically across all browsers!

Ultimately, we want to keep the current value of the search query field in UI state.

If you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

## Jump Around

[Concepts](#concepts) | [Restart Setup](#restart-setup) | [Tasks](#tasks) | [Exercises](#exercises) | [Resources](#resources)

## Concepts

- Maintaining UI state with the `useState` hook
- Handling user interaction
- Handling HTML form elements

## Restart Setup

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
cp -r src/react/01-jsx src/workshop
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

## Tasks

Add a search form with a query field:

```js
const App = () => {
  return (
    <main>
      <h1>Giphy Search!</h1>

      <form>
        <input type="search" placeholder="Search Giphy" defaultValue="" />
      </form>
    </main>
  )
}
```

Notice the use of `defaultValue` prop to set the initial value of the input fields instead of `value`, which is how you would normally initialize an HTML `<input>`. As of now, the DOM is maintaining the state of the input fields; React has no idea what the values of the fields are. They are currently ["uncontrolled components"](https://reactjs.org/docs/uncontrolled-components.html). We want to make them "controlled components" so we can keep track of their state within the app.

> NOTE: If you were to set the `value` prop of the input fields, you wouldn't be able to type at all because setting `value` signals to React that you want React to control the values of the input fields.

Using the [`useState` hook](https://reactjs.org/docs/hooks-state.html), add a new state variable for the query field and pass its properties as the `value` of the `<input>`. Then for `onChange`, update the state.

```js
import React, { useState } from 'react'

const App = () => {
  const [inputValue, setInputValue] = useState('')

  return (
    <main>
      <h1>Giphy Search!</h1>

      <form>
        <input
          type="search"
          placeholder="Search Giphy"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
          }}
        />
      </form>
    </main>
  )
}
```

> NOTE: Be sure to import `useState` from the `react` package at the top.

When you using input fields you can take one of two approaches:

1. Set the `defaultValue` property to make the input an "uncontrolled" component. React doesn't control the value of the input. The browser maintains the value of the input
1. Set the `value` & `onChange` properties to make the input a "controlled" component. React **does** control the value of the input because you explicitly maintain its value in `state`. Every `onChange`, you update the state and reset its `value`.

## Exercises

- Use the React Developer Tools to watch the `state` of `App` update as you type into the fields

## Next

Go to [Step 3 - API](../03-api/).

## Resources

- [Using the State Hook](https://reactjs.org/docs/hooks-state.html)
- [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html)
- [Handling Events](https://reactjs.org/docs/handling-events.html)
- [Lifting State Up](https://reactjs.org/docs/lifting-state-up.html)
- [`SyntheticEvent`](https://reactjs.org/docs/events.html)
- [Forms](https://reactjs.org/docs/forms.html)
- [DOM Elements](https://reactjs.org/docs/dom-elements.html)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
