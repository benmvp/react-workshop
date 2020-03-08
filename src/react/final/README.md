# Completed React App

You need [node](https://nodejs.org/en/) version 10 or higher. Check your node version:

```
node -v
```

If your node version is version 9 or lower, you can [install `nvm`](https://github.com/creationix/nvm#install-script) to manage multiple versions of node.

Clone the [`react-workshop`](https://github.com/benmvp/react-workshop) repo:

```sh
git clone https://github.com/benmvp/react-workshop.git
```

Install all of the dependencies using [npm](http://npmjs.org/):

```sh
# ...or NPM
npm install
```

Update [`src/index.js`](../../index.js#L3) to point to the `final` App:

```js
import App from './react/final/App'
```

Start the app:

```sh
npm start
```

After the app's assets are bundled together, a new browser window should open up at [http://localhost:3000/](http://localhost:3000/).
