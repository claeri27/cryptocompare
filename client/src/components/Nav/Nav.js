import React, {Component} from 'react';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registered: false
    }
  }

  render() {
    return (<div className="nav">
      <h1 id="title">CryptoCompare</h1>
      <div id="loginButton"></div>
      <div id="registerButton"></div>
    </div>)
  }
}
