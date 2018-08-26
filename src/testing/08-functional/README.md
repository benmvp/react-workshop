# Step 8 - Functional testing

Functional testing, also known as integration testing, is the method of testing your application as a whole. We have written many unit tests for various parts of the app, but they all assume that their dependent modules are working correctly and upholding their API. But when code is refactored, this may no longer the case, either intentionally or unintentionally. Furthermore, we never verified the connection of Redux to our React application and tested the whole Redux data flow.

So with functional testing, we'll still use Enzyme, but we'll mount our _entire_ application. And instead of verifying passed props to child components (like in [Step 2](../02-render-components)) or triggering callback handlers on child components (as in [Step 4](../04-callbacks-components)), we will **only** interact with DOM elements. In this way we are simulating how an actual user would interact with the real app in a browser.

This approach differs from [end-to-end testing](../09-e2e/), however, because it's not run in the browser and we still mock out API requests. Functional tests are faster than end-to-end tests, but slower than traditional unit tests.

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

## Jump Around

[Concepts](#concepts) | [Restart Setup](#restart-setup) | [Tasks](#tasks) | [Exercises](#exercises) | [Resources](#resources)

## Concepts

Coming soon...

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
cp -r src/testing/07-reducers src/workshop
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

Coming soon!

## Exercises

Coming soon..

## Next

Go to [Step 9 - End-to-end testing](../09-e2e/).

## Resources

- [`fetch-mock`](http://www.wheresrhys.co.uk/fetch-mock/)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
