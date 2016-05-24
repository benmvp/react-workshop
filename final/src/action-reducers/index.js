import * as api from '../api';

const setUnread = (emails, emailId, unread) => (
    api.setUnread(emailId, unread)
        .then(({success}) => {
            if (success) {
                return emails.map((email) => (
                    email.id === emailId
                        ? {...email, unread: false}
                        : email
                ));
            }

            throw new Error(`Unable to set email ID# ${emailId} unread state to ${unread}.`);
        })
        .catch((ex) => console.error(ex))
);

export const getEmails = () => (
    api.getEmails()
        .catch((ex) => console.error(ex))
);

export const markRead = (emails, emailId) => setUnread(emails, emailId, false);

export const markUnread = (emails, emailId) => setUnread(emails, emailId, true);

export const deleteEmail = (emails, emailId) => (
    api.deleteEmail(emailId)
        .then(({success}) => {
            if (success) {
                return emails.filter((email) => email.id !== emailId);
            }

            throw new Error(`Unable to delete email ID# ${emailId}.`);
        })
        .catch((ex) => console.error(ex))
);

export const addEmail = (emails, newEmail) => (
    api.addEmail(newEmail)
        .then(({success}) => {
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
        })
        .catch((ex) => console.error(ex))
);
