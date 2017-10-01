# Step 5 - Email View

The goal of this step is to build some interactivity into the app by responding to user interactions. [Handling events](https://facebook.github.io/react/docs/handling-events.html) within React elements is very similar to handling events on DOM elements. Event handlers will be passed instances of [`SyntheticEvent`], a cross-browser wrapper around the browser's native event. It has the same interface as the browser's native event (including` stopPropagation()` and `preventDefault()`) except the events work identically across all browsers!

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](src/).

## Restart Setup

If you didn't successfully complete the previous step, you can jump right in by copying the step and installing the dependencies.

Ensure you're in the root folder of the repo:

```sh
cd react-workshop
```

Remove the existing workshop directory if you had previously started elsewhere:

```sh
rm -rf workshop
```

Copy the previous step as a starting point:

```sh
cp -r 04-fetch workshop
```

Change into the `workshop` directory:

```sh
cd workshop
```

Install all of the dependencies ([`yarn`](https://yarnpkg.com/en/) is preferred):

```sh
# Yarn
yarn

# ...or NPM
npm install
```

Start API server (running at [http://localhost:9090/](http://localhost:9090/)):

```sh
# Yarn
yarn run start:api

# ...or NPM
npm run start:api
```

In a **separate terminal window/tab**, making sure you're still in the `workshop` directory, start the app:

```sh
# Yarn
yarn start

# ...or NPM
npm start
```

After the app is initially built, a new browser window should open up at [http://localhost:3000/](http://localhost:3000/), and you should be able to continue on with the tasks below.

## Tasks

In the top-level `App` component, add a `selectedEmailId` property to `state`, defaulting it to `-1`. Within `render()`, find an email within `this.state.emails` that matches `this.state.selectedEmailId`. Pass the selected email to the `<EmailView />` via `email` prop. If a matching email isn't found, the `<EmailView />` should not be rendered.

```js
export default class App extends PureComponent {
  // propTypes & defaultPropTypes

  state = {
    // Initialize emails state to an empty array.
    // Will get populated with data in `componentDidMount`
    emails: [],
    // Initialize selected email ID to -1, indicating nothing is selected.
    // When an email is selected in EmailList, this will be updated to
    // corresponding ID
    selectedEmailId: -1
  };

  // lifecycle methods

  // helper methods

  render() {
    let {emails, selectedEmailId} = this.state;
    let selectedEmail = emails.find(email => email.id === selectedEmailId);
    let emailViewComponent;

    if (selectedEmail) {
      emailViewComponent = (
        <EmailView email={selectedEmail} />
      );
    }

    return (
      <main className="app">
        <EmailList emails={emails} />
        {emailViewComponent}
        <EmailForm />
      </main>
    );
  }
}
```

You should see the email view in the UI disappear. The next step is wire in the interactivity that will make it display when an email list item is clicked.

In `EmailListItem` add an `onClick` handler to the container `<div>` that will call a (newly added) `onSelect` prop:

```js
export default class EmailListItem extends PureComponent {
  static propTypes = {
    email: EMAIL_PROP_TYPE.isRequired,
    onSelect: PropTypes.func
  }

  _handleClick(e) {
    let {email, onSelect} = this.props;

    if (onSelect) {
      e.stopPropagation();
      onSelect(email.id);
    }
  }

  render() {
    let {email: {from, subject}} = this.props;

    return (
      <div className="email-list-item" onClick={this._handleClick.bind(this)}>
        <span>{from}</span>
        <span>{subject}</span>
      </div>
    );
  }
}
```

In `EmailList` add a `onItemSelect` event handler prop and pass it through as the `onSelect` prop to all of the `<EmailListItem />` components it renders:

```js
export default class EmailList extends PureComponent {
  static propTypes = {
    emails: PropTypes.arrayOf(EMAIL_PROP_TYPE).isRequired,
    onItemSelect: PropTypes.func.isRequired
  }

  render() {
    let {emails, onItemSelect} = this.props;
    let emailComponents = emails.map(email =>
      <li key={email.id}>
        <EmailListItem email={email} onSelect={onItemSelect} />
      </li>
    );

    return (
      <ul className="email-list">
        {emailComponents}
      </ul>
    );
  }
}
```

Back in `App`, add a handler for the `onItemSelect` handler in `EmailList` called `_handleItemSelect` that will update `this.state.selectedEmailId` with the selected email item:

```js
export default class App extends PureComponent {
  // prop types & default props

  state = {
    // Initialize emails state to an empty array.
    // Will get populated with data in `componentDidMount`
    emails: [],
    // Initialize selected email ID to -1, indicating nothing is selected.
    // When an email is selected in EmailList, this will be updated to
    // corresponding ID
    selectedEmailId: -1
  }

  // lifecycle methods

  // other helper methods

  _handleItemSelect(selectedEmailId) {
    // update state (so that the EmailView will show)
    this.setState({selectedEmailId});
  }

  render() {
    let {emails, selectedEmailId} = this.state;
    let selectedEmail = emails.find(email => email.id === selectedEmailId);
    let emailViewComponent;

    if (selectedEmail) {
      emailViewComponent = (
        <EmailView email={selectedEmail} />
      );
    }

    return (
      <main className="app">
        <EmailList
          emails={emails}
          onItemSelect={this._handleItemSelect.bind(this)}
        />
        {emailViewComponent}
        <EmailForm />
      </main>
    );
  }
}
```

At this point, clicking an email list item, should display the `EmailList` component, but it's still just displaying a label.

Add an `email` prop to `EmailView` and display the subject, from, date & message:

```js
import {EMAIL_PROP_TYPE} from './constants';

export default class EmailView extends PureComponent {
  static propTypes = {
    email: EMAIL_PROP_TYPE.isRequired
  };

  render() {
    let {email: {subject, from, date, message}} = this.props;
    let rawMessage = {__html: message};

    return (
      <section className="email-view">
        <h1>{subject}</h1>
        <h2>From: <a href={`mailto:${from}`}>{from}</a></h2>
        <h3>{date}</h3>
        <div dangerouslySetInnerHTML={rawMessage} />
      </section>
    );
  }
}
```

Now, clicking different email items should display a different message in the email view.

## Exercises

- Add a close button to `EmailView` which hides `EmailView` (hint: add an `onClose` prop to `EmailView` that will be handled in `App`)

## Next

Go to [Step 6 - Email Form](../06-email-form/).

## Resources

- [Handling Events](https://facebook.github.io/react/docs/handling-events.html)
- [Conditional Rendering](https://facebook.github.io/react/docs/conditional-rendering.html)
- [Lifting State Up](https://facebook.github.io/react/docs/lifting-state-up.html)
- [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html)
- [Dangerously Set innerHTML](https://facebook.github.io/react/docs/dom-elements.html#dangerouslysetinnerhtml)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
