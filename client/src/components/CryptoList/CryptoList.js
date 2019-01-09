import React, {Component} from 'react';
import axios from 'axios';
import './CryptoList.css';

export default class CryptoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      pressed: false
    }
    this.getCoins = this.getCoins.bind(this);
    this.getSortedCoins = this.getSortedCoins.bind(this);
  }

  async componentDidMount() {
    const coins = await this.getCoins();
    this.setState({coins})
    console.log(coins);
  }

  async getCoins() {
    const resp = await axios.get('/coins');
    return resp.data;
  }

  async getSortedCoins(input) {
    switch(input) {
      case 'rank':
        if(this.state.pressed === false) {
          const resp = await axios('/rank')
          this.setState({
            coins: resp.data,
            pressed: true
          });
        } else {
          const resp = await axios('/rank_down')
          this.setState({
            coins: resp.data,
            pressed: false
          })
        }
        break;
      case 'name':
        if(this.state.pressed === false) {
          const resp = await axios('/name')
          this.setState({
            coins: resp.data,
            pressed: true
          });
        } else {
          const resp = await axios('/name_down')
          this.setState({
            coins: resp.data,
            pressed: false
          })
        }
        break;
      case 'symbol':
        if(this.state.pressed === false) {
          const resp = await axios('/symbol')
          this.setState({
            coins: resp.data,
            pressed: true
          });
        } else {
          const resp = await axios('/symbol_down')
          this.setState({
            coins: resp.data,
            pressed: false
          })
        }
        console.log('symtest');
        break;
      case 'volume':
        if(this.state.pressed === false) {
          const resp = await axios('/volume')
          this.setState({
            coins: resp.data,
            pressed: true
          });
        } else {
          const resp = await axios('/volume_down')
          this.setState({
            coins: resp.data,
            pressed: false
          })
        }
        console.log('volume');
        break;
      case 'market-cap':
        if(this.state.pressed === false) {
          const resp = await axios('/market_cap')
          this.setState({
            coins: resp.data,
            pressed: true
          });
        } else {
          const resp = await axios('/market_cap_down')
          this.setState({
            coins: resp.data,
            pressed: false
          })
        }
        console.log('market');
        break;
      case 'change-1hr':
        if(this.state.pressed === false) {
          const resp = await axios('/percent_change_1h')
          this.setState({
            coins: resp.data,
            pressed: true
          });
        } else {
          const resp = await axios('/percent_change_1h_down')
          this.setState({
            coins: resp.data,
            pressed: false
          })
        }
        console.log('1hrchange');
        break;
      case 'change-24hr':
        if(this.state.pressed === false) {
          const resp = await axios('/percent_change_24h')
          this.setState({
            coins: resp.data,
            pressed: true
          });
        } else {
          const resp = await axios('/percent_change_24h_down')
          this.setState({
            coins: resp.data,
            pressed: false
          })
        }
        console.log('24hrchange');
        break;
      case 'change-7d':
        if(this.state.pressed === false) {
          const resp = await axios('/percent_change_7d')
          this.setState({
            coins: resp.data,
            pressed: true
          });
        } else {
          const resp = await axios('/percent_change_7d_down')
          this.setState({
            coins: resp.data,
            pressed: false
          })
        }
        console.log('7dchange');
        break;
      case 'price':
        if(this.state.pressed === false) {
          const resp = await axios('/current_price')
          this.setState({
            coins: resp.data,
            pressed: true
          });
        } else {
          const resp = await axios('/current_price_down')
          this.setState({
            coins: resp.data,
            pressed: false
          })
        }
        console.log('price');
        break;
      default:
        break;
    }
  }


  render() {
    return(
      <div id="crypto-list-wrapper">
        <div id="crypto-list">
          <div id="crypto-list-headers">
            <div className="coin-item-header" id="rank-header" onClick={() => this.getSortedCoins('rank')}>#</div>
            <div className="coin-item-header" id="name-header" onClick={() => this.getSortedCoins('name')}>NAME</div>
            <div className="coin-item-header" id="symbol-header" onClick={() => this.getSortedCoins('symbol')}>SYM</div>
            <div className="coin-item-header" id="volume-header" onClick={() => this.getSortedCoins('volume')}>24H VOLUME</div>
            <div className="coin-item-header" id="market-cap-header" onClick={() => this.getSortedCoins('market-cap')}>MARKET CAP</div>
            <div className="coin-item-header" id="change-1hr-header" onClick={() => this.getSortedCoins('change-1hr')}>1HR</div>
            <div className="coin-item-header" id="change-24hr-header" onClick={() => this.getSortedCoins('change-24hr')}>24HR</div>
            <div className="coin-item-header" id="change-7d-header" onClick={() => this.getSortedCoins('change-7d')}>7D</div>
            <div className="coin-item-header" id="price-header" onClick={() => this.getSortedCoins('price')}>PRICE(USD)</div>
          </div>
          {this.state.coins.map(coin => (
            <div className="coin-item-container">
              <div className="coin-item" id="coin-rank">{coin.cmc_rank} </div>
              <div className="coin-item" id="coin-name">{coin.name} </div>
              <div className="coin-item" id="coin-symbol">{coin.symbol} </div>
              <div className="coin-item" id="coin-volume">${Intl.NumberFormat().format(Math.round(coin.volume_24h))} </div>
              <div className="coin-item" id="coin-market-cap">${Intl.NumberFormat().format(Math.round(coin.market_cap))}</div>
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
