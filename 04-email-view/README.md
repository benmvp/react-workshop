# Step 4 - Email View

The goal of this step is to build some interactivity into the app by responding to user interactions. [Handling events](https://facebook.github.io/react/docs/handling-events.html) within React elements is very similar to handling events on DOM elements. Event handlers will be passed instances of [`SyntheticEvent`](https://reactjs.org/docs/events.html), a cross-browser wrapper around the browser's native event. It has the same interface as the browser's native event (including` stopPropagation()` and `preventDefault()`) except the events work identically across all browsers!

Ultimately, we want to click on an email list item and have its details displayed in the email view.

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
cp -r 03-lists workshop
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

Start the app:

```sh
# Yarn
yarn start

# ...or NPM
npm start
```

After the app is initially built, a new browser window should open up at [http://localhost:3000/](http://localhost:3000/), and you should be able to continue on with the tasks below.

## Tasks

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

This now makes clicks that happen within a `<EmailListItem />` available to `EmailList`.

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

This now makes all the clicks that happen within `<EmailList />` (which were actually from its `<EmailListItem >` children) available to the top-level `App` component.

In `App`, add a handler for the `onItemSelect` handler in `EmailList` called `_handleItemSelect` that, for now, just logs the selected email ID to the console:

```js
export default class App extends PureComponent {
  _handleItemSelect(selectedEmailId) {
    // logging the clicked email item that was passed *up* the component hierarchy
    console.log(selectedEmailId);
  }

  render() {
    return (
      <main className="app">
        <EmailList
          emails={EMAILS}
          onItemSelect={this._handleItemSelect.bind(this)}
        />
        <EmailView />
        <EmailForm />
      </main>
    );
  }
}
```

Every time you click on one of the email list items, its ID should be logged to the console.

But we want to do more than just log to the console; we want to display the email view with the details of the selected email. In order to do this, we will have to maintain state to keep track of the currently selected email item. This will allow us to pass that currently selected email item to stat to `<EmailView />`.

In the `App` component, add a `selectedEmailId` property to `state`, defaulting it to `-1` (signifying nothing is selected). Within `render()`, find an email within `EMAILS` that matches `this.state.selectedEmailId`. Pass the selected email to the `<EmailView />` via `email` prop. If a matching email isn't found, the `<EmailView />` should not be rendered.

```js
export default class App extends PureComponent {
  // propTypes & defaultPropTypes

  state = {
    // Initialize selected email ID to -1, indicating nothing is selected.
    // When an email is selected in EmailList, this will be updated to
    // corresponding ID
    selectedEmailId: -1
  };

  // helper methods

  render() {
    let {selectedEmailId} = this.state;
    let selectedEmail = EMAILS.find(email => email.id === selectedEmailId);
    let emailViewComponent;

    if (selectedEmail) {
      emailViewComponent = (
        <EmailView email={selectedEmail} />
      );
    }

    return (
      <main className="app">
        <EmailList
          emails={EMAILS}
          onItemSelect={this._handleItemSelect.bind(this)}
        />
        {emailViewComponent}
        <EmailForm />
      </main>
    );
  }
}
```

You should actually see the email view in the UI disappear. The next step is wire in the interactivity that will make it display when an email list item is clicked by updating `this.state.selectedEmailId` whenever an email item is selected. We can now change our console logging code in `_handleItemSelect` to update `this.state.selectedEmailId`:

```js
export default class App extends PureComponent {
  // propTypes & defaultPropTypes

  state = {
    // Initialize selected email ID to -1, indicating nothing is selected.
    // When an email is selected in EmailList, this will be updated to
    // corresponding ID
    selectedEmailId: -1
  };

  _handleItemSelect(selectedEmailId) {
    // update state (so that the EmailView will show)
    this.setState({selectedEmailId});
  }

  render() {
    let {selectedEmailId} = this.state;
    let selectedEmail = EMAILS.find(email => email.id === selectedEmailId);
    let emailViewComponent;

    if (selectedEmail) {
      emailViewComponent = (
        <EmailView email={selectedEmail} />
      );
    }

    return (
      <main className="app">
        <EmailList
          emails={EMAILS}
          onItemSelect={this._handleItemSelect.bind(this)}
        />
        {emailViewComponent}
        <EmailForm />
      </main>
    );
  }
}
```

Whenever we call `setStatae`, React calls the `render()` method again for us so that the state that was just updated can be rendered in the UI. This is how interactivity is built in React:

1. Initialize `state` to the default values you would like to render
1. React calls `render()` to display the UI
1. At some point, a user interaction happens
1. We call `setState` to update the state
1. React calls `render()` again so we can display UI with updated state
1. Do step 3 again and again and again

At this point, clicking an email list item, should display the `EmailView` component, but it's still just displaying the heading "View selected email." Let's fix that.

Add an `email` prop to `EmailView` and display a subject, from, date & message:

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

Now, clicking different email items should display a different message in the email view. Because the message itself has HTML within it, we need to use [`dangerouslySetInnerHTML`](https://facebook.github.io/react/docs/dom-elements.html#dangerouslysetinnerhtml) to prevent React's default HTML encoding of all element content.

Finally, update the `EMAILS` constant in `App` to add `date` and `message` properties for each of the sample emails:

```js
const EMAILS = [
  {
    id: 1,
    from: 'alittle0@chronoengine.com',
    subject: 'Mauris lacinia sapien quis libero',
    date: '01/19/2016',
    message: 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.<br /><br />Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.<br /><br />Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
  },
  {
    id: 2,
    from: 'amurray1@mit.edu',
    subject: 'Mauris ullamcorper purus sit amet nulla',
    date: '11/18/2015',
    message: '<em><strong>Sed ante.</strong></em> Vivamus tortor. Duis mattis egestas metus.<br /><br />Aenean fermentum. 😀 Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.<br /><br />Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
  },
  {
    id: 3,
    from: 'dmccoy2@bluehost.com',
    subject: 'Suspendisse potenti',
    date: '04/12/2016',
    message: 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.<br /><br /><ol><li>Phasellus sit amet erat.</li><li>Nulla tempus.</li><li>Vivamus in felis eu sapien cursus vestibulum.</li></ol><br /><br />Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.<br /><br />Duis aliquam convallis nunc. Proin at <a href="http://www.benmvp.com">turpis a pede posuere</a> nonummy. Integer non velit.',
  },
  {
    id: 4,
    from: 'raustin3@hexun.com',
    subject: 'Maecenas rhoncus aliquam lacus',
    date: '07/30/2015',
    message: 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
  },
  {
    id: 5,
    from: 'rwagner4@instagram.com',
    subject: 'Pellentesque ultrices mattis odi',
    date: '04/26/2016',
    message: '<h3>In blandit ultrices enim.</h3> Lorem ipsum dolor sit amet, consectetuer adipiscing elit.<br /><br />Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.<br /><br />Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
  },
];
```

## Exercises

- Add a close button to `EmailView` which hides `EmailView` (hint: add an `onClose` prop to `EmailView` that will be handled in `App` to update `this.state.selectedEmailId`)

## Next

Go to [Step 5 - Email Form](../05-email-form/).

## Resources

- [Handling Events](https://facebook.github.io/react/docs/handling-events.html)
- [Conditional Rendering](https://facebook.github.io/react/docs/conditional-rendering.html)
- [Lifting State Up](https://facebook.github.io/react/docs/lifting-state-up.html)
- [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html)
- [Dangerously Set innerHTML](https://facebook.github.io/react/docs/dom-elements.html#dangerouslysetinnerhtml)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
