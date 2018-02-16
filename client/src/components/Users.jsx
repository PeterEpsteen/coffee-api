import React from 'react';

class Users extends React.Component {
    constructor(props){
        super(props);
        this.state = {users: []};
    }
    componentDidMount(){
        this.UserList();
    }
    UserList(){
        this.callApi()
        .then(res => this.setState({users: res.data}))
        .catch(err => console.log(err));
    }
    callApi = async () => {
        const response = await fetch('/api/getUsers');
        const body = await response.json();
        if(response.status !== 200) throw Error(body.message);
        return body;
      }
    
    render(){
        return (
            <div>
                <h3>Users</h3>
                <table>
                    <thead>
                        <td>Username</td>
                    </thead>
                    {this.state.users.map(e => {
                        return(
                            <tr>
                                <td>{e.username}</td>
                            </tr>
                        );
                    })}
                </table>
                <div className="row">
                    <h3>Add User</h3>
                    <label>
                    Username 
                    <input name="username" type="text"/>
                    </label>
                </div>
            </div>
        );
    }
}

export default Users;