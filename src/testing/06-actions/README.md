# Step 6 - Redux Actions

In this step, we will start testing the Redux data layer. The goal of this step is to test both synchronous and asynchronous [Redux actions](https://redux.js.org/basics/actions), the payloads of information that send data from the app to the store.

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

## Jump Around

[Concepts](#concepts) | [Restart Setup](#restart-setup) | [Tasks](#tasks) | [Exercises](#exercises) | [Resources](#resources)

## Concepts

- Verify Redux synchronous actions
- Verify Redux asynchronous actions
- Mock API calls

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
cp -r src/testing/05-ui-state src/workshop
```

Ensure [`src/index.js`](../../index.js#L3) is still pointing to the `workshop` App:

```js
import App from './workshop/App';
```

Run the tests:

```sh
# Yarn
yarn test

# ...or NPM
npm test
```

Jest will start up in "watch mode", run the existing tests, and then wait for tests to change so that it can run again automatically.

## Tasks

Create [`actions/index.test.js`](actions/index.test.js) to begin testing the [Redux actions](actions/index.js):

```js
import * as actions from './';
import {EMAILS, DEFAULT_EMAIL} from '../__fixtures__';
```

Let's test the lone synchronous Redux action, `updateEmails`. It takes in a list of `emails`, and returns an action object of `type` `UPDATE_EMAILS` and the `emails` as the `payload`:

```js
import * as actions from './';
import {EMAILS, DEFAULT_EMAIL} from '../__fixtures__';

describe('updateEmails', () => {
  it('returns UPDATE_EMAILS type', () => {
    expect(actions.updateEmails(EMAILS)).toEqual({
      type: actions.UPDATE_EMAILS,
      payload: EMAILS,
    });
  });
});
```

There's really nothing special about this unit test; it a traditional unit test with an input, an output, and no side-effects. Things get more interesting when we want to test async actions that have side-effects (API calls).

Let's test `getEmails` action. It is an async action using [`redux-thunk`](https://github.com/reduxjs/redux-thunk). At a high-level, it makes a call to the `getEmails` API,  passes the returned emails to the `updateEmails` action we just tested above, and then dispatches the result action object. But since it uses thunks, `getEmails` returns a function that the `redux-thunk` middleware will call with the Redux `dispatch`. That function returns the `Promise` returns by the `getEmails` API, and when that `Promise` is resolved, the `updateEmails` action object is dispatched.

Let's work our way through the test. First let's set up the test to just call the action:

```js
describe('getEmails', () => {
  it('calls the getEmails API and dispatches UPDATE_EMAILS action on API success', async () => {
    actions.getEmails();
  });
});
```

The first thing we want to test is that it is calling the `getEmails` API. But the `getEmails` action is returning a function that needs to be invoked with Redux dispatch in order for the API to be called. So let's pass it a mock dispatch:

```js
describe('getEmails', () => {
  it('calls the getEmails API and dispatches UPDATE_EMAILS action on API success', async () => {
    const mockDispatch = jest.fn();

    // Call action with the mock dispatch
    actions.getEmails()(mockDispatch);
  });
});
```

You should get a console error because the code is not trying to call `fetch` within the `getEmails` API and it doesn't exist:

```sh
  ● Console

    console.error src/testing/06-actions/api/index.js:4
      TypeError: Network request failed
```

We need to mock the `getEmails` API both so that `fetch` is not called in our test **and** so we can verify that it's being called:

```js
import * as actions from './';
import * as api from '../api';
import {EMAILS, DEFAULT_EMAIL} from '../__fixtures__';

describe('updateEmails', () => {
  // ...
});

describe('getEmails', () => {
  it('calls the getEmails API and dispatches UPDATE_EMAILS action on API success', async () => {
    // mock the API response to be successful, returning emails response
    jest.spyOn(api, 'getEmails').mockReturnValue(Promise.resolve(EMAILS));

    const mockDispatch = jest.fn();

    // Call action with the mock dispatch
    actions.getEmails()(mockDispatch);

    // verify that the API was called with the expected arguments
    expect(api.getEmails).toHaveBeenCalledTimes(1);
    expect(api.getEmails).toHaveBeenCalledWith();

    api.getEmails.mockRestore();
  });
});
```

Using [`jest.spyOn`](https://jestjs.io/docs/en/jest-object#jestspyonobject-methodname) and [`.mockReturnValue()`](https://jestjs.io/docs/en/mock-function-api#mockfnmockreturnvaluevalue) we can mock the `getEmails` API call. The only way this works is by importing the API calls as an object (`import * as api`). We also undo the mock by calling [`.mockRestore()`](https://jestjs.io/docs/en/mock-function-api#mockfnmockrestore) at the end.

Now we can verify that we've called the `getEmails` API only once and with no parameters.

The last thing we want to verify is that the `mockDispatch` is called with the expected `UPDATE_EMAILS` action object. But if we try to just add in the `expect()` statements, it won't work:

```js
describe('getEmails', () => {
  it('calls the getEmails API and dispatches UPDATE_EMAILS action on API success', async () => {
    // mock the API response to be successful, returning emails response
    jest.spyOn(api, 'getEmails').mockReturnValue(Promise.resolve(EMAILS));

    const mockDispatch = jest.fn();

    // Call action with the mock dispatch
    await actions.getEmails()(mockDispatch);

    // verify that the API was called with the expected arguments
    expect(api.getEmails).toHaveBeenCalledTimes(1);
    expect(api.getEmails).toHaveBeenCalledWith();

    // verify that the appropriate action was dispatched
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(actions.updateEmails(EMAILS)).toEqual({
      type: actions.UPDATE_EMAILS,
      payload: EMAILS,
    });

    api.getEmails.mockRestore();
  });
});
```

You will get an error like:

```sh
 FAIL  src/testing/06-actions/actions/index.test.js
  ● getEmails › calls the getEmails API and dispatches UPDATE_EMAILS action on API success

    expect(jest.fn()).toHaveBeenCalledTimes(1)

    Expected mock function to have been called one time, but it was called zero times.
```

By the time of our `expect()` the `mockDispatch` hasn't been called. This is because our action is asynchronous and is waiting for the `getEmails` API to resolve and return the list of emails. Even though our `getEmails` API mock is immediately resolving with `EMAILS`, it's still asynchronous. We need to wait until the API has resolved the `Promise`.

There several ways to wait, but we'll use the [`async`/`await`](https://jestjs.io/docs/en/asynchronous#async-await) approach:

```js
describe('getEmails', () => {
  it('calls the getEmails API and dispatches UPDATE_EMAILS action on API success', async () => {
    // mock the API response to be successful, returning emails response
    jest.spyOn(api, 'getEmails').mockReturnValue(Promise.resolve(EMAILS));

    const mockDispatch = jest.fn();

    // Call action with the mock dispatch and wait until the API async to finish
    await actions.getEmails()(mockDispatch);

    // verify that the API was called with the expected arguments
    expect(api.getEmails).toHaveBeenCalledTimes(1);
    expect(api.getEmails).toHaveBeenCalledWith();

    // verify that the appropriate action was dispatched
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(actions.updateEmails(EMAILS)).toEqual({
      type: actions.UPDATE_EMAILS,
      payload: EMAILS,
    });

    api.getEmails.mockRestore();
  });
});
```

We mark the `it()` test case as `async` and when we call the function returns by the `getEmails` action with the `mockDispatch` we `await` its resolution. Now all of the `expect()` verifications following, happen after the `getEmails` API has resolved the `Promise`.

Let's test the `addEmails` action. It calls the `addEmails` API. If the request is successful, it dispatches an `ADD_EMAIL` action object. However, if the request fails, it throws an `Error`.

Let's handle the API failure case:

```js
describe('addEmail', () => {
  it('calls the addEmail API and throws an error on API failure', async () => {
    // mock the API response to be unsuccessful
    jest.spyOn(api, 'addEmail').mockReturnValue(Promise.resolve({success: false}));

    const mockDispatch = jest.fn();

    // Call action with the mock dispatch and wait until the API async to finish
    // verify it throws an error when API is unsuccessful
    await expect(actions.addEmail(DEFAULT_EMAIL)(mockDispatch)).rejects.toBeInstanceOf(Error);

    // verify that the API was still called with the expected arguments
    expect(api.addEmail).toHaveBeenCalledTimes(1);
    expect(api.addEmail).toHaveBeenCalledWith(DEFAULT_EMAIL);

    api.addEmail.mockRestore();
  });
});
```

We mock out the `addEmail` API to resolve a `Promise` that has `{success: false}` (failure to add). In order to verify that the action fails and throws an `Error`, we use [`.rejects`](https://jestjs.io/docs/en/expect#rejects) and then add the matcher to an instance of `Error` to the end.

## Exercises

- Add remaining test for `addEmail` that it calls the `addEmail` API and dispatches `ADD_EMAIL` action on API success
- Add tests for `deleteEmail`
  * calls the `deleteEmail` API and throws an error on API failure
  * calls the `deleEmail` API and dispatches `DELETE_EMAIL` action on API success
- Add tests for `markRead`
  * calls the `setRead` API and throws an error on API failure
  * calls the `setRead` API and dispatches `SET_READ_EMAIL` action on API success
- Add tests for `markUnread`
  * calls the `setRead` API and throws an error on API failure
  * calls the `setRead` API and dispatches `SET_READ_EMAIL` action on API success
- **BONUS:** Factor out `jest.spyOn` + `.mockReturnValue` into a helper `stub()` function

## Next

Go to [Step 7 - Redux Reducers](../07-reducers/).

## Resources

- [Testing Asynchronous Code](https://jestjs.io/docs/en/asynchronous)
- [`redux-thunk`](https://github.com/reduxjs/redux-thunk)
- [Redux actions](https://redux.js.org/basics/actions)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
