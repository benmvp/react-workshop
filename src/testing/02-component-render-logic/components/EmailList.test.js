import React from 'react';
import {mount} from 'enzyme';
import EmailList from './EmailList';
import EmailListItem from './EmailListItem';
import {EMAILS} from '../__fixtures__';

test('creates an EmailListItem for each email', () => {
  const component = mount(<EmailList emails={EMAILS} />);
  const emailListItems = component.find(EmailListItem);

  // verify that equal number of EmailListItem components were rendered
  expect(emailListItems).toHaveLength(EMAILS.length);

  // verify that each EmailListItem has the correct props
  emailListItems.forEach((emailListItem, index) => {
    expect(emailListItem).toHaveProp('email', EMAILS[index]);
  });
});

test('passes isSelected=true for matching selectedEmailId prop', () => {
  const component = mount(
    <EmailList
      emails={EMAILS}
      selectedEmailId={EMAILS[1].id}
    />
  );
  const emailListItems = component.find(EmailListItem);

  emailListItems.forEach((emailListItem, index) => {
    expect(emailListItem).toHaveProp('isSelected', index === 1);
  });
});
