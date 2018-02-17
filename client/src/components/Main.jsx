import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import Users from './Users';
import Profile from './Profile'
export default class Main extends React.Component {
    render(){
        return(
            <Switch>
                <Route exact path ='/' render={(props) => (<Home login={this.props.login} sendApi={this.props.sendApi} {...props} />)} />
                <Route exact path='/users' render={(props) => (<Users logToParent={this.props.login} sendApi={this.props.sendApi} {...props} />)}/>
                <Route exact path='/profile' component={Profile} />
            </Switch>
        );
    }
} 