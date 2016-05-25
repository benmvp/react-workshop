import 'whatwg-fetch';

export const addEmail = (email) => (
    // Make a JSON POST with the new email
    fetch('//localhost:9090/emails', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
    })
        .then((res) => res.json())
);

export const deleteEmail = (emailId) => (
    // Make a DELETE request
    fetch(`//localhost:9090/emails/${emailId}`, {
        method: 'DELETE'
    })
        .then((res) => res.json())
);

export const getEmails = () => (
    // Make a GET request
    fetch('//localhost:9090/emails')
        .then((res) => res.json())
);

export const setUnread = (emailId, unread=true) => (
    // Make a PUT request to update unread state
    fetch(`//localhost:9090/emails/${emailId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({unread})
    })
    .then((res) => res.json())
);
