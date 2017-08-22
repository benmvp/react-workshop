# Step 4 - Fetching from server

The goal of this step is to move away from the hard-coded `EMAILS` `const` to fetching "real" data from the server using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and [ES6 Promises](http://www.benmvp.com/learning-es6-promises/). We'll retrieve the data in the `App` components lifecyle methods and store in its `state`.

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](src/).

## Setup

In a **separate terminal window/tab**, start API server (running at [http://localhost:9090/](http://localhost:9090/)):

```sh
# Yarn
yarn run start:api

# NPM
npm run start:api
```

Verify that you receive a JSON response from [http://localhost:9090/emails](http://localhost:9090/emails).

## Tasks

In the [`App`](src/App.js) component add the [`componentDidMount()`](https://facebook.github.io/react/docs/react-component.html#componentdidmount) lifecycle method and make a `GET` [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) request to [http://localhost:9090/emails](http://localhost:9090/emails):

```js
export default class App extends PureComponent {
  componentDidMount() {
    // Retrieve emails from server once we know DOM exists
    fetch('//localhost:9090/emails');
  }

  render() {
    return (
      <main className="app">
        <EmailList emails={EMAILS} />
        <EmailView />
        <EmailForm />
      </main>
    );
  }
}
```

Store the result of the `fetch` call in the `App` component's `state`, use it in `render()` instead of the `EMAILS` `const`, and remove the `EMAILS` `const` altogether:

```js
export default class App extends PureComponent {
  state = {
    // Initialize emails state to an empty array.
    // Will get populated with data in `componentDidMount`
    emails: []
  }

  componentDidMount() {
    // Retrieve emails from server once we know DOM exists
    fetch('//localhost:9090/emails')
      .then(res => res.json())
      // update the state with the emails fetched from the server
      .then(emails => this.setState({emails}))
      .catch(ex => console.error(ex));
  }

  render() {
    let {emails} = this.state;

    return (
      <main className="app">
        <EmailList emails={emails} />
        <EmailView />
        <EmailForm />
      </main>
    );
  }
}
```

You should now see a list of 50 emails instead of the original 3. Our app is _slowly_ coming to life.

## Exercises

- Add long polling by adding call to `setInterval` in [`componentDidMount()`](https://facebook.github.io/react/docs/react-component.html#componentdidmount) & `clearInterval` in [`componentWillUnmount()`](https://facebook.github.io/react/docs/react-component.html#componentwillmount)
- Add `pollInterval` prop to [`App`](src/App.js) (with the appropriate prop type defined) that defaults to `2000` (using [`defaultProps`](https://facebook.github.io/react/docs/react-component.html#defaultprops)), but [`index.js`](src/index.js) overrides passing in `5000` to `<App />`
- Try modifying or deleting entries from [`data/emails.json`](data/emails.json) and watch the `EmailList` update appropriately

## Next

Go to [Step 5 - Email View](../05-email-view/).

## Resources

- [State and Lifecycle](https://facebook.github.io/react/docs/state-and-lifecycle.html)
- [`setState()` documentation](https://facebook.github.io/react/docs/react-component.html#setstate)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) & Github's [`fetch` polyfill](https://github.com/github/fetch)
- [Learning ES6: Promises](http://www.benmvp.com/learning-es6-promises/)
- [Lifecycle Methods](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle)
- [Postman](https://www.getpostman.com/)
