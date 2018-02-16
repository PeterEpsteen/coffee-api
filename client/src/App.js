import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.loadUsers = this.loadUsers.bind(this);
  }
  componentDidMount() {
    // this.callApi()
    // .then(res => this.setState({users: res.data}))
    // .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch('/api/getUsers');
    const body = await response.json();
    if(response.status !== 200) throw Error(body.message);
    return body;
  }
  loadUsers() {
    this.callApi()
    .then(res => this.setState({users: res.data}))
    .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="App">

        <header className="App-header">
        <Header/>
        </header>
        <div className="main-container">
        <Main/>
        </div>
      </div>
    );
  }
}

export default App;
