import {emails} from './';
import {
  SET_EMAIL_READ,
  DELETE_EMAIL,
  ADD_EMAIL,
  UPDATE_EMAILS,
} from '../actions';
import {EMAILS, DEFAULT_EMAIL, READ_EMAIL} from '../__fixtures__';

describe('emails', () => {
  describe('initialization', () => {
    it('defaults to empty array', () => {
      expect(emails(undefined, {type: '@@redux/INIT'})).toEqual([]);
    });
  });

  describe('SET_EMAIL_READ action', () => {
    it('sets the read state on the specified email', () => {
      const updatedEmails = emails(EMAILS, {
        type: SET_EMAIL_READ,
        payload: {
          emailId: EMAILS[0].id,
          read: true,
        }
      });

      // sanity check that we still have all the emails
      expect(updatedEmails).toHaveLength(EMAILS.length);

      // verify that the first email is now marked read
      expect(updatedEmails[0].read).toBe(true);
    });
  });

  describe('DELETE_EMAIL action', () => {
    it('deletes the specified email from the list', () => {
      const emailIdToDelete = EMAILS[1].id;
      const updatedEmails = emails(EMAILS, {
        type: DELETE_EMAIL,
        payload: emailIdToDelete,
      });

      // verify that we now have one less email
      expect(updatedEmails).toHaveLength(EMAILS.length - 1);

      // make sure that the deleted email is not in list
      expect(updatedEmails.find((email) => email.id === emailIdToDelete)).toBeUndefined();
    });
  });

  describe('ADD_EMAIL action', () => {
    it('prepends the new email to the beginning of the list', () => {
      const newEmail = {
        from: 'i@me.com',
        to: 'amurray1@mit.edu',
        subject: 'Test email',
        message: 'This is a fake email',
      };
      const updatedEmails = emails(EMAILS, {
        type: ADD_EMAIL,
        payload: newEmail,
      });

      // sanity check that the list has grown by one
      expect(updatedEmails).toHaveLength(EMAILS.length + 1);

      // verify that the first element contains the new email info plus
      // additional expected properties
      expect(updatedEmails[0]).toEqual({
        ...newEmail,
        read: false,
        date: expect.any(String),
        id: expect.any(Number),
      });
    });
  });
});

describe('UPDATE_EMAILS action', () => {
  it('replaces the emails list', () => {
    const newEmails = [READ_EMAIL, DEFAULT_EMAIL];
    const updatedEmails = emails(EMAILS, {
      type: UPDATE_EMAILS,
      payload: newEmails,
    });

    // verify the list is replaced
    expect(updatedEmails).toEqual(newEmails);
  });
});
