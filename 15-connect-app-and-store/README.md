# Step 15 - Connect App and Store

In [step 14](../14-reduxy-action-reducers) we separated out our "action-reducers" into distinct "actions" and "reducers". As of now, these "actions" and "reducers" are not being consumed at any part of our app. We are still relying on the "action-creators" from before. Our goal in this step is to actually connect our [Redux](http://redux.js.org/)-y "reducers" and "actions" to our React application by hydrating the data via the [`store`](http://redux.js.org/docs/api/Store.html).

In order to actually connect the two, we will be using some helpers provided by [`react-redux`](https://github.com/reactjs/react-redux). Namely: [`Provider`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store) and [`connect()`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options). The docs provide invaluable insight into their behavior, but in short terms:
* **Provider**: The top level component in your application, makes the `store` accessible via calls to `connect()` for all children components
* **connect()**: A function which takes your component as an argument, and and provides access to the `store` and `dispatch()` in the passed in component's props via [`mapStateToProps`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) and [`mapDispatchToProps`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options).

A component which has been passed to connect takes on a different term: a [container](http://redux.js.org/docs/basics/UsageWithReact.html#presentational-and-container-components). The term comes from an abstraction suggested in redux documentation that components should be split into two basic groups: those which handle *presentation* and those which handle *data*. "Containers" are passed to `connect()` and so are aware of the state, and are able to dispatch actions, while presentational components simply consume their props and maintain state for UI purposes.

In this step we are going to do all that is left in order to connect our React application to our Redux store and actions. This will include:
* Creating our `store` in `App.js`
* Applying `redux-thunk` as a middleware to handle async actions
* Making `<Provider />` the top level component
* Refactoring of `<App />` such that its primary job is creating the store, and hydrating the app. Moving the JSX into a new container component: `<Page />`
* `connect()` `<Page />` so that we can `dispatch()` actions, and access our App's state

The [tasks](#tasks) and [exercises](#exercises) below will address each of the steps above and when we finish, will have a fully functioning Redux app.

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](src/).

## Tasks

First things first, lets install the libraries necessary to make this happen. If you are starting the workshop from this step, or have already run `yarn install` in this directory please disregard. For everyone else, run:
```
yarn add redux
yarn add react-redux
yarn add redux-thunk
```

Once that finishes we are good to go!

Lets create a new folder [`containers/`](src/containers/) and within that folder add a new file [`Page.js`](src/containers/Page.js). Lets quickly add `<Page />` to export.

```js
import React, {PureComponent} from 'react';

export default class Page extends PureComponent {
  render() {
    return (
      <div />
    )
  }
}
```

Next we are going to do is some ground work to set up the modified app structure. We want the `<Page />` to deal with:
* the layout
* handling user interactions
* UI state

The `<App />` should concern itself with:
* setting up the `store`
* initial hydration of the App

So, first pull out the **JSX**, **helper components**, **component imports**, **event handlers** (such as `_handleItemSelect`), and **state** from `App.js`. Move them into `Page.js`.

After moving everything over as is, `Page.js` should look like:

```js
// containers/Page.js

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {
  addEmail,
  deleteEmail,
  markRead,
  markUnread
} from '../action-reducers';

import EmailList from '../components/EmailList';
import EmailView from '../components/EmailView';
import EmailForm from '../components/EmailForm';

const EmailViewWrapper = ({
  selectedEmail,
  onClose,
  onDelete,
  onMarkUnread,
  onMarkRead
}) => {
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

const EmailFormWrapper = ({showForm, onSubmit, onCancel}) => {
  let component = null;

  if (showForm) {
    component = (
      <div className="app__form-modal">
        <div className="app__form">
          <EmailForm onSubmit={onSubmit} onCancel={onCancel} />
        </div>
      </div>
    );
  }

  return component;
};

export default class Page extends PureComponent {
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

  _handleItemSelect(selectedEmailId) {
    // update state (so that the EmailView will show)
    this.setState({selectedEmailId});

    if (this.state.selectedEmailId !== selectedEmailId) {
      // also mark the email as read
      this._handleItemMarkRead(selectedEmailId);
    }
  }

  _handleEmailViewClose() {
    // We close the email view by resetting the selected email
    this.setState({selectedEmailId: -1});
  }

  _handleFormSubmit(newEmail) {
    addEmail(this.state.emails, newEmail)
      // if the email was successfully updated, we have to make
      // a request to get the new list of emails, but we'll have
      // to wait for the response of that request, so let's add to
      // our state immediately and then later when the response
      // comes back, the server-side list will update. This is mainly
      // here to demonstrate immutable updating of data structures
      .then(emails => this.setState({emails, showForm: false}));
  }

  _handleItemDelete(emailId) {
    deleteEmail(this.state.emails, emailId)
      // optimistic updating (see _handleFormSubmit for more info)
      // Also reset `selectedEmailId` since we're deleting it
      .then(emails => this.setState({emails, selectedEmailId: -1}));
  }

  _handleItemMarkUnread(emailId) {
    markUnread(this.state.emails, emailId)
      // optimistic updating (see _handleFormSubmit for more info)
      .then(emails => this.setState({emails}));
  }

  _handleItemMarkRead(emailId) {
    markRead(this.state.emails, emailId)
      // optimistic updating (see _handleFormSubmit for more info)
      .then(emails => this.setState({emails}));
  }

  _handleShowForm() {
    // Show email form overlay by setting state to true
    this.setState({showForm: true});
  }

  _handleHideForm() {
    // Hide email form overlay by setting state to false
    this.setState({showForm: false});
  }

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
            onCancel={this._handleHideForm.bind(this)}
          />
        </div>
      </main>
    );
  }
}
```

and `App.js` should look like:

```js
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {getEmails} from './action-reducers';

export default class App extends PureComponent {
  static propTypes = {
    pollInterval: PropTypes.number
  };

  static defaultProps = {
    // default the `pollInterval` prop to 2 secs when not specified
    pollInterval: 2000
  };

  componentDidMount() {
    // Retrieve emails from server once we know DOM exists
    this._getUpdateEmails();

    // Set up long-polling to continuously get new data
    this._pollId = setInterval(
      () => this._getUpdateEmails(),
      this.props.pollInterval
    );
  }

  componentWillUnmount() {
    // Need to remember to clearInterval when the component gets
    // removed from the DOM, otherwise the interval will keep going
    // forever and leak memory
    clearInterval(this._pollId);
  }

  _getUpdateEmails() {
    return getEmails().then(emails => this.setState({emails}));
  }

  render() {
    return (
    );
  }
}
```

Now that we have separated out `<App/>` into two distinct components, lets start by setting up `<App/>` to create a `store` and have `<Provider/>` consume the store as the top level child. Then, we will return to `<Page/>` and complete it's refactor.

Next, lets create our `store`.

We are going to do this in `<App/>`'s [`constructor()`](https://facebook.github.io/react/docs/react-component.html#constructor). This should be added directly after `static defaultProps` as it is the first thing called when the component is evaluated.

The only things we *need* when creating a store are: `createStore()` from `redux`, and our root reducer, which in this case is `emails` from [`reducers/index.js`]('.src/reducers/index.js'). Additionally, since we are using actions to make API calls which behave asynchronously, we also will need to import [`applyMiddleware()`](http://redux.js.org/docs/api/applyMiddleware.html) from `redux` and [`thunk`](https://github.com/gaearon/redux-thunk#whats-a-thunk) from `redux-thunk`.

First, lets import the necessary modules:
```js
// App.js

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import {emails} from './reducers';
```
Next, lets add a `constructor()` in `<App />` which will handle creating the store.

```js
// App.js

constructor(props) {
  //It is always necessary to call super(props)
  //whenever adding functionality to the constructor
  super(props);

  this._store = createStore(
    emails,
    applyMiddleware(thunk)
  );
}
```
We have a `store`! Now, that we do, we can modify our `render()` function so it returns `<Provider />` as the top level component, with `<Page />` as its child.

```js
//App.js

render() {
  <Provider store={this._store}>
    <Page />
  </Provider>
}
```

After these changes our App.js should look something like:

```js
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import Page from './containers/Page';

import {emails} from './reducers';

export default class App extends PureComponent {
  static propTypes = {
    pollInterval: PropTypes.number
  };

  static defaultProps = {
    // default the `pollInterval` prop to 2 secs when not specified
    pollInterval: 2000
  };


  constructor(props) {
    super(props);

    this._store = createStore(
      emails,
      applyMiddleware(thunk)
    );
  }

  componentDidMount() {
    // Retrieve emails from server once we know DOM exists
    this._getUpdateEmails();

    // Set up long-polling to continuously get new data
    this._pollId = setInterval(
      () => this._getUpdateEmails(),
      this.props.pollInterval
    );
  }

  componentWillUnmount() {
    // Need to remember to clearInterval when the component gets
    // removed from the DOM, otherwise the interval will keep going
    // forever and leak memory
    clearInterval(this._pollId);
  }

  _getUpdateEmails() {
    return getEmails().then(emails => this.setState({emails}))
  }

  render() {
    return (
      <Provider store={this._store}>
        <Page />
      </Provider>
    );
  }
}
```
There is one last thing we need to update before we can move on to updating `<Page/>`: hydration. We are still calling `getEmails` inside `_getUpdateEmails` and then updating our `state`! We instead want to call the Redux action we created in [Step 14](../14-reduxy-actions-reducers) and let the action handle hydrating the store. First, lets import it and remove the import from `'./action-reducers'`:
```js
// App.js

//other imports
import {getEmails} from '../actions';
```
With that we are good to go right? Nope! We need to wrap the function in a call to `dispatch()` so our "action creators" know to listen for it. Since `dispatch()` is a property of the `store` we can access it and call it directly. We can do that by modifying `getUpdateEmails()` in the following way:
```js
//App.js

_getUpdateEmails() {
  return this._store.dispatch(getEmails());
}
```
With that last change our `<App/>` has been successfully refactored to create our `store` and properly hydrate the application.

Lets change focus and start the refactor of `<Page/>`

`<Page/>` being a "container" means that it will receive the necessary application state and actions via its `props` rather than maintaining them itself. `<Page/>` will still keep track of purely UI data in its `state`, such as `showForm` and `selectedEmail`. But, any reference to or update of `emails` as a property of `<Page/>`'s state will need to be removed, and instead reference `props`. But *how* do they become `props` of `<Page/>`? That is where `connect()` comes into play.

But first, lets remove `emails` from the state object, and instead add it to `<Page/>`'s `propTypes`. Additionally, since `pollInterval` is being handled by `<App/>`, we can remove that from proptypes as well.

```js
static propTypes = {
  emails: PropTypes.arraOf(EMAIL_PROP_TYPE),
}

state = {
    // Initialize selected email ID to -1, indicating nothing is selected.
    // When an email is selected in EmailList, this will be updated to
    // corresponding ID
    selectedEmailId: -1,
    // Initialize show form flag to false, indicating that it won't show.
    // When the new email button is clicked, it'll be set to `true`. It'll
    // be toggled false on form submission or cancel
    showForm: false
}
```
and in `render()`:
```js
let {emails} = this.props;
let {selectedEmailId, showForm} = this.state;
```

Now that's out of the way, lets get our component hydrated with `connect()`. In general so far, our components have looked like:
```js
export default class Page extends PureComponent {
```
However, we want to export the "container" or *connected* component so instead we need to export the connected version. To do that, lets simply declare our class as:
```js
class Page extends PureComponent {
```
and then at the bottom of `Page.js` add:
```js
export default connect()(App);
```
Now our default export is a container.

`connect()` exposes two functions as its first two arguments:
* [`mapStateToProps`]() : recieves `state` as a parameter
* [`mapDispatchToProps`]() : receives `dispatch` as a parameter

We utilize these to hydrate the component (`<Page/>`) passed into `connect()`. In order to do so we need to *map* our application's *state* to our component's *props*. So lets modify our default export to look like:

```js
export default connect(
  //_mapStateToProps
  (state) => ({emails: state})
)(App)
```

With that, `this.props.emails` is coming from our Redux **store**. Next we are going to address updating our `_handle` functions to stop referencing `state` and instead utilize actions via `dispatch`.

Similarly to `emails` now being hydrated via the component's props, our actions shoudld be as well. By passing our actions through `mapDispatchToProps` each "action" is wrapped in a call to `dispatch()`. Lets import `deleteEmail` and pass it through `mapDispatchToProps`.
```js
import {deleteEmail as deleteEmailAction} from '../actions';
```
Then, in our call to `connect()`:
```js
export default connect(
  //_mapStateToProps
  (state) => ({emails: state}),

  //_mapDispatchToProps
  (dispatch) => ({
    deleteEmail: () => dispatch(deleteEmailAction)
  })
```
In the above block, `deleteEmail()` is the prop being passed to `<Page/>` which is simply a dispatch wrapping the imported `deleteEmail()`. Since it is now a prop of our component, lets add it to our `propTypes`.
```js
static propTypes = {
    emails: PropTypes.arrayOf(EMAIL_PROP_TYPE),
    deleteEmail: PropTypes.func,
  };
```
Additionally, we can further optimize this call by taking advantage of a feature of `mapDispatchToProps()`. If an object made entirely of *action creators* is passed directly to `_mapDispatchToProps`, it will implicitly wrap each one in a call to`dispatch()`. This means we can rewrite the above as:
```js
export default connect(
  //_mapStateToProps
  (state) => ({emails: state}),

  //_mapDispatchToProps
  {
    deleteEmail: deleteEmailAction
  }
```
Now we can update our `_handleItemDelete()` to utilize the redux action coming through props, rather than our previous version. Addtionally, since we are using our Redux action, and `emails` is from our `store` we should no longer manually optimistically update our email state upon the action being completed. The `store` will handle that all on its own, so instead we can just focus on the UI behavior of resetting the `selectedEmail` to `-1`. So our `_handleItemDelete` should now look something like:

```js
_handleItemDelete(emailId) {
  this.props.deleteEmail(emailId)
  // Also reset `selectedEmailId` since we're deleting it
  this.setState({selectedEmailId: -1});
}
```

With this, our `deleteEmail()` action should properly go through `dispatch` to eventually update our store.

Within `<Page />` there are still many references to our previous version of "action-reducers" and `this.state.emails`. However, once these have all been replaced with Redux actions, the app should work just as it did before but now built on the scalability of Redux.


## Exercises

1. Replace the remaining actions in `Page.js` with the actions from `actions/index.js`
  - *hint*: Some of the `_handlers` just update `this.state.emails` upon success. In which case you can pass the action *itself* directly to the child component and remove the handler.
2. Delete action-reducers file (Woo!)

## Next

Enjoy your awesome redux app!

## Resources

- [Redux](http://redux.js.org/)
- [`redux-thunk`](https://github.com/gaearon/redux-thunk)
- [React Redux](https://github.com/reactjs/react-redux/)
- [Flux Standard Actions](https://github.com/acdlite/flux-standard-action)
