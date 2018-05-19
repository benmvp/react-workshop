# Step 13 - Action-Reducers

The goal of this step is to complete the factoring out of state logic from the top-level `App` that we started in [Step 12](../12-api-lib). Whenever the user performs an interaction, in `App` we first make an API call and then transform the state based upon the interaction. Borrowing terms from [Redux](http://redux.js.org/), the API call is an ["action"](http://redux.js.org/docs/basics/Actions.html) and the state transformation is a ["reducer"](http://redux.js.org/docs/basics/Reducers.html). By factoring out these "action-reducers" (without actually using Redux), we can allow the `App` component to just focus on the UI, and not data and logic.

The goal of these action-reducer is to perform an API call and then return a `Promise` that contains the updated `state`.

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

## Jump Around

[Concepts](#concepts) | [Restart Setup](#restart-setup) | [Tasks](#tasks) | [Resources](#resources)

## Concepts

- Factoring out logic from components
- Creating "action-reducers"

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
cp -r src/react/12-api-lib src/workshop
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

Take out the API call ("action") and the logic for updating `this.state.emails` ("reducer") in `_handleFormSubmit` of `App`. Create a new [`action-reducers/index.js`](action-reducers/index.js) and export an `addEmail()` function:

```js
import {
  addEmail as addEmailApi
} from '../api';

export const addEmail = (emails, newEmail) =>
  addEmailApi(newEmail).then(({success}) => {
    if (success) {
      return [
        {
          ...newEmail,
          id: Date.now(),
          date: `${new Date()}`,
          read: false
        },
        ...emails
      ];
    }

    throw new Error('Unable to send email!');
  });
```

Now `_handleFormSubmit` in `App` should just call the new `addEmail` action-reducer and update `this.state.emails` with the value in the returned promise:

```js
// other imports

import {addEmail} from './action-reducers';

// helper components

export default class App extends Component {
  // prop types & default props

  // initialize state

  // lifecycle methods

_handleFormSubmit = (newEmail) => {
    addEmail(this.state.emails, newEmail)
      // if the email was successfully updated, we have to make
      // a request to get the new list of emails, but we'll have
      // to wait for the response of that request, so let's add to
      // our state immediately and then later when the response
      // comes back, the server-side list will update. This is mainly
      // here to demonstrate immutable updating of data structures
      .then(emails => this.setState({emails, showForm: false}));
  }

  // other helper methods

  // render()
}
```

## Exercises

- Create the remaining action-reducers for `getEmails()`, `deleteEmail()`, `markRead()` & `markUnread()`

## Next

You're done! Your code should mirror the [Completed React App](../end/).

## Resources

- [Redux](http://redux.js.org/)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
