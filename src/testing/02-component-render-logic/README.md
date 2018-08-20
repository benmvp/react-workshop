# Step 2 - Child component render logic

In [Step 1](../01-markup-render-logic/) we learned how to test logic for rendering HTML markup. The goal of this step is to test logic for rendering child components.

If you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

## Jump Around

[Concepts](#concepts) | [Restart Setup](#restart-setup) | [Tasks](#tasks) | [Exercises](#exercises) | [Resources](#resources)

## Concepts

- Asserting the props of child components

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
cp -r src/testing/01-markup-render-logic src/workshop
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

The `EmailList` component essentially just renders a `<EmailListItem />` components for each corresponding email in its `emails` prop. Create a test file for `EmailList` at [`components/EmailList.test.js`](components/EmailList.test.js) to verify that logic and that the correct `<EmailListItem />` has its `isSelected` prop set to `true` based on `EmailList`'s `selectedEmailId` prop:

```js
test('creates an EmailListItem for each email', () => {
  
});

test('passes isSelected=true for matching selectedEmailId prop', () => {
  
});
```

Render an `<EmailList />` for the first test:

```js
import React from 'react';
import {mount} from 'enzyme';
import EmailList from './EmailList';
import EmailListItem from './EmailListItem';
import {DEFAULT_EMAIL, READ_EMAIL} from '../__fixtures__';

const EMAILS = [
  DEFAULT_EMAIL,
  READ_EMAIL,
];

test('creates an EmailListItem for each email', () => {
  const component = mount(<EmailList emails={EMAILS} />);

});
```

_NOTE: Once again, we'll cleanup the prop type warnings for `onItemDelete`, `onItemSelect` & `onItemMarkUnread` in [Step 3 - Callbacks](../03-callbacks/) when we learn to test callback handlers._

Jest has a feature called [snapshot testing](https://jestjs.io/docs/en/snapshot-testing) that makes it really easy to write assertions:

```js
test('creates an EmailListItem for each email', () => {
  const component = mount(<EmailList emails={EMAILS} />);

  expect(component).toMatchSnapshot();
});
```

Easy-peasy right? This creates a `.snap` snapshot file, which has a JSON representation of the `<EmailList />`. And every time the tests run it'll compare against the snapshot file.

However, the ease of writing the test comes at a cost for maintaining the test. For one, the snapshot for the one test is over 100 lines. It's not very easy to read. But it's very easy for the test to fail when changing unrelated things. Try:

- Adding a new prop to `DEFAULT_EMAIL`
- Adding or changing the `className` on the `<ul>` or `<li>`
- Changing markup within `EmailListItem`

Each one of these cause the test the fail, when all we really are trying to verify is that a corresponding `<EmailListItem />` is created for every email in the `emails` prop array. Jest allows us to update the snapshot when it fails, but with multiple developers the snapshots will get auto-adopted without really verifying if the failure was real or just a false-positive.

Instead, manually verify the specific things we care about:

```js
test('creates an EmailListItem for each email', () => {
  const component = mount(<EmailList emails={EMAILS} />);
  const emailListItems = component.find(EmailListItem);

  // verify that equal number of EmailListItem components were rendered
  expect(emailListItems).toHaveLength(EMAILS.length);

  // verify that each EmailListItem has the correct props
  emailListItems.forEach((emailListItem, index) => {
    expect(emailListItem).toHaveProp('email', EMAILS[index]);
  });
});
```

Instead of using [`.find()`](http://airbnb.io/enzyme/docs/api/ReactWrapper/find.html) to find a HTML element, we search by the `EmailListItem` class reference. After a sanity check to make sure the length of found components matches the length of the `emails` prop (using Jest's [`.toHaveLength()`](https://jestjs.io/docs/en/expect#tohavelengthnumber)), we iterate over each component verifying that it has the expected props with [`.toHaveProp()`](https://github.com/FormidableLabs/enzyme-matchers#tohaveprop) for [`jest-enzyme`](https://github.com/FormidableLabs/enzyme-matchers).

## Exercises

- Finish the second test verifying that `<EmailListItem />` receives `isSelected=true` for a matching `selectedEmailId` prop 
- Move `EMAILS` constant into [`__fixtures__/index.js`](__fixtures__/index.js)

## Next

Go to [Step 3 - Callbacks](../03-callbacks/).

## Resources

- [Snapshot testing](https://jestjs.io/docs/en/snapshot-testing)
- [Jest matchers](https://jestjs.io/docs/en/expect#tohavelengthnumber)
- [Jest assertion matchers for Enzyme](https://github.com/FormidableLabs/enzyme-matchers)
- [Enzyme support for selecting by React Component Constructor](http://airbnb.io/enzyme/docs/api/selector.html#3-a-react-component-constructor)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
