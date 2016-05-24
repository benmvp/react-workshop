# Step 0 - Start

## Setup

Assuming you have a version of [node](https://nodejs.org/en/) installed, [install `nvm`](https://github.com/creationix/nvm#install-script) and then close & reopen your terminal.

Install the latest stable version of node:

```sh
nvm install node
```

[Fork](https://help.github.com/articles/fork-a-repo/) this [`react-workshop`](https://github.com/benmvp/react-workshop) repo and create a local clone (be sure to replace `YOUR-USERNAME` with your own):

```sh
git clone https://github.com/YOUR-USERNAME/react-workshop.git
```

Copy the [`00-start`](./) directory, name it `workshop`, and change to it:

```sh
cd react-workshop
cp -r 00-start workshop
cd workshop
```

Install [`serve`](https://github.com/tj/serve):

```sh
npm install -g serve
```

Run `serve` on port `8080` in [`src`](src/) directory:

```sh
serve src --port 8080
```

## Tasks

- Visit [http://localhost:8080/](http://localhost:8080/) and you should see an empty page

## Next

Go to [Step 1 - Add core components](../01-core-components/).

## Resources

- [Fork A Repo on Github](https://help.github.com/articles/fork-a-repo/)
- [`git-clone`](https://git-scm.com/docs/git-clone)
