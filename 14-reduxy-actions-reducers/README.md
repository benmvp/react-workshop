# Step 14 - Reduxy Actions and Reducers

Our goal in [Step 13](../13-action-reducers) was to separate the app state from the display logic by moving the business logic into a set of actions (api calls) and reducers (state changes). This, however, wasn't in true reduxy fashion. The goal of the next two steps is make that final jump and turn this application into a full redux app.

In order to do this we will need to separate out our `action-reducers` into two separate files: `actions/index.js` and `reducers/index.js`. Our `actions` will respond to user interactions and communicate to our `reducers` what changes need to occur. The `reducers` will listen for dispatched `actions`, and respond when appropriate, modifying the state as appropriate (the same as before!). This 'broadcasting' and 'listening' is achieved by wrapping our `actions` in a `dispatch()` function.

The goal of this step in particular is to pull out the `actions` and `reducers` into their own specific files and set up the interaction between the two.

One last caveat is our app is very API call heavy, so we need support for asynchronous actions, something vanilla `Redux` does not support out of the box. Enter `redux-thunk`! Redux thunk lets us call `actions` as `actionCreators` like so:
```js
const myAction = (argumentFromComponent) => (
    (dispatch) => (
        makeApiCall(argumentFromComponent)
            .then(dispatch(actionToModifyStore))
    )
)
```
Using syntax similar to above we are able to dispatch an action to update our state upon completion of the API call.

Lets implement this in our app.

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](src/).

## Tasks

Create 2 new folders and files `actions/index.js` and `reducers/index.js`.

Now lets separate the markRead and markUnread action-reducers in their respective actions. In our empty actions/index.js import the `setUnread` api call. Next, lets start by bringing over `markRead` and `_setUnread` functions.

The two functions are going to be similar to how they were previously defined, with some key differences:

* Remove emails from both function's arguments
* Change `markRead` into a redux-thunk style function and pass dispatch into `_setUnread`
* Remove the state update logic from `_setUnread` and replace with a call to `dispatch()`

Lastly, lets define the traditional redux style action which will be dispatched to update the state of
the application.

```js
import {setUnread as setUnreadApi} from '../api';

const SET_UNREAD = 'setUnread';
const setUnread = (emailId, unread) => ({
    type: SET_UNREAD,
    payload: {
        emailId,
        unread
    },
})

const _setUnread = (dispatch, emailId, unread) => (
    setUnreadApi(emailId, unread).then(({success}) => {
        if (success) {
            return dispatch(actionToBeDefined)
        }

        throw new Error(
            `Unable to set email ID# ${emailId} unread state to ${unread}.`
        );
    }
)

export const markRead = (emailId) => (dispatch) => _setUnread(dispatch, emailId, false)
```

Next lets set up our reducer to handle updating the 'read' state of an email.

Reducers are simply functions which take in the current state, update it if necessary, and
return the updated state. It also takes an action as an argument to determine exactly what
should be done.

```js
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
import {SET_EMAIL_UNREAD} from '../actions';

const emails = (state = [], action) => {
    let nextState = state;

    if (action.type === SET_EMAIL_UNREAD) {
        nextState = nextState.map((email) => (
            email.id === action.payload.emailId ? {...email, action.payload.unread} : email
        )
    }

    return nextState;
}
```

## Exercises

1. Add `markUnread()` to actions.js
2. Convert `addEmail` into an action-creator and action
3. Convert `deleteEmail` into an action-creator and action
4. Move the state logic for `addEmail` and `deleteEmail` into the reducer.

## Next

As of now our app is not calling or utilizing the actions we have created, next lets actually create
the store and properly hydrate our app using our store and reducers.

## Resources

- [Redux](http://redux.js.org/)
