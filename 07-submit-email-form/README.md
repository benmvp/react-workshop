# Step 7 - Submit email form

The goal of this step is to actually submit the email for by `POST`ing the form data to the API.

## Tasks

Add a submit button and an `onSubmit` handler to the `<form>` inside `EmailForm`:

```js
export default class EmailForm extends PureComponent {
  // initialize state

  // other helper methods

  _handleSubmit(e) {
    e.preventDefault();

    let {from, to, subject, message} = this.state;

    console.log('submitting', {from, to, subject, message});
  }

  render() {
    let {from, to, subject, message} = this.state;

    return (
      <form className="email-form" onSubmit={this._handleSubmit.bind(this)}>
        {/* from, to, subject & message fields */}

        <footer>
          <button type="submit">Send email</button>
        </footer>
      </form>
    );
  }
}
```

Add a required `onSubmit` prop to `EmailForm` and call it within `_handleSubmit` when all the fields are filled:

```js
export default class EmailForm extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  // initialize state

  // other helper methods

  _handleSubmit(e) {
    e.preventDefault();

    let {from, to, subject, message} = this.state;

    // super simple validation
    if (from && to && subject && message) {
      // call handler with email info
      this.props.onSubmit({
        from,
        to,
        subject,
        message
      });
    } else {
      alert('fill out the form!');
    }
  }
}
```

After the form is submitted, also clear reset the form fields so that it's easy to send a new email:

```js
const DEFAULT_FORM_VALUES = {
  from: '',
  to: 'me@abcdef.com',
  subject: '',
  message: ''
};

export default class EmailForm extends PureComponent {
  // prop types

  state = DEFAULT_FORM_VALUES

  // other helper methods

  _handleSubmit(e) {
    e.preventDefault();

    let {from, to, subject, message} = this.state;

    // super simple validation
    if (from && to && subject && message) {
      // call handler with email info
      this.props.onSubmit({
        from,
        to,
        subject,
        message
      });

      // reset the form to initial values
      this.setState(DEFAULT_FORM_VALUES);
    } else {
      alert('fill out the form!');
    }
  }
}
```

In the top-level `App` component, add a handler to `<EmailForm />` for its `onSubmit` prop and make a JSON `fetch` `POST` request to `http://localhost:9090/emails`, passing the new email data:

```js
export default class App extends PureComponent {
  // prop types & default props

  // initialize state

  // lifecycle methods

  // other helper methods

  _handleFormSubmit(newEmail) {
    // Make a JSON POST with the new email
    fetch('//localhost:9090/emails', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEmail)
    })
      .then(res => res.json())
      .then(({success}) => {
        if (!success) {
          throw new Error('Unable to send email!');
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
          onItemSelect={this._handleItemSelect.bind(this)}
        />
        {emailViewComponent}
        <EmailForm onSubmit={this._handleFormSubmit.bind(this)} />
      </main>
    );
  }
}
```

## Exercises

- After `POST`ing the new email, "optimistically" update `this.state.emails` with the new email so that the new email shows up immediately in the email list before long poll interval comes around

## Next

Go to [Step 8 - Delete email](../08-delete-email/).

## Resources

- [Forms](https://facebook.github.io/react/docs/forms.html)
- [DOM Elements](https://facebook.github.io/react/docs/dom-elements.html)
- [HTTP Methods](http://restfulapi.net/http-methods/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) & Github's [`fetch` polyfill](https://github.com/github/fetch)
