# Step 10 - Mark unread/read

The goal of this step is to add support for marking an email read or unread by submitting a `PUT` method to the API as a result of user interactions.

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

## Jump Around

[Concepts](#concepts) | [Restart Setup](#restart-setup) | [Tasks](#tasks) | [Resources](#resources)

## Concepts

- Making API calls
- Combining sections of UI into helper components
- Handling user interaction

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
cp -r src/react/09-styling src/workshop
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

Add "Mark Unread" & "Mark Read" buttons to `EmailView` that when clicked will call the (newly added) `onMarkUnread` & `onMarkRead` props, respectively. Only one button should show at a given time based on the `read` property within `this.props.email`:

```js
export default class EmailView extends Component {
  static propTypes = {
    email: EMAIL_PROP_TYPE.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onMarkUnread: PropTypes.func,
    onMarkRead: PropTypes.func
  };

  // other helper methods

  _handleMarkUnread = (e) => {
    e.stopPropagation();

    if (this.props.onMarkUnread) {
      this.props.onMarkUnread();
    }
  }

  _handleMarkRead = (e) => {
    e.stopPropagation();

    if (this.props.onMarkRead) {
      this.props.onMarkRead();
    }
  }

  render() {
    let {email: {subject, from, date, message, read}} = this.props;
    let rawMessage = {__html: message};
    let markUnreadReadButton = read
      ? (<button onClick={this._handleMarkUnread}>Mark Unread</button>)
      : (<button onClick={this._handleMarkRead}>Mark Read</button>);

    return (
      <section className="email-view">
        <h1>{subject}</h1>
        <h2>From: <a href={`mailto:${from}`}>{from}</a></h2>
        <h3>{date}</h3>
        <div dangerouslySetInnerHTML={rawMessage} />
        <div className="email-view__button-bar">
          {markUnreadReadButton}
          <button onClick={this._handleDelete}>Delete</button>
          <button onClick={this._handleClose}>Close</button>
        </div>
      </section>
    );
  }
}
```

In the top-level `App`, add handlers for `onMarkUnread` & `onMarkRead` on `<EmailView />` (via `<EmailViewWrapper />`) that will make a `fetch` `PUT` action to `http://localhost:9090/emails/<EMAIL_ID>`:

```js
const EmailViewWrapper = ({selectedEmail, onClose, onDelete, onMarkUnread, onMarkRead}) => {
  let component = null;

  if (selectedEmail) {
    component = (
      <article className="app__view">
        <EmailView
          email={selectedEmail}
          onClose={onClose}
          onDelete={onDelete}
          onMarkUnread={onMarkUnread}
          onMarkRead={onMarkRead}
        />
      </article>
    );
  }

  return component;
};

export default class App extends Component {
  // prop types & default props

  // initial state

  // lifecycle methods

  // other helper methods

  _setUnread = (emailId, read = true) => {
    // Make a PUT request to update read state
    fetch(`//localhost:9090/emails/${emailId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({read})
    })
      .then(res => res.json())
      .then(({success}) => {
        if (!success) {
          throw new Error(
            `Unable to set email ID# ${emailId} read state to ${read}.`
          );
        }
      })
      .catch(ex => console.error(ex));
  }

  _handleItemMarkUnread = (emailId) => {
    this._setUnread(emailId);
  }

  _handleItemMarkRead = (emailId) => {
    this._setUnread(emailId, false);
  }

  render() {
    let {emails, selectedEmailId} = this.state;
    let selectedEmail = emails.find(email => email.id === selectedEmailId);

    return (
      <main className="app">
        <EmailList
          emails={emails}
          onItemDelete={this._handleItemDelete}
          onItemSelect={this._handleItemSelect}
        />
        <EmailViewWrapper
            selectedEmail={selectedEmail}
            onClose={this._handleEmailViewClose}
            onDelete={this._handleItemDelete.bind(this, selectedEmailId)}
            onMarkUnread={this._handleItemMarkUnread.bind(this, selectedEmailId)}
            onMarkRead={this._handleItemMarkRead.bind(this, selectedEmailId)}
          />
        <EmailForm onSubmit={this._handleFormSubmit} />
      </main>
    );
  }
}
```

You should now be able to mark a selected email as unread in the email view. After the long polling retrieves the new information, the button should switch from "Mark Unread" to "Mark Read." Clicking the button should do the reverse.

## Exercises

- Add optimistic updating of `this.state.emails` state after an email is marked read/unread for immediate feedback
- Add a "Mark Unread" button to "status" section in `EmailListItem` that **only** shows when an item is selected and read
- Extract the "status" section in `EmailListItem` into a helper `EmailListItemStatus` component
- When an `EmailListItem` is selected, it should also mark the email as read (HINT: use callback of `setState`)
- In `EmailView`, extract an `EmailViewButtonBar` component that'll contain the mark read/unread button, delete & close buttons

## Next

Go to [Step 11 - Email Form Modal](../11-email-form-modal/).

## Resources

- [HTTP Methods](http://restfulapi.net/http-methods/)
- [`setState()`](https://reactjs.org/docs/react-component.html#setstate)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
