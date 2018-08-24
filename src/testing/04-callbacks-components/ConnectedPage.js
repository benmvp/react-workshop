import {connect} from 'react-redux';
import Page from './Page';

import {
  getEmails as getEmailsAction,
  addEmail as addEmailAction,
  deleteEmail as deleteEmailAction,
  markRead as markReadAction,
  markUnread as markUnreadAction
} from '../actions';

export default connect(
  //_mapStateToProps
  state => ({emails: state}),
  //_mapDispatchToProps
  {
    getEmails: getEmailsAction,
    addEmail: addEmailAction,
    deleteEmail: deleteEmailAction,
    markRead: markReadAction,
    markUnread: markUnreadAction
  }
)(Page);
