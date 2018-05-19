# Step 7 - Delete email

The goal of this step is to add support for deleting individual emails in the UI.

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

## Jump Around

[Concepts](#concepts) | [Restart Setup](#restart-setup) | [Tasks](#tasks) | [Resources](#resources)

## Concepts

- Handling user interaction
- Leveraging ES6+ to maintain application state
- Working with the "Virtual DOM"

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
cp -r src/react/06-submit-email-form src/workshop
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

In `EmailListItem`, add a "Delete" button that will call a (newly added) `onDelete` prop with the email ID when clicked:

```js
export default class EmailListItem extends Component {
  static propTypes = {
    email: EMAIL_PROP_TYPE.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSelect: PropTypes.func
  }

  // other helper methods

  _handleDelete = (e) => {
    e.stopPropagation();
    this.props.onDelete(this.props.email.id);
  }

  render() {
    let {email: {from, subject}} = this.props;

    return (
      <div className="email-list-item" onClick={this._handleClick}>
        <span>{from}</span>
        <span>{subject}</span>
        <button onClick={this._handleDelete}>Delete</button>
      </div>
    );
  }
}
```

In `EmailList`, add a new `onItemDelete` prop that is passed to each `<EmailListItem />`'s `onDelete` prop:

```js
export default class EmailList extends Component {
  static propTypes = {
    emails: PropTypes.arrayOf(EMAIL_PROP_TYPE),
    onItemDelete: PropTypes.func.isRequired,
    onItemSelect: PropTypes.func.isRequired
  };

  render() {
    let {emails, onItemSelect, onItemDelete} = this.props;
    let emailComponents = emails.map(email =>
      <li key={email.id}>
        <EmailListItem
          email={email}
          onSelect={onItemSelect}
          onDelete={onItemDelete}
        />
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

In the top-level `App`, add a `_handleItemDelete()` helper method that is passed as `onItemDelete` to `<EmailList />`. Initially have `_handleItemDelete()` log to the console the ID of the email to delete:

```js
export default class App extends Component {
  // initialize state

  // other helper methods

  _handleItemDelete = (emailId) => {
    console.log(emailId);
  }

  render() {
    let {emails, selectedEmailId} = this.state;
    let selectedEmail = emails.find(email => email.id === selectedEmailId);
    let emailViewComponent;

    if (selectedEmail) {
      emailViewComponent = (
        <EmailView
          email={selectedEmail}
          onClose={this._handleEmailViewClose}
        />
      );
    }

    return (
      <main className="app">
        <EmailList
          emails={emails}
          onItemDelete={this._handleItemDelete}
          onItemSelect={this._handleItemSelect}
        />
        {emailViewComponent}
        <EmailForm onSubmit={this._handleFormSubmit} />
      </main>
    );
  }
}
```

At this point, you should be able to click a "Delete" button for one of the email items and see the ID logged to the console. What we need to do next is to actually remove the email from `this.state.emails` so that it no longer shows up in the list:

```js
export default class App extends Component {
  // initialize state

  // other helper methods

  _handleItemDelete = (emailId) => {
    this.setState(({emails}) => ({
      // "delete" the email by returning a filtered list that doesn't include it
      emails: emails.filter(email => email.id !== emailId)
    }));
  }

  // render()
}
```

Once again we're using the "updater function" version of [`setState`](https://reactjs.org/docs/react-component.html#setstate) to update the `emails` state because we're using the current version of `emails` to determine the next version of `emails`. And as always, we never want to mutate state or properties within state. So before we remove the email to delete from `this.state.emails` we first need to make a copy of `emails`. A quick way to do this in a single step is using [`.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) to return a filtered list that doesn't include the email to delete.

Now clicking a "Delete" button for one of the emails items should immediately remove it from the list.

## Exercises

- Using the [React Developer Tools](https://github.com/facebook/react-devtools#installation), watch how the deleted email item is optimally removed from the list (nothing else in the UI is updated thanks to the [_reconciler_](https://facebook.github.io/react/docs/reconciliation.html) (aka "Virtual DOM"))
- Add a "Delete" button to [`EmailView`](components/EmailView.js) that hooks into `_handleItemDelete()` (`EmailView` will need to expose an `onDelete` callback prop too)
- Update `_handleItemDelete()` to reset `this.state.selectedEmailId` so that the email in the email view doesn't still show after being deleted

## Next

Go to [Step 8 - Interacting with APIs](../08-api/).

## Resources

- [`setState`](https://reactjs.org/docs/react-component.html#setstate)
- [The Power of Not Mutating Data](https://facebook.github.io/react/docs/optimizing-performance.html#the-power-of-not-mutating-data)
- [Reconciliation](https://facebook.github.io/react/docs/reconciliation.html)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
