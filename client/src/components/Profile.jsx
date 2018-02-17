import React from 'react';

class Profile  extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: {
                username: '',
                email: '',
                brews: ''
            }
        }
    }
    render(){
        return (
            <div>
                <p>Your are now logged in.</p>
            </div>
        );
    }
}

export default Profile;