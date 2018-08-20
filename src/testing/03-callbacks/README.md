# Step 3 - Callbacks

The goal of this step is to test prop callback functions (aka event handlers). These props don't usually impact rendering, but are called as a result of some sort of action within a component (like user click) so that an ancestor component can do something in response. For these prop callback functions, we verify that they were called at the expected time and with the expected arguments.

If you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

## Jump Around

[Concepts](#concepts) | [Restart Setup](#restart-setup) | [Tasks](#tasks) | [Exercises](#exercises) | [Resources](#resources)

## Concepts

- Assert that prop callback functions are called at the right time and with the right arguments

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
cp -r src/testing/02-component-render-logic src/workshop
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

Let's return to testing the `EmailListItem`. It accepts three prop callback functions: `onSelect`, `onMarkUnread`, and `onDelete`. 

We can create a mock function in Jest with `jest.fn()`. When we pass that as the `onSelect` prop, we'll be able to make assertions against it to verify when and how it was called:

```js
describe('onSelect', () => {
  it('calls onSelect handler with email ID on click when specified', () => {
    const onSelect = jest.fn();
    const component = mount(<EmailListItem email={DEFAULT_EMAIL} onSelect={onSelect} />);
    const container = component.find('[data-test="email-list-item"]');
  });
});
```

In `EmailListItem`, clicking on the container calls the `_handleClick` helper method which calls the `onSelect` prop with the email ID. We can simulate a user click without needing a browser using Enzyme's [`.simulate()`](http://airbnb.io/enzyme/docs/api/ReactWrapper/simulate.html) helper:

```js
it('calls onSelect handler with email ID on click when specified', () => {
  const onSelect = jest.fn();
  const component = mount(<EmailListItem email={DEFAULT_EMAIL} onSelect={onSelect} />);
  const container = component.find('[data-test="email-list-item"]');

  // simulate a fake click event
  container.simulate('click');
});
```

Then, using Jest's [`.toHaveBeenCalledTimes()`](https://jestjs.io/docs/en/expect#tohavebeencalledtimesnumber) and [`.toHaveBeenCalledWith()`](https://jestjs.io/docs/en/expect#tohavebeencalledwitharg1-arg2-) helpers, we can verify when and how the prop callback function was called:

```js
it('calls onSelect handler with email ID on click when specified', () => {
  const onSelect = jest.fn();
  const component = mount(<EmailListItem email={DEFAULT_EMAIL} onSelect={onSelect} />);
  const container = component.find('[data-test="email-list-item"]');

  // sanity check that the callback hasn't been called yet
  expect(onSelect).not.toHaveBeenCalled();

  // simulate a fake click event
  container.simulate('click');

  // verify onSelect is called only once with the email ID
  expect(onSelect).toHaveBeenCalledTimes(1);
  expect(onSelect).toHaveBeenCalledWith(DEFAULT_EMAIL.id);
});
```

The `_handleClick` helper method also calls [`.stopPropagation()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation) on the event to prevent further propagation of the click event. This can also be verified:

```js
it('calls onSelect handler with email ID on click when specified', () => {
  const onSelect = jest.fn();
  const stopPropagation = jest.fn();
  const component = mount(<EmailListItem email={DEFAULT_EMAIL} onSelect={onSelect} />);
  const container = component.find('[data-test="email-list-item"]');

  // sanity check that the callback hasn't been called yet
  expect(onSelect).not.toHaveBeenCalled();

  // simulate a fake click event
  container.simulate('click', {stopPropagation});

  // verify onSelect is called only once with the email ID
  expect(onSelect).toHaveBeenCalledTimes(1);
  expect(onSelect).toHaveBeenCalledWith(DEFAULT_EMAIL.id);

  // verify that event propagation is stopped
  expect(stopPropagation).toHaveBeenCalled();
});
```

Lastly, the `_handleClick` does not try to call the `onSelect` prop when it isn't passed. We can verify that it does nothing by asserting that `.stopPropagation()` is never called **and** that we don't get any errors from trying to call the `undefined` `onSelect` prop:

```js
  describe('onSelect', () => {
    it('calls onSelect handler with email ID on click when specified', () => {
      // ...
    });

    it('does nothing on click when onSelect is not specified', () => {
      const stopPropagation = jest.fn();
      const component = mount(<EmailListItem email={DEFAULT_EMAIL} />);
      const container = component.find('[data-test="email-list-item"]');
  
      // simulating a click even shouldn't cause an error when onSelect
      // isn't passed
      expect(() => {
        container.simulate('click', {stopPropagation});
      }).not.toThrow();

      // propagation should not have been stopped
      expect(stopPropagation).not.toHaveBeenCalled();
    });
  });
```

Switch over to the tests for `EmailForm`. Add a test verifying that it calls `onSubmit` when the form is submitted and all fields are filled out:

```js
describe('event handling', () => {
  describe('onSubmit', () => {
    it('calls onSubmit when the form is submitted and all fields are filled', () => {
      const onSubmit = jest.fn();
      const preventDefault = jest.fn();
      const component = mount(<EmailForm onSubmit={onSubmit} />)
      const form = component.find('[data-test="email-form-form"]');

      // sanity check that the callback hasn't been called yet
      expect(onSubmit).not.toHaveBeenCalled();

      // simulate filling in fields
      component.find('[data-test="email-form-from"]').simulate('change', {target: {value: DEFAULT_EMAIL.from}});
      component.find('[data-test="email-form-to"]').simulate('change', {target: {value: DEFAULT_EMAIL.to}});
      component.find('[data-test="email-form-subject"]').simulate('change', {target: {value: DEFAULT_EMAIL.subject}});
      component.find('[data-test="email-form-message"]').simulate('change', {target: {value: DEFAULT_EMAIL.message}});

      // simulate form submission
      form.simulate('submit', {preventDefault});

      expect(preventDefault).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith({
        from: DEFAULT_EMAIL.from,
        to: DEFAULT_EMAIL.to,
        subject: DEFAULT_EMAIL.subject,
        message: DEFAULT_EMAIL.message,
      });
    });
  });
});
```

We can also use Enzyme's [`.simulate()`](http://airbnb.io/enzyme/docs/api/ReactWrapper/simulate.html) helper to simulate input fields being changed. The simulated event data just needs to include `e.target.value`.

In [`EmailForm`](components/EmailForm.js), add `data-test="email-form-form"` to the `<form>` so that it can be selected against:

```js
<form className="email-form" onSubmit={this._handleSubmit} data-test="email-form-form">
```

Do the same for each of the input fields. For example, for the `from` field, add `data-test="email-form-from"`:

```js
<input
  type="email"
  id="from"
  className="email-form__input"
  value={from}
  placeholder="jill@me.com"
  onChange={this._updateFormFieldState.bind(this, 'from')}
  data-test="email-form-from"
/>
```

## Exercises

- Write remaining event handling tests for `EmailListItem`
  * calls `onMarkUnread` handler with email ID when "mark unread" button is clicked
  * calls `onDelete` handler with email ID when delete button is clicked
  * Pass dummy `jest.fn()` for the `onMarkUnread` & `onDelete` props for the other tests since the props are required. There should be no more missing prop warnings
  * **BONUS:** Factor out all the `mount(<EmailListItem />)` calls into a `getComponent()` helper that will specify default values for required props
- Update existing `EmailList` tests
  * Update first test to verify that `onItemSelect`, `onItemDelete` & `onItemMarkUnread` props are passed to each `<EmailListItem />`
  * Update second test to pass dummy `jest.fn()` for `onItemSelect`, `onItemDelete` & `onItemMarkUnread` to remove missing prop warnings
- Write remaining event handling tests for `EmailForm`
  * calls `onCancel` when the cancel button is clicked
  * does not call `onSubmit` when the form is submitted and the fields are *not* all filled (_HINT:_ You will need to mock `window.alert`)
  * Pass dummy `jest.fn()` for the `onSubmit` prop for the other tests since it's required. There should be no more missing prop warnings
  * **BONUS:** Factor out all the `mount(<EmailForm />)` calls into a `getComponent()` helper that will specify default values for required props
- Write event handling tests for `EmailView`
  * calls `onClose` handler when close button is clicked
  * calls `onDelete` handler when delete button is clicked
  * calls `onMarkRead` handler on click when specified
  * does nothing on click when `onMarkRead` is not specified
  * calls `onMarkUnread` on click handler when specified
  * does nothing on click when `onMarkUnread` is not specified
  * Pass dummy `jest.fn()` for the `onClose`, `onDelete` & `onMarkRead` props for the other tests since the props are required. There should be no more missing prop warnings
  * **BONUS:** Factor out all the `mount(<EmailView />)` calls into a `getComponent()` helper that will specify default values for required props

## Next

Coming soon...

## Resources

- [Mock Functions in Jest](https://jestjs.io/docs/en/mock-function-api)
- [Enzyme `.simulate()`](http://airbnb.io/enzyme/docs/api/ReactWrapper/simulate.html)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
