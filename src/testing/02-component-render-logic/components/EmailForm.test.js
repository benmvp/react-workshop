import React from 'react';
import {mount} from 'enzyme';
import EmailForm from './EmailForm';


describe('prop rendering', () => {
  describe('onCancel', () => {
    it('only renders the cancel button when `onCancel` is passed', () => {
      const component = mount(<EmailForm onCancel={() => {}} />);
      const cancelButton = component.find('[data-test="email-form-cancel"]');

      expect(cancelButton).toExist();
    });

    it('does not render the cancel button when `onCancel` is not passed', () => {
      const component = mount(<EmailForm />);
      const cancelButton = component.find('[data-test="email-form-cancel"]');

      expect(cancelButton).not.toExist();
    });
  });
});
