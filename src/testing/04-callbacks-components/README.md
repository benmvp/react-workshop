# Step 4 - Callbacks (components)

The goal of this step is continue the learnings from [Step 3](../03-callbacks-markup/) on testing callbacks, but focus on testing events that come from child components. The verifications are the same; the difference is in how the event is triggered within a test.

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

## Jump Around

[Concepts](#concepts) | [Restart Setup](#restart-setup) | [Tasks](#tasks) | [Exercises](#exercises) | [Resources](#resources)

## Concepts

- Simulating child component events
- Using mock functions
- Verifying prop callback functions

## Restart Setup

If you didn't successfully complete the previous step, you can jump right in by copying the step.

Complete the [setup instructions](../00-begin) if you have not yet followed them.

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
cp -r src/testing/03-callbacks-markup src/workshop
```

Ensure [`src/index.js`](../../index.js#L3) is still pointing to the `workshop` App:

```js
import App from './workshop/App';
```

Run the tests:

```sh
# Yarn
yarn test

# ...or NPM
npm test
```

Jest will start up in "watch mode", run the existing tests, and then wait for tests to change so that it can run again automatically.

## Tasks

Let's finally write tests for the `Page` container component. It has very little DOM, but acts as a coordinator for all of the other child components within it. It operates exclusively off of event handlers for its child components.

Create [`containers/Page.test.js`](containers/Page.test.js) and let's create some tests for the simple action event handlers it receives:

```js
import React from 'react';
import {mount} from 'enzyme';
import Page from './Page';
import EmailList from '../components/EmailList';
import EmailView from '../components/EmailView';
import EmailForm from '../components/EmailForm';
import {EMAILS} from '../__fixtures__';

const getComponent = (props = {}) => (
  mount(
    <Page
      emails={EMAILS}
      addEmail={jest.fn()}
      getEmails={jest.fn()}
      deleteEmail={jest.fn()}
      markRead={jest.fn()}
      markUnread={jest.fn()}
      {...props}
    />
  )
);

describe('simple actions', () => {

});
```

Let's start by testing the `markUnRead` callback prop that should be called when the "Mark Unread" button is clicked in the `<EmailView />`:

```js
describe('simple actions', () => {

  describe('markUnread', () => {
    it('calls `markUnread` action when Mark Unread is clicked in email view', () => {
      const markUnread = jest.fn();
      const component = getComponent({markUnread});
    });
  });

});
```

You'll noticed that the test **fails**:

```sh
  ● simple actions › markUnread › calls `markUnread` action when Mark Unread is clicked in email view

  Invariant Violation: Could not find "store"in either the context or props of "Connect(Page)". Either wrap the root component in a <Provider>, or explicitly pass "store" as a prop to "Connect(Page)".
```

The `connect()` function within [`Page.js`](containers/Page.js) is expecting the Redux store to be in the `context`. We use `<Provider>` in [`App.js`](App.js) to provide the Redux store when our app runs, but we don't want to do it when we're running our tests. It's way too much to create a fake store, fake reducers & fake actions, just to test our container component. But for the purposes of the test, we don't _really_ need Redux at all; we can test `Page` in isolation like we've been testing our other components.

So we'll first need to make `Page` more easily testable, by separating the Redux `connect()` from the component itself.

First create [`containers/ConnectedPage.js`](containers/ConnectedPage.js) and move the Redux `connect()` logic there:

```js
import {connect} from 'react-redux';
import Page from './Page';

import {
  getEmails as getEmailsAction,
  addEmail as addEmailAction,
  deleteEmail as deleteEmailAction,
  markRead as markReadAction,
  markUnread as markUnreadAction
} from '../actions';

export default connect(
  //_mapStateToProps
  state => ({emails: state}),
  //_mapDispatchToProps
  {
    getEmails: getEmailsAction,
    addEmail: addEmailAction,
    deleteEmail: deleteEmailAction,
    markRead: markReadAction,
    markUnread: markUnreadAction
  }
)(Page);
```

Now [`containers/Page.js`](containers/Page.js) can export the `Page` class without any Redux:

```js
export default class Page extends Component {

}
```

Lastly, we need to update [`App.js`](App.js) to point to `ConnectedPage`:

```js
import React, {Component} from 'react';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import ConnectedPage from './containers/ConnectedPage';

import {emails} from './reducers';

const store = createStore(emails, applyMiddleware(thunk));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedPage pollInterval={5000} />
      </Provider>
    );
  }
}
```

Now that our test is no longer failing, we can add the assertions:

```js
describe('simple actions', () => {
  describe('markUnread', () => {
    it('calls `markUnread` action when Mark Unread is clicked in email view', () => {
      const markUnread = jest.fn();
      const component = getComponent({markUnread});
      const emailList = component.find(EmailList);
      const emailToSelect = EMAILS[1];

      // simulate an email being selected
      emailList.prop('onItemSelect')(emailToSelect.id);

      // since we're not simulating a DOM event, we need to tell enzyme
      // to re-render
      component.update();

      const emailView = component.find(EmailView);

      // simulate the mark unread button being clicked
      emailView.prop('onMarkUnread')();

      // verify markUnread action was called
      expect(markUnread).toHaveBeenCalledTimes(1);
      expect(markUnread).toHaveBeenLastCalledWith(emailToSelect.id);
    });
  });
});
```

We simulate events, not my simulating DOM actions, but by invoking the prop functions of child components. We select an item, but calling `onItemSelect` on the `<EmailList />` child component. From the standpoint of the `Page` unit test, we don't care how `<EmailList />` ends up causing the email list item to be selected. The interface for item selection between `Page` and its child `<EmailList />` is the `onItemSelect` prop.

Similarly, we simulate clicking the "Mark Unread" button by just invoking the `onMarkUnread` prop on the `<EmailView />` child component. This calls the `markUnread` action with the selected email ID. This is ultimately what we verify.

We can do the same for the `onMarkRead` callback prop as well:

```js
describe('simple actions', () => {
  describe('markUnread', () => {
    // ...
  });

  describe('markRead', () => {
    it('calls `markRead` action when Mark Read is clicked in email view', () => {
      const markRead = jest.fn();
      const component = getComponent({markRead});
      const emailList = component.find(EmailList);
      const emailToSelect = EMAILS[0];

      // simulate an email being selected
      emailList.prop('onItemSelect')(emailToSelect.id);

      // since we're not simulating a DOM event, we need to tell enzyme
      // to re-render
      component.update();

      const emailView = component.find(EmailView);

      // simulate the mark read button being clicked
      emailView.prop('onMarkRead')();

      // verify markRead action was called
      // (was called once before when selecting the item)
      expect(markRead).toHaveBeenCalledTimes(2);
      expect(markRead).toHaveBeenLastCalledWith(emailToSelect.id);
    });
  });
});
```

The last simple action prop is the `getEmails` prop that gets initially called on component mount, but then on an interval passed on the `pollInterval` prop:

```js
describe('simple actions', () => {
  describe('markUnread', () => {
    // ...
  });

  describe('markRead', () => {
    // ...
  });

  describe('getEmails', () => {
    it('calls `getEmails` on component mount', () => {
      const getEmails = jest.fn();
      const component = getComponent({getEmails});
  
      expect(getEmails).toHaveBeenCalledTimes(1);
    });
  });
});
```

We verify that `getEmails` is called on component mount.

Next verify that `getEmails` gets called every 2 seconds (the `pollInterval` default) after mount:

```js
describe('getEmails', () => {
  it('calls `getEmails` on component mount', () => {
    const getEmails = jest.fn();
    const component = getComponent({getEmails});

    expect(getEmails).toHaveBeenCalledTimes(1);
  });

  it('calls `getEmails` every 2 seconds after component mount by default', () => {
    jest.useFakeTimers();

    const getEmails = jest.fn();
    const component = getComponent({getEmails});

    // gets called immediately on component mount
    expect(getEmails).toHaveBeenCalledTimes(1);

    // fast forward 2 seconds until after the first interval
    jest.runTimersToTime(2000);
    
    // now should've been called again after 2 seconds
    expect(getEmails).toHaveBeenCalledTimes(2);     
    
    // fast forward another 2 seconds until after the first interval
    jest.runTimersToTime(2000);
    
    // now should've been called again after 2 seconds
    expect(getEmails).toHaveBeenCalledTimes(3);  
  });
}):
```

We make use of [`jest.useFakeTimers()`](https://jestjs.io/docs/en/jest-object#jestusefaketimers) & [`jest.runTimersToTime()`](https://jestjs.io/docs/en/jest-object#jestadvancetimersbytimemstorun) to simulate time advancing in our test without actually having to wait the real time!

## Exercises

- Add remaining `getEmails` tests
  * calls `getEmails` every `X` seconds after component mount based on passing in `pollInterval`
  * stops polling after component unmount (hint use [Enzyme `.unmount()`](http://airbnb.io/enzyme/docs/api/ReactWrapper/unmount.html))
- Any missed exercises from [Step 3](../03-callbacks-markup)! 😉

## Next

Go to [Step 5 - UI State](../05-ui-state/).

## Resources

- [Timer mocks](https://jestjs.io/docs/en/timer-mocks)
- [Mock Functions in Jest](https://jestjs.io/docs/en/mock-function-api)
- [Enzyme `.prop()`](http://airbnb.io/enzyme/docs/api/ReactWrapper/prop.html)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
