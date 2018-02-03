import React, {Component} from 'react';

import EmailListItem from './EmailListItem';

export default class EmailList extends Component {
  render() {
    return (
      <ul className="email-list">
        <li>
          <EmailListItem
            from="alittle0@chronoengine.com"
            subject="Mauris lacinia sapien quis libero."
          />
        </li>
        <li>
          <EmailListItem
            from="amurray1@mit.edu"
            subject="Mauris ullamcorper purus sit amet nulla."
          />
        </li>
        <li>
          <EmailListItem
            from="dmccoy2@bluehost.com"
            subject="Suspendisse potenti."
          />
        </li>
        <li>
          <EmailListItem
            from="raustin3@hexun.com"
            subject="Maecenas rhoncus aliquam lacus"
          />
        </li>
        <li>
          <EmailListItem
            from="rwagner4@instagram.com"
            subject="Pellentesque ultrices mattis odio"
          />
        </li>
      </ul>
    );
  }
}
