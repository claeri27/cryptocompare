import React, {Component} from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import './RegisterForm.css';

const BASE_URL = `http://localhost:3000`

export default class RegisterForm extends Component {
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

  async handleSubmit(e) {
    e.preventDefault();
    this.props.handleCloseModal();
    // const resp = await axios.post(`${BASE_URL}/register`, this.state.user);
    const resp = await axios({
      method: 'post',
      url: `${BASE_URL}/register`,
      data: {
        user: this.state.user
      }
    })
    const auth = await axios({
      method: 'post',
      url: `${BASE_URL}/user_token`,
      data: {
        auth: this.state.user
      }
    })
    if (resp.data.token !== null) {
      console.log(`You have logged in ${resp.data.username}!`, auth.data.jwt);
      console.log(resp);
      localStorage.setItem('token', auth.data.jwt);
      this.props.setToken(auth.data.jwt)
      this.props.setLoggedUser(resp.data.username);
    }
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

  render() {
    return (<div className='register-form'>
      <form className='register-form-container' onSubmit={this.handleSubmit}>
        <label className='register-form-email'>
          Email: {` `}
          <input type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
        </label>
        <br></br>
        <label className='register-form-username'>
          Username: {` `}
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
        </label>
        <br></br>
        <label className='register-form-password'>
          Password: {` `}
          <input type="text" name="password" value={this.state.password} onChange={this.handleChange}/>
        </label>
        <br></br>
        <button className='register-submit-button' type="submit">REGISTER</button>
      </form>
    </div>)
  }
}
