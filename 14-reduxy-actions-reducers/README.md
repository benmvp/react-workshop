# Step 14 - Reduxy Actions and Reducers

Our goal in [Step 13](../13-action-reducers) was to separate the app state from the display logic by moving the business logic into a set of actions (api calls) and reducers (state changes). This, however, wasn't in true Redux-y fashion. The goal of the next two steps is make that final jump and turn this application into a full [Redux](http://redux.js.org/) app.

In order to do this we will need to separate out our `action-reducers` into two separate files: [`actions/index.js`](./actions/index.js) and [`reducers/index.js`]('reducers/index.js). Our ["actions"](http://redux.js.org/docs/basics/Actions.html) will respond to user interactions and communicate to our ["reducers"](http://redux.js.org/docs/basics/Reducers.html) what changes need to occur. The "reducers" will listen for dispatched "actions", and respond when appropriate, modifying the state as appropriate (the same as before!). This 'broadcasting' and 'listening' is achieved by wrapping our "actions" in a [`dispatch()`](http://redux.js.org/docs/api/Store.html#dispatch) function.

The goal of this step in particular is to pull out the "actions" and "reducers" into their own specific files and set up the interaction between the two.

Our app is very API call heavy, so we need support for asynchronous actions, something vanilla [Redux](http://redux.js.org/) does not support out of the box. Enter [`redux-thunk`](https://github.com/gaearon/redux-thunk)! Redux thunk lets us call "actions" as "actionCreators" so that we can dispatch asynchronous promise based calls.

Lets implement this in our app.

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](src/).

## Tasks

Create 2 new folders and files [`actions/index.js`](./actions/index.js) and [`reducers/index.js`]('reducers/index.js).

Now lets separate the `markRead()` and `markUnread()` action-reducers into their respective actions. In our empty `actions/index.js` import the `setUnread()` api call. Next, lets start by bringing over `markRead()` and `_setUnread()` functions.

The two functions' are going to be similar to how they were previously defined, with some key differences:

* Remove emails from both function's arguments
* Change `markRead` into a redux-thunk style function and pass dispatch into `_setUnread`
* Remove the state update logic from `_setUnread` and replace with a call to `dispatch()`

Lets also define the traditional redux style action which will be dispatched to update the state of the application.

First, lets pull over `markRead()` but since the helper it calls involves calling an API (an async action), we are going to need to `redux-thunk`-ify the action.

```js
// actions/index.js

export const markRead = (emailId) => (dispatch) => _setUnread(dispatch, emailId, false);
```

What we are doing above is essentially wrapping the call to the helper inside a redux-thunk action creator, exposing `dispatch()` to our helper. Below is a simple example showcasing what is going on here:

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
Now that we have our action creator made, lets pull over `_setUnread()` minus the state logic.

```js
// actions/index.js

import {setUnread as setUnreadApi} from '../api';

const _setUnread = (dispatch, emailId, unread) => (
    setUnreadApi(emailId, unread).then(({success}) => {
        if (success) {
            return dispatch(actionToBeDefined())
        }

        throw new Error(
            `Unable to set email ID# ${emailId} unread state to ${unread}.`
        );
    }
)

export const markRead = (emailId) => (dispatch) => _setUnread(dispatch, emailId, false)
```
Now we have `_setUnread()` making the API call to our server, and replaced any state logic with a call to `dispatch()`. Now we want `dispatch()` to actually fire an action signifying what state change needs to occur. Lets add the action that will be fired, and have our `dispatch()` call it properly:

```js
// actions/index.js

import {setUnread as setUnreadApi} from '../api';

const SET_EMAIL_UNREAD = 'setEmailUnread';
const setEmailUnread = (emailId, unread) => ({
    type: SET_UNREAD,
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

export const markRead = (emailId) => (dispatch) => _setUnread(dispatch, emailId, false)
```
With the above we have separated the actions and state logic into two separate concerns.

Next lets set up our reducer to handle updating the 'read' state of an email.

Reducers are simply functions which take in the current state, update it if necessary, and return the updated state. It also takes an action as an argument to determine exactly what should be done.

```js
// reducers/index.js

const emails = (state, action) => {
    let nextState = state;

    //do stuff

    return nextState;
}
```

Since emails is an array, lets take advantage of argument defaults to set it to an empty array. Further,
lets import the action type we defined above and perform the state update that was previously in `_setUnread`
when the action.type matches `SET_EMAIL_UNREAD`.

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

1. Add `markUnread()` to `actions/index.js`
2. Convert `addEmail` into an actionCreator and action
3. Convert `deleteEmail` into an actionCreator and action
4. Move the state logic for `addEmail` and `deleteEmail` into the reducer in `reducers/index.js`.

## Next

As of now our app is not calling or utilizing the actions we have created, next lets actually create
the store and properly hydrate our app using our store and reducers.

## Resources

- [Redux](http://redux.js.org/)
- [Actions](http://redux.js.org/docs/basics/Actions.html)
- [Reducers](http://redux.js.org/docs/basics/Reducers.html)
- [`redux-thunk`](https://github.com/gaearon/redux-thunk)
- [Flux Standard Actions](https://github.com/acdlite/flux-standard-action)
