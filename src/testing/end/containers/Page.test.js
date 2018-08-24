import React from 'react';
import {mount} from 'enzyme';
import Page from './Page';
import EmailList from '../components/EmailList';
import EmailView from '../components/EmailView';
import EmailForm from '../components/EmailForm';
import {EMAILS, DEFAULT_EMAIL} from '../__fixtures__';

const getComponent = (props = {}) => (
  mount(
    <Page
      emails={EMAILS}
      addEmail={jest.fn()}
      getEmails={jest.fn()}
      deleteEmail={jest.fn()}
      markRead={jest.fn()}
      markUnread={jest.fn()}
      {...props}
    />
  )
);

describe('simple actions', () => {

  describe('markUnread', () => {
    it('calls `markUnread` action when Mark Unread is clicked in email view', () => {
      const markUnread = jest.fn();
      const component = getComponent({markUnread});
      const emailList = component.find(EmailList);
      const emailToSelect = EMAILS[1];

      // simulate an email being selected
      emailList.prop('onItemSelect')(emailToSelect.id);

      // since we're not simulating a DOM event, we need to tell enzyme
      // to re-render
      component.update();

      const emailView = component.find(EmailView);

      // simulate the mark unread button being clicked
      emailView.prop('onMarkUnread')();

      // verify markUnread action was called
      expect(markUnread).toHaveBeenCalledTimes(1);
      expect(markUnread).toHaveBeenLastCalledWith(emailToSelect.id);
    });
  });

  describe('markRead', () => {
    it('calls `markRead` action when Mark Read is clicked in email view', () => {
      const markRead = jest.fn();
      const component = getComponent({markRead});
      const emailList = component.find(EmailList);
      const emailToSelect = EMAILS[0];

      // simulate an email being selected
      emailList.prop('onItemSelect')(emailToSelect.id);

      // since we're not simulating a DOM event, we need to tell enzyme
      // to re-render
      component.update();

      const emailView = component.find(EmailView);

      // simulate the mark read button being clicked
      emailView.prop('onMarkRead')();

      // verify markRead action was called
      // (was called once before when selecting the item)
      expect(markRead).toHaveBeenCalledTimes(2);
      expect(markRead).toHaveBeenLastCalledWith(emailToSelect.id);
    });
  });

  describe('getEmails', () => {
    it('calls `getEmails` on component mount', () => {
      const getEmails = jest.fn();
      const component = getComponent({getEmails});
  
      expect(getEmails).toHaveBeenCalledTimes(1);
    });
  
    it('calls `getEmails` every 2 seconds after component mount by default', () => {
      jest.useFakeTimers();
  
      const getEmails = jest.fn();
      const component = getComponent({getEmails});
  
      // gets called immediately on component mount
      expect(getEmails).toHaveBeenCalledTimes(1);
  
      // fast forward 2 seconds until after the first interval
      jest.runTimersToTime(2000);
      
      // now should've been called again after 2 seconds
      expect(getEmails).toHaveBeenCalledTimes(2);     
      
      // fast forward another 2 seconds until after the first interval
      jest.runTimersToTime(2000);
      
      // now should've been called again after 2 seconds
      expect(getEmails).toHaveBeenCalledTimes(3);  
    });
  
    it('calls `getEmails` every X seconds after component mount based on `pollInterval`', () => {
      jest.useFakeTimers();
  
      const getEmails = jest.fn();
      const component = getComponent({getEmails, pollInterval: 3500});
  
      // gets called immediately on component mount
      expect(getEmails).toHaveBeenCalledTimes(1);
  
      // fast forward `pollInterval` seconds until after the first interval
      jest.runTimersToTime(3500);
      
      // now should've been called again after `pollInterval` seconds
      expect(getEmails).toHaveBeenCalledTimes(2);     
      
      // fast forward another 2 seconds until after the first interval
      jest.runTimersToTime(3500);
      
      // now should've been called again after `pollInterval` seconds
      expect(getEmails).toHaveBeenCalledTimes(3);  
    });
  
    it('stops polling after component unmount', () => {
      jest.useFakeTimers();
  
      const getEmails = jest.fn();
      const component = getComponent({getEmails, pollInterval: 1000});
  
      // fast forward `pollInterval` second until after the first interval
      jest.runTimersToTime(1000);

      // should've been called twice (once on mount + another after interval)
      expect(getEmails).toHaveBeenCalledTimes(2);
  
      component.unmount();
  
      // fast forward `pollInterval` second until after the first interval
      jest.runTimersToTime(1000);
  
      // still should've only been called twice
      expect(getEmails).toHaveBeenCalledTimes(2);
    });
  });

});

describe('state updates + callbacks', () => {
  describe('selected email', () => {
    it('does not render the email view when no email is selected', () => {
      const component = getComponent();

      expect(component.find('[data-test="page-view"]')).not.toExist();
    });

    it('renders the email view + marks read when an email is selected', () => {
      const markRead = jest.fn();
      const component = getComponent({markRead});
      const emailList = component.find(EmailList);
      const emailToSelect = EMAILS[0];

      // simulate an email being selected
      emailList.prop('onItemSelect')(emailToSelect.id);

      // since we're not simulating a DOM event, we need to tell enzyme
      // to re-render
      component.update();

      const emailView = component.find(EmailView);

      expect(component.find('[data-test="page-view"]')).toExist();
      expect(emailView).toHaveProp('email', emailToSelect);

      // verify markRead action was called
      expect(markRead).toHaveBeenCalledTimes(1);
      expect(markRead).toHaveBeenCalledWith(emailToSelect.id);
    });

    it('switches displayed email when different email is selected', () => {
      const markRead = jest.fn();
      const component = getComponent({markRead});
      let emailList = component.find(EmailList);
      const firstEmailToSelect = EMAILS[0];
      const secondEmailToSelect = EMAILS[1];

      // simulate an email being selected
      emailList.prop('onItemSelect')(firstEmailToSelect.id);

      // since we're not simulating a DOM event, we need to tell enzyme
      // to re-render
      component.update();

      // point to newly rendered email list
      emailList = component.find(EmailList);

      // simulate another email being selected
      emailList.prop('onItemSelect')(secondEmailToSelect.id);

      // simulate second re-render
      component.update();

      const emailView = component.find(EmailView);

      expect(component.find('[data-test="page-view"]')).toExist();
      expect(emailView).toHaveProp('email', secondEmailToSelect);

      // action would have been called twice by now
      // but last called with the last selected email
      expect(markRead).toHaveBeenCalledTimes(2);
      expect(markRead).toHaveBeenLastCalledWith(secondEmailToSelect.id);
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
    });

    it('hides email view when selected email is deleted from email view', () => {
      const deleteEmail = jest.fn();
      const component = getComponent({deleteEmail});
      const emailList = component.find(EmailList);
      const emailToSelect = EMAILS[1];

      // simulate an email being selected
      emailList.prop('onItemSelect')(emailToSelect.id);

      // sanity check that the email isn't accidentally deleted early
      expect(deleteEmail).not.toHaveBeenCalled();

      // since we're not simulating a DOM event, we need to tell enzyme
      // to re-render
      component.update();

      const emailView = component.find(EmailView);

      // simulate closing the email view
      emailView.prop('onDelete')();

      // simulate re-render again
      component.update();

      expect(component.find('[data-test="page-view"]')).not.toExist();

      // verify delete email action was called
      expect(deleteEmail).toHaveBeenCalledTimes(1);
      expect(deleteEmail).toHaveBeenCalledWith(emailToSelect.id);
    });

    it('hides email view when selected email is deleted from email list', () => {
      const deleteEmail = jest.fn();
      const component = getComponent({deleteEmail});
      let emailList = component.find(EmailList);
      const emailToSelect = EMAILS[1];

      // simulate an email being selected
      emailList.prop('onItemSelect')(emailToSelect.id);

      // sanity check that the email isn't accidentally deleted early
      expect(deleteEmail).not.toHaveBeenCalled();

      // since we're not simulating a DOM event, we need to tell enzyme
      // to re-render
      component.update();

      // point to newly rendered email list
      emailList = component.find(EmailList);

      // simulate closing the email view
      emailList.prop('onItemDelete')(emailToSelect.id);

      // simulate re-render again
      component.update();

      expect(component.find('[data-test="page-view"]')).not.toExist();

      // verify delete email action was called
      expect(deleteEmail).toHaveBeenCalledTimes(1);
      expect(deleteEmail).toHaveBeenCalledWith(emailToSelect.id);
    });
  });

  describe('show form', () => {
    it('does not render the form modal by default', () => {
      const component = getComponent();

      expect(component.find('[data-test="page-form-modal"]')).not.toExist();
    });

    it('renders the email form modal when new email button is clicked', () => {
      const component = getComponent();

      // simulate clicking the new email button
      component.find('[data-test="page-new-email"]').simulate('click');

      expect(component.find('[data-test="page-form-modal"]')).toExist();
    });

    it('closes the email form modal when the modal is cancelled', () => {
      const component = getComponent();

      // simulate clicking the new email button
      component.find('[data-test="page-new-email"]').simulate('click');

      // simulate cancelling the email form modal by calling
      // its `onCancel` prop
      component.find(EmailForm).prop('onCancel')();

      component.update();

      expect(component.find('[data-test="page-form-modal"]')).not.toExist();
    });

    it('closes the email form modal + calls `addEmail` when the new email is submitted', () => {
      const addEmail = jest.fn();
      const component = getComponent({addEmail});

      // simulate clicking the new email button
      component.find('[data-test="page-new-email"]').simulate('click');

      // simulate submitting the email form modal by calling
      // its `onSubmit` prop
      component.find(EmailForm).prop('onSubmit')(DEFAULT_EMAIL);

      component.update();

      expect(component.find('[data-test="page-form-modal"]')).not.toExist();

      // verify callback has been called once w/ the new email
      expect(addEmail).toHaveBeenCalledTimes(1);
      expect(addEmail).toHaveBeenCalledWith(DEFAULT_EMAIL);
    });
  });
});
