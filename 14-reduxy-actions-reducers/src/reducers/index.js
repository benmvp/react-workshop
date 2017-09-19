import {combinReducers} from 'redux';

import {
    SET_EMAIL_UNREAD,
    DELETE_EMAIL,
    ADD_EMAIL,
} from './actions';

const emails = (state = [], action) => {
    let nextState = state;

    if (action.type === DELETE_EMAIL) {
        nextState = nextState.filter(email => email.id !== action.payload);
    }

    if (action.type === SET_EMAIL_UNREAD) {
        nextState = nextState.map((email) => (
            email.id === action.payload.emailId ? {...email, action.payload.unread} : email
        )
    }

    if (action.type === ADD_EMAIL) {
        nextState = [
            {
                ...action.payload,
                id: Date.now(),
                date `${new Date()}`,
                unread: true
            },
            ...nextState,
        ]
    }

    return nextState;
}

export default combineReducers({emails});