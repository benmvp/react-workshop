import {
    addEmail as addEmailApi,
    getEmails as getEmailsApi,
    deleteEmail as deleteEmailApi,
    setRead as setReadApi
} from '../api'

export const UPDATE_EMAILS = 'updateEmails';
export const updateEmails = (emails) => ({
    type: UPDATE_EMAILS,
    payload: emails,
})

export const getEmails = () => (
    (dispatch) => (
        getEmailsApi()
            .then((response) => (dispatch(updateEmails(response))))
    )
)

export const SET_EMAIL_READ = 'setEmailRead';
const setEmailRead = (emailId, read) => ({
    type: SET_EMAIL_READ,
    payload: {
        emailId,
        read,
    },
})

const _setRead = (dispatch, emailId, read) => (
    setReadApi(emailId, read).then(({success}) => {
        if (success) {
            return dispatch(setEmailRead(emailId, read))
        }

        throw new Error(
            `Unable to set email ID# ${emailId} read state to ${read}.`
        )
    }
))

export const markUnread = (emailId) => (
    (dispatch) => _setRead(dispatch, emailId, false)
)

export const markRead = (emailId) => (
    (dispatch) => _setRead(dispatch, emailId, true)
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
  