# Step 4 - Email View

The goal of this step is to build some interactivity into the app by responding to user interactions. [Handling events](https://facebook.github.io/react/docs/handling-events.html) within React elements is very similar to handling events on DOM elements. Event handlers will be passed instances of [`SyntheticEvent`](https://reactjs.org/docs/events.html), a cross-browser wrapper around the browser's native event. It has the same interface as the browser's native event (including` stopPropagation()` and `preventDefault()`) except the events work identically across all browsers!

Ultimately, we want to click on an email list item and have its details displayed in the email view.

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

## Jump Around

[Concepts](#concepts) | [Restart Setup](#restart-setup) | [Tasks](#tasks) | [Resources](#resources)

## Concepts

- Maintaining application and UI state
- Handling user interaction
- Passing event handlers down the component hierarchy
- Conditionally rendering components
- Rendering unencoded content

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
cp -r src/react/03-lists src/workshop
```

Ensure [`src/index.js`](../../index.js#L3) is still pointing to the `workshop` App:

```js
import App from './workshop/App';
```

Start the app:

```sh
# Yarn
yarn start

# ...or NPM
npm start
```

After the app is initially built, a new browser window should open up at [http://localhost:3000/](http://localhost:3000/), and you should be able to continue on with the tasks below.

## Tasks

### Phase 1 - Rendering unencoded content

Let's start with simply rendering an email withing the `<EmailView />`.

First, update the `EMAILS` constant in `App` to add `date` and `message` properties for each of the sample emails:

```js
const EMAILS = [
  {
    id: 1,
    from: 'alittle0@chronoengine.com',
    subject: 'Mauris lacinia sapien quis libero',
    date: '01/19/2016',
    message: 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.<br /><br />Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.<br /><br />Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
  },
  {
    id: 2,
    from: 'amurray1@mit.edu',
    subject: 'Mauris ullamcorper purus sit amet nulla',
    date: '11/18/2015',
    message: '<em><strong>Sed ante.</strong></em> Vivamus tortor. Duis mattis egestas metus.<br /><br />Aenean fermentum. 😀 Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.<br /><br />Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
  },
  {
    id: 3,
    from: 'dmccoy2@bluehost.com',
    subject: 'Suspendisse potenti',
    date: '04/12/2016',
    message: 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.<br /><br /><ol><li>Phasellus sit amet erat.</li><li>Nulla tempus.</li><li>Vivamus in felis eu sapien cursus vestibulum.</li></ol><br /><br />Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.<br /><br />Duis aliquam convallis nunc. Proin at <a href="http://www.benmvp.com">turpis a pede posuere</a> nonummy. Integer non velit.',
  },
  {
    id: 4,
    from: 'raustin3@hexun.com',
    subject: 'Maecenas rhoncus aliquam lacus',
    date: '07/30/2015',
    message: 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
  },
  {
    id: 5,
    from: 'rwagner4@instagram.com',
    subject: 'Pellentesque ultrices mattis odi',
    date: '04/26/2016',
    message: '<h3>In blandit ultrices enim.</h3> Lorem ipsum dolor sit amet, consectetuer adipiscing elit.<br /><br />Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.<br /><br />Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
  },
];
```

Notice that the `message` property of the emails contain HTML.

Next, in the `render()` of `App`, pass one of the emails in to `<EmailView />` (such as `EMAILS[2]`):

```js
export default class App extends Component {
  render() {
    return (
      <main className="app">
        <EmailList emails={EMAILS} />
        <EmailView email={EMAILS[2]} />
        <EmailForm />
      </main>
    );
  }
}
```

Finally in `EmailView`, add an `email` display a `subject`, `from`, `date` & `message`:

```js
import {EMAIL_PROP_TYPE} from './constants';

export default class EmailView extends Component {
  static propTypes = {
    email: EMAIL_PROP_TYPE.isRequired
  }

  render() {
    let {email: {subject, from, date, message}} = this.props;
    let rawMessage = {__html: message};

    return (
      <section className="email-view">
        <h1>{subject}</h1>
        <h2>From: <a href={`mailto:${from}`}>{from}</a></h2>
        <h3>{date}</h3>
        <div dangerouslySetInnerHTML={rawMessage} />
      </section>
    );
  }
}
```

By default, any content you put within an HTML element is automatically HTML-encoded by React. However, the `message` property of our email will have HTML within that we would like to be rendered instead of encoded. We use the [`dangerouslySetInnerHtml`](https://facebook.github.io/react/docs/dom-elements.html#dangerouslysetinnerhtml) attribute React adds to all HTML elements to sidestep the HTML encoding.

You should see the details of that email displayed in the app.


### Phase 2 - Maintaining State

As of now we've hard-coded the email that we're passing to `<EmailView />`. However, we want to ultimately pass the email corresponding to the email list item that was clicked. In order to that, we'll need to keep track of the currently selected email. In React, we use `state` for this.

Still in `App`, add a `selectedEmailId` property to `state` (to keep track of the currently selected email) and initialize it to the IDs of one of the emails:

```js
export default class App extends Component {
  // propTypes & defaultPropTypes

  state = {
    selectedEmailId: 4
  }

  // helper methods

  // render()
}
```

Next within `render()`, find an email within `EMAILS` that matches `state.selectedEmailId` and pass that selected email to the `<EmailView />` via the `email` prop we defined in Step 1:

```js
export default class App extends Component {
  // propTypes & defaultPropTypes

  state = {
    selectedEmailId: 4
  }

  // helper methods

  render() {
    let {selectedEmailId} = this.state;
    let selectedEmail = EMAILS.find(email => email.id === selectedEmailId);

    return (
      <main className="app">
        <EmailList emails={EMAILS} />
        <EmailView email={selectedEmail} />
        <EmailForm />
      </main>
    );
  }
}
```

Using the [React Developer Tools](https://github.com/facebook/react-devtools#installation), you should be able to change the value of `state.selectedEmailId` and see the corresponding email displayed in the email view. By changing the state we are mimicing what will happen when we click an email list item.


### Phase 3 - Passing down event handlers

Now let's hook up clicking an email list item for real. We've already got `state.selectedEmailId` connected to display the `<EmailView />` based on the email ID. We just need `App` to know when an email list item is clicked.

In React, encapsulation is important. `<App />` cannot and should not dig into the events of `<EmailListItem />`. The way that `<App />` can get know about when a `click` event happens in `<EmailListItem />` is by `<App />` passing a (callback) function **down** to its `<EmailListItem />` child components. This function can also be called an _event handler_. Then a `<EmailListItem />` can call that event handler whenever a `click` event happens. In our case, however, `<App />` doesn't have `<EmailListItem />` components as children. `<App />` has an `<EmailList />`, which in turn as `<EmailListItem />` components so we need to do a little extra.

Let's pretend that `EmailList` has already been fully implemented. We'd want it to expose an `onItemSelect` handler that is called with an email ID whenever an email list item is called. In `App`, add a handler for the `onItemSelect` handler in `EmailList` called `_handleItemSelect` that, for now, just logs the selected email ID to the console:

```js
export default class App extends Component {
  _handleItemSelect = (selectedEmailId) => {
    // logging the clicked email item ID
    console.log(selectedEmailId);
  }

  render() {
    return (
      <main className="app">
        <EmailList
          emails={EMAILS}
          onItemSelect={this._handleItemSelect}
        />
        <EmailView />
        <EmailForm />
      </main>
    );
  }
}
```

Now in theory, every time you click on one of the email list items, its ID should be logged to the console. But of course `EmailList` doesn't yet implement `onItemSelect`.

In `EmailList` add that `onItemSelect` event handler prop and pass it through as the (soon-to-be-implemented) `onSelect` prop to all of the `<EmailListItem />` components it renders:

```js
export default class EmailList extends Component {
  static propTypes = {
    emails: PropTypes.arrayOf(EMAIL_PROP_TYPE).isRequired,
    onItemSelect: PropTypes.func.isRequired
  }

  render() {
    let {emails, onItemSelect} = this.props;
    let emailComponents = emails.map(email =>
      <li key={email.id}>
        <EmailListItem email={email} onSelect={onItemSelect} />
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

We are pretending that `EmailListItem` is fully implemented. We'd want it to have an `onSelect` handler that will be called every time a email list item is called. We can just pass down the `props.onItemSelect` event handler we received from `<App />` to each `<EmailListItem />` for its `onSelect` prop.

In `EmailListItem`, add an `onClick` handler to the container `<div>` that will call a (newly added) `onSelect` prop:

```js
export default class EmailListItem extends Component {
  static propTypes = {
    email: EMAIL_PROP_TYPE.isRequired,
    onSelect: PropTypes.func
  }

  _handleClick = (e) => {
    let {email, onSelect} = this.props;

    if (onSelect) {
      e.stopPropagation();
      onSelect(email.id);
    }
  }

  render() {
    let {email: {from, subject}} = this.props;

    return (
      <div className="email-list-item" onClick={this._handleClick}>
        <span>{from}</span>
        <span>{subject}</span>
      </div>
    );
  }
}
```

This now makes `click` events that happen within a `<EmailListItem />` available to `EmailList` (with the email ID). And since `EmailList` passed along it's event handler, the `click` event is also available to `<App />`. Now clicking an email list item, really does log the email ID to the console.

But we want to do more than just log to the console; we want to display the email view with the details of the selected email. In order to do this, `App` needs to update `state.selectedEmailId` so that `<EmailView />` will get a new selected email. We can now change our console logging code in `_handleItemSelect` to update `state.selectedEmailId`:

```js
export default class App extends Component {
  // propTypes & defaultPropTypes

  state = {
    selectedEmailId: 4
  }

  _handleItemSelect = (selectedEmailId) => {
    // update state (so that the EmailView will show)
    this.setState({selectedEmailId});
  }

  render() {
    let {selectedEmailId} = this.state;
    let selectedEmail = EMAILS.find(email => email.id === selectedEmailId);
    let emailViewComponent;

    if (selectedEmail) {
      emailViewComponent = (
        <EmailView email={selectedEmail} />
      );
    }

    return (
      <main className="app">
        <EmailList
          emails={EMAILS}
          onItemSelect={this._handleItemSelect}
        />
        {emailViewComponent}
        <EmailForm />
      </main>
    );
  }
}
```

Whenever we call `setStatae`, React calls the `render()` method again for us so that the state that was just updated can be rendered in the UI. This is how interactivity in `App` is built in React:

1. Initialize `state` to the default values you would like to render
1. React calls `render()` to display the UI
1. At some point, a user interaction happens
1. We call `setState()` to update the state
1. React calls `render()` again so we can display UI with updated state
1. Do step 3 again and again and again for every user interaction

At this point, clicking an email list item, should display the `<EmailView />` component with the appropriate content.


### Phase 4 - Conditionally rendering components

In this last phase, we need to handle an edge case. We're not always going to have an email selected. When the app first loads we shouldn't have an email selected. And we may later want to support closing/hiding the email view.

Initialize `state.selectedEmailId` to be `-1` (signifying nothing is selected):

```js
export default class App extends Component {
  // propTypes & defaultPropTypes

  state = {
    // Initialize selected email ID to -1, indicating nothing is selected.
    // When an email is selected in EmailList, this will be updated to
    // corresponding ID
    selectedEmailId: -1
  }

  // helper methods

  // render()
}
```

You should get an error in `EmailView` saying that no `email` prop was specified. This is because there is no email with the id `-1` so `App` is passing `undefined` to `<EmailView />`. In `App` when there is no matching email, we shouldn't render the `<EmailView />` at all. We want to conditionally render the component:

```js
export default class App extends Component {
  // propTypes & defaultPropTypes

  state = {
    // Initialize selected email ID to -1, indicating nothing is selected.
    // When an email is selected in EmailList, this will be updated to
    // corresponding ID
    selectedEmailId: -1
  }

  // helper methods

  render() {
    let {selectedEmailId} = this.state;
    let selectedEmail = EMAILS.find(email => email.id === selectedEmailId);
    let emailViewComponent;

    // only render <EmailView /> if a matching email is found
    if (selectedEmail) {
      emailViewComponent = (
        <EmailView email={selectedEmail} />
      );
    }

    return (
      <main className="app">
        <EmailList
          emails={EMAILS}
          onItemSelect={this._handleItemSelect}
        />
        {emailViewComponent}
        <EmailForm />
      </main>
    );
  }
}
```

When you render `undefined` in React, it renders nothing. So by defaulting `emailViewComponent` to `undefined`, if no matching email is found, we'll just render nothing. However, if one _is_ found, we'll render the `<EmailView />`.

At this point, clicking different email items should display a different message in the email view. With those key parts of React development, we've been able to build interactivity into our app. If it feels like a lot of code, you're not alone. It feels very verbose having to explicitly pass everything around. However, the nice part is that as our app grows, the way we build interactivity remains the same. So we've learned this flow once and can keep applying it to more complex interactions.


## Exercises

- Add a close button to `EmailView` which hides `<EmailView />` in `App` (hint: add an `onClose` prop to `EmailView` that will be handled in `App` to update `this.state.selectedEmailId`)

## Next

Go to [Step 5 - Email Form](../05-email-form/).

## Resources

- [Handling Events](https://facebook.github.io/react/docs/handling-events.html)
- [Conditional Rendering](https://facebook.github.io/react/docs/conditional-rendering.html)
- [Lifting State Up](https://facebook.github.io/react/docs/lifting-state-up.html)
- [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html)
- [Dangerously Set innerHTML](https://facebook.github.io/react/docs/dom-elements.html#dangerouslysetinnerhtml)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
