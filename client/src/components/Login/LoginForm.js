import React, {Component} from 'react';
import axios from 'axios';

const BASE_URL = `http://localhost:3000`;

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
        username: ''
      },
      token: '',
      loggedIn: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCoins = this.getCoins.bind(this);
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [name]: value
      }
    }))
  }

  async getCoins() {
    const TOKEN = this.state.token;
    const resp = await axios.get(`${BASE_URL}/coins`, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`
      }
    });
    console.log(resp.data);
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.props.handleCloseModal();
    console.log(this.state.user);
    const auth = await axios({
      method: 'post',
      url: `${BASE_URL}/user_token`,
      data: {
        auth: this.state.user
      }
    })

    // this.setState({token: auth.data.token, loggedIn: true})
    console.log(auth);
    this.props.setToken(auth.data.jwt)
    this.props.setLoggedUser(this.state.user.username);
    localStorage.setItem('token', auth.data.jwt);
    console.log('gets here');
  }

  render() {
    return (
      <div className='login-form'>
        <form className='login-form-container' onSubmit={this.handleSubmit}>
          <label className='login-form-email'>
            Email: {` `}
            <input type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
          </label>
          <br></br>
          <label className='login-form-username'>
            Username: {` `}
            <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
          </label>
          <br></br>
          <label className='login-form-password'>
            Password: {` `}
            <input type="text" name="password" value={this.state.password} onChange={this.handleChange}/>
          </label>
          <br></br>
          <button className="login-submit-button" type="submit">LOGIN</button>
        </form>
      </div>)
  }
}
