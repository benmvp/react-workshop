# Step 7 - Redux Reducers

[Redux reducers](https://redux.js.org/basics/reducers) specify how the app's state changes in response to [actions](../06-actions/) sent to the store. Reducers are simple input/output functions without side-effects, making testing them very straightforward. The goal of this step is to write tests for the `emails` reducer.

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

## Jump Around

[Concepts](#concepts) | [Restart Setup](#restart-setup) | [Tasks](#tasks) | [Exercises](#exercises) | [Resources](#resources)

## Concepts

- Verify reducer logic

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
cp -r src/testing/06-actions src/workshop
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

The only reducer in the app is the `emails` reducer. Create a new test file at [`reducers/index.test.js`](reducers/index.test.js):

```js
import {emails} from './';
import {
  SET_EMAIL_READ,
  DELETE_EMAIL,
  ADD_EMAIL,
  UPDATE_EMAILS,
} from '../actions';
import {EMAILS, DEFAULT_EMAIL, READ_EMAIL} from '../__fixtures__';


describe('emails', () => {

});
```

The way that we'll test the reducer is by passing current state and an action payload to the function. We will then verify that the returned updated state is what is expected.

First, let's test the initialization of the Redux state with the special `'@@redux/INIT'` action:

```js
describe('emails', () => {
  describe('initialization', () => {
    it('defaults to empty array', () => {
      expect(emails(undefined, {type: '@@redux/INIT'})).toEqual([]);
    });
  });
});
```

Reducers are not allowed to return `undefined` so it is always important to give the current state input a reasonable default (`[]` in our reducer).

Next let's verify that the `SET_EMAIL_READ` action properly updates the `read` property on the specified email:

```js
describe('SET_EMAIL_READ action', () => {
  it('sets the read state on the specified email', () => {
    const updatedEmails = emails(EMAILS, {
      type: SET_EMAIL_READ,
      payload: {
        emailId: EMAILS[0].id,
        read: true,
      }
    });

    // sanity check that we still have all the emails
    expect(updatedEmails).toHaveLength(EMAILS.length);

    // verify that the first email is now marked read
    expect(updatedEmails[0].read).toBe(true);
  });
});
```

Because we passed in the ID of the first email and said that its `read` property should be `true`, we expect that the first email will have its `read` property to set to `true` in `updatedEmails`.

Let's verify that the `DELETE_EMAIL` action properly deletes the specified email from the list:

```js
describe('DELETE_EMAIL action', () => {
  it('deletes the specified email from the list', () => {
    const emailIdToDelete = EMAILS[1].id;
    const updatedEmails = emails(EMAILS, {
      type: DELETE_EMAIL,
      payload: emailIdToDelete,
    });

    // verify that we now have one less email
    expect(updatedEmails).toHaveLength(EMAILS.length - 1);

    // make sure that the deleted email is not in list
    expect(updatedEmails.find((email) => email.id === emailIdToDelete)).toBeUndefined();
  });
});
```

We make a quick verification that the list of emails is one fewer. Then we also check that none of the remaining emails is the one that was to be deleted.

## Exercises

- Add `ADD_EMAIL` action test that it prepends the new email to the beginning of the list
- Add `UPDATE_EMAILS` action test that it replaces the emails list

## Next

You're done! Your code should mirror the [Completed Test Suite](../end/). 

Check out [Step 8 - Functional testing](../08-functional/) for a preview of future steps walking through other types of testing.

## Resources

- [Jest matchers](https://jestjs.io/docs/en/expect)
- [Snapshot testing](https://jestjs.io/docs/en/snapshot-testing)
- [Redux reducers](https://redux.js.org/basics/reducers)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
