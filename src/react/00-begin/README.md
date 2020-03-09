# Step 0 - Begin React Workshop

The goal of this step is just to get everything set up with a running (but blank) app. We will be working in a step-by-step fashion to build an email application. Visit the [final step](../end/) to install and run the finished app locally.

## Tasks

You need [node](https://nodejs.org/en/) version 10 or higher. Check your node version:

```sh
node -v
```

If your node version is version 9 or lower, you can [install `nvm`](https://github.com/creationix/nvm#install-script) to manage multiple versions of node.

Clone the [`react-workshop`](https://github.com/benmvp/react-workshop) repo:

```sh
git clone https://github.com/benmvp/react-workshop.git
```

Change into the `react-workshop` directory:

```sh
cd react-workshop
```

Install all of the dependencies using [npm](http://npmjs.org/):

```sh
npm install
```

Copy the [`00-begin`](./) directory, name it `workshop`:

```sh
cp -r src/react/00-begin src/workshop
```

Ensure [`src/index.js`](../../index.js#L3) is pointing to the new `workshop` App:

```js
import App from './workshop/App'
```

Start the app:

```sh
npm start
```

## Exercises

- Visit [http://localhost:3000/](http://localhost:3000/) and you should see an empty page
- Install React Developer Tools for [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) or [Firefox](https://addons.mozilla.org/en-GB/firefox/addon/react-devtools/)
- Install a JSX-friendly code editor, such as [Visual Studio Code](https://code.visualstudio.com/)

## Next

Go to [Step 1 - JSX](../01-jsx/).

## Resources

- [_Learning ES6_ series](http://www.benmvp.com/learning-es6-series/)
- [`git-clone`](https://git-scm.com/docs/git-clone)
- [Create React App](https://github.com/facebookincubator/create-react-app)
