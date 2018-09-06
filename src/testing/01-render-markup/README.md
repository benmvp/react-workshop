# Step 1 - Render (markup)

The goal of this step is to test the `render()` methods of components, focusing on any conditional logic used to render the its markup. We _can_ test static markup, but it's of very little benefit.

If you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

## Jump Around

[Concepts](#concepts) | [Tasks](#tasks) | [Exercises](#exercises) | [Resources](#resources)

## Concepts

- Rendering components for testing
- Finding HTML elements
- Asserting presence of HTML elements and CSS classes
- Debugging rendered components

## Tasks

We will be using [Jest](https://jestjs.io/), [Enzyme](http://airbnb.io/enzyme/), and [`jest-enzyme`](https://github.com/FormidableLabs/enzyme-matchers) to test our components.

Let's start with Jest. Create a test file for `EmailListItem` at [`components/EmailListItem.test.js`](components/EmailListItem.test.js) and let's create a dummy test:

```js
const sum = (a, b) => a + b;

test('adds 1 plus 2 tp equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

Now, in a console window, run the following command:

```sh
# Yarn
yarn test

# ...or NPM
npm test
```

Jest will start up in "watch mode", looking for test files that have been added since the last git commit. But since our `workshop` folder is git-ignored, Jest will tell you that no tests were found:

```sh
No tests found related to files changd since last commit.
Press `a` to run all tests, or run Jest with `--watchAll`.
```

So in the interactive terminal type the `p` key for `filter by filename regex pattern`. Then enter `/workshop` as the pattern. Jest should now run our test (which should) pass, and then wait for tests to change so that it can run again automatically.

Now, update the test to make it fail, by changing the expected value to `2`:

```js
const sum = (a, b) => a + b;

test('adds 1 plus 2 tp equal 3', () => {
  expect(sum(1, 2)).toBe(2);
});
```

Jest should re-run automatically, and the test should fail with an output like:

```sh
 FAIL  src/testing/01-rendering-logic/components/EmailListItem.test.js
  ● adds 1 plus 2 tp equal 3

    expect(received).toBe(expected)

    Expected value to be (using ===):
      2
    Received:
      3
```

_For more on Jest, check out [Using Matchers](https://jestjs.io/docs/en/using-matchers) in Jest._

Now let's start testing the `EmailListItem` component. First peruse the [`components/EmailListItem.js`](components/EmailListItem.js) file, looking at the `propTypes` & `render()` of `EmailListItem`. We can see that it conditionally adds classes to the container `<div />` based upon the `isSelected` prop and the `read` property of the `email` prop. It also conditionally renders the "Mark unread" button based on the same two props. This is the logic we want to test.

Let's replace the file contents and create a test skeleton of all the test cases:

```js
describe('prop rendering', () => {
  describe('isSelected', () => {
    it('includes "email-list-item--selected" class on container when `isSelected` prop is true', () => {

    });


    it('excludes "email-list-item--selected" class on container when `isSelected` prop is false', () => {

    });
  });

  describe('email', () => {
    it('includes "email-list-item--unread" class on container & hides "mark unread" button when `email.read` property is false', () => {

    });


    it('excludes "email-list-item--unread" class on container & hides "mark unread" button when `email.read` property is true', () => {

    });

    it('includes "mark unread" button when both `email.read` property and `isSelected` prop are true', () => {

    });
  });
});
```

We want to write assertions to verify each one of these test cases. Let's start on the first test and render the component:

```js
import React from 'react';
import {mount} from 'enzyme';
import EmailListItem from './EmailListItem';


describe('prop rendering', () => {
  describe('isSelected', () => {
    it('includes "email-list-item--selected" class on container when `isSelected` prop is true', () => {
      const component = mount(<EmailListItem />);
    });

    it('excludes "email-list-item--selected" class on container when `isSelected` prop is false', () => {
      
    });
  });
});
```

[Enzyme](http://airbnb.io/enzyme/) lets us render React components without the need of a browser! It has a [`mount()`](http://airbnb.io/enzyme/docs/api/mount.html) that provides full DOM rendering.

The test should fail because we're not providing it's required props: `email`, `onDelete`, and `onMarkUnread`. You should see console errors for each missing prop. The missing `email` data is the real cause for the failure, so let's pass a dummy email:

```js
const DEFAULT_EMAIL = {
  id: 2,
  date: '11/18/2018',
  from: 'amurray1@mit.edu',
  to: 'i@me.com',
  read: false,
  subject: 'Mauris ullamcorper purus sit amet nulla.',
  message: '<em><strong>Sed ante.</strong></em> Vivamus tortor. Duis mattis egestas metus.<br /><br />Aenean fermentum. 😀 Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.<br /><br />Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
};

describe('prop rendering', () => {
  describe('isSelected', () => {
    it('includes "email-list-item--selected" class on container when `isSelected` prop is true', () => {
      const component = mount(<EmailListItem email={DEFAULT_EMAIL} />);
    });

    it('excludes "email-list-item--selected" class on container when `isSelected` prop is false', () => {
      
    });
  });
});
```

_NOTE: We'll cleanup the prop type warnings for `onDelete` & `onMarkUnread` in [Step 3 - Callbacks (markup)](../03-callbacks-markup/) when we learn to test callback handlers._

The object we get back from `mount()` is an Enzyme wrapper, which has a jQuery-like interface for inspecting the component. For now, let's log out so debug information:

```js
describe('prop rendering', () => {
  describe('isSelected', () => {
    it('includes "email-list-item--selected" class on container when `isSelected` prop is true', () => {
      const component = mount(<EmailListItem email={DEFAULT_EMAIL} />);

      console.log(component.html());
      console.log(component.debug());
    });

    it('excludes "email-list-item--selected" class on container when `isSelected` prop is false', () => {
      
    });
  });
});
```

Next, we need to get a reference to the container element in order to make assertions. But we don't want to search for it by it's class name `email-list-item` because that's used for styling purposes. Instead let's add a separate `data-test` attribute to the container `<div />` in [`components/EmailListItem.js`](components/EmailListItem.js):

```js
<div className={className} onClick={this._handleClick} data-test="email-list-item">
```

Now using enzyme we can search for the container element:

```js
describe('prop rendering', () => {
  describe('isSelected', () => {
    it('includes "email-list-item--selected" class on container when `isSelected` prop is true', () => {
      const component = mount(<EmailListItem email={DEFAULT_EMAIL} isSelected={true} />);
      const container = component.find('[data-test="email-list-item"]');
    });

    it('excludes "email-list-item--selected" class on container when `isSelected` prop is false', () => {
      
    });
  });
});
```

Now using the `.hasClass()` method on an enzyme wrapper, we can add an assertion for the class name's presence:

```js
describe('prop rendering', () => {
  describe('isSelected', () => {
    it('includes "email-list-item--selected" class on container when `isSelected` prop is true', () => {
      const component = mount(<EmailListItem email={DEFAULT_EMAIL} isSelected={true} />);
      const container = component.find('[data-test="email-list-item"]');

      expect(container.hasClass('email-list-item--selected')).toBe(true);
    });

    it('excludes "email-list-item--selected" class on container when `isSelected` prop is false', () => {
      
    });
  });
});
```

The test should pass, but what happens if you had mistyped the class name incorrectly and had put `'email-list-item--select'`? The failure would look something like:

```sh
● prop rendering › isSelected › includes "email-list-item--selected" class on container when `isSelected` prop is true

  expect(received).toBe(expected)

  Expected value to be (using ===):
    true
  Received:
    false
```

The failure message isn't all that helpful. Let's leverage the additional `.toHaveClassName()` matcher from [`jest-enzyme`](https://github.com/FormidableLabs/enzyme-matchers):

```js
describe('prop rendering', () => {
  describe('isSelected', () => {
    it('includes "email-list-item--selected" class on container when `isSelected` prop is true', () => {
      const component = mount(<EmailListItem email={DEFAULT_EMAIL} isSelected={true} />);
      const container = component.find('[data-test="email-list-item"]');

      expect(container).toHaveClassName('email-list-item--select'));
    });

    it('excludes "email-list-item--selected" class on container when `isSelected` prop is false', () => {
      
    });
  });
});
```

The test still fails, but the failure message is far more helpful:

```sh
● prop rendering › isSelected › includes "email-list-item--selected" class on container when `isSelected` prop is true

  Expected <div> to have className of ".email-list-item--select" but instead found "email-list-item email-list-item--selected email-list-item--unread"
  Found node output: <div class="email-list-item email-list-item--selected email-list-item--unread" data-test="email-list-item"><span class="email-list-item__from">amurray1@mit.edu</span><span class="email-list-item__subject">Mauris ullamcorper purus sit amet nulla.</span><span class="email-list-item__status"><button>Delete</button></span></div>
```

Fix the test to be passing again:

```js
describe('prop rendering', () => {
  describe('isSelected', () => {
    it('includes "email-list-item--selected" class on container when `isSelected` prop is true', () => {
      const component = mount(<EmailListItem email={DEFAULT_EMAIL} isSelected={true} />);
      const container = component.find('[data-test="email-list-item"]');

      expect(container).toHaveClassName('email-list-item--selected');
    });

    it('excludes "email-list-item--selected" class on container when `isSelected` prop is false', () => {
      
    });
  });
});
```

For the next test, we want to verify that the `"email-list-item--selected"` class is not included when `isSelected` is false (the default):

```js
describe('isSelected', () => {
  it('includes "email-list-item--selected" class on container when `isSelected` prop is true', () => {
    const component = mount(<EmailListItem email={DEFAULT_EMAIL} isSelected={true} />);
    const container = component.find('[data-test="email-list-item"]');

    expect(container).toHaveClassName('email-list-item--selected');
  });


  it('excludes "email-list-item--selected" class on container when `isSelected` prop is false', () => {
    const component = mount(<EmailListItem email={DEFAULT_EMAIL} />);
    const container = component.find('[data-test="email-list-item"]');

    expect(container).not.toHaveClassName('email-list-item--selected');
  });
});
```

Here we use Jest's [`.not`](https://jestjs.io/docs/en/expect#not) to test the opposite of a matcher.

Now let's do the first test against the `read` property of the `email` prop:

```js
describe('email', () => {
  it('includes "email-list-item--unread" class on container & hides "mark unread" button when `email.read` property is false', () => {
    const component = mount(<EmailListItem email={DEFAULT_EMAIL} />);
    const container = component.find('[data-test="email-list-item"]');
    const markUnreadButton = component.find('[data-test="email-list-item-mark-unread"]');

    expect(container).toHaveClassName('email-list-item--unread');
    expect(markUnreadButton).not.toExist();
  });

  it('excludes "email-list-item--unread" class on container & hides "mark unread" button when `email.read` property is true', () => {

  });

  it('includes mark "unread button" when both `email.read` property and `isSelected` prop are true', () => {

  });
});
```

We use the `.toExist()` matcher from [`jest-enzyme`](https://github.com/FormidableLabs/enzyme-matchers) to verify that the "mark unread" button is not rendered. And in order to be able to find it we need to add the `data-test="email-list-item-mark-unread"` attribute to the `<button />`:

```js
if (isSelected && read) {
  markUnreadButton = (<button onClick={onMarkUnread} data-test="email-list-item-mark-unread">Mark unread</button>);
}
```

For the next test we need to have the `email.read` property to be true, so we need to pass in a new dummy email for the `email` prop:

```js
const READ_EMAIL = {
  ...DEFAULT_EMAIL,
  id: 23,
  read: true,
};
```

Now let's write the test:

```js
describe('email', () => {
    it('includes "email-list-item--unread" class on container & hides "mark unread" button when `email.read` property is false', () => {
      const component = mount(<EmailListItem email={DEFAULT_EMAIL} />);
      const container = component.find('[data-test="email-list-item"]');
      const markUnreadButton = component.find('[data-test="email-list-item-mark-unread"]');

      expect(container).toHaveClassName('email-list-item--unread');
      expect(markUnreadButton).not.toExist();
    });


    it('excludes "email-list-item--unread" class on container & hides "mark unread" button when `email.read` property is true', () => {
      const component = mount(<EmailListItem email={READ_EMAIL} />);
      const container = component.find('[data-test="email-list-item"]');
      const markUnreadButton = component.find('[data-test="email-list-item-mark-unread"]');

      expect(container).not.toHaveClassName('email-list-item--unread');
      expect(markUnreadButton).not.toExist();
    });

    it('includes "mark unread" button when both `email.read` property and `isSelected` prop are true', () => {
      
    });
  });
```

Let's add the final test for when both the `email.read` property and `isSelected` prop are `true`:

```js
describe('email', () => {
  it('includes "email-list-item--unread" class on container & hides "mark unread" button when `email.read` property is false', () => {
    const component = mount(<EmailListItem email={DEFAULT_EMAIL} />);
    const container = component.find('[data-test="email-list-item"]');
    const markUnreadButton = component.find('[data-test="email-list-item-mark-unread"]');

    expect(container).toHaveClassName('email-list-item--unread');
    expect(markUnreadButton).not.toExist();
  });

  it('excludes "email-list-item--unread" class on container & hides "mark unread" button when `email.read` property is true', () => {
    const component = mount(<EmailListItem email={READ_EMAIL} />);
    const container = component.find('[data-test="email-list-item"]');
    const markUnreadButton = component.find('[data-test="email-list-item-mark-unread"]');

    expect(container).not.toHaveClassName('email-list-item--unread');
    expect(markUnreadButton).not.toExist();
  });

  it('includes "mark unread" button when both `email.read` property and `isSelected` prop are true', () => {
    const component = mount(<EmailListItem email={READ_EMAIL} isSelected={true} />);
    const container = component.find('[data-test="email-list-item"]');
    const markUnreadButton = component.find('[data-test="email-list-item-mark-unread"]');

    expect(container).not.toHaveClassName('email-list-item--unread');
    expect(markUnreadButton).toExist();
  });
});
```

## Exercises

- Create [`components/EmailView.test.js`](components/EmailView.test.js) to test render logic for the [`EmailView`](components/EmailView.js) component
  * displays "mark read" button if email is unread
  * displays "mark unread" button if email is read
  * does **not** encode HTML in the message
- Create [`components/EmailForm.test.js`](components/EmailForm.test.js) to test render logic for the cancel button hide/show within the [`EmailForm`](components/EmailForm.js) component
- **BONUS:** Create a [`__fixtures__/index.js`](__fixtures__/index.js) file that `export`s `DEFAULT_EMAIL` & `READ_EMAIL` so that it can be shared between the `EmailListItem`, `EmailView` & `EmailForm` tests

## Next

Go to [Step 2 - Render (components)](../02-render-components/).

## Resources

- [Using Matchers in Jest](https://jestjs.io/docs/en/using-matchers)
- [Testing React apps in Jest](https://jestjs.io/docs/en/tutorial-react)
- [Full DOM Rendering in Enzyme](http://airbnb.io/enzyme/docs/api/mount.html)
- [Jest assertion matchers for Enzyme](https://github.com/FormidableLabs/enzyme-matchers)
- [Enzyme support for CSS selectors](http://airbnb.io/enzyme/docs/api/selector.html#1-a-valid-css-selector)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
