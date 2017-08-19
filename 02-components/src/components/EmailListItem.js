import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class EmailListItem extends PureComponent {
  static propTypes = {
    from: PropTypes.string,
    subject: PropTypes.string
  };

  render() {
    let {from, subject} = this.props;

    return (
      <div className="email-list-item">
        <span>
          {from}
        </span>
        <span>
          {subject}
        </span>
      </div>
    );
  }
}
