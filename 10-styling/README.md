# Step 10 - Styling

## Tasks

In order to make `render()` of `App` a bit cleaner, move out the logic for whether or not the `<EmailView />` should display into a helper component called `EmailViewWrapper`:

```js
const EmailViewWrapper = ({selectedEmail, onClose, onDelete, onMarkUnread, onMarkRead}) => {
  let component = null;

  if (selectedEmail) {
    component = (
      <EmailView
        email={selectedEmail}
        onClose={onClose}
        onDelete={onDelete}
        onMarkUnread={onMarkUnread}
        onMarkRead={onMarkRead}
      />
    );
  }

  return component;
};

export default class App extends PureComponent {
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
          onItemSelect={this._handleItemSelect.bind(this)}
          onItemDelete={this._handleItemDelete.bind(this)}
          onItemMarkUnread={this._handleItemMarkUnread.bind(this)}
          selectedEmailId={selectedEmailId}
        />
        <EmailViewWrapper
          selectedEmail={selectedEmail}
          onClose={this._handleEmailViewClose.bind(this)}
          onDelete={this._handleItemDelete.bind(this, selectedEmailId)}
          onMarkUnread={this._handleItemMarkUnread.bind(this, selectedEmailId)}
          onMarkRead={this._handleItemMarkRead.bind(this, selectedEmailId)}
        />
        <EmailForm onSubmit={this._handleFormSubmit.bind(this)} />
      </main>
    );
  }
}
```

Add wrapper elements around `EmailList`, `EmailView` & `EmailForm` with the appropriate class names to position them within `App`. Import the companion [`App.css`](src/App.css) file containing the styling.

```js
import './App.css';

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

export default class App extends PureComponent {
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
              onItemSelect={this._handleItemSelect.bind(this)}
              onItemDelete={this._handleItemDelete.bind(this)}
              onItemMarkUnread={this._handleItemMarkUnread.bind(this)}
              selectedEmailId={selectedEmailId}
            />
          </div>
          <EmailViewWrapper
            selectedEmail={selectedEmail}
            onClose={this._handleEmailViewClose.bind(this)}
            onDelete={this._handleItemDelete.bind(this, selectedEmailId)}
            onMarkUnread={this._handleItemMarkUnread.bind(this, selectedEmailId)}
            onMarkRead={this._handleItemMarkRead.bind(this, selectedEmailId)}
          />
          <div className="app__form">
            <EmailForm onSubmit={this._handleFormSubmit.bind(this)} />
          </div>
        </div>
      </main>
    );
  }
}
```

When an email item is selected, you should see a 3-column layout: email list on the left, email form on the right, and email view in the center.

In `EmailListItem`, import the companion [`EmailLisItem.css`](src/components/EmailListItem.css). Add CSS classes for from & subject display elements. Wrap the mark read/unread button & delete buttons in `<span>` with a CSS class. Using the [`classnames`](https://github.com/JedWatson/classnames) library, conditionally add classes container element based on whether or not the email item is selected or unread:

```js
render() {
  let {email: {from, subject, unread}, isSelected} = this.props;
  let className = classNames('email-list-item', {
    'email-list-item--selected': isSelected,
    'email-list-item--unread': unread
  });
  let markUnreadButton;

  if (isSelected && !unread) {
    markUnreadButton = (
      <button onClick={this._handleMarkUnread.bind(this)}>Mark unread</button>
    );
  }

  return (
    <div className={className} onClick={this._handleClick.bind(this)}>
      <span className="email-list-item__from">
        {from}
      </span>
      <span className="email-list-item__subject">
        {subject}
      </span>
      <span className="email-list-item__status">
        {markUnreadButton}
        <button onClick={onDelete}>Delete</button>
      </span>
    </div>
  );
}
```

## Exercises

- Extract the "status" section in `EmailListItem` into a helper `EmailListItemStatus` component
- In `EmailList`, import the companion [`EmailList.css`](src/components/EmailList.css) and add `"email-list__item"` to the `<li>` elements wrapping the `<EmailListItem />` components
- In `EmailView`, import the companion [`EmailView.css`](src/components/EmailView.css), extract an `EmailViewButtonBar` component that'll contain the mark read/unread button, delete & close buttons, and give the bar a `"email-view__button-bar"` CSS class
- In `EmailForm`, import the companion [`EmailForm.css`](src/components/EmailForm.css) and add the appropriate classes to the various parts of the form fields as well as the button bar

## Next

Go to [Step 11 - Email Form Modal](../11-email-form-modal/).

## Resources

- [`classnames` library](https://github.com/JedWatson/classnames)
- [Introduction to BEM](http://getbem.com/introduction/)
- [`glamorous` library](https://github.com/paypal/glamorous)
- [Inline Styles](https://facebook.github.io/react/docs/dom-elements.html#style)
- [CSS Modules: Welcome to the Future](http://glenmaddern.com/articles/css-modules)
- [Using CSS flexible boxes](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)
