# React Fundamentals Workshop by Ben Ilegbodu

A step-by-step workshop for learning React fundamentals.

## To run completed app

Assuming you have node installed, [install `nvm`](https://github.com/creationix/nvm#install-script) and then close & reopen your terminal.

Install the latest stable version of node:

```sh
nvm install node
```

Clone this [`react-workshop`](https://github.com/benmvp/react-workshop) repo:

```sh
git clone https://github.com/benmvp/react-workshop.git
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
2. [Environment setup](https://github.com/benmvp/react-workshop/tree/master/02-env-setup)
