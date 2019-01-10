import React, {Component} from 'react';
import ReactModal from 'react-modal';
import RegisterForm from '../Register/RegisterForm';
import LoginForm from '../Login/LoginForm';
import './Nav.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYinYang } from '@fortawesome/free-solid-svg-icons'

library.add(faYinYang)

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: '',
      registered: false,
      showModal: false
    }
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  setNavView(view) {
    this.setState({view: view})
  }

  getNavView() {
    if (this.state.view === 'register') {
      return (
        <div className='modal-register'>
          <ReactModal style={customStyles} isOpen={this.state.showModal}>
            <RegisterForm setView={this.props.setView} setToken={this.props.setToken} setLoggedUser={this.props.setLoggedUser} setLoggedView={this.setLoggedView} handleCloseModal={this.handleCloseModal}/>
            <button className='modal-close-button' onClick={this.handleCloseModal}>CANCEL</button>
          </ReactModal>
        </div>)
    } else if (this.state.view === 'login') {
      return (
        <div className='modal-login'>
          <ReactModal style={customStyles} isOpen={this.state.showModal}>
            <LoginForm setView={this.props.setView} setToken={this.props.setToken} setLoggedUser={this.props.setLoggedUser} setLoggedView={this.setLoggedView} handleCloseModal={this.handleCloseModal}/>
            <button className='modal-close-button' onClick={this.handleCloseModal}>CANCEL</button>
          </ReactModal>
        </div>)
    } else if (this.state.view === 'userform') {
      return (
        <div>
          <button onClick={() => {
              this.setNavView('')
            }}>Cancel</button>
        </div>)
    }
  }

  getLoggedView() {
    if (this.props.token === null) {
      return (
        <React.Fragment>
          <div id='nav-buttons-wrapper'>
            <div className='nav-buttons' id='login-button' onClick={() => {
                this.setNavView('login');
                this.handleOpenModal();
              }}>
              LOGIN
            </div>
            <div className='nav-buttons' id='register-button' onClick={() => {
                this.setNavView('register');
                this.handleOpenModal()
              }}>
              REGISTER
            </div>
          </div>
        </React.Fragment>)
    } else if (this.props.token !== null) {
      return (
        <React.Fragment>
          {console.log(this.props)}
          <div id="nav-buttons-wrapper">
            <div className='nav-buttons' id="login-button" onClick={() => {
                this.props.changeView('userPage')
              }}>
              <div id="nav-portal-button">{
                  (
                    this.props.user !== null
                    ? 'P'
                    : '')
                }</div>
            </div>
            <div className='nav-buttons' id='register-button' onClick={() => {
                this.props.setLoggedUser({});
                this.props.setToken(null);
                this.props.changeView('welcome');
                localStorage.removeItem('token');
                console.log(`You have logged out ${this.props.user}`);
              }}>LOGOUT</div>
          </div>
        </React.Fragment>)
    }
  }

  handleOpenModal() {
    this.setState({showModal: true});
    console.log(this.state.showModal);
  }

  handleCloseModal() {
    this.setState({showModal: false});
  }

  render() {
    return (
      <div className="nav">
        <div id="title">Crypto<FontAwesomeIcon icon="faYinYang"/>Compare</div>
        {this.getLoggedView()}
        {this.getNavView()}
      </div>)
  }
}
