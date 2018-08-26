# Step 8 - End-to-end testing

So far we've written a lot of tests that _simulate_ the app running in the browser. These make the tests really fast, but there are some things that just cannot be mocked without effectively rewriting portions of the browser. This is where end-to-end testing comes into play. The testing is still automated, but runs in an actual browser, making real API requests. This way if the API changes or a certain browser works differently, your app will fail **before** it gets to your users.

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
cp -r src/testing/08-functional src/workshop
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

You're done! Your code should mirror the [Completed Test Suite](../end/).

## Resources

- [`cypress`](https://www.cypress.io/)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
