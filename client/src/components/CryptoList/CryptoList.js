import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CryptoList.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faSyncAlt } from '@fortawesome/free-solid-svg-icons'

const URL = '/api';

library.add(faArrowLeft, faArrowRight, faSyncAlt)

export default function CryptoList(props) {
  const [coins, setCoins] = useState([]);
  const [pressed, setPressed] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
      getCoins()
  }, [])

  async function getCoins() {
    const resp = await axios.get(URL + '/coins');
    setCoins(resp.data);
  }

  async function getSortedCoins(input) {
    switch(input) {
      case 'rank':
        if(pressed === false) {
          const resp = await axios(URL + '/rank');
          setCoins(resp.data);
          setPressed(true);
        } else {
          const resp = await axios(URL + '/rank_down')
          setCoins(resp.data);
          setPressed(false);
        }
        break;
      case 'name':
        if(pressed === false) {
          const resp = await axios(URL + '/name')
          setCoins(resp.data);
          setPressed(true);
        } else {
          const resp = await axios(URL + '/name_down')
          setCoins(resp.data);
          setPressed(false);
        }
        break;
      case 'symbol':
        if(pressed === false) {
          const resp = await axios(URL + '/symbol')
          setCoins(resp.data);
          setPressed(true);
        } else {
          const resp = await axios(URL + '/symbol_down')
          setCoins(resp.data);
          setPressed(false);
        }
        console.log('symtest');
        break;
      case 'volume':
        if(pressed === false) {
          const resp = await axios(URL + '/volume')
          setCoins(resp.data);
          setPressed(true);
        } else {
          const resp = await axios(URL + '/volume_down')
          setCoins(resp.data);
          setPressed(false);
        }
        console.log('volume');
        break;
      case 'market-cap':
        if(pressed === false) {
          const resp = await axios(URL + '/market_cap')
          setCoins(resp.data);
          setPressed(true);
        } else {
          const resp = await axios(URL + '/market_cap_down')
          setCoins(resp.data);
          setPressed(false);
        }
        console.log('market');
        break;
      case 'change-1hr':
        if(pressed === false) {
          const resp = await axios(URL + '/percent_change_1h')
          setCoins(resp.data);
          setPressed(true);
        } else {
          const resp = await axios(URL + '/percent_change_1h_down')
          setCoins(resp.data);
          setPressed(false);
        }
        console.log('1hrchange');
        break;
      case 'change-24hr':
        if(pressed === false) {
          const resp = await axios(URL + '/percent_change_24h')
          setCoins(resp.data);
          setPressed(true);
        } else {
          const resp = await axios(URL + '/percent_change_24h_down')
          setCoins(resp.data);
          setPressed(false);
        }
        console.log('24hrchange');
        break;
      case 'change-7d':
        if(pressed === false) {
          const resp = await axios(URL + '/percent_change_7d')
          setCoins(resp.data);
          setPressed(true);
        } else {
          const resp = await axios(URL + '/percent_change_7d_down')
          setCoins(resp.data);
          setPressed(false);
        }
        console.log('7dchange');
        break;
      case 'price':
        if(pressed === false) {
          const resp = await axios(URL + '/current_price')
          setCoins(resp.data);
          setPressed(true);
        } else {
          const resp = await axios(URL + '/current_price_down')
          setCoins(resp.data);
          setPressed(false);
        }
        console.log('price');
        break;
      default:
        break;
    }
  }

  async function getNextCoins() {
    const resp = await axios.post(URL + '/next',
      {
        "page": page
      }
    );
    setCoins(resp.data);
    setPage(page + 1);
  }

  async function getPreviousCoins() {
    const resp = await axios.post(URL + '/previous',
      {
        "page": page
      }
    )
    if(page !== 0) {
      setCoins(resp.data);
      setPage(page - 1);
    }
  }

  function refreshPage() {
    window.location.reload();
  }

  return(
    <div id="crypto-list-wrapper">
      <div id="crypto-list">
        <div id="crypto-list-buttons">
          <div id="previous-button" onClick={async () => await getPreviousCoins()}><FontAwesomeIcon icon="arrow-left"/></div>
          <div id="refresh-button"><FontAwesomeIcon icon="sync-alt"/></div>
          <div id="next-button" onClick={async () => await getNextCoins()}><FontAwesomeIcon icon="arrow-right"/></div>
        </div>
        <div id="crypto-list-headers">
          <div className="coin-item-header" id="rank-header" onClick={() => getSortedCoins('rank')}>#</div>
          <div className="coin-item-header" id="name-header" onClick={() => getSortedCoins('name')}>NAME</div>
          <div className="coin-item-header" id="symbol-header" onClick={() => getSortedCoins('symbol')}>SYM</div>
          <div className="coin-item-header" id="volume-header" onClick={() => getSortedCoins('volume')}>24H VOLUME</div>
          <div className="coin-item-header" id="market-cap-header" onClick={() => getSortedCoins('market-cap')}>MARKET CAP</div>
          <div className="coin-item-header" id="change-1hr-header" onClick={() => getSortedCoins('change-1hr')}>1HR</div>
          <div className="coin-item-header" id="change-24hr-header" onClick={() => getSortedCoins('change-24hr')}>24HR</div>
          <div className="coin-item-header" id="change-7d-header" onClick={() => getSortedCoins('change-7d')}>7D</div>
          <div className="coin-item-header" id="price-header" onClick={() => getSortedCoins('price')}>PRICE(USD)</div>
        </div>
        {coins.map(coin => (
          <div className="coin-item-container">
            <div className="coin-item" id="coin-rank">{coin.cmc_rank} </div>
            <div className="coin-item" id="coin-name">{coin.name} </div>
            <div className="coin-item" id="coin-symbol">{coin.symbol} </div>
            <div className="coin-item" id="coin-volume">${Intl.NumberFormat().format(Math.round(coin.volume_24h))} </div>
            <div className="coin-item" id="coin-market-cap">${Intl.NumberFormat().format(Math.round(coin.market_cap))}</div>
            <div className={`coin-item ${coin.percent_change_1h < 0 ? 'coin-red' : 'coin-green'}`} id="coin-change-1hr">{Math.round(coin.percent_change_1h * 100) / 100}%</div>
            <div className={`coin-item ${coin.percent_change_24h < 0 ? 'coin-red' : 'coin-green'}`} id="coin-change-24hr">{Math.round(coin.percent_change_24h * 100) / 100}%</div>
            <div className={`coin-item ${coin.percent_change_7d < 0 ? 'coin-red' : 'coin-green'}`} id="coin-change-7d">{Math.round(coin.percent_change_7d * 100) / 100}%</div>
            <div className="coin-item" id="coin-price">${Math.round(coin.current_price * 10000) / 10000}</div>
          </div>
        ))}
      </div>
      <div id="crypto-list-buttons">
        <div id="previous-button" onClick={async () => await getPreviousCoins()}><FontAwesomeIcon icon="arrow-left"/></div>
        <div id="refresh-button"><FontAwesomeIcon icon="sync-alt"/></div>
        <div id="next-button" onClick={async () => await getNextCoins()}><FontAwesomeIcon icon="arrow-right"/></div>
      </div>
    </div>
  )
}
