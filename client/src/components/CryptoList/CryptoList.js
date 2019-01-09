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
      <div id="crypto-list-wrapper">
        <div id="crypto-list">
          <div id="crypto-list-headers">
            <div className="coin-item-header" id="name-header">NAME</div>
            <div className="coin-item-header" id="symbol-header">SYM</div>
            <div className="coin-item-header" id="volume-header">24H VOLUME</div>
            <div className="coin-item-header" id="market-cap-header">MARKET CAP</div>
            <div className="coin-item-header" id="change-1hr-header">1HR</div>
            <div className="coin-item-header" id="change-24hr-header">24HR</div>
            <div className="coin-item-header" id="change-7d-header">7D</div>
            <div className="coin-item-header" id="price-header">PRICE(USD)</div>
          </div>
          {this.state.coins.map(coin => (
            <div className="coin-item-container">
              <div className="coin-item" id="coin-name">{coin.name} </div>
              <div className="coin-item" id="coin-symbol">{coin.symbol} </div>
              <div className="coin-item" id="coin-volume">{Math.round(coin.volume_24h)} </div>
              <div className="coin-item" id="coin-market-cap">{Math.round(coin.market_cap)}</div>
              <div className="coin-item" id="coin-change-1hr">{Math.round(coin.percent_change_1h * 100) / 100}%</div>
              <div className="coin-item" id="coin-change-24hr">{Math.round(coin.percent_change_24h * 100) / 100}%</div>
              <div className="coin-item" id="coin-change-7d">{Math.round(coin.percent_change_7d * 100) / 100}%</div>
              <div className="coin-item" id="coin-price">${Math.round(coin.current_price * 10000) / 10000}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
