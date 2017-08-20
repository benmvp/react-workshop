# Step 9 - Mark unread/read

The goal of this step is to add support for marking an email read or unread by submitting a `PUT` method to the API as a result of user interactions.

## Tasks

Add "Mark Unread" & "Mark Read" buttons to `EmailView` that will call (newly added) `onMarkUnread` & `onMarkRead` props, respectively, when clicked. Only one button should show at a given time based on the `unread` property within `this.props.email`:

```js
export default class EmailView extends PureComponent {
  static propTypes = {
    email: EMAIL_PROP_TYPE.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onMarkUnread: PropTypes.func,
    onMarkRead: PropTypes.func
  };

  // other helper methods

  _handleMarkUnread(e) {
    e.stopPropagation();

    if (this.props.onMarkUnread) {
      this.props.onMarkUnread();
    }
  }

  _handleMarkRead(e) {
    e.stopPropagation();

    if (this.props.onMarkRead) {
      this.props.onMarkRead();
    }
  }

  render() {
    let {email: {subject, from, date, message, unread}} = this.props;
    let rawMessage = {__html: message};
    let markUnreadReadButton = unread
      ? (<button onClick={this._handleMarkRead.bind(this)}>Mark Read</button>)
      : (<button onClick={this._handleMarkUnread.bind(this)}>Mark Unread</button>);

    return (
      <section className="email-view">
        <h1>{subject}</h1>
        <h2>From: <a href={`mailto:${from}`}>{from}</a></h2>
        <h3>{date}</h3>
        <div dangerouslySetInnerHTML={rawMessage} />
        {markUnreadReadButton}
        <button onClick={this._handleDelete.bind(this)}>Delete</button>
        <button onClick={this._handleClose.bind(this)}>Close</button>
      </section>
    );
  }
}
```

In the top-level `App`, add handlers for `onMarkUnread` & `onMarkRead` on `<EmailView />` that will make a `fetch` `PUT` action to `http://localhost:9090/emails/<EMAIL_ID>`:

```js
export default class App extends PureComponent {
  // prop types & default props

  // initial state

  // lifecycle methods

  // other helper methods

  _setUnread(emailId, unread = true) {
    // Make a PUT request to update unread state
    fetch(`//localhost:9090/emails/${emailId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({unread})
    })
      .then(res => res.json())
      .then(({success}) => {
        if (!success) {
          throw new Error(
            `Unable to set email ID# ${emailId} unread state to ${unread}.`
          );
        }
      })
      .catch(ex => console.error(ex));
  }

  _handleItemMarkUnread(emailId) {
    this._setUnread(emailId);
  }

  _handleItemMarkRead(emailId) {
    this._setUnread(emailId, false);
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
          onDelete={this._handleItemDelete.bind(this, selectedEmailId)}
          onMarkUnread={this._handleItemMarkUnread.bind(this, selectedEmailId)}
          onMarkRead={this._handleItemMarkRead.bind(this, selectedEmailId)}
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

You should now be able to mark a selected email as unread in the email view. After the long polling retrieves the new information, the button should switch from "Mark Unread" to "Mark Read." Clicking the button should do the reverse.

## Exercises

- Add optimistic updating of `this.state.emails` state after an email is marked read/unread for immediate feedback
- Add a "Mark Unread" button for each `EmailListItem` that only shows when an item is selected and read
- When an `EmailListItem` is selected, it should also mark the email as read

## Next

Go to [Step 10 - Styling](../10-styling/).

## Resources

- [HTTP Methods](http://restfulapi.net/http-methods/)
