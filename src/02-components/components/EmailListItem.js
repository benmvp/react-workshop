import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class EmailListItem extends Component {
  // declare types of expected props
  // i.e. the component's interface
  static propTypes = {
    from: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired
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
