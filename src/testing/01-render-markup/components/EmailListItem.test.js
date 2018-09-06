import React from 'react';
import {mount} from 'enzyme';
import EmailListItem from './EmailListItem';
import {DEFAULT_EMAIL, READ_EMAIL} from '../__fixtures__';


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
      const markUnreadButton = component.find('[data-test="email-list-item-mark-unread"]');

      expect(markUnreadButton).toExist();
    });
  });
});
