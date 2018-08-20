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
      const component = getComponent();
      const message = component.find('[data-test="email-view-message"]');

      expect(message.html()).toContain('<br>');
    });

    it('displays "mark read" button if email is unread', () => {
      const component = getComponent();
      const markReadButton = component.find('[data-test="email-view-mark-read"]');
      const markUnreadButton = component.find('[data-test="email-view-mark-unread"]');

      expect(markReadButton).toExist();
      expect(markUnreadButton).not.toExist();
    });

    it('displays "mark unread" button if email is read', () => {
      const component = getComponent({email: READ_EMAIL});
      const markReadButton = component.find('[data-test="email-view-mark-read"]');
      const markUnreadButton = component.find('[data-test="email-view-mark-unread"]');

      expect(markUnreadButton).toExist();
      expect(markReadButton).not.toExist();
    });
  });
});

describe('event handling', () => {
  describe('onClose', () => {
    it('calls onClose handler when close button is clicked', () => {
      const onClose = jest.fn();
      const stopPropagation = jest.fn();
      const component = getComponent({onClose});
      const closeButton = component.find('[data-test="email-view-close"]');
  
      // sanity check that the callback hasn't been called yet
      expect(onClose).not.toHaveBeenCalled();
  
      // simulate a fake click event
      closeButton.simulate('click', {stopPropagation});

      // verify onClose is called only once with the email ID
      expect(onClose).toHaveBeenCalledTimes(1);

      // verify that event propagation is stopped
      expect(stopPropagation).toHaveBeenCalled();
    });
  });

  describe('onDelete', () => {
    it('calls onDelete handler when delete button is clicked', () => {
      const onDelete = jest.fn();
      const stopPropagation = jest.fn();
      const component = getComponent({onDelete});
      const deleteButton = component.find('[data-test="email-view-delete"]');
  
      // sanity check that the callback hasn't been called yet
      expect(onDelete).not.toHaveBeenCalled();
  
      // simulate a fake click event
      deleteButton.simulate('click', {stopPropagation});

      // verify onDelete is called only once with the email ID
      expect(onDelete).toHaveBeenCalledTimes(1);

      // verify that event propagation is stopped
      expect(stopPropagation).toHaveBeenCalled();
    });
  });

  describe('onMarkRead', () => {
    it('calls onMarkRead handler on click when specified', () => {
      const onMarkRead = jest.fn();
      const stopPropagation = jest.fn();
      const component = getComponent({onMarkRead});
      const markReadButton = component.find('[data-test="email-view-mark-read"]');
    
      // sanity check that the callback hasn't been called yet
      expect(onMarkRead).not.toHaveBeenCalled();
  
      // simulate a fake click event
      markReadButton.simulate('click', {stopPropagation});
  
      // verify onMarkRead is called only once with the email ID
      expect(onMarkRead).toHaveBeenCalledTimes(1);

      // verify that event propagation is stopped
      expect(stopPropagation).toHaveBeenCalled();
    });

    it('does nothing on click when onMarkRead is not specified', () => {
      const component = getComponent();
      const markReadButton = component.find('[data-test="email-view-mark-read"]');
  
      // simulating a click even shouldn't cause an error
      expect(() => {
        markReadButton.simulate('click');
      }).not.toThrow();
    });
  });

  describe('onMarkUnread', () => {
    it('calls onMarkUnread on click handler when specified', () => {
      const onMarkUnread = jest.fn();
      const stopPropagation = jest.fn();
      const component = getComponent({email: READ_EMAIL, onMarkUnread});
      const markUnreadButton = component.find('[data-test="email-view-mark-unread"]');
    
      // sanity check that the callback hasn't been called yet
      expect(onMarkUnread).not.toHaveBeenCalled();
  
      // simulate a fake click event
      markUnreadButton.simulate('click', {stopPropagation});
  
      // verify onMarkUnread is called only once with the email ID
      expect(onMarkUnread).toHaveBeenCalledTimes(1);

      // verify that event propagation is stopped
      expect(stopPropagation).toHaveBeenCalled();
    });

    it('does nothing on click when onMarkUnread is not specified', () => {
      const component = getComponent({email: READ_EMAIL});
      const markUnreadButton = component.find('[data-test="email-view-mark-unread"]');
  
      // simulating a click even shouldn't cause an error
      expect(() => {
        markUnreadButton.simulate('click');
      }).not.toThrow();
    });
  });
});
