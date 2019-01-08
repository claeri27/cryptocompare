import React, {Component} from 'react';
import CryptoDetail from '../CryptoDetail/CryptoDetail.js';
import CryptoCoin from '../CryptoCoin/CryptoCoin';
import axios from 'axios';

export default class CryptoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      // symbol: [],
      // name: [],
      // price: [],
      // volume: [],
      // oneHrChange: [],
      // dayChange: [],
      // weekChange: [],
      // market_cap: []
    }
    this.getCoins = this.getCoins.bind(this);
  }

  async componentDidMount() {
    const coins = await this.getCoins();
    this.setState({coins})
  }

  async getCoins() {
    const resp = await axios.get('/coins');
    return resp.data;
  }


  render() {
    return(
      <div id="event-list">
        <CryptoCoin coins={this.state.coins} />
      </div>
    )
  }
}
