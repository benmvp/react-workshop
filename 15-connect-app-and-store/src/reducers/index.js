import {
    SET_EMAIL_UNREAD,
    DELETE_EMAIL,
    ADD_EMAIL,
    UPDATE_EMAILS,
} from '../actions';

export const emails = (state = [], action) => {
    let nextState = state;

    if (action.type === UPDATE_EMAILS) {
        nextState = action.payload;
    }

    if (action.type === DELETE_EMAIL) {
        nextState = nextState.filter(email => email.id !== action.payload);
    }

    if (action.type === SET_EMAIL_UNREAD) {
        nextState = nextState.map((email) => (
            email.id === action.payload.emailId ? {...email, unread: action.payload.unread} : email
        ))
    }

    if (action.type === ADD_EMAIL) {
        nextState = [
            {
                ...action.payload,
                id: Date.now(),
                date: `${new Date()}`,
                unread: true
            },
            ...nextState,
        ]
    }

    return nextState;
}
