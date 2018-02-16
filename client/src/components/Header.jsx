import React from 'react';
import Link from 'react-router-dom/Link';

export default class Header extends React.Component {
    render(){
        return(
            <nav>
                <ul>
                    <li><Link to='/'>Coffee Keeper</Link></li>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/Users'>Users</Link></li>
                    <li><Link to='/Brews'>Brews</Link></li>

                </ul>
            </nav>
        );
    }
} 