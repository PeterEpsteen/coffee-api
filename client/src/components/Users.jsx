import React from 'react';
import App from '../App';

class Users extends React.Component {
    constructor(props){
        super(props);
        this.state = {users: [],
        active: {},
        newUser: {
            username: '',
            password: '',
            email: '',
        },
        login: {
            username: '',
            password: '',
            email: '',
        },
        profile: {
            username: '',
            password: '',
            email: '',
            id: ''
        }
    };
    this.setActive = this.setActive.bind(this);
    this.setUserName = this.setUserName.bind(this);
    this.setUserEmail = this.setUserEmail.bind(this);
    this.setUserPassword = this.setUserPassword.bind(this);
    this.setLoginUserName = this.setLoginUserName.bind(this);
    this.setLoginPassword = this.setLoginPassword.bind(this);
    this.addUser = this.addUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.loginHere = this.loginHere.bind(this);
    }
    componentDidMount(){
        this.UserList();
        this.callApi('/api/getUser/'+this.props.userID)
        .then(res => {
            if (res.data.hasOwnProperty('username'))
            this.setState({profile: res.data});
        }).catch(err => console.log(err));
    }

    addUser() {
        this.props.sendApi("POST", '/api/addUser', this.state.newUser)
        .then(res => {

                alert(res.message);
         
                this.UserList(); 
            })
        .catch(err => alert("Caught: "+ err));
    }
    loginHere() {
        var user = Object.assign(this.state.login);
        this.props.logToParent(user)
        .then(res => this.props.sendApi('POST', '/api/profile/'+res.id, {}))
        .then(res => this.setState({profile: res.data}))
        .catch(e => console.log(e));
    }
    
    deleteUser() {
        this.props.sendApi('DELETE', '/api/deleteUser', this.state.active)
        .then(res => {
            alert(res.message + res.status);
            this.setState({active: {}})
            this.UserList();
        })
        .catch(e => console.log(e));
    }
    UserList(){
        this.callApi('/api/getUsers')
        .then(res => this.setState({users: res.data}))
        .catch(err => console.log(err));
    }
    callApi = async (url) => {
        var headers = new Headers({
            "x-access-token": this.props.token
        });
        var init = {
            method: "GET",
            headers: headers
        };
        var myRequest = new Request(url, init);
        const response = await fetch(myRequest);
        const body = await response.json();
        if(response.status !== 200) throw Error(body.message);
        return body;
      }
    
    setActive(e) {
        this.setState({active: e})
    }
    setLoginPassword(e) {
        let oldUser = this.state.login;
        oldUser.password = e.target.value;
        this.setState({login: oldUser});
    }
    setLoginUserName(e){
        let oldUser = this.state.login;
        oldUser.username = e.target.value;
        this.setState({login: oldUser});
    }
    setUserName(event) {
        let oldUser = this.state.newUser;
        oldUser.username = event.target.value;
        this.setState({newUser: oldUser});
    }
    setUserPassword(e) {
        let oldUser = this.state.newUser;
        oldUser.password = e.target.value;
        this.setState({newUser: oldUser});
    }
    setUserEmail(e) {
        let oldUser = this.state.newUser;
        oldUser.email = e.target.value;
        this.setState({newUser: oldUser});
    }
    render(){
        return (
            <div className="users">
            <div className="row">
                <div className="col">
                <h3>Users</h3>
                <table className="selectUserTable">
                    <thead>
                        <td>Username</td>
                    </thead>
                    {this.state.users.map((e => {
                        let name = (this.state.active.id == e.id) ? 'active' : '';
                        return(
                            <tr>
                                <td className={name} onClick={() => this.setActive(e)}>{e.username}</td>
                            </tr>
                        );
                    }), this)}
                </table>
                </div>
                <div className="col">
                    <h3>Active User</h3>
                    <table>
                      <tr>
                          <td>Username</td>
                          <td>{this.state.active.username}</td>
                      </tr>
                      <tr>
                          <td>Password</td>
                          <td>{this.state.active.password}</td>
                      </tr>
                      <tr>
                          <td>Email</td>
                          <td>{this.state.active.email}</td>
                      </tr>
                      <tr>
                          <td>ID</td>
                          <td>{this.state.active.id}</td>
                      </tr>
                      <tr>
                          <td></td>
                          <td><button onClick={this.deleteUser}>Delete User</button></td>
                      </tr>
                    </table>
                    <h3>Logged in as: </h3>
                    <table>
                        <tr>
                        <td>
                            Username: 
                        </td>
                        <td>
                        {this.state.profile.username}
                        </td>
                        </tr>
                        <tr>
                            <td>
                                Email:
                            </td>
                            <td>
                                {this.state.profile.email}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Password:
                            </td>
                            <td>
                                {this.state.profile.password}
                            </td>
                        </tr>
                    </table>
                
                </div>
                
                </div>
                
                <div className="row">
                <div className="col">
                
                    <h3>Add User</h3>
                    <label>
                    Username 
                    <input value={this.state.newUser.username} onChange={this.setUserName} name="username" type="text"/>
                    </label>
                    <label htmlFor="">
                    Password
                    <input value={this.state.newUser.password} onChange={this.setUserPassword} name="password" type="text"/></label>
                    <label htmlFor="">
                    Email
                    <input value={this.state.newUser.email} onChange={this.setUserEmail} name="email" type="text"/></label>
                    <button onClick={this.addUser}> Add User </button>
                </div>
                <div className="col">
                <h3>Login</h3>
                    <label>
                    Username 
                    <input value={this.state.login.username} onChange={this.setLoginUserName} name="username" type="text"/>
                    </label>
                    <label htmlFor="">
                    Password
                    <input value={this.state.login.password} onChange={this.setLoginPassword} name="password" type="text"/></label>
                    
                    <button onClick={this.loginHere}> login </button>
                </div>
            </div>
            </div>
        );
    }
}

export default Users;