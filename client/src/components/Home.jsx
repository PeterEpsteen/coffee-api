import React from 'react';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            login: {
                username: '',
                password: '',
            }
        };
        this.setLoginPassword = this.setLoginPassword.bind(this);
        this.setLoginUserName = this.setLoginUserName.bind(this);
        this.loginHere = this.loginHere.bind(this);
    }
    setLoginUserName(e){
        let old = this.state.login;
        old.username = e.target.value;
        this.setState({login: old});
    }
    setLoginPassword(e){
        let old = this.state.login;
        old.password = e.target.value;
        this.setState({login: old});
    }
    loginHere(e) {
        var user = Object.assign(this.state.login);
        this.props.login(user)
        .then(res => {
            if (res.hasOwnProperty("token"))
                this.props.history.push("/users");
            else
                alert("Invalid login");
        })
        .catch(err => console.log(err));
    }
    render(){
        return (
            <div className="users">
                <div className="row">
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

export default Home;