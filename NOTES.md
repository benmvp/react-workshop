# NOTES

## Proposed changes

Reorder the steps to focus on key React functionality (like updating `state`) before dealing with API calls. Also incorporate styling earlier so what we look at looks better earlier since half-day sessions don't make it to step 10.

- 03-lists
  * import `EmailListItem.css` and add CSS classes to elements
- 04-email-view
  * build interactivity
  * still keep `EMAILS` const
  * `this.state.selectedEmailId`
  * reorder steps to be bottom-up
  * import `EmailView.css` and add relevant CSS classes to elements
- 05-email-form
  * import `EmailForm.css` and add relevant CSS classes to eleements
- 06-submit-email-form
  * move `EMAILS` to `this.state.emails` default value
  * do array concatenation to show principle of not mutating data
- 07-delete-email
  * delete email by doing `.filter`
  * style delete button by adding "status" element + CSS class??? (see how it looks w/o it)
- 08-fetch
  * in `componentDidMount` `GET` emails + polling
  * in `_handleFormSubmit` `POST` new email + optimistic update
  * in `_handleItemDelete` `DELETE` email + optimistic update
- 09-mark-unread
  * Add button and existing delete button to "status" element + CSS class
- 10-styling
  * app layout
  * conditional class names with `classnames` lib
