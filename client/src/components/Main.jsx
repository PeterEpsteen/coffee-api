import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import Users from './Users';
import Profile from './Profile';
import Brews from './Brews';
export default class Main extends React.Component {
    render(){
        return(
            <Switch>
                <Route exact path ='/' render={(props) => (<Home login={this.props.login} sendApi={this.props.sendApi} {...props} />)} />
                <Route exact path='/users' render={(props) => (<Users userID={this.props.userID} token={this.props.token} logToParent={this.props.login} sendApi={this.props.sendApi} {...props} />)}/>
                <Route exact path='/profile' component={Profile} />
                <Route exact path='/brews' render={(props) => (<Brews userID={this.props.userID}  token={this.props.token} logToParent={this.props.login} sendApi={this.props.sendApi} {...props} />)}/>

            </Switch>
        );
    }
} 