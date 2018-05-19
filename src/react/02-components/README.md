# Step 2 - Components

The goal of this step is to practice creating and composing [React components](https://facebook.github.io/react/docs/components-and-props.html). Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. Components can refer to other components in their output. This lets us use the same component abstraction for any level of detail. A button, a form, a dialog, a screen, etc. In React apps, all of these are commonly expressed as components.

Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called "props") and return React elements describing what should appear on the screen.

Once again, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

## Jump Around

[Concepts](#concepts) | [Restart Setup](#restart-setup) | [Tasks](#tasks) | [Resources](#resources)

## Concepts

- Creating and composing React components
- Configuring components via passing props
- Typechecking props

## Restart Setup

If you didn't successfully complete the previous step, you can jump right in by copying the step.

Ensure you're in the root folder of the repo:

```sh
cd react-workshop
```

Remove the existing workshop directory if you had previously started elsewhere:

```sh
rm -rf src/workshop
```

Copy the previous step as a starting point:

```sh
cp -r src/react/01-jsx src/workshop
```

Ensure [`src/index.js`](../../index.js#L3) is still pointing to the `workshop` App:

```js
import App from './workshop/App';
```

Start the app:

```sh
# Yarn
yarn start

# ...or NPM
npm start
```

After the app is initially built, a new browser window should open up at [http://localhost:3000/](http://localhost:3000/), and you should be able to continue on with the tasks below.

## Tasks

The [`App`](App.js) component has quite a bit of markup in it, even though it doesn't do much yet. Break up the large `App` component into smaller `EmailList`, `EmailView` & `EmailForm` components and reference them back in the `App` component:

```js
class EmailList extends Component {
  render() {
    return (
      <ul className="email-list">
        <li>
          <div className="email-list-item">
            <span>alittle0@chronoengine.com</span>
            <span>Mauris lacinia sapien quis libero</span>
          </div>
        </li>
        <li>
          <div className="email-list-item">
            <span>amurray1@mit.edu</span>
            <span>Mauris ullamcorper purus sit amet nulla</span>
          </div>
        </li>
        <li>
          <div className="email-list-item">
            <span>dmccoy2@bluehost.com</span>
            <span>Suspendisse potenti</span>
          </div>
        </li>
        <li>
          <div className="email-list-item">
            <span>raustin3@hexun.com</span>
            <span>Maecenas rhoncus aliquam lacus</span>
          </div>
        </li>
        <li>
          <div className="email-list-item">
            <span>rwagner4@instagram.com</span>
            <span>Pellentesque ultrices mattis odio</span>
          </div>
        </li>
      </ul>
    );
  }
}

class EmailView extends Component {
  render() {
    return (
      <div className="email-view">
        <h2>View selected email</h2>
      </div>
    );
  }
}

class EmailForm extends Component {
  render() {
    return (
      <div className="email-form">
        <h2>Add a new email</h2>
      </div>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <main className="app">
        <EmailList />
        <EmailView />
        <EmailForm />
      </main>
    );
  }
}
```

The top-level `App` component is now composed of the `EmailList`, `EmailView` & `EmailForm` components. It's also much easier to see what makes up the `App` component now that the three smaller components have been extracted out.

The `EmailList` component is still logically made up of several list item components, which can be extracted into a `EmailListItem` component with configurable props:

```js
class EmailListItem extends Component {
  render() {
    let {from, subject} = this.props;

    return (
      <div className="email-list-item">
        <span>{from}</span>
        <span>{subject}</span>
      </div>
    );
  }
}

class EmailList extends Component {
  render() {
    return (
      <ul class="email-list">
        <li>
          <EmailListItem
            from="alittle0@chronoengine.com"
            subject="Mauris lacinia sapien quis libero"
          />
        </li>
        <li>
          <EmailListItem
            from="amurray1@mit.edu"
            subject="Mauris ullamcorper purus sit amet nulla"
          />
        </li>
        <li>
          <EmailListItem
            from="dmccoy2@bluehost.com"
            subject="Suspendisse potenti"
          />
        </li>
        <li>
          <EmailListItem
            from="raustin3@hexun.com"
            subject="Maecenas rhoncus aliquam lacus"
          />
        </li>
        <li>
          <EmailListItem
            from="rwagner4@instagram.com"
            subject="Pellentesque ultrices mattis odio"
          />
        </li>
      </ul>
    );
  }
}
```

The attributes passed to components are called "props." Those props are then available under `this.props` within the component class definition.

By the way, components can also be declared using functions instead of classes:

```js
const EmailListItem = ({from, subject}) => (
  <div className="email-list-item">
    <span>{from}</span>
    <span>{subject}</span>
  </div>
);
```

The are called "stateless" function because they don't maintain their own state. We'll cover state in [Step 4](../04-email-view/). But we'll continue to use the `class` syntax so that we can define [`propTypes`](https://facebook.github.io/react/docs/typechecking-with-proptypes.html) for `EmailListItem` (and to manage `state` later on):

```js
// back up top add new import of `prop-types` lib
import PropTypes from 'prop-types';

class EmailListItem extends Component {
  // declare types of expected props
  // i.e. the component's interface
  static propTypes = {
    from: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired
  }

  render() {
    let {from, subject} = this.props;

    return (
      <div className="email-list-item">
        <span>{from}</span>
        <span>{subject}</span>
      </div>
    );
  }
}
```

## Exercises

Move each component into its own file under a new [`components/`](components/) folder, `import`ing and `export`ing as necessary. For example in `EmailList`:

```js
import React, {Component} from 'react';

import EmailListItem from './EmailListItem';

export default class EmailList extends Component {
  render() {
    return (
      <ul className="email-list">
        <li>
          <EmailListItem
            from="alittle0@chronoengine.com"
            subject="Mauris lacinia sapien quis libero"
          />
        </li>
        <li>
          <EmailListItem
            from="amurray1@mit.edu"
            subject="Mauris ullamcorper purus sit amet nulla"
          />
        </li>
        <li>
          <EmailListItem
            from="dmccoy2@bluehost.com"
            subject="Suspendisse potenti"
          />
        </li>
        <li>
          <EmailListItem
            from="raustin3@hexun.com"
            subject="Maecenas rhoncus aliquam lacus"
          />
        </li>
        <li>
          <EmailListItem
            from="rwagner4@instagram.com"
            subject="Pellentesque ultrices mattis odio"
          />
        </li>
      </ul>
    );
  }
}
```

Afterwards, use the [React Developer Tools](https://github.com/facebook/react-devtools#installation) to inspect the component hierarchy, including the props being passed to the `EmailListItem` components.

## Next

Go to [Step 3 - Lists](../03-lists/).

## Resources

- [Components and Props](https://facebook.github.io/react/docs/components-and-props.html)
- [Typechecking with PropTypes](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
