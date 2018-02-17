import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ""
    };
    this.sendApi = this.sendApi.bind(this);
    this.login = this.login.bind(this);
  }
  componentDidMount() {
    // this.callApi()
    // .then(res => this.setState({users: res.data}))
    // .catch(err => console.log(err));
  }
  login(user) {
    return  new Promise((resolve, reject)=> {
      this.sendApi('POST', '/api/login', user)
      .then(res => {
        if(res.hasOwnProperty('token')) {
          this.setState({token: res.token});
          resolve(res);
        }
      }).catch(err => {reject(err)});
    });
    // })
    // .then(res => res)
    //   // if(res.hasOwnProperty('token'))
    //   //   this.setState({token: res.token});
    //   // else
    //   //   alert("try again");
    //   // return res;
    // // })
  }
  sendApi(method, url, data){
    data.token = this.state.token;
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
        <Main login={this.login} sendApi={this.sendApi}/>
        </div>
      </div>
    );
  }
}

export default App;
