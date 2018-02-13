# Step 14 - Redux-y Actions and Reducers

Our goal in [Step 13](../13-action-reducers) was to separate the app state from the display logic by moving the business logic into a set of actions (api calls) and reducers (state changes). This, however, wasn't in true Redux-y fashion. The goal of this step and [Step 15](../15-connect-app-and-store) is make that final jump and turn this application into a full [Redux](http://redux.js.org/) app.

In order to do this we will need to separate out our `action-reducers` into two separate files: [`actions/index.js`](src/actions/index.js) and [`reducers/index.js`](src/reducers/index.js). Our ["actions"](http://redux.js.org/docs/basics/Actions.html) will respond to user interactions and communicate to our ["reducers"](http://redux.js.org/docs/basics/Reducers.html) what changes need to occur. The "reducers" will listen for dispatched "actions", and respond when appropriate, modifying the state as appropriate (the same as before!). This 'broadcasting' and 'listening' is achieved by wrapping our "actions" in a [`dispatch()`](http://redux.js.org/docs/api/Store.html#dispatch) function.

The goal of this step in particular is to pull out the "actions" and "reducers" into their own specific files and set up the interaction between the two.

Our app is very API call heavy, so we also need support for asynchronous actions; something vanilla [Redux](http://redux.js.org/) does not support out of the box. Enter [`redux-thunk`](https://github.com/gaearon/redux-thunk)! Redux thunk lets us call "actions" as "action creators" so that we can dispatch asynchronous Promise-based calls.

Lets implement this in our app.

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](src/).

## Restart Setup

If you didn't successfully complete the previous step, you can jump right in by copying the step and installing the dependencies.

Ensure you're in the root folder of the repo:

```sh
cd react-workshop
```

Remove the existing workshop directory if you had previously started elsewhere:

```sh
rm -rf workshop
```

Copy the previous step as a starting point:

```sh
cp -r 13-action-reducers workshop
```

Change into the `workshop` directory:

```sh
cd workshop
```

Install all of the dependencies ([`yarn`](https://yarnpkg.com/en/) is preferred):

```sh
# Yarn
yarn

# ...or NPM
npm install
```

Start API server (running at [http://localhost:9090/](http://localhost:9090/)):

```sh
# Yarn
yarn run start:api

# ...or NPM
npm run start:api
```

In a **separate terminal window/tab**, making sure you're still in the `workshop` directory, start the app:

```sh
# Yarn
yarn start

# ...or NPM
npm start
```

After the app is initially built, a new browser window should open up at [http://localhost:3000/](http://localhost:3000/), and you should be able to continue on with the tasks below.

## Tasks

Create two new folders and files [`actions/index.js`](src/actions/index.js) and [`reducers/index.js`](src/reducers/index.js). We want to separate the `markRead()` action-reducer into separate a separate action and reducer.

First, pull over `markRead()` into `actions/index.js`. But since the helper it calls (`_setUnread()`) involves calling an API (an async action), we are going to need to `redux-thunk`-ify the action.

```js
// actions/index.js

export const markRead = (emailId) => (
    (dispatch) => _setUnread(dispatch, emailId, false)
)
```

We are essentially wrapping the call to `_setUnread()` inside a redux-thunk action creator, exposing `dispatch()` to our helper. Below is a simple example showcasing what is going on here:

```js
// example

const myActionCreator = (argumentFromComponent) => (
    //redux-thunk exposing dispatch
    (dispatch) => (
        //we have abstracted this bit into a helper function
        makeApiCall(argumentFromComponent)
            .then(dispatch(actionToModifyStore))
    )
)
```

Now that we have our action creator made, lets pull over `_setUnread()` (excluding the state logic).

```js
// actions/index.js

import {setUnread as setUnreadApi} from '../api'

const _setUnread = (dispatch, emailId, unread) => (
    setUnreadApi(emailId, unread).then(({success}) => {
        if (success) {
            return dispatch(actionToBeDefined())
        }

        throw new Error(
            `Unable to set email ID# ${emailId} unread state to ${unread}.`
        )
    }
)

export const markRead = (emailId) => (
    (dispatch) => _setUnread(dispatch, emailId, false)
)
```

Now we have `_setUnread()` making the API call to our server, and replaced any state logic with a call to `dispatch()`. Now we want `dispatch()` to actually fire an action signifying what state change needs to occur. Add the action that will be fired, and have `dispatch()` call it properly:

```js
// actions/index.js

import {setUnread as setUnreadApi} from '../api';

const SET_EMAIL_UNREAD = 'setEmailUnread';
const setEmailUnread = (emailId, unread) => ({
    type: SET_EMAIL_UNREAD,
    payload: {
        emailId,
        unread
    },
})

const _setUnread = (dispatch, emailId, unread) => (
    setUnreadApi(emailId, unread).then(({success}) => {
        if (success) {
            return dispatch(setEmailUnread(emailId, unread))
        }

        throw new Error(
            `Unable to set email ID# ${emailId} unread state to ${unread}.`
        );
    }
)

export const markRead = (emailId) => (
    (dispatch) => _setUnread(dispatch, emailId, false)
)
```

With the above we have separated the actions and state logic into two separate concerns.

Reducers are simply functions which take in the current state, update it if necessary, and return the new state. It also takes an action as an argument to determine exactly what type of update should be done.

Next, set up the reducer to handle updating the 'read' state of an email.


```js
// reducers/index.js

const emails = (state, action) => {
    let nextState = state;

    //do stuff

    return nextState;
}
```

Because `emails` is an array, we can take advantage of argument defaults to set it to an empty array. Next, import the action type we exported in `actions/index.js`. Lastly, when the `action.type` matches `SET_EMAIL_UNREAD`, perform the state update that was previously in `_setUnread()` (when it was an action-reducer).

```js
// reducers/index.js

import {SET_EMAIL_UNREAD} from '../actions';

const emails = (state = [], action) => {
    let nextState = state;

    if (action.type === SET_EMAIL_UNREAD) {
        nextState = nextState.map((email) => (
            email.id === action.payload.emailId ? {...email, unread: action.payload.unread} : email
        )
    }

    return nextState;
}
```

With the above, our state tree has a single key: `emails`, which will listen for actions of type `SET_EMAIL_UNREAD`, and return a new state tree with the appropriate modifications applied.

Lastly, since `emails` are the only non-ui state in our app we can export this reducer directly.

```js
// reducers/index.js

import {SET_EMAIL_UNREAD} from '../actions';

export const emails = (state = [], action) => {
    let nextState = state;

    if (action.type === SET_EMAIL_UNREAD) {
        nextState = nextState.map((email) => (
            email.id === action.payload.emailId ? {...email, unread: action.payload.unread} : email
        )
    }

    return nextState;
}
```

Once we add the remaining actions and logic into the reducer it is ready to be consumed by our app.

## Exercises

1. Convert `markUnread()`, `addEmail()`, `getEmails()`, & `deleteEmail()` into an action creators and actions
1. Move the state logic for `addEmail()` and `deleteEmail()` into the reducer in `reducers/index.js`.

## Next

As of now our app is not calling or utilizing the actions we have created. Go to [Step 15 - Connect App and Store](../15-connect-app-and-store/) to actually create the store and properly hydrate our app using our store and reducers.

## Resources

- [Redux](http://redux.js.org/)
- [Actions](http://redux.js.org/docs/basics/Actions.html)
- [Reducers](http://redux.js.org/docs/basics/Reducers.html)
- [`redux-thunk`](https://github.com/gaearon/redux-thunk)
- [Flux Standard Actions](https://github.com/acdlite/flux-standard-action)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
