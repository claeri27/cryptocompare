import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Nav from  './components/Nav/Nav';
import CryptoList from './components/CryptoList/CryptoList';
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
    return resp.data;
  }

  async getCoins() {
    const resp = await axios.get('/coins');
    return resp.data;
  }

  render() {
    return (
      <div className="App">
      <Nav />
      {/*{this.state.users.map(user => <div>{user.username}</div>)}*/}
      {/*{this.state.users.map(user => <div>{user.email}</div>)}*/}
      <CryptoList />
      {/*{this.state.coins.map(coin => <div>Name: {coin.name} Sym: {coin.symbol}Price: {coin.current_price} 24hr Volume: {coin.volume_24h} 1hChange: {coin.percent_change_1h} 24hrChange: {coin.percent_change_24h} 7dChange: {coin.percent_change_7d} MarketCap: {coin.market_cap}</div>)}*/}
      {/*{this.state.exchanges.map(exchange => <div>{exchange.name}</div>)}*/}
      </div>
    );
  }
}

export default App;
