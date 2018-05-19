# Step 9 - Styling

The goal of this step is to apply CSS styling to all of the components. There are many ways to style React components, but CSS classes are probably the simplest and most familiar. In certain cases we'll want to _conditionally_ apply CSS classes based on prop values. We'll make use of the very helpful [`classnames`](https://github.com/JedWatson/classnames) library.

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

## Jump Around

[Concepts](#concepts) | [Restart Setup](#restart-setup) | [Tasks](#tasks) | [Resources](#resources)

## Concepts

- Applying component styling with CSS classes
- Conditionally apply CSS classes based on logic

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
cp -r src/react/08-api src/workshop
```

Ensure [`src/index.js`](../../index.js#L3) is still pointing to the `workshop` App:

```js
import App from './workshop/App';
```

Start API server (running at [http://localhost:9090/](http://localhost:9090/)):

```sh
# Yarn
yarn run start:api

# ...or NPM
npm run start:api
```

In a **separate terminal window/tab**, making sure you're still in the repo root directory, start the app:

```sh
# Yarn
yarn start

# ...or NPM
npm start
```

After the app is initially built, a new browser window should open up at [http://localhost:3000/](http://localhost:3000/), and you should be able to continue on with the tasks below.

## Tasks

In order to make `render()` of `App` a bit cleaner, move out the logic for whether or not the `<EmailView />` should display into a helper component called `EmailViewWrapper`:

```js
const EmailViewWrapper = ({selectedEmail, onClose, onDelete}) => {
  let component = null;

  if (selectedEmail) {
    component = (
      <EmailView
        email={selectedEmail}
        onClose={onClose}
        onDelete={onDelete}
      />
    );
  }

  return component;
};

export default class App extends Component {
  // prop types & default props

  // initialize state

  // lifecycle methods

  // helper methods

  render() {
    let {emails, selectedEmailId} = this.state;
    let selectedEmail = emails.find(email => email.id === selectedEmailId);

    return (
      <main className="app">
        <EmailList
          emails={emails}
          onItemSelect={this._handleItemSelect}
          onItemDelete={this._handleItemDelete}
          selectedEmailId={selectedEmailId}
        />
        <EmailViewWrapper
          selectedEmail={selectedEmail}
          onClose={this._handleEmailViewClose}
          onDelete={this._handleItemDelete.bind(this, selectedEmailId)}
        />
        <EmailForm onSubmit={this._handleFormSubmit} />
      </main>
    );
  }
}
```

Add wrapper elements around `EmailList`, `EmailView` & `EmailForm` with the appropriate class names to position them within `App`:

```js
const EmailViewWrapper = ({selectedEmail, onClose, onDelete}) => {
  let component = null;

  if (selectedEmail) {
    component = (
      <article className="app__view">
        <EmailView
          email={selectedEmail}
          onClose={onClose}
          onDelete={onDelete}
        />
      </article>
    );
  }

  return component;
};

export default class App extends Component {
  // prop types & default props

  // initialize state

  // lifecycle methods

  // helper methods

  render() {
    let {emails, selectedEmailId} = this.state;
    let selectedEmail = emails.find(email => email.id === selectedEmailId);

    return (
      <main className="app">
        <div className="app__page">
          <div className="app__list">
            <EmailList
              emails={emails}
              onItemSelect={this._handleItemSelect}
              onItemDelete={this._handleItemDelete}
              selectedEmailId={selectedEmailId}
            />
          </div>
          <EmailViewWrapper
            selectedEmail={selectedEmail}
            onClose={this._handleEmailViewClose}
            onDelete={this._handleItemDelete.bind(this, selectedEmailId)}
          />
          <div className="app__form">
            <EmailForm onSubmit={this._handleFormSubmit} />
          </div>
        </div>
      </main>
    );
  }
}
```

These classes help position the email list, email view and email form within the `App` component. That's why they exist within `App` and not within the individual components. You'll find the actual CSS styling within [App.css](./App.css).

When an email item is selected, you should see a 3-column layout: email list on the left, email form on the right, and email view in the center.

In `EmailListItem`, add appropriate CSS classes for `from` & `subject` display elements. Wrap the delete button in `<span>` with a "status" CSS class. Using the [`classnames`](https://github.com/JedWatson/classnames) library, conditionally add a class to the container element based on whether or not the email item is selected:

```js
render() {
  let {email: {from, subject}, isSelected} = this.props;
  let className = classNames('email-list-item', {
    'email-list-item--selected': isSelected
  });

  return (
    <div className={className} onClick={this._handleClick}>
      <span className="email-list-item__from">
        {from}
      </span>
      <span className="email-list-item__subject">
        {subject}
      </span>
      <span className="email-list-item__status">
        <button onClick={this._handleDelete}>Delete</button>
      </span>
    </div>
  );
}
```

The CSS styling can be found in [EmailListItem.css](components/EmailListItem.css).

Don't forget to import `classnames` at the top of the file:

```js
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
```

## Exercises

- In `EmailList`, add `"email-list__item"` to the `<li>` elements wrapping the `<EmailListItem />` components
- In `EmailView`, wrap the delete & close buttons in a containing element and give it a `"email-view__button-bar"` CSS class
- In `EmailForm`, add the appropriate classes to the various parts of the form fields as well as the button bar

## Next

Go to [Step 10 - Mark unread/read](../10-mark-unread/).

## Resources

- [`classnames` library](https://github.com/JedWatson/classnames)
- [Introduction to BEM](http://getbem.com/introduction/)
- [`glamorous` library](https://github.com/paypal/glamorous)
- [Inline Styles](https://facebook.github.io/react/docs/dom-elements.html#style)
- [CSS Modules: Welcome to the Future](http://glenmaddern.com/articles/css-modules)
- [Using CSS flexible boxes](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
