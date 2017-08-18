import React, {PureComponent} from 'react';

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <h1>Hello world!</h1>
        <p>This is a paragraph of text written in React</p>
        <aside>
          <input type="text" id="input" placeholder="Fill me in please" />
        </aside>
      </div>
    );
  }
}
