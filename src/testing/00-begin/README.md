# Step 0 - Begin Testing Workshop

The goal of this step is to use the [end](../../redux/end) of the Redux workshop as a starting point for learning how to test a React/Redux application. We will be working in a step-by-step fashion to test various parts of the React components and Redux data layer. Visit the [final step](../end/) to install and run all the tests locally.

## Tasks

Before writing tests for the application, you should familiarize yourself with it by running it and playing around with it.

You need [node](https://nodejs.org/en/) version 6 or higher. Check your node version:

```sh
node -v
```

If your node version is version 5 or lower, you can [install `nvm`](https://github.com/creationix/nvm#install-script) to manage multiple versions of node.

Clone the [`react-workshop`](https://github.com/benmvp/react-workshop) repo:

```sh
git clone https://github.com/benmvp/react-workshop.git
``` 

Change into the `react-workshop` directory:

```sh
cd react-workshop
```

Install all of the dependencies ([`yarn`](https://yarnpkg.com/en/) is preferred):

```sh
# Yarn
yarn install

# ...or NPM
npm install
```

Copy the [`00-begin`](./) directory, name it `workshop`:

```sh
cp -r src/testing/00-begin src/workshop
```

Ensure [`src/index.js`](../../index.js#L3) is pointing to the `workshop` App:

```js
import App from './workshop/App';
```

Start the API server (running at [http://localhost:9090/](http://localhost:9090/)):

```sh
# Yarn
yarn run start:api

# ...or NPM
npm run start:api
```

In a **separate terminal window/tab**, making sure you're still in the repo root directory, start the app:

```sh
# Yarn
yarn start

# ...or NPM
npm start
```

## Exercises

- Visit [http://localhost:3000/](http://localhost:3000/) and you should see a fully-functioning "email app"
  * Play around with the app to familiarize yourself with the functionality
  * Look through the source code of the [React components](components/), [Redux actions](actions/), and [Redux reducers](reducers/) to understand what you'll be testing
- Install a JSX-friendly code editor, such as [Visual Studio Code](https://code.visualstudio.com/)

## Next

Go to [Step 1 - Render (markup)](../01-render-markup/).

## Resources

- [_Learning ES6_ series](http://www.benmvp.com/learning-es6-series/)
- [`git-clone`](https://git-scm.com/docs/git-clone)
- [Create React App](https://github.com/facebookincubator/create-react-app)
