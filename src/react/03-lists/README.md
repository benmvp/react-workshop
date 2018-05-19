# Step 3 - Lists

The goal of this step is to practice transforming lists of data into lists of components which can be included in JSX. As a result, we'll convert the `EmailList` component from statically rendering the five `EmailListItem` components to dynamically rendering an arbitrary list of `EmailListItem` components. We'll also make use of more advanced [prop types](https://facebook.github.io/react/docs/typechecking-with-proptypes.html).

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

## Jump Around

[Concepts](#concepts) | [Restart Setup](#restart-setup) | [Tasks](#tasks) | [Resources](#resources)

## Concepts

- Rendering dynamic lists of data
- Handling special `key` prop

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
cp -r src/react/02-components src/workshop
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

The way that you dynamically render multiple elements in React is by putting those elements in an array and rendering the array of components. This differs from traditional template languages where there is some looping construct (such as [`ng-repeat`](https://docs.angularjs.org/api/ng/directive/ngRepeat)) and you specify the loop item to display.

In [`EmailList.js`](components/EmailList.js), pull out the raw data that makes up the three `EmailListItem` components into an `EMAILS` `const` array. Use [`Array.prototype.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) to convert the array of data into an array of components:

```js
const EMAILS = [
  {
    id: 1,
    from: 'alittle0@chronoengine.com',
    subject: 'Mauris lacinia sapien quis libero'
  },
  {
    id: 2,
    from: 'amurray1@mit.edu',
    subject: 'Mauris ullamcorper purus sit amet nulla'
  },
  {
    id: 3,
    from: 'dmccoy2@bluehost.com',
    subject: 'Suspendisse potenti'
  },
  {
    id: 4,
    from: 'raustin3@hexun.com',
    subject: 'Maecenas rhoncus aliquam lacus'
  },
  {
    id: 5,
    from: 'rwagner4@instagram.com',
    subject: 'Pellentesque ultrices mattis odi'
  }
];

export default class EmailList extends Component {
  render() {
    let emailComponents = EMAILS.map((email) =>
      <li key={email.id}>
        <EmailListItem from={email.from} subject={email.subject} />
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

Be sure to include the [`key` prop](https://facebook.github.io/react/docs/lists-and-keys.html) on the `<li>` elements.

Update `EmailListItem` to take a single `email` prop instead of individual props for each email property (don't forget the `propTypes`!):

```js
export default class EmailListItem extends Component {
  static propTypes = {
    email: PropTypes.shape({
      from: PropTypes.string.isRequired,
      subject: PropTypes.string.isRequired
    }).isRequired
  };

  render() {
    let {email: {from, subject}} = this.props;

    return (
      <div className="email-list-item">
        <span>{from}</span>
        <span>{subject}</span>
      </div>
    );
  }
}
```

The `EmailList` component will need to be updated to pass the `email` prop to `EmailListItem`:

```js
export default class EmailList extends Component {
  render() {
    let emailComponents = EMAILS.map((email) =>
      <li key={email.id}>
        <EmailListItem email={email} />
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

We're starting to make something that visually looks like a list of emails, but it currently isn't styled at all. The app already comes with component CSS files so we just need to associate them with their corresponding JS files so that the elements will be styled. Simply `import` the component CSS files in [`EmailList.js`](components/EmailList.js) and [`EmailListItem.js`](components/EmailListItem.js):

EmailList.js
```js
import React, {Component} from 'react'
import PropTypes from 'prop-types'

import EmailListItem from './EmailListItem'
import {EMAIL_PROP_TYPE} from './constants'

// import component CSS file
import './EmailList.css'

export default class EmailList extends Component {
  ...
```

EmailListItem
```js
import React, {Component} from 'react';

import {EMAIL_PROP_TYPE} from './constants';

// import component CSS file
import './EmailListItem.css';

export default class EmailListItem extends Component {
  ...
```

## Exercises

- Move the `EMAILS` out of `EmailList` into the top-level `App`
- Pass `EMAILS` in `App` as the `emails` prop to `<EmailList>`
- Declare a new `emails` prop type using `PropTypes.arrayOf()` in `EmailList` (you can share common prop types with `EmailListItem` in a [`components/constants.js`](components/constants.js) file)
- Use `this.props.emails` (instead of `EMAILS`) in the `map()` within `render()` of `EmailList`
- Import component CSS for [`App.js`](App.js), [`EmailForm.js`](components/EmailForm.js) and [`EmailView.js`](components/EmailView.js)

## Next

Go to [Step 4 - Email View](../04-email-view/).

## Resources

- [Lists and Keys](https://facebook.github.io/react/docs/lists-and-keys.html)
- [`Array.prototype.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
