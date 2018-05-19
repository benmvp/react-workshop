# Step 12 - API lib

Now that we've built out all of the UI functionality, the `App` component is doing way too much. Right now it makes API calls and has lots of logic of how to go from one state to the next. The goal of this step is to consolidate all of the API calls from the `App` component into a single file. This will be the first step in lightening the `App` to only deal with component-related tasks. We'll tackle the rest in [Step 13](../13-action-reducers/).

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

## Jump Around

[Concepts](#concepts) | [Restart Setup](#restart-setup) | [Tasks](#tasks) | [Resources](#resources)

## Concepts

- Factoring out logic from components
- Centralizing API calls

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
cp -r src/react/11-email-form-modal src/workshop
```

Ensure [`src/index.js`](../../index.js#L3) is still pointing to the `workshop` App:

```js
import App from './workshop/App';
```

Start API server (running at [http://localhost:9090/](http://localhost:9090/)):

```sh
# Yarn
yarn run start:api

# ...or NPM
npm run start:api
```

In a **separate terminal window/tab**, making sure you're still in the repo root directory, start the app:

```sh
# Yarn
yarn start

# ...or NPM
npm start
```

After the app is initially built, a new browser window should open up at [http://localhost:3000/](http://localhost:3000/), and you should be able to continue on with the tasks below.

## Tasks

In `App`, take the code making the `fetch` request in `_getUpdateEmails()` and move into a new [`api/index.js`](api/index.js) file. Put the code in a `export`ed function called `getEmails()`:

```js
export const getEmails = () =>
  // Make a GET request
  fetch('//localhost:9090/emails')
    .then(res => res.json())
    .catch(ex => console.error(ex));
```

Back in `App`, import the `getEmails()` function and use it in `_getUpdateEmails()`:

```js
// other imports

import {getEmails} from './api';

// helper components

export default class App extends Component {
  // prop types & default props

  // initialize state

  // lifecycle methods

  _getUpdateEmails = () => {
    return getEmails()
      .then(emails => this.setState({emails}));
  }

  // other helper methods

  // render()
}
```

Move the `fetch` logic for adding a new email out of `_handleFormSubmit()` into a new `addEmail()` API lib function:

```js
export const addEmail = email =>
  // Make a JSON POST with the new email
  fetch('//localhost:9090/emails', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(email)
  })
    .then(res => res.json())
    .catch(ex => console.error(ex));
```

The API lib only has two functions and already has a lot of repetition. Factor out the `fetch` URL into a shared `const` and create a `_fetchJSON` helper utility:

```js
const API_BASE_URL = '//localhost:9090/emails';

const _fetchJson = (url, options) =>
  fetch(url, options)
    .then(res => res.json())
    .catch(ex => console.error(ex));

export const addEmail = email =>
  // Make a JSON POST with the new email
  _fetchJson(API_BASE_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(email)
  });

export const getEmails = () =>
  // Make a GET request
  _fetchJson(API_BASE_URL);
```

Now in `App` use `addEmail` in `_handleFormSubmit()`:

```js
// other imports

import {addEmail, getEmails} from './api';

// helper components

export default class App extends Component {
  // prop types & default props

  // initialize state

  // lifecycle methods

  _handleFormSubmit = (newEmail) => {
    // Make a JSON POST with the new email
    addEmail(newEmail).then(({success}) => {
      if (success) {
        this.setState(({emails}) => {
          // if the email was successfully updated, we have to make
          // a request to get the new list of emails, but we'll have
          // to wait for the response of that request, so let's add to
          // our state immediately and then later when the response
          // comes back, the server-side list will update. This is mainly
          // here to demonstrate immutable updating of data structures

          // Create a full email info by spreading in `id`, `date` & `read`
          // Then spread to front of emails state (since it's the newest)
          let newEmails = [
            {
              ...newEmail,
              id: Date.now(),
              date: `${new Date()}`,
              read: false
            },
            ...emails
          ];

          // Set state with new updated emails list
          return {
            emails: newEmails,
            showForm: false
          };
        });
      } else {
        throw new Error('Unable to send email!');
      }
    });
  }

  // other helper methods

  // render()
}
```

## Exercises

- Factor out the remaining `fetch` calls in `App` into the helper API lib

## Next

Go to [Step 13 - Action-Reducers](../13-action-reducers/).

## Resources

- [ES6 imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
