import React from 'react';

export const EMAIL_PROP_TYPE = React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    from: React.PropTypes.string.isRequired,
    subject: React.PropTypes.string.isRequired,
    message: React.PropTypes.string.isRequired,
    unread: React.PropTypes.bool
});
