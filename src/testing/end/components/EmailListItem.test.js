import React from 'react';
import {mount} from 'enzyme';
import EmailListItem from './EmailListItem';
import {DEFAULT_EMAIL, READ_EMAIL} from '../__fixtures__';

const getComponent = (props = {}) => (
  mount(
    <EmailListItem
      email={DEFAULT_EMAIL}
      onDelete={jest.fn()}
      onMarkUnread={jest.fn()}
      {...props}
    />
  )
);

test('renders without crashing', () => {
  expect(() => getComponent()).not.toThrow();
});

describe('prop rendering', () => {
  describe('isSelected', () => {
    it('includes "email-list-item--selected" class on container when `isSelected` prop is true', () => {
      const component = getComponent({isSelected: true});
      const container = component.find('[data-test="email-list-item"]');

      expect(container).toHaveClassName('email-list-item--selected');
    });


    it('excludes "email-list-item--selected" class on container when `isSelected` prop is false', () => {
      const component = getComponent();
      const container = component.find('[data-test="email-list-item"]');

      expect(container).not.toHaveClassName('email-list-item--selected');
    });
  });

  describe('email', () => {
    it('includes "email-list-item--unread" class on container & hides "mark unread" button when `email.read` property is false', () => {
      const component = getComponent();
      const container = component.find('[data-test="email-list-item"]');
      const markUnreadButton = component.find('[data-test="email-list-item-mark-unread"]');

      expect(container).toHaveClassName('email-list-item--unread');
      expect(markUnreadButton).not.toExist();
    });


    it('excludes "email-list-item--unread" class on container & hides "mark unread" button when `email.read` property is true', () => {
      const component = getComponent({email: READ_EMAIL});
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

describe('event handling', () => {
  describe('onSelect', () => {
    it('calls onSelect handler with email ID on click when specified', () => {
      const onSelect = jest.fn();
      const stopPropagation = jest.fn();
      const component = getComponent({onSelect});
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

    it('does nothing on click when onSelect is not specified', () => {
      const stopPropagation = jest.fn();
      const component = getComponent();
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

  describe('onMarkUnread', () => {
    it('calls onMarkUnread handler with email ID when "mark unread" button is clicked', () => {
      const onMarkUnread = jest.fn();
      const stopPropagation = jest.fn();
      const component = getComponent({email: READ_EMAIL, isSelected: true, onMarkUnread});
      const markUnreadButton = component.find('[data-test="email-list-item-mark-unread"]');
    
      // sanity check that the callback hasn't been called yet
      expect(onMarkUnread).not.toHaveBeenCalled();
  
      // simulate a fake click event
      markUnreadButton.simulate('click', {stopPropagation});
  
      // verify onMarkUnread is called only once with the email ID
      expect(onMarkUnread).toHaveBeenCalledTimes(1);
      expect(onMarkUnread).toHaveBeenCalledWith(READ_EMAIL.id);

      // verify that event propagation is stopped
      expect(stopPropagation).toHaveBeenCalled();
    });
  });

  describe('onDelete', () => {
    it('calls onDelete handler with email ID when delete button is clicked', () => {
      const onDelete = jest.fn();
      const stopPropagation = jest.fn();
      const component = getComponent({onDelete});
      const deleteButton = component.find('[data-test="email-list-item-delete"]');
  
      // sanity check that the callback hasn't been called yet
      expect(onDelete).not.toHaveBeenCalled();
  
      // simulate a fake click event
      deleteButton.simulate('click', {stopPropagation});

      // verify onDelete is called only once with the email ID
      expect(onDelete).toHaveBeenCalledTimes(1);
      expect(onDelete).toHaveBeenCalledWith(DEFAULT_EMAIL.id);

      // verify that event propagation is stopped
      expect(stopPropagation).toHaveBeenCalled();
    });
  });
});
