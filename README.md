# React Fundamentals Workshop by Ben Ilegbodu

A step-by-step workshop for learning React fundamentals.

## To run completed app

Assuming you have a version of [node](https://nodejs.org/en/) installed, [install `nvm`](https://github.com/creationix/nvm#install-script) and then close & reopen your terminal.

Install the latest stable version of node (you need Node >= 6):

```sh
nvm install node
```

[Fork the repo](https://github.com/benmvp/react-workshop/fork) and create a local clone (be sure to replace `YOUR-USERNAME` with your own):

```sh
git clone https://github.com/YOUR-USERNAME/react-workshop.git
```

Change to [`end`](end/) directory:

```sh
cd react-workshop/end
```

Install all of the dependencies:

```sh
# Yarn
yarn

# NPM
npm install
```

Start API server (running at [http://localhost:9090/](http://localhost:9090/)):

```sh
# Yarn
yarn run start:api

# NPM
npm run start:api
```

In a **separate console window/tab**, start the app:

```sh
# Yarn
yarn start

# NPM
npm start
```

After the app is initially built, a new browser window should open up at [http://localhost:3000/](http://localhost:3000/).

## Exercises

Each step in the workshop builds on top of the previous one. You can start at the [beginning](00-begin/). Afterwards follow these steps:

1. [JSX](01-jsx/)
1. [Environment setup](02-env-setup/)
1. [Fetching from server](03-fetch/)
1. [Long polling](04-polling/)
1. [Email View](05-email-view/)
1. [Email Form](06-email-form/)
1. [Submit email form](07-submit-email-form/)
1. [Optimistic updating](08-optimistic-updating/)
1. [Delete email](09-delete-email/)
1. [Mark unread/read](10-mark-unread/)
1. [Styling](11-styling/)
1. [Email Form Modal](12-email-form-modal/)
1. [API lib](13-api-lib/)
1. [Action-Reducers](14-action-reducers/)
