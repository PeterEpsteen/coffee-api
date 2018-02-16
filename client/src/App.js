import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
class App extends Component {
  constructor(props) {
    super(props);
    
    this.sendApi = this.sendApi.bind(this);
  }
  componentDidMount() {
    // this.callApi()
    // .then(res => this.setState({users: res.data}))
    // .catch(err => console.log(err));
  }
 
  sendApi(method, url, data){
    return fetch(url, {
      body: JSON.stringify(data),
      cache: "no-cache",
      headers: {
        "content-type": "application/json"
      },
      method: method
    })
    .then(response => response.json())
    .catch(err => {throw Error(err)});
  }

  render() {
    return (
      <div className="App">

        <header className="App-header">
        <Header/>
        </header>
        <div className="main-container">
        <Main sendApi={this.sendApi}/>
        </div>
      </div>
    );
  }
}

export default App;
