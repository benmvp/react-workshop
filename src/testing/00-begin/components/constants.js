import PropTypes from 'prop-types';

export const EMAIL_PROP_TYPE = PropTypes.shape({
  id: PropTypes.number.isRequired,
  from: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  read: PropTypes.bool
});
