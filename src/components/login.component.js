import React, {Component} from "react";
import axios from 'axios';
import {Link} from "react-router-dom";


export default class Login extends Component {
    constructor(props) {
        super(props);
        // Pretty sure this is the part that tells it to update what you see when the described command changes
        this.onEnterUsername = this.onEnterUsername.bind(this);
        this.onEnterPassword = this.onEnterPassword.bind(this);

        this.state = {
            username: '',
            password: ''
        }
    }

    // Setting the payload when entering values? e is the payload
    onEnterUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onEnterPassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit() {
        axios.get('https://api-dot-mernstack-276607.wn.r.appspot.com/users/')
            .then(res => console.log(res))
    }


    render() {
        return (
            <div>
                <h3>Sign In</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.username}
                               onChange={this.onEnterUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.password}
                               onChange={this.onEnterPassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Sign In" className="btn btn-primary"/>
                    </div>
                </form>
                <h4>New User?</h4>
                <Link to="/user" className="nav-link">Create Account</Link>
            </div>
        );
    }
}

