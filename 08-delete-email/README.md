# Step 8 - Delete email

The goal of this step is to add support deleting individual emails by submitting a `DELETE` method to the API as a result of user interactions.

## Tasks

In `EmailListItem`, add a "Delete" button that will call a (newly added) `onDelete` prop when clicked:

```js
export default class EmailListItem extends PureComponent {
  static propTypes = {
    email: EMAIL_PROP_TYPE.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSelect: PropTypes.func
  }

  // other helper methods

  _handleDelete(e) {
    e.stopPropagation();
    this.props.onDelete(this.props.email.id);
  }

  render() {
    let {email: {from, subject}} = this.props;

    return (
      <div className="email-list-item" onClick={this._handleClick.bind(this)}>
        <span>{from}</span>
        <span>{subject}</span>
        <button onClick={this._handleDelete.bind(this)}>Delete</button>
      </div>
    );
  }
}
```

In `EmailList`, add a new `onItemDelete` prop that is passed to each `<EmailListItem />`'s `onDelete` prop:

```js
export default class EmailList extends PureComponent {
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

In the top-level `App`, add a `_handleItemDelete()` helper method that is passed as `onItemDelete` to `<EmailList />`. `_handleItemDelete()` will make a `fetch` `DELETE` action to `http://localhost:9090/emails/<EMAIL_ID>`:

```js
export default class App extends PureComponent {
  // prop types & default props

  // initialize state

  // lifecycle methods

  // other helper methods

  _handleItemDelete(emailId) {
    // Make a DELETE request
    fetch(`//localhost:9090/emails/${emailId}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(({success}) => {
        if (!success) {
          throw new Error(`Unable to delete email ID# ${emailId}.`);
        }
      })
      .catch(ex => console.error(ex));
  }

  render() {
    let {emails, selectedEmailId} = this.state;
    let selectedEmail = emails.find(email => email.id === selectedEmailId);
    let emailViewComponent;

    if (selectedEmail) {
      emailViewComponent = (
        <EmailView
          email={selectedEmail}
          onClose={this._handleEmailViewClose.bind(this)}
        />
      );
    }

    return (
      <main className="app">
        <EmailList
          emails={emails}
          onItemDelete={this._handleItemDelete.bind(this)}
          onItemSelect={this._handleItemSelect.bind(this)}
        />
        {emailViewComponent}
        <EmailForm onSubmit={this._handleFormSubmit.bind(this)} />
      </main>
    );
  }
}
```

At this point, you should be able to click a "Delete" button for one of the email items. After the long polling retrieves the new information, that email item should be removed from the list. Use the [React Developer Tools](https://github.com/facebook/react-devtools#installation) watch how the deleted email item is optimally removed from the list. Nothing else in the UI is updated thanks to the [_reconciler_](https://facebook.github.io/react/docs/reconciliation.html) (aka "Virtual DOM").

## Exercises

- Add optimistic updating of `this.state.emails` state after an email is deleted for immediate feedback
- Add a "Delete" button to [`EmailView`](src/components/EmailView.js) that hooks into `_handleItemDelete()`
- Update `_handleItemDelete()` to reset `this.state.selectedEmailId` so that the email in the email view doesn't still show after being deleted

## Next

Go to [Step 9 - Mark unread/read](../09-mark-unread/).

## Resources

- [Reconciliation](https://facebook.github.io/react/docs/reconciliation.html)
- [HTTP Methods](http://restfulapi.net/http-methods/)
