import {
  addEmail as addEmailApi,
  getEmails as getEmailsApi,
  deleteEmail as deleteEmailApi,
  setUnread as setUnreadApi
} from '../api'

export const getEmails = getEmailsApi

//make api call dispatch action
export const SET_EMAIL_UNREAD = 'setEmailUnread'
const setEmailUnread = (emailId, unread) => ({
    type: SET_EMAIL_UNREAD,
    payload: {
        emailId,
        unread,
    },
})

const _setUnread = (dispatch, emailId, unread) => (
    setUnreadApi(emailId, unread).then(({success}) => {
        if (success) {
            return dispatch(setEmailUnread(emailId, unread))
        }

        throw new Error(
            `Unable to set email ID# ${emailId} unread state to ${unread}.`
        )
    }
))

export const markUnread = (emailId) => (
    (dispatch) => _setUnread(dispatch, emailId, true)
)

export const markRead = (emailId) => (
    (dispatch) => _setUnread(dispatch, emailId, false)
)


export const DELETE_EMAIL = 'deleteEmail'
const deleteEmailAction = (emailId) => ({
    type: DELETE_EMAIL,
    payload: emailId,
})

export const deleteEmail = (emailId) => (
    (dispatch) => (
        deleteEmailApi(emailId).then(({success}) => {
            if (success) {
                return dispatch(deleteEmailAction(emailId))
            }

            throw new Error(`Unable to delete email ID# ${emailId}.`);
        })
    )
)


export const ADD_EMAIL = 'addEmail'
const addEmailAction = (newEmail) => ({
    type: ADD_EMAIL,
    payload: newEmail,
})

export const addEmail = (newEmail) => (
    (dispatch) => (
        addEmailApi(newEmail).then(({success}) => {
            if (success) {
                return dispatch(addEmailAction(newEmail))
            }
            throw new Error('Unable to send email!')
        }
    )
))
