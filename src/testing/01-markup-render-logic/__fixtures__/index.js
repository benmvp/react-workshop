export const DEFAULT_EMAIL = {
  id: 2,
  date: '11/18/2018',
  from: 'amurray1@mit.edu',
  to: 'i@me.com',
  read: false,
  subject: 'Mauris ullamcorper purus sit amet nulla.',
  message: '<em><strong>Sed ante.</strong></em> Vivamus tortor. Duis mattis egestas metus.<br /><br />Aenean fermentum. 😀 Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.<br /><br />Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
};

export const READ_EMAIL = {
  ...DEFAULT_EMAIL,
  id: 23,
  read: true,
};
