# Step 0 - Begin

The goal of this step is just to get everything set up with a running (but blank) app. We will be working in a step-by-step fashion to build an email application. Visit the [final step](../end/) to install and run the finished app locally.

## Setup

You need [node](https://nodejs.org/en/) version 6 or higher. You can [install `nvm`](https://github.com/creationix/nvm#install-script) to manage multiple versions of node.

[Fork the repo](https://github.com/benmvp/react-workshop/fork) and create a local clone (be sure to replace `<YOUR-USERNAME>` with your own):

```sh
git clone https://github.com/<YOUR-USERNAME>/react-workshop.git
```

Copy the [`00-begin`](./) directory, name it `workshop`, and change to it:

```sh
cd react-workshop
cp -r 00-begin workshop
cd workshop
```

Install all of the dependencies ([`yarn`](https://yarnpkg.com/en/) is preferred):

```sh
# Yarn
yarn

# ...or NPM
npm install
```

Start the app:

```sh
# Yarn
yarn start

# ...or NPM
npm start
```

## Tasks

- Visit [http://localhost:3000/](http://localhost:3000/) and you should see an empty page
- Install [React Developer Tools](https://github.com/facebook/react-devtools#installation) for your browser

## Next

Go to [Step 1 - JSX](../01-jsx/).

## Resources

- [_Learning ES6_ series](http://www.benmvp.com/learning-es6-series/)
- [Fork A Repo on Github](https://help.github.com/articles/fork-a-repo/)
- [`git-clone`](https://git-scm.com/docs/git-clone)
- [Create React App](https://github.com/facebookincubator/create-react-app)
