# Completed Test Suite

You need [node](https://nodejs.org/en/) version 6 or higher. Check your node version:

```
node -v
```

If your node version is version 5 or lower, you can [install `nvm`](https://github.com/creationix/nvm#install-script) to manage multiple versions of node.

Clone the [`react-workshop`](https://github.com/benmvp/react-workshop) repo:

```sh
git clone https://github.com/benmvp/react-workshop.git
```

Install all of the dependencies ([`yarn`](https://yarnpkg.com/en/) is preferred):

```sh
# Yarn
yarn install

# ...or NPM
npm install
```

Ensure [`src/index.js`](../../index.js#L3) is still pointing to the `end` App:

```js
import App from './end/App';
```

Run the tests:

```sh
# Yarn
yarn test

# ...or NPM
npm test
```

Jest will start up in "watch mode", run the existing tests, and then wait for tests to change so that it can run again automatically.
