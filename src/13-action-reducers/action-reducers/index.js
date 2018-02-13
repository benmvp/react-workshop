import {
  addEmail as addEmailApi,
  getEmails as getEmailsApi,
  deleteEmail as deleteEmailApi,
  setUnread as setUnreadApi
} from '../api';

const _setUnread = (emails, emailId, unread) =>
  setUnreadApi(emailId, unread).then(({success}) => {
    if (success) {
      return emails.map(
        email => (email.id === emailId ? {...email, unread} : email)
      );
    }

    throw new Error(
      `Unable to set email ID# ${emailId} unread state to ${unread}.`
    );
  });

export const getEmails = getEmailsApi;

export const markRead = (emails, emailId) => _setUnread(emails, emailId, false);

export const markUnread = (emails, emailId) =>
  _setUnread(emails, emailId, true);

export const deleteEmail = (emails, emailId) =>
  deleteEmailApi(emailId).then(({success}) => {
    if (success) {
      return emails.filter(email => email.id !== emailId);
    }

    throw new Error(`Unable to delete email ID# ${emailId}.`);
  });

export const addEmail = (emails, newEmail) =>
  addEmailApi(newEmail).then(({success}) => {
    if (success) {
      return [
        {
          ...newEmail,
          id: Date.now(),
          date: `${new Date()}`,
          unread: true
        },
        ...emails
      ];
    }

    throw new Error('Unable to send email!');
  });
