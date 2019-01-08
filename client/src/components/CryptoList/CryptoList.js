import React, {Component} from 'react';
import CryptoDetail from '../CryptoDetail/CryptoDetail.js';
import CryptoCoin from '../CryptoCoin/CryptoCoin';
import axios from 'axios';
import './CryptoList.css';

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
      <div id="crypto-list">
        {this.state.coins.map(coin => (
          <div className="coin-item-container">
            <div className="coin-item" id="coin-name">{coin.name} </div>
            <div className="coin-item" id="coin-symbol">{coin.symbol} </div>
            <div className="coin-item" id="coin-price">{coin.current_price} </div>
            <div className="coin-item" id="coin-volume">{coin.volume_24h} </div>
            <div className="coin-item" id="coin-change-1hr">{coin.percent_change_1h} </div>
            <div className="coin-item" id="coin-change-24hr">{coin.percent_change_24h} </div>
            <div className="coin-item" id="coin-change-7d">{coin.percent_change_7d} </div>
            <div className="coin-item" id="coin-market-cap">{coin.market_cap}</div>
          </div>
        ))}
      </div>
    )
  }
}
