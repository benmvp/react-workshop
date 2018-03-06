# React FUNdamentals Workshop by Ben Ilegbodu

[![Maintenance Status](https://img.shields.io/badge/status-maintained-brightgreen.svg)](https://github.com/benmvp/react-workshop/pulse)
[![Build Status](https://travis-ci.org/benmvp/react-workshop.svg?branch=master)](https://travis-ci.org/benmvp/react-workshop)
[![license](https://img.shields.io/github/license/benmvp/react-workshop.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

[![Watch on GitHub](https://img.shields.io/github/watchers/benmvp/react-workshop.svg?style=social)](https://github.com/benmvp/react-workshop/watchers)
[![Star on GitHub](https://img.shields.io/github/stars/benmvp/react-workshop.svg?style=social)](https://github.com/benmvp/react-workshop/stargazers)
[![Tweet](https://img.shields.io/twitter/url/https/github.com/benmvp/react-workshop.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20out%20React%20Fundamentals%20Workshop%20by%20%40benmvp!%0A%0Ahttps%3A%2F%2Fgithub.com%2Fbenmvp%2Freact-workshop)

A step-by-step workshop to build a React application, all while learning React fundamentals. Best if accompanied with live facilitation. 🙂

## Many thanks!

- [Create React App](https://github.com/facebookincubator/create-react-app) - makes it painless to spin up a React environment
- [React Docs](http://facebook.github.io/react) - lots of content has been borrowed from here
- [Vincent Budrovich](https://github.com/vwb) for his Redux tutorial contributions
- ...and other contributors for their docs and code fixes

## To run completed app

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

Update [`src/index.js`](src/index.js#L3) to point to the `end` App:

```js
import App from './end/App';
```

Start the API server (running at [http://localhost:9090/](http://localhost:9090/)):

```sh
# Yarn
yarn run start:api

# ...or NPM
npm run start:api
```

In a **separate terminal window/tab**, making sure you're still in the repo root, start the app:

```sh
# Yarn
yarn start

# ...or NPM
npm start
```

After the app is initially built, a new browser window should open up at [http://localhost:3000/](http://localhost:3000/).

## Exercises

All of the exercises make use of [ES6](http://www.benmvp.com/learning-es6-series/), so you may need to brush up on the new JavaScript features if they are unfamiliar. Each step in the workshop builds on top of the previous one. If at any point you get stuck, you can find the answers in the source code of the current step. Any  step can be used as a starting point to continue on to the remaining steps.

You can start at the [beginning](src/00-begin/) to get setup. Afterwards follow these steps:

1. [JSX](src/01-jsx/)
1. [Components](src/02-components/)
1. [Lists](src/03-lists/)
1. [Email View](src/04-email-view/)
1. [Email Form](src/05-email-form/)
1. [Submit email form](src/06-submit-email-form/)
1. [Delete email](src/07-delete-email/)
1. [Interacting with APIs](src/08-api/)
1. [Styling](src/09-styling/)
1. [Mark unread/read](src/10-mark-unread/)
1. [Email Form Modal](src/11-email-form-modal/)
1. [API lib](src/12-api-lib/)
1. [Action-Reducers](src/13-action-reducers/)
1. [Redux-y Actions and Reducers](src/14-reduxy-actions-reducers/)
1. [Connect App and Store](src/15-connect-app-and-store/)

## FUNdamental Concepts

- Using JSX syntax ([Step 1](src/01-jsx/))
- Writing readable, reusable and composable components ([Step 2](src/02-components/))
- Maintaining component state ([Step 4](src/04-email-view/))
- Handling user interaction ([Step 4](src/04-email-view/))
- Handling HTML forms & form elements ([Step 5](src/05-email-form/))
- Leveraging ES6+ to maintain application state ([Step 6](src/06-submit-email-form/))
- Making API calls ([Step 8](src/08-api/))
- Hooking into the component lifecycle ([Step 8](src/08-api/))
- Applying component styling with CSS classes ([Step 9](src/09-styling/))
- Factoring out logic from components ([Step 12](src/12-api-lib/))
- Creating "action-reducers" ([Step 13](src/13-action-reducers/))
- Defining Redux actions & reducers ([Step 14](src/14-reduxy-actions-reducers/))
- Conect React to Redux store ([Step 15](src/15-connect-app-and-store/))

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!

## License

[MIT](LICENSE)
