import 'whatwg-fetch';

export const addEmail = (emailInfo) => (
    // Make a JSON POST with the new email
    fetch('/api/emails', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailInfo)
    })
        .then((res) => res.json())
);

export const deleteEmail = (emailId) => (
    // Make a DELETE request
    fetch(`/api/emails/${emailId}`, {
        method: 'DELETE'
    })
        .then((res) => res.json())
);

export const getEmails = () => (
    // Make a GET request
    fetch('/api/emails')
        .then((res) => res.json())
);

export const setUnread = (emailId, unread=true) => (
    // Make a PUT request to update unread state
    fetch(`/api/emails/${emailId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({unread})
    })
    .then((res) => res.json())
);
