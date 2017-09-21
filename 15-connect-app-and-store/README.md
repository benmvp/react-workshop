# Step 15 - Connect App and Store

In [step 14](../14-reduxy-action-reducers) we separated out our "action-reducers" into distinct "actions" and "reducers". As of now, these "actions" and "reducers" are not being consumed at any part of our app. We are still relying on the "action-creators" from before. Our goal in this step is to actually connect our [Redux](http://redux.js.org/)-y "reducers" and "actions" to our React application by hydrating the data via the [`store`](http://redux.js.org/docs/api/Store.html).

In order to actually connect the two, we will be using some helpers provided by [`react-redux`](https://github.com/reactjs/react-redux). Namely: [`<Provider/>`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store) and [`connect()`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options). The docs provide invaluable insight into their behavior, but in short terms:
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

First off Lets create a new folder [`src/containers/`](src/containers/) and within that folder add a new file [`Page.js`](src/containers/Page.js). Copy over the contents of `App.js` into the new file, and rename the class to `Page`, and also replace all instances of `app` in the markup's classNames with `page`. After this, your code should look something like:

```js
// Page.js

// import

export default class Page extends PureComponent {
  // props

  // initial state

  // helper methods

  render() {
    // vars

    return(
      <main className="page">
        <div className="page__page">
          <div className="page__list">
          // EmailList
          // EmailViewWrapper
          <button
            className="page__new-email"
            onClick={this._handleShowForm.bind(this)}
          >
            +
          </button>
          // EmailFormWrapper
        </div>
      </main>
    )
  }
}
```

We are going to do the same thing with our `App.css` as well. Create a file [`Page.css`](src/containers/Page.css) within `src/containers` and copy over the contents of `App.css` replacing all instances of `app` to `page`, then feel free to delete `App.css`.

Next we are going to do some ground work to set up the modified app structure. We want the `<Page />` to deal with:
* the layout
* handling user interactions
* UI state
* initial hydration of the App

The `<App/>` should concern itself with:
* setting up the `store`

All `<App />` needs to do render a `<Provider />`, and instantiate a `store`. To achieve this, `<App/>` only needs a call to `render()`. With this refactor `<App/>` will become the root of our application, only setting up the `store`, `<Provider/>`, and `<Page />` components. Which means consuming `pollInterval` and passing it down is not necessary in `<App/>` either. After removing unnecessary content the `<App/>` should look something like this:

```js
import React, {PureComponent} from 'react';

export default class App extends PureComponent {

  render() {
    return ()
  }
}
```
Now that we have separated out `<App/>` into two distinct components, lets start by setting up `<App/>` to create a `store` and have `<Provider/>` consume the store as the top level child. Then, we will return to `<Page/>` and complete it's refactor.

Next, lets create our `store`.

The only things we *need* when creating a store are: `createStore()` from `redux`, and our root reducer, which in this case is `emails` from [`reducers/index.js`]('.src/reducers/index.js'). Additionally, since we are using actions to make API calls which behave asynchronously, we also will need to import [`applyMiddleware()`](http://redux.js.org/docs/api/applyMiddleware.html) from `redux` and [`thunk`](https://github.com/gaearon/redux-thunk#whats-a-thunk) from `redux-thunk`.

First, lets import the necessary modules:
```js
// App.js

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import {emails} from './reducers';

export default class App extends PureComponent {
  // class methods
}
```
Next lets instantiate our store. We can simply define it as a const above the class declaration:
```js
// App.js

// imports

const store = createStore(
  emails,
  applyMiddleware(thunk)
);

export default class App extends PureComponent {
  // class methods
}
```
We have a `store`! Now, that we do, we can modify our `render()` function so it returns `<Provider />` as the top level component, with `<Page/>` as its child. Because we are now treating `<App/>` as the root of our application, `pollInterval` should be declared and passed into `<Page/>` here, and removed from the instantiation in [`index.js`](/src/index.js).

```js
// App.js

//previously declared imports

import Page from './containers/Page';

//store

export default class App extends PureComponent {

  render() {
    <Provider store={store}>
      <Page pollInterval={5000} />
    </Provider>
  }
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

const store = createStore(
  emails,
  applyMiddleware(thunk)
);

export default class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Page pollInterval={5000} />
      </Provider>
    );
  }
}
```
With that last change our `<App/>` has been successfully refactored to create our `store`.

Lets change focus and start the refactor of `<Page/>`

`<Page/>` being a "container" means that it will receive the necessary application state and actions via its `props` rather than maintaining them itself. `<Page/>` will still keep track of purely UI data in its `state`, such as `showForm` and `selectedEmail`. But, any reference to or update of `emails` as a property of `<Page/>`'s state will need to be removed, and instead reference `props`. But *how* do they become `props` of `<Page/>`? That is where `connect()` comes into play.

But first, lets remove `emails` from the state object, and instead add it to `<Page/>`'s `propTypes` and render:

```js
// Page.js

// imports

export default class Page extends PureComponent {

  static propTypes = {
    pollInterval: PropTypes.number,
    emails: PropTypes.arraOf(EMAIL_PROP_TYPE),
  }

  // default props

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

  // lifecycle methods

  // handlers

  // other helpers

  render() {
    let {emails} = this.props;
    let {selectedEmailId, showForm} = this.state;
  }
```
Now that's out of the way, lets get our component hydrated with `connect()`. In general so far, our components have looked like:
```js
export default class Page extends PureComponent {
```
However, we want to export the "container" or *connected* component so instead we need to export the connected version. To do that, lets simply declare our class and then at the bottom of `Page.js` export default our connected component:
```js
// Page.js

//imports

class Page extends PureComponent {

  // class methods

}

export default connect()(App);
```
Now our default export is a container.

`connect()` exposes two functions as its first two arguments:
* [`mapStateToProps`]() : recieves `state` as a parameter
* [`mapDispatchToProps`]() : receives `dispatch` as a parameter

We utilize these to hydrate the component (`<Page/>`) passed into `connect()`. In order to do so we need to *map* our application's *state* to our component's *props*. So lets modify our default export to look like:

```js
// Page.js

// imports

class Page extends PureComponent {

  // class methods

}

export default connect(
  //_mapStateToProps
  (state) => ({emails: state})
)(App)
```

With that, `this.props.emails` is coming from our Redux **store**. Next we are going to address updating our `_handle` functions to stop referencing `state` and instead utilize actions via `dispatch`.

Similarly to `emails` now being hydrated via the component's props, our actions shoudld be as well. By passing our actions through `mapDispatchToProps` each "action" is wrapped in a call to `dispatch()`. Lets import `deleteEmail` and pass it through `mapDispatchToProps`. Doing this will add `deleteEmail()` as a prop to the `<Page />`, so lets add it to our `propTypes` as well.
```js
// Page.js

// previous imports

import {deleteEmail as deleteEmailAction} from '../actions';

class Page extends PureComponent {

  static propTypes = {
    pollInterval: PropTypes.number,
    emails: PropTypes.arrayOf(EMAIL_PROP_TYPE),
    deleteEmail: PropTypes.func,
  };

  // default props

  // initial state

  // class methods

  // render
}

export default connect(
  //_mapStateToProps
  (state) => ({emails: state}),

  //_mapDispatchToProps
  (dispatch) => ({
    deleteEmail: () => dispatch(deleteEmailAction)
})
```

Additionally, we can further optimize this call by taking advantage of a feature of `mapDispatchToProps()`. If an object made entirely of *action creators* is passed directly to `_mapDispatchToProps`, it will implicitly wrap each one in a call to`dispatch()`. This means we can rewrite the above as:
```js
// Page.js

// imports

class Page extends PureComponent {

  // class methods

}

export default connect(
  //_mapStateToProps
  (state) => ({emails: state}),

  //_mapDispatchToProps
  {
    deleteEmail: deleteEmailAction
  }
);
```
Now we can update our `_handleItemDelete()` to utilize the redux action coming through props, rather than our previous version. Addtionally, since we are using our Redux action, and `emails` is from our `store` we should no longer manually optimistically update our email state upon the action being completed. The `store` will handle that all on its own, so instead we can just focus on the UI behavior of resetting the `selectedEmail` to `-1`. So our `_handleItemDelete` should now look something like:

```js

class Page extends PureComponent {

  // props

  // initial state

  // lifecycle methods

  _handleItemDelete(emailId) {
    this.props.deleteEmail(emailId)
    // Also reset `selectedEmailId` since we're deleting it
    this.setState({selectedEmailId: -1});
  }

  // helpers

  // render
}
```

With this, our `deleteEmail()` action should properly go through `dispatch` to eventually update our store.

As an optional minor optimization, some of the `_handlers`'s `.then()` just update `this.state.emails` upon success. If no other side effect occurs in the handler, you can pass the action *itself* directly to the child component and remove the handler altogether. For example with the `markUnread()` action we can delete `_handleMarkUnread()` and pass the action directly to the components which consume it, rather than the handler:

```js
class Page extends PureComponent {

  // props

  // initial state

  // lifecycle methods

  // delete this handler
  // _handleMarkUnread() {
  //   markUnread();
  // }

  // helpers

  render() {
    // var declarations

    return (
      <main className="page">
        <div className="page__page">
          <div className="page__list">
            <EmailList
              // other props

              // We can pass markUnread() directly into the handler
              onItemMarkUnread={this.props.markUnread}
            />

            // components

          </div>
        </div>
      </main>
    )
  }
}
```

Within `<Page />` there are still many references to our previous version of "action-reducers" and `this.state.emails`. However, once these have all been replaced with Redux actions, the app should work just as it did before but now built on the scalability of Redux.


## Exercises

1. Replace the remaining "action-reducers":`getEmails()`, `addEmail()`, `markRead()`, `markUnread()` in `Page.js` with the actions from `actions/index.js`
2. Delete action-reducers file (Woo!)

## Next

Enjoy your awesome redux app!

## Resources

- [Redux](http://redux.js.org/)
- [Store](http://redux.js.org/docs/api/Store.html)
- [`mapDispatchToProps`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)
- [`mapStateToProps`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)
- [React Redux](https://github.com/reactjs/react-redux/)
