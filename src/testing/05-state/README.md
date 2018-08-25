# Step 5 - State

Internal React state is used to build interactivity within a React component; some interaction happens, the state changes, the component re-renders, and the component feels interactive. Typically there is logic that determines what the new state should be based on the interaction and the current state. It's _that_ data transformation logic that we want to test. But state is _internal_ to a component and should be free to be changed/refactored without breaking tests.

So the goal of this step is to test the changing of component state by seeing how the new state impacts the rendered UI. We will be combining the tools we learned for verifying component UI ([Step 1](../01-render-markup/) and [Step 2](../02-render-components/)) with the ways to simulate user interactions ([Step 3](../03-callbacks-markup/) and [Step 4](../04-callbacks-components/)) to write our tests to verify state updates.

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

## Jump Around

[Concepts](#concepts) | [Restart Setup](#restart-setup) | [Tasks](#tasks) | [Exercises](#exercises) | [Resources](#resources)

## Concepts

- Verify component state updates

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
cp -r src/testing/04-callbacks-components src/workshop
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

Let's return to testing the `EmailForm` component by opening [`components/EmailForm.test.js`](components/EmailForm.test.js). The four input fields, `from`, `to`, `subject` & `message`, are ["controlled components"](https://facebook.github.io/react/docs/forms.html#controlled-components). React maintains their value in `state` and re-renders them with their new value when their values change.

Write a test to verify that the `from` field gets a new value when the `'change'` event is triggered:

```js
describe('state updating', () => {
  describe('field updating', () => {
    it('updates from field on change event', () => {
      const component = getComponent();
      const fromField = component.find('[data-test="email-form-from"]');
  
      // verify initial value
      expect(fromField).toHaveValue('');
  
      fromField.simulate('change', {target: {value: DEFAULT_EMAIL.from}});
  
      // setState causes the EmailForm to re-render, so fromField variable refers
      // to the old version of the field. Have to retrieve a new reference
      expect(component.find('[data-test="email-form-from"]')).toHaveValue(DEFAULT_EMAIL.from);
    });
    
    it('updates to field on change event', () => {
      
    });

    it('updates subject field on change event', () => {
      
    });

    it('updates message field on change event', () => {
      
    });
  });
});
```

There are [exercises](#exercises) below to write the remaining tests for `to`, `subject` & `message` field updates on change events.

The next `setState` in `EmailForm` happens on successful form submission. The form fields are returned to the original values. Verify that this is the case:

```js
describe('state updating', () => {
  describe('field updating', () => {
    // ...
  });

  describe('form submissions', () => {
    it('resets the field values to original values after successful submission', () => {
      const component = getComponent();
      const form = component.find('[data-test="email-form-form"]');

      // simulate filling in fields
      component.find('[data-test="email-form-from"]').simulate('change', {target: {value: DEFAULT_EMAIL.from}});
      component.find('[data-test="email-form-to"]').simulate('change', {target: {value: DEFAULT_EMAIL.to}});
      component.find('[data-test="email-form-subject"]').simulate('change', {target: {value: DEFAULT_EMAIL.subject}});
      component.find('[data-test="email-form-message"]').simulate('change', {target: {value: DEFAULT_EMAIL.message}});

      // simulate form submission
      form.simulate('submit');

      // verify fields have returned to original values
      expect(component.find('[data-test="email-form-from"]')).toHaveValue('');
      expect(component.find('[data-test="email-form-to"]')).toHaveValue('me@abcdef.com');
      expect(component.find('[data-test="email-form-subject"]')).toHaveValue('');
      expect(component.find('[data-test="email-form-message"]')).toHaveValue('');
      
    });
  });
});
```

To be extra safe, ensure that the fields aren't accidentally reset on unsuccessful form submission:

```js
describe('form submissions', () => {
  it('resets the field values to original values after successful submission', () => {
    // ...
  });

  it('does not reset the field values after failed submission', () => {
    const component = getComponent();
    const form = component.find('[data-test="email-form-form"]');

    // simulate filling in some fields
    component.find('[data-test="email-form-to"]').simulate('change', {target: {value: DEFAULT_EMAIL.to}});
    component.find('[data-test="email-form-message"]').simulate('change', {target: {value: DEFAULT_EMAIL.message}});

    // simulate form submission (should fail)
    form.simulate('submit');

    // verify fields have remained the same
    expect(component.find('[data-test="email-form-from"]')).toHaveValue('');
    expect(component.find('[data-test="email-form-to"]')).toHaveValue( DEFAULT_EMAIL.to);
    expect(component.find('[data-test="email-form-subject"]')).toHaveValue('');
    expect(component.find('[data-test="email-form-message"]')).toHaveValue( DEFAULT_EMAIL.message);
  });
});
```

There is an [exercise](#exercise) to test for cancelled submission.

Let's revisit the tests for `Page`. There are two pieces of UI state, `selectedEmailId` and `showForm`, that we want to test how they update. Again, we use indirection to verify that the state was updated correctly, but analyzing if the new UI has been rendered correctly.

The main piece of state is `selectedEmailId`. It is updated in many different ways to build interactive in the email app. It defaults to `-1` signaling that nothing is selected and the `<EmailView />` should not display. Let's verify this case:

```js
describe('state updates + callbacks', () => {
  describe('selected email', () => {
    it('does not render the email view when no email is selected', () => {
      const component = getComponent();

      // verify -1 email ID is passed to EmailList (so it won't select anything)
      expect(component.find(EmailList)).toHaveProp('selectedEmailId', -1);

      // verify email view does not display
      expect(component.find('[data-test="page-view"]')).not.toExist();
    });
  });
});
```

This is no different from how we tested renders in [Step 1](../01-render-markup/) and [Step 2](../02-render-components/) except that it's `state` driving the render instead of `props`.

Our test makes use of `data-test="page-view"` so we need to add that to the `<article>` surrounding the `<EmailView />`:

```js
<article className="page__view" data-test="page-view">
```

Next we verify what happens when an email list item is selected. It display the email view, shows selected in the email list, and also marks the email as read. We can verify all of those cases:

```js
describe('selected email', () => {
  it('does not render the email view when no email is selected', () => {
    // ...
  });

  it('renders the email view + marks read when an email is selected', () => {
    const markRead = jest.fn();
    const component = getComponent({markRead});
    const emailToSelect = EMAILS[0];

    // simulate an email being selected
    component.find(EmailList).prop('onItemSelect')(emailToSelect.id);

    // since we're not simulating a DOM event, we need to tell enzyme
    // to re-render
    component.update();

    // verify email list gets selected email ID
    // the email list found here is different than the one before .update()
    expect(component.find(EmailList)).toHaveProp('selectedEmailId', emailToSelect.id);

    const emailView = component.find(EmailView);

    expect(component.find('[data-test="page-view"]')).toExist();
    expect(emailView).toHaveProp('email', emailToSelect);

    // verify markRead action was called
    expect(markRead).toHaveBeenCalledTimes(1);
    expect(markRead).toHaveBeenCalledWith(emailToSelect.id);
  });
});
```

We simulate an email item being selected by invoking the `onItemSelect` prop on the `<EmailList />`. This triggers a re-render, but because we didn't trigger it via Enzyme's [`.simulate()`](http://airbnb.io/enzyme/docs/api/ReactWrapper/simulate.html), we have to manually tell the component to update. After which we verify `<EmailList />` has the write selected email ID, is displaying the `<EmailView />` with the selected email, and that the `markRead` callback handler was called with the selected email ID. This is the result of the simple `setState()` in `_handleItemSelect`.

Finally, let's test what happens when the email view is closed:

```js
  describe('selected email', () => {
    it('does not render the email view when no email is selected', () => {
      // ...
    });

    it('renders the email view + marks read when an email is selected', () => {
      // ...
    });
  });

  it('hides email view when email view is closed', () => {
    const component = getComponent();
    const emailList = component.find(EmailList);
    const emailToSelect = EMAILS[0];

    // simulate an email being selected
    emailList.prop('onItemSelect')(emailToSelect.id);

    // since we're not simulating a DOM event, we need to tell enzyme
    // to re-render
    component.update();

    const emailView = component.find(EmailView);

    // simulate closing the email view
    emailView.prop('onClose')();

    // simulate re-render again
    component.update();

    expect(component.find('[data-test="page-view"]')).not.toExist();
    expect(component.find(EmailList)).toHaveProp('selectedEmailId', -1);
  });
});
```

First we simulate an email item being selected, and then tell Enzyme to update as a result of the re-render. Then simulate the email view being closed by invoking its `onClose` prop, and tell Enzyme to update again as a result of the re-render. Then finally we verify that the email view is no longer displayed and email list no longer has a selected email ID.

## Exercises

- Add remaining tests for `EmailForm`
  * updates for `to`, `subject` & `message` fields on `change` event
  * resets the field values to original values after cancelled submission
- Add remaining tests for `state.selectedEmailId` in `Page`
  * switches displayed email when different email is selected
  * hides email view when selected email is deleted from email view
  * hides email view when selected email is deleted from email list
- Add tests for `state.showForm` in `Page`
  * does not render the form modal by default
  * renders the email form modal when new email button is clicked
  * closes the email form modal when the modal is cancelled
  * closes the email form modal + calls `addEmail` when the new email is submitted

## Next

Go to [Step 6 - Redux Actions](../06-actions).

## Resources

- [Enzyme `.update()`](http://airbnb.io/enzyme/docs/api/ReactWrapper/update.html)
- Focusing tests with [`describe.only`](https://jestjs.io/docs/en/api#describeonlyname-fn) and [`test.only`](https://jestjs.io/docs/en/api#testonlyname-fn-timeout)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
