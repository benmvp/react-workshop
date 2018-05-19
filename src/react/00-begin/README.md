# Step 0 - Begin React Workshop

The goal of this step is just to get everything set up with a running (but blank) app. We will be working in a step-by-step fashion to build an email application. Visit the [final step](../end/) to install and run the finished app locally.

## Tasks

You need [node](https://nodejs.org/en/) version 6 or higher. You can [install `nvm`](https://github.com/creationix/nvm#install-script) to manage multiple versions of node.

Clone the [`react-workshop`](https://github.com/benmvp/react-workshop) repo:

```sh
git clone https://github.com/benmvp/react-workshop.git
```

Install all of the dependencies ([`yarn`](https://yarnpkg.com/en/) is preferred):

```sh
# Yarn
yarn

# ...or NPM
npm install
```

Copy the [`00-begin`](./) directory, name it `workshop`:

```sh
cd react-workshop
cp -r src/react/00-begin src/workshop
```

Ensure [`src/index.js`](../../index.js#L3) is pointing to the `workshop` App:

```js
import App from './workshop/App';
```

Start the app:

```sh
# Yarn
yarn start

# ...or NPM
npm start
```

## Exercises

- Visit [http://localhost:3000/](http://localhost:3000/) and you should see an empty page
- Install [React Developer Tools](https://github.com/facebook/react-devtools#installation) for your browser

## Next

Go to [Step 1 - JSX](../01-jsx/).

## Resources

- [_Learning ES6_ series](http://www.benmvp.com/learning-es6-series/)
- [`git-clone`](https://git-scm.com/docs/git-clone)
- [Create React App](https://github.com/facebookincubator/create-react-app)
