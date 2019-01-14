import React, {Component} from "react";
import "./App.css";
import axios from "axios";
import Nav from "./components/Nav/Nav";
import CryptoList from "./components/CryptoList/CryptoList";
import jwtDecode from "jwt-decode";
import HomePage from "./components/HomePage/HomePage";
import styled from "styled-components";
require("dotenv").config();

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: localStorage.getItem("token") !== null
        ? localStorage.getItem("token")
        : null,
      user: localStorage.getItem("token") !== null
        ? jwtDecode(localStorage.getItem("token"))
        : {},
      view: localStorage.getItem("token") !== null
        ? "loggedIn"
        : "welcome"
    };
    this.setToken = this.setToken.bind(this);
    this.setLoggedUser = this.setLoggedUser.bind(this);
  }

  async componentDidMount() {
    console.log(this.state.token, this.state.user);
  }

  async setToken(token) {
    await this.setState(prevState => ({
      ...prevState,
      token: token,
      view: "loggedIn"
    }));
  }

  async setLoggedUser(user) {
    await this.setState(prevState => ({
      ...prevState,
      user: user
    }));
  }

  getView() {
    switch (this.state.view) {
      case "loggedIn":
        return (<div>
          <Nav changeView={this.changeView} setToken={this.setToken} setLoggedUser={this.setLoggedUser} token={this.state.token} user={this.state.user} view={this.state.view}/>
          <CryptoList/>
        </div>);
      case "welcome":
        return (<div>
          <Nav changeView={this.changeView} setToken={this.setToken} setLoggedUser={this.setLoggedUser} token={this.state.token} user={this.state.user} view={this.state.view}/>
          <CryptoList/>
        </div>);
      default:
    }
  }

  changeView = view => {
    this.setState({view: view});
  };

  render() {
    return <div className="App">{this.getView()}</div>;
  }
}

export default App;
