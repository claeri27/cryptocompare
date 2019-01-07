import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Nav from  './components/Nav/Nav';
require('dotenv').config();

class App extends Component {
  constructor(){
    super();
    this.state = {
      coins: [],
      users: [],
      exchanges: [],
      assets: []
    }
    this.getUsers = this.getUsers.bind(this);
    this.getCoins = this.getCoins.bind(this);
  }

  async componentDidMount() {
    const users = await this.getUsers();
    const coins = await this.getCoins();
    // console.log('results: ', users, coins);
    // console.log('exchanges: ', crypto);
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
      <Nav />
      {this.state.users.map(user => <div>{user.username}</div>)}
      {this.state.users.map(user => <div>{user.email}</div>)}
      {this.state.coins.map(coin => <div>{coin.name}{coin.symbol}</div>)}
      {/*{this.state.exchanges.map(exchange => <div>{exchange.name}</div>)}*/}
      </div>
    );
  }
}

export default App;
