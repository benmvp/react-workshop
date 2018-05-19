# Step 8 - Interacting with APIs

The goal of this step is to move away from the hard-coded `EMAILS` constant to interacting with a "real" API server using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and [ES6 Promises](http://www.benmvp.com/learning-es6-promises/). We'll retrieve the data in the `App` component's lifecyle methods and store in its `state`.

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

## Jump Around

[Concepts](#concepts) | [Restart Setup](#restart-setup) | [API Setup](#api-setup) | [Tasks](#tasks) | [Resources](#resources)

## Concepts

- Making API calls
- Using Promises
- Hooking into the component lifecycle

## Restart Setup

If you didn't successfully complete the previous step, you can jump right in by copying the step.

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
cp -r src/react/07-delete-email src/workshop
```

Ensure [`src/index.js`](../../index.js#L3) is still pointing to the `workshop` App:

```js
import App from './workshop/App';
```

Start the app:

```sh
# Yarn
yarn start

# ...or NPM
npm start
```

After the app is initially built, a new browser window should open up at [http://localhost:3000/](http://localhost:3000/), and you should be able to continue on with the tasks below.

## API Setup

If you successfully completed the previous step, you just need to start the API server. In a **separate terminal window/tab**, making sure you're still in the repo root directory, start API server (running at [http://localhost:9090/](http://localhost:9090/)):

```sh
# Yarn
yarn run start:api

# NPM
npm run start:api
```

Verify that you receive a JSON response from [http://localhost:9090/emails](http://localhost:9090/emails).

## Tasks

In the [`App`](App.js) component add the [`componentDidMount()`](https://facebook.github.io/react/docs/react-component.html#componentdidmount) lifecycle method and make a `GET` [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) request to [http://localhost:9090/emails](http://localhost:9090/emails):

```js
export default class App extends Component {
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

`componentDidMount()` is invoked immediately after a component is mounted (added to the DOM). Initialization that requires DOM nodes or API requests to load data go here.

We can replace the use of the `EMAILS` constant with data from the API. Initialize the `state` to empty (`[]`), store the result of the `fetch` call in the `App` component's `state`, and remove the `EMAILS` constant altogether:

```js
export default class App extends Component {
  state = {
    // Initialize emails state to an empty array.
    // Will get populated with data in `componentDidMount`
    emails: [],
    // Initialize selected email ID to -1, indicating nothing is selected.
    // When an email is selected in EmailList, this will be updated to
    // corresponding ID
    selectedEmailId: -1
  }

  componentDidMount() {
    // Retrieve emails from server once we know DOM exists
    fetch('//localhost:9090/emails')
      .then(res => res.json())
      // update the state with the emails fetched from the server
      .then(emails => this.setState({emails}))
      .catch(ex => console.error(ex));
  }

  // render()
}
```

Initially you'll see an empty list of emails, but soon after a list of 50 emails instead of the original five. Our app is looking more like a legitimate app.

Next let's add long-polling to `App` so that we're periodically checking for any new emails that may have been added (or deleted):

```js
export default class App extends Component {
  state = {
    // Initialize emails state to an empty array.
    // Will get populated with data in `componentDidMount`
    emails: [],
    // Initialize selected email ID to -1, indicating nothing is selected.
    // When an email is selected in EmailList, this will be updated to
    // corresponding ID
    selectedEmailId: -1
  }

  componentDidMount() {
    // Retrieve emails from server once we know DOM exists
    this._getUpdateEmails();

    // Set up long-polling to continuously get new data every 2 seconds
    this._pollId = setInterval(
      () => this._getUpdateEmails(),
      2000
    );
  }

  componentWillUnmount() {
    // Need to remember to clearInterval when the component gets
    // removed from the DOM, otherwise the interval will keep going
    // forever and leak memory
    clearInterval(this._pollId);
  }

  _getUpdateEmails = () => {
    return fetch('//localhost:9090/emails')
      .then(res => res.json())
      .then(emails => this.setState({emails}))
      .catch(ex => console.error(ex));
  }

  // helper methods

  // render()
}
```

We leveraged [`setInterval`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) in [`componentDidMount()`](https://facebook.github.io/react/docs/react-component.html#componentdidmount) to kick off the long-polling after loading the initial data. We also used [`clearInterval`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval) in [`componentWillUnmount()`](https://facebook.github.io/react/docs/react-component.html#componentwillunmount) to clean up after ourselves and stop polling whenever `App` is removed from the DOM.

We can communicate the email creations & deletions with the API since the server should be the source of truth. Let's start by updating `_handleFormSubmit()` to make an HTTP `POST` with the new email info:

```js
export default class App extends Component {
  state = {
    // Initialize emails state to an empty array.
    // Will get populated with data in `componentDidMount`
    emails: [],
    // Initialize selected email ID to -1, indicating nothing is selected.
    // When an email is selected in EmailList, this will be updated to
    // corresponding ID
    selectedEmailId: -1
  }

  // componentDidMount()

  // other helper methods

  _handleFormSubmit = (newEmail) => {
    // Make a JSON POST with the new email
    fetch('//localhost:9090/emails', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEmail)
    })
      .then(res => res.json())
      .then(({success}) => {
        if (!success) {
          throw new Error('Unable to send email!');
        }
      })
      .catch(ex => console.error(ex));
  }

  // render()
}
```

You should now be able to fill out the email form, click "Send email", and within 2 seconds see the new email added at the top of the list. The maximum 2-second delay is due to the long-polling we set up. It's the only way that `this.state.emails` is update with the latest data.

## Exercises

- Update `_handleItemDelete()` to make an HTTP `DELETE` request to `//localhost:9090/emails/<EMAIL_ID>` to delete the unwanted email
- Add `pollInterval` prop to [`App`](App.js) (with the appropriate prop type defined) that defaults to `2000` (using [`defaultProps`](https://facebook.github.io/react/docs/react-component.html#defaultprops)), but [`index.js`](index.js) overrides passing in `5000` to `<App />`
- After `POST`ing the new email in `_handleFormSubmit()`, "optimistically update" `this.state.emails` with the new email so that the new email shows up immediately in the email list before the long poll interval comes around (HINT: code should be _very_ similar to code prior to making API `POST`)
- Similarly after `DELETE`ing the email in `_handleItemDelete()` "optimistically update" `this.state.emails` so that the deleted email is immediately removed from the list before the long poll interval comes around

## Next

Go to [Step 9 - Styling](../09-styling/).

## Resources

- [State and Lifecycle](https://facebook.github.io/react/docs/state-and-lifecycle.html)
- [`setState()` documentation](https://facebook.github.io/react/docs/react-component.html#setstate)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) & Github's [`fetch` polyfill](https://github.com/github/fetch)
- [Learning ES6: Promises](http://www.benmvp.com/learning-es6-promises/)
- [Lifecycle Methods](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle)
- [HTTP Methods](http://restfulapi.net/http-methods/)
- [Postman](https://www.getpostman.com/)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
