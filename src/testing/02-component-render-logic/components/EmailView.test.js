import React from 'react';
import {mount} from 'enzyme';
import EmailView from './EmailView';
import {DEFAULT_EMAIL, READ_EMAIL} from '../__fixtures__';

const getComponent = (props = {}) => (
  mount(
    <EmailView
      email={DEFAULT_EMAIL}
      onDelete={jest.fn()}
      onClose={jest.fn()}
      {...props}
    />
  )
);

describe('prop rendering', () => {
  describe('email', () => {
    it('does *not* encode HTML in the message', () => {
      const component = mount(<EmailView email={DEFAULT_EMAIL} />);
      const message = component.find('[data-test="email-view-message"]');

      expect(message.html()).toContain('<br>');
    });

    it('displays "mark read" button if email is unread', () => {
      const component = mount(<EmailView email={DEFAULT_EMAIL} />);
      const markReadButton = component.find('[data-test="email-view-mark-read"]');
      const markUnreadButton = component.find('[data-test="email-view-mark-unread"]');

      expect(markReadButton).toExist();
      expect(markUnreadButton).not.toExist();
    });

    it('displays "mark unread" button if email is read', () => {
      const component = mount(<EmailView email={READ_EMAIL} />);
      const markReadButton = component.find('[data-test="email-view-mark-read"]');
      const markUnreadButton = component.find('[data-test="email-view-mark-unread"]');

      expect(markUnreadButton).toExist();
      expect(markReadButton).not.toExist();
    });
  });
});
