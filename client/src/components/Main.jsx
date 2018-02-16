import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import Users from './Users';
export default class Main extends React.Component {
    render(){
        return(
            <Switch>
                <Route exact path ='/' render={(props) => (<Home test="testugsdgs" sendApi={this.props.sendApi} {...props} />)} />
                <Route exact path='/users' render={(props) => (<Users test="testugsdgs" sendApi={this.props.sendApi} {...props} />)}/>
            </Switch>
        );
    }
} 