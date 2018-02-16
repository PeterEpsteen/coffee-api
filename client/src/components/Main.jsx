import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import Users from './Users';
export default class Main extends React.Component {
    render(){
        return(
            <Switch>
                <Route exact path ='/' component={Home}/>
                <Route exact path='/users' component={Users}/>
            </Switch>
        );
    }
} 