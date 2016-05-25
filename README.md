# React Fundamentals Workshop by Ben Ilegbodu

A step-by-step workshop for learning React fundamentals.

## To run completed app

Assuming you have a version of [node](https://nodejs.org/en/) installed, [install `nvm`](https://github.com/creationix/nvm#install-script) and then close & reopen your terminal.

Install the latest stable version of node:

```sh
nvm install node
```

[Fork](https://help.github.com/articles/fork-a-repo/) this [`react-workshop`](./) repo and create a local clone (be sure to replace `YOUR-USERNAME` with your own):

```sh
git clone https://github.com/YOUR-USERNAME/react-workshop.git
```

Change to [`final`](final/) directory:

```sh
cd react-workshop/final
```

Install all of the dependencies:

```sh
npm install
```

Start API server (running at [http://localhost:9090/](http://localhost:9090/)):

```sh
npm run start:api
```

In a **separate console window/tab**, start the web server:

```sh
npm run start:server
```

Once the initial bundle is built, visit [http://localhost:8080/](http://localhost:8080/).

## Exercises

Each step in the workshop builds on top of the previous one. You can begin at the [Start](00-start/). Afterwards follow these steps:

1. [Add core components](01-core-components/)
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
