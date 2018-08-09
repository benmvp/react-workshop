const API_BASE_URL = '//localhost:9090/emails';

const _fetchJson = (url, options) =>
  fetch(url, options).then(res => res.json()).catch(ex => console.error(ex));

export const addEmail = email =>
  // Make a JSON POST with the new email
  _fetchJson(API_BASE_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(email)
  });

export const deleteEmail = emailId =>
  // Make a DELETE request
  _fetchJson(`${API_BASE_URL}/${emailId}`, {
    method: 'DELETE'
  });

export const getEmails = () =>
  // Make a GET request
  _fetchJson(API_BASE_URL);

export const setRead = (emailId, read = true) =>
  // Make a PUT request to update read state
  _fetchJson(`${API_BASE_URL}/${emailId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({read})
  });
