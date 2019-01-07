import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state = {
      coins: [],
      users: []
    }
    this.getUsers = this.getUsers.bind(this);
  }

  async componentDidMount() {
    const users = await this.getUsers();
    const coins = await this.getCoins();
    console.log('results: ', users, coins);
    this.setState({ users, coins })
  }

  async getUsers() {
    const resp = await axios.get('/users');
    console.log(resp.data);
    return resp.data;
  }


  async getCoins() {
    const resp = await axios.get('/coins');
    console.log(resp.data);
    return resp.data;
  }

  render() {
    return (
      <div className="App">
      {this.state.users.map(user => <div>{user.email}</div>)}
      {this.state.coins.map(coin => <div>{coin.name}</div>)}
      </div>
    );
  }
}

export default App;
