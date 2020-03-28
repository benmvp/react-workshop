# React FUNdamentals Workshop by Ben Ilegbodu

[![Maintenance Status](https://img.shields.io/badge/status-maintained-brightgreen.svg)](https://github.com/benmvp/react-workshop/pulse)
[![Build Status](https://github.com/benmvp/react-workshop/workflows/CI/badge.svg)](https://github.com/benmvp/react-workshop/actions)
[![license](https://img.shields.io/badge/license-GPL%20v3-blue)](#license)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

[![Watch on GitHub](https://img.shields.io/github/watchers/benmvp/react-workshop.svg?style=social)](https://github.com/benmvp/react-workshop/watchers)
[![Star on GitHub](https://img.shields.io/github/stars/benmvp/react-workshop.svg?style=social)](https://github.com/benmvp/react-workshop/stargazers)
[![Tweet](https://img.shields.io/twitter/url/https/github.com/benmvp/react-workshop.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20out%20React%20Fundamentals%20Workshop%20by%20%40benmvp!%0A%0Ahttps%3A%2F%2Fgithub.com%2Fbenmvp%2Freact-workshop)

A step-by-step workshop to build a React application, all while learning React fundamentals. Best if accompanied with live facilitation by me 🙂.

## Pre-Workshop Instructions

In order to maximize our time _during_ the workshop, please complete the following tasks in advance:

- [ ] Set up the project (follow [setup instructions](#system-requirements) below)
- [ ] Install and run [Zoom](https://zoom.us/) on the computer you'll be developing with (for remote workshops)
- [ ] Set up dual monitors, if possible (for remote workshops)
- [ ] Install React Developer Tools for [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) (recommended) or [Firefox](https://addons.mozilla.org/en-GB/firefox/addon/react-devtools/)
- [ ] Install a JSX-friendly code editor, such as [Visual Studio Code](https://code.visualstudio.com/)
- [ ] Brush up on modern [ES.next](http://www.benmvp.com/learning-es6-series/) features, if they are unfamiliar to you
- [ ] Have experience building websites with HTML, CSS, and JavaScript DOM APIs

The more prepared you are for the workshop, the better it will go for you! 👍🏾

## System Requirements

- [git](https://git-scm.com/) v2 or higher
- [Node.js](https://nodejs.org/en/) v10 or higher
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) v6 or higher

All of these must also be available in your `PATH` in order to be run globally. To verify things are set up properly, run:

```sh
git --version
node --version
npm --version
```

If your node version is version 9 or lower, you can [install `nvm`](https://github.com/creationix/nvm#install-script) to manage multiple versions of node.

If you have trouble with any of these, learn more about the `PATH` environment variable and how to fix it here for [Windows](https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/) or [Mac/Linux](http://stackoverflow.com/a/24322978/971592).

## Setup

After you have verified that you have the proper tools installed (and at the proper versions), getting setup _should_ be a breeze. Run the following commands:

```sh
git clone https://github.com/benmvp/react-workshop.git
cd react-workshop
npm run setup
```

This will likely take a **few minutes** to run. It will clone the repo, install all of the JavaScript dependencies needed to build our app, and setup our workshop dev directory.

If it fails, please read through the error logs and see if you can figure out what the problem is. Double check that you have the proper [system requirements](#system-requirements) installed. If you are unable to figure out the problem on your own, please feel free to [file an issue](https://github.com/benmvp/react-workshop/issues/new) with _everything_ (and I mean everything) from the output of the commands you ran.

## Running the app

We will be build a Giphy search app step-by-step in this workshop. To get started and verify that everything has been installed correctly, run:

```sh
npm start
```

The app should pop up in your default browser running at http://localhost:3000/. The app should be **completely blank** because we haven't built anything yet! But you can check out the app [deployed online](https://react-workshop.benmvp.com/) to see what the final state will look like.

For those interested, the app is a standard app bootstrapped by [Create React App](https://create-react-app.dev/).

## Workshop Outline

Let's learn the React fundamentals! ⚛️

### 🧔🏾 About Me

Hiya! 👋🏾 My name is Ben Ilegbodu. 😄

- Christian, Husband, Father of 👌🏾
- Pittsburg, California
- Principal Frontend Engineer at [Stitch Fix](https://www.stitchfix.com/) (and yes [we're hiring](https://www.stitchfix.com/careers/jobs)!)
- www.benmvp.com
- [@benmvp](https://twitter.com/benmvp)
- Go Rockets! 🚀🏀

### 🕘 Schedule

Each step in the workshop builds on top of the previous one. If at any point you get stuck, you can find the answers in the source code of the current step. Any step can be used as a starting point to continue on to the remaining steps.

- Setup / Logistics / Intro
- [Step 1 - JSX](src/01-jsx/)
- [Step 2 - Query Field](src/02-query-field/)
- [Step 3 - API](src/03-api/)
- 😴 15 minutes
- [Step 4 - Lists](src/04-lists/)
- [Step 5 - Form Submit](src/05-form-submit/)
- 🍕 45 minutes
- [Step 6 - Components](src/06-components/)
- [Step 7 - Prop Types](src/07-prop-types/)
- [Step 8 - Search Focus](src/08-search-focus/)
- 😴 15 minutes
- [Step 9 - Custom Hook](src/09-custom-hook/)
- [Step 10 - Loading States](src/10-loading-states/)
- 😴 15 minutes
- ❓ Q & A
- [Step 10 - Final Quiz!](src/10-quiz/)
- 👋🏾 Goodbye!

### ❓ Asking Questions

- Please **interrupt me** and ask questions! Others likely will have the same question.
- However, unrelated questions are better sent to [Twitter](https://twitter.com/benmvp) or [my AMA](http://www.benmvp.com/ama)

### 🖥️ Zoom Hygiene (for remote workshops)

- Keep your **video on** (if possible) to make it feel more human and lively
- Keep your **microphone muted** unless your talking to avoid background noise distractions
- Answer each other's questions in the chat
- Use breakout rooms to help each other

### ⭐ FUNdamental Concepts

Here is what you'll come away knowing at the end of the workshop...

- Using JSX syntax ([Step 1](src/01-jsx/))
- Maintaining component state with `useState` hook ([Step 2](src/02-query-field/))
- Handling user interaction ([Step 2](src/02-query-field/))
- Making API calls with `useEffect` hook ([Step 3](src/03-api/))
- Rendering dynamic lists of data ([Step 4](src/04-lists/))
- Conditionally rendering components ([Step 4](src/04-lists/))
- Handling HTML forms & form elements ([Step 5](src/05-form-submit/))
- Writing readable, reusable and composable components ([Step 6](src/06-components/))
- Type-checking props ([Step 7](src/07-prop-types/))
- Interacting with the DOM directly with `useRef` hook ([Step 8](src/08-search-focus/))
- Factoring out logic from components into custom hooks ([Step 9](src/09-custom-hook/))
- Leveraging ES6+ to maintain application state with `useReducer` hook ([Step 10](src/10-loading-states/))
- Applying component styling with CSS classes (throughout)

## 🧠 Elaboration & Feedback

Each step has an Elaboration & Feedback link at the end. After you're done with the exercise and before jumping to the next step, please fill that out to solidify your learning.

At the end of the workshop, I would greatly appreciate your overall feedback. [Share your workshop feedback](https://bit.ly/react-fun-ws-feedbck).

### 👉🏾 First Step

Go to [Step 0 - Begin](src/00-begin/).

## License

All of the workshop material is available for **private, non-commercial use** under the [GPL version 3](http://www.gnu.org/licenses/gpl-3.0-standalone.html) license. If you would like to use this workshop to conduct your own workshop, please contact me first at ben@benmvp.com.
