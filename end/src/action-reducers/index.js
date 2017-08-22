import {addEmail, getEmails, deleteEmail, setUnread} from '../api';

const setUnread = (emails, emailId, unread) =>
  setUnread(emailId, unread).then(({success}) => {
    if (success) {
      return emails.map(
        email => (email.id === emailId ? {...email, unread} : email)
      );
    }

    throw new Error(
      `Unable to set email ID# ${emailId} unread state to ${unread}.`
    );
  });

export const getEmails = () => getEmails();

export const markRead = (emails, emailId) => setUnread(emails, emailId, false);

export const markUnread = (emails, emailId) => setUnread(emails, emailId, true);

export const deleteEmail = (emails, emailId) =>
  deleteEmail(emailId).then(({success}) => {
    if (success) {
      return emails.filter(email => email.id !== emailId);
    }

    throw new Error(`Unable to delete email ID# ${emailId}.`);
  });

export const addEmail = (emails, newEmail) =>
  addEmail(newEmail).then(({success}) => {
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
