import React from 'react';
import {mount} from 'enzyme';
import Page from './Page';
import EmailList from '../components/EmailList';
import EmailView from '../components/EmailView';
import EmailForm from '../components/EmailForm';
import {EMAILS} from '../__fixtures__';

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
  
    it('stop polling after component unmount', () => {
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
