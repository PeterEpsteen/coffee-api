import React from 'react';

export default class Brews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            brew: {
                user_id: 0,
                brew_name: '',
                brew_date: '',
                brew_method: '',
                water_units: 0.0,
                coffee_units:0.0,
                water_metric: false,
                coffee_metric: false,
                notes: '',
                grind: '',
                bloom_time: '',
                brew_time: '',
                temperature: ''
            },
            brewList: []
        }
        this.setProperty = this.setProperty.bind(this);
        this.sendBrew = this.sendBrew.bind(this);
        this.callApi = this.callApi.bind(this);
    }
    componentDidMount(){
        if(this.props.token !== ""){
            this.callApi('/api/brews')
            .then(res => this.setState({brewList: res.data}))
            .catch(err => console.log(err));
        }
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
    sendBrew(e) {
        let brew = this.state.brew;
        brew.brew_date = new Date();
        brew.user_id = this.props.userID;
        this.props.sendApi('POST', '/api/brews', brew)
        .then(res => alert(res.message))
        .catch(err => console.log(err));
    }
    setProperty(brewProperty, e) {
        let brew = this.state.brew;
        brew[brewProperty] = e.target.value;
        this.setState({brew: brew});
    }
    render() {
        
        return(
          
            <div className="users">
                    {this.props.token === "" && 
                        <h1>Please Login to add Brew</h1>
                    }
                    {this.props.token !== "" &&
                    <div className="row">

                    <div className="col">
                    <h1>Create Brew</h1>
                        <label htmlFor="">
                        Brew Name
                        <input onChange={(e) => this.setProperty("brew_name", e)} type="text" value={this.state.brew.brew_name}/></label>
                        <label htmlFor="">
                        Brew Method
                        <input onChange={(e) => this.setProperty("brew_method", e)} type="text" value={this.state.brew.brew_method}/></label>
                        <label htmlFor="">
                        Amount of Water
                        <input onChange={(e) => this.setProperty("water_units", e)} type="number" step=".01" value={this.state.brew.water_units}/></label> <label htmlFor="">
                        Amount of Coffee
                        <input onChange={(e) => this.setProperty("coffee_units", e)} type="number" step=".01" value={this.state.brew.coffee_units}/></label> <label htmlFor="">
                        Coffee Metric?
                        <input onChange={(e) => this.setProperty("coffee_metric", e)} type="checkbox" value="true"/></label> <label htmlFor="">
                        Water Metric?
                        <input onChange={(e) => this.setProperty("water_metric", e)} type="checkbox" value="true"/></label>
                        <label htmlFor="">
                        Notes
                        <input onChange={(e) => this.setProperty("notes", e)} type="text" value={this.state.brew.notes}/></label>
                        <label htmlFor="">
                        Grind
                        <input onChange={(e) => this.setProperty("grind", e)} type="text" value={this.state.brew.grind}/></label>
                        <label htmlFor="">
                        Bloom Time
                        <input onChange={(e) => this.setProperty("bloom_time", e)} type="number" value={this.state.brew.bloom_time}/></label>
                        <label htmlFor="">
                        Brew Time
                        <input onChange={(e) => this.setProperty("brew_time", e)} type="number" value={this.state.brew.brew_time}/></label>
                        <label htmlFor="">
                        Temperature
                        <input onChange={(e) => this.setProperty("temperature", e)} type="number" value={this.state.brew.temperature}/></label>
                        <button onClick={this.sendBrew} >Send Brew</button>
                        </div>
                        <div className="col">
                        <h1>Brews</h1>
                        {this.state.brewList.map(brew => {
                            let name = (brew.active) ? 'active' : '';
                            return(
                                <p>
                                    {brew.brew_name}
                                </p>
                            );
                        })}
                        </div>
                        </div>

                    }
                </div>
        );
    }
}