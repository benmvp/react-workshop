import React from 'react';
import {mount} from 'enzyme';
import Page from './Page';
import EmailList from '../components/EmailList';
import EmailView from '../components/EmailView';
import {EMAILS} from '../components/__fixtures__';

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

describe('state updates', () => {
  describe('selected email', () => {
    it('does not render the email view when no email is selected', () => {
      const component = getComponent();

      expect(component.find('[data-test="page-view"]')).not.toExist();
    });

    it('renders the email view when an email is selected', () => {
      const component = getComponent();
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

    });

    it('switches displayed email when different email is selected', () => {
      const component = getComponent();
      let emailList = component.find(EmailList);
      const firstEmailToSselect = EMAILS[0];
      const secondEmailToSelect = EMAILS[1];

      // simulate an email being selected
      emailList.prop('onItemSelect')(firstEmailToSselect.id);

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
      const component = getComponent();
      const emailList = component.find(EmailList);
      const emailToSelect = EMAILS[1];

      // simulate an email being selected
      emailList.prop('onItemSelect')(emailToSelect.id);

      // since we're not simulating a DOM event, we need to tell enzyme
      // to re-render
      component.update();

      const emailView = component.find(EmailView);

      // simulate closing the email view
      emailView.prop('onDelete')();

      // simulate re-render again
      component.update();

      expect(component.find('[data-test="page-view"]')).not.toExist();
    });

    it('hides email view when selected email is deleted from email list', () => {
      const component = getComponent();
      let emailList = component.find(EmailList);
      const emailToSelect = EMAILS[1];

      // simulate an email being selected
      emailList.prop('onItemSelect')(emailToSelect.id);

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
    });
  });

  describe('show form', () => {
    it('does not render the form modal by default', () => {

    });

    it('renders the email form modal when new email button is clicked', () => {

    });

    it('closes the email form modal when the modal is cancelled', () => {

    });

    it('closes the email form modal when the new email is submitted', () => {

    });
  });
});

describe('actions', () => {

});
