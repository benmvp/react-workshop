import {
  addEmail as addEmailApi,
  getEmails as getEmailsApi,
  deleteEmail as deleteEmailApi,
  setRead as setReadApi
} from '../api';

const _setRead = (emails, emailId, read) =>
  setReadApi(emailId, read).then(({success}) => {
      if (success) {
        return emails.map(
          email => (email.id === emailId ? {...email, read} : email)
        );
      }

      throw new Error(
        `Unable to set email ID# ${emailId} read state to ${read}.`
      );
    });

export const getEmails = getEmailsApi;

export const markRead = (emails, emailId) => _setRead(emails, emailId, true);

export const markUnread = (emails, emailId) =>
  _setRead(emails, emailId, false);

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
          read: false,
        },
        ...emails
      ];
    }

    throw new Error('Unable to send email!');
  });
