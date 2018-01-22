# Step 9 - Mark unread/read

The goal of this step is to add support for marking an email read or unread by submitting a `PUT` method to the API as a result of user interactions.

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
cp -r 08-api workshop
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

Add "Mark Unread" & "Mark Read" buttons to `EmailView` that when clicked will call the (newly added) `onMarkUnread` & `onMarkRead` props, respectively. Only one button should show at a given time based on the `unread` property within `this.props.email`:

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
- Add a "Mark Unread" button for each `EmailListItem` that **only** shows when an item is selected and read
- When an `EmailListItem` is selected, it should also mark the email as read (HINT: use [`componentDidUpdate`](https://reactjs.org/docs/react-component.html#componentdidupdate) lifecycle method)

## Next

Go to [Step 10 - Styling](../10-styling/).

## Resources

- [HTTP Methods](http://restfulapi.net/http-methods/)
- [Lifecycle Methods](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
