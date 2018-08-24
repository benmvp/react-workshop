import React from 'react';
import {mount} from 'enzyme';
import EmailForm from './EmailForm';
import {DEFAULT_EMAIL} from '../__fixtures__';

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
      expect(onCancel).not.toHaveBeenCalled();

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

      expect(onSubmit).not.toHaveBeenCalled();

      // verify that the alert was called to display error message string
      expect(window.alert).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith(expect.any(String));

      window.alert = originalAlert;
    });
  });
});
