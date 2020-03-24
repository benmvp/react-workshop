# Step 0 - Begin React Workshop

The goal of this step is just to get everything set up with a running (but blank) app. We will be working in a step-by-step fashion to build a [Giphy search app](https://react-workshop.benmvp.com/).

## 📝 Tasks

Follow the [setup instructions](https://github.com/benmvp/react-workshop#setup) if you have not already. Then, within the `react-workshop` directory, copy the [`00-begin`](./) directory and name it `workshop`:

```sh
cp -r src/00-begin src/workshop
```

Ensure [`src/index.js`](../index.js#L3) is pointing to the new `workshop` App:

```js
import App from './workshop/App'
```

Start the app:

```sh
npm start
```

## 💡 Exercises

- Visit http://localhost:3000/ and you should see an empty page
- Install React Developer Tools for [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) (recommended) or [Firefox](https://addons.mozilla.org/en-GB/firefox/addon/react-devtools/)
- Install a JSX-friendly code editor, such as [Visual Studio Code](https://code.visualstudio.com/)
- Checkout the [final app](https://react-workshop.benmvp.com/) to get a sense of what you'll be building

## 👉🏾 Next Step

Go to [Step 1 - JSX](../01-jsx/).

## 📕 Resources

- [Create React App](https://create-react-app.dev/)
