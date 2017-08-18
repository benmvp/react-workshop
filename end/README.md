# Completed App

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
