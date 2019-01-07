import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

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
    this.getCryptoAssets = this.getCryptoAssets.bind(this);
    this.getCryptoExchanges = this.getCryptoExchanges.bind(this);
  }

  async componentDidMount() {
    const users = await this.getUsers();
    const coins = await this.getCoins();
    const exchanges = await this.getCryptoExchanges();
    const assets = await this.getCryptoAssets();
    console.log('results: ', users, coins);
    console.log('exchanges: ', crypto);
    this.setState({ users, coins, exchanges, assets })
  }

  async getUsers() {
    const resp = await axios.get('/users');
    console.log(resp.data);
    return resp.data;
  }

  async getCryptoExchanges() {
    const resp = await axios.get('https://rest.coinapi.io/v1/exchanges?apikey=69579FBA-8DAA-467E-A12E-FA4D4C0CA009');
    console.log(resp.data);
    return resp.data;
  }

  async getCryptoAssets() {
    const resp = await axios('https://rest.coinapi.io/v1/assets?apikey=69579FBA-8DAA-467E-A12E-FA4D4C0CA009');
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
      {this.state.users.map(user => <div>{user.username}</div>)}
      {this.state.users.map(user => <div>{user.email}</div>)}
      {this.state.coins.map(coin => <div>{coin.name}</div>)}
      {/*{this.state.exchanges.map(exchange => <div>{exchange.name}</div>)}*/}
      {this.state.assets.map(asset => <div>{asset.asset_id}</div>)}
      </div>
    );
  }
}

export default App;
