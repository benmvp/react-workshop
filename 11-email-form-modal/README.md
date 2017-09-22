# Step 11 - Email Form Modal

The goal of this step is to move the email form into a modal so that there is more room on the page for the email list and email view.

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
cp -r 10-styling workshop
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

Whether or not the email form modal is being displayed will be maintained in the `state` of the `App`. Also add a `<button>` with an `onClick` handler that set `this.state.showForm` to `true`:

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
    selectedEmailId: -1,
    // Initialize show form flag to false, indicating that it won't show.
    // When the new email button is clicked, it'll be set to `true`. It'll
    // be toggled false on form submission or cancel
    showForm: false
  };

  // lifecycle methods

  // other helper methods

  _handleShowForm() {
    // Show email form overlay by setting state to true
    this.setState({showForm: true});
  }

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
            onMarkUnread={this._handleItemMarkUnread.bind(
              this,
              selectedEmailId
            )}
            onMarkRead={this._handleItemMarkRead.bind(this, selectedEmailId)}
          />
          <button 
            className="app__new-email"
            onClick={this._handleShowForm.bind(this)}
          >
            +
          </button>
          <div className="app__form">
            <EmailForm onSubmit={this._handleFormSubmit.bind(this)} />
          </div>
        </div>
      </main>
    );
  }
}
```

You should see a "+" button in the bottom right of the screen that won't yet do anything because `this.state.showForm` hasn't yet been connected to the UI.

Now that the email form is going to be conditionally shown based on `this.state.showForm`, extract it out into a helper component that will display the form modal:

```js
const EmailFormWrapper = ({showForm, onSubmit}) => {
  let component = null;

  if (showForm) {
    component = (
      <div className="app__form-modal">
        <div className="app__form">
          <EmailForm onSubmit={onSubmit} />
        </div>
      </div>
    );
  }

  return component;
};

export default class App extends PureComponent {
  // prop types & default props

  // initialize state

  // lifecycle methods

  // other helper methods

  render() {
    let {emails, selectedEmailId, showForm} = this.state;
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
            onMarkUnread={this._handleItemMarkUnread.bind(
              this,
              selectedEmailId
            )}
            onMarkRead={this._handleItemMarkRead.bind(this, selectedEmailId)}
          />
          <button 
            className="app__new-email"
            onClick={this._handleShowForm.bind(this)}
          >
            +
          </button>
          <EmailFormWrapper
            showForm={showForm}
            onSubmit={this._handleFormSubmit.bind(this)}
          />
        </div>
      </main>
    );
  }
}
```

You should now see the email form in an overlay when you click the "+" button. Upon submission, you should see the newly added email at the top of the email list. However, the form is still on top of the screen with no way to remove it! The first exercise solves this problem.

## Exercises

- The modal should close when the `EmailForm` is submitted (hint: you will need to update `_handleFormSubmit` to also update `this.state.showForm`)
- Add a "Cancel" button to `EmailForm` that will close the modal, but won't display if there's no `onCancel` handler specified

## Next

Go to [Step 12 - API lib](../12-api-lib/).

## Resources

None

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
