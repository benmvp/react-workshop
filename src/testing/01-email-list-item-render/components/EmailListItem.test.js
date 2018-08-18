import React from 'react';
import {mount} from 'enzyme';
import EmailListItem from './EmailListItem';


const DEFAULT_EMAIL = {
  id: 2,
  date: '11/18/2018',
  from: 'amurray1@mit.edu',
  to: 'i@me.com',
  read: false,
  subject: 'Mauris ullamcorper purus sit amet nulla.',
  message: '<em><strong>Sed ante.</strong></em> Vivamus tortor. Duis mattis egestas metus.<br /><br />Aenean fermentum. 😀 Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.<br /><br />Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
};

const READ_EMAIL = {
  ...DEFAULT_EMAIL,
  id: 23,
  read: true,
};

describe('prop rendering', () => {
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
});
