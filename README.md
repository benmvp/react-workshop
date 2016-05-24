# React Fundamentals Workshop by Ben Ilegbodu

A step-by-step workshop for learning React fundamentals.

## To run completed app

Assuming you have a version of [node](https://nodejs.org/en/) installed, [install `nvm`](https://github.com/creationix/nvm#install-script) and then close & reopen your terminal.

Install the latest stable version of node:

```sh
nvm install node
```

[Fork](https://help.github.com/articles/fork-a-repo/) this [`react-workshop`](https://github.com/benmvp/react-workshop) repo and create a local clone (be sure to replace `YOUR-USERNAME` with your own):

```sh
git clone https://github.com/YOUR-USERNAME/react-workshop.git
```

Change to [`final`](https://github.com/benmvp/react-workshop/tree/master/final) directory:

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

Each step in the workshop builds on top of the previous one. You can begin at the [Start](https://github.com/benmvp/react-workshop/tree/master/00-start). Afterwards follow these steps:

1. [Add core components](https://github.com/benmvp/react-workshop/tree/master/01-core-components)
1. [Environment setup](https://github.com/benmvp/react-workshop/tree/master/02-env-setup)
1. [Fetching from server](https://github.com/benmvp/react-workshop/tree/master/03-fetch)
1. [Long polling](https://github.com/benmvp/react-workshop/tree/master/04-polling)
1. [Email View](https://github.com/benmvp/react-workshop/tree/master/05-email-view)
1. [Email Form](https://github.com/benmvp/react-workshop/tree/master/06-email-form)
1. [Submit email form](https://github.com/benmvp/react-workshop/tree/master/07-submit-email-form)
1. [Optimistic updating](https://github.com/benmvp/react-workshop/tree/master/08-optimistic-updating)
1. [Delete email](https://github.com/benmvp/react-workshop/tree/master/09-delete-email)
1. [Mark unread/read](https://github.com/benmvp/react-workshop/tree/master/10-mark-unread)
1. [Styling](https://github.com/benmvp/react-workshop/tree/master/11-styling)
