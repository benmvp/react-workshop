import React from 'react';
import {mount} from 'enzyme';
import EmailForm from './EmailForm';
import {DEFAULT_EMAIL} from './__fixtures__';

const getComponent = (props = {}) => (
  mount(
    <EmailForm
      onSubmit={jest.fn()}
      {...props}
    />
  )
);

describe('prop rendering', () => {
  describe('onCancel', () => {
    it('only renders the cancel button when `onCancel` is passed', () => {
      const component = getComponent({onCancel: jest.fn()});
      const cancelButton = component.find('[data-test="email-form-cancel"]');

      expect(cancelButton).toExist();
    });


    it('does not render the cancel button when `onCancel` is not passed', () => {
      const component = getComponent();
      const cancelButton = component.find('[data-test="email-form-cancel"]');

      expect(cancelButton).not.toExist();
    });
  });
});

describe('event handling', () => {
  describe('onCancel', () => {
    it('calls onCancel when the cancel button is clicked', () => {
      const onCancel = jest.fn();
      const component = getComponent({onCancel});
      const cancelButton = component.find('[data-test="email-form-cancel"]');
  
      // sanity check that the callback hasn't been called yet
      expect(onCancel).toHaveBeenCalledTimes(0);

      // simulate a fake click event
      cancelButton.simulate('click');

      // verify onCancel is called only once with the email ID
      expect(onCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe('onSubmit', () => {
    it('calls onSubmit when the form is submitted and all fields are filled', () => {
      const onSubmit = jest.fn();
      const preventDefault = jest.fn();
      const component = getComponent({onSubmit});
      const form = component.find('[data-test="email-form-form"]');

      // sanity check that the callback hasn't been called yet
      expect(onSubmit).toHaveBeenCalledTimes(0);

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

    it('does not call `onSubmit` when the form is submitted and the fields are *not* all filled', () => {
      const originalAlert = window.alert;
      const onSubmit = jest.fn();
      const preventDefault = jest.fn();
      const component = getComponent({onSubmit});
      const form = component.find('[data-test="email-form-form"]');

      window.alert = jest.fn();

      // only fill out a couple of fields
      component.find('[data-test="email-form-to"]').simulate('change', {target: {value: DEFAULT_EMAIL.to}});
      component.find('[data-test="email-form-subject"]').simulate('change', {target: {value: DEFAULT_EMAIL.subject}});

      // simulate form submission
      form.simulate('submit', {preventDefault});

      expect(onSubmit).toHaveBeenCalledTimes(0);

      // verify that the alert was called to display error message string
      expect(window.alert).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith(expect.any(String));

      window.alert = originalAlert;
    });
  });
});

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
      const component = getComponent();
      const toField = component.find('[data-test="email-form-to"]');
  
      // verify initial value
      expect(toField).toHaveValue('me@abcdef.com');
  
      toField.simulate('change', {target: {value: DEFAULT_EMAIL.to}});
  
      // setState causes the EmailForm to re-render, so toField variable refers
      // to the old version of the field. Have to retrieve a new reference
      expect(component.find('[data-test="email-form-to"]')).toHaveValue(DEFAULT_EMAIL.to);
    });

    it('updates subject field on change event', () => {
      const component = getComponent();
      const subjectField = component.find('[data-test="email-form-subject"]');
  
      // verify initial value
      expect(subjectField).toHaveValue('');
  
      subjectField.simulate('change', {target: {value: DEFAULT_EMAIL.subject}});
  
      // setState causes the EmailForm to re-render, so subjectField variable refers
      // to the old version of the field. Have to retrieve a new reference
      expect(component.find('[data-test="email-form-subject"]')).toHaveValue(DEFAULT_EMAIL.subject);
    });

    it('updates message field on change event', () => {
      const component = getComponent();
      const messageField = component.find('[data-test="email-form-message"]');
  
      // verify initial value
      expect(messageField).toHaveValue('');
  
      messageField.simulate('change', {target: {value: DEFAULT_EMAIL.message}});
  
      // setState causes the EmailForm to re-render, so messageField variable refers
      // to the old version of the field. Have to retrieve a new reference
      expect(component.find('[data-test="email-form-message"]')).toHaveValue(DEFAULT_EMAIL.message);
    });
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

    it('resets the field values to original values after cancelled submission', () => {
      const onCancel = jest.fn();
      const component = getComponent({onCancel});
      const cancelButton = component.find('[data-test="email-form-cancel"]');

      // simulate filling in fields
      component.find('[data-test="email-form-from"]').simulate('change', {target: {value: DEFAULT_EMAIL.from}});
      component.find('[data-test="email-form-to"]').simulate('change', {target: {value: DEFAULT_EMAIL.to}});
      component.find('[data-test="email-form-subject"]').simulate('change', {target: {value: DEFAULT_EMAIL.subject}});
      component.find('[data-test="email-form-message"]').simulate('change', {target: {value: DEFAULT_EMAIL.message}});

      // simulate a fake click event
      cancelButton.simulate('click');

      // verify fields have returned to original values
      expect(component.find('[data-test="email-form-from"]')).toHaveValue('');
      expect(component.find('[data-test="email-form-to"]')).toHaveValue('me@abcdef.com');
      expect(component.find('[data-test="email-form-subject"]')).toHaveValue('');
      expect(component.find('[data-test="email-form-message"]')).toHaveValue('');
    });
  });
});
