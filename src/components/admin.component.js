import React, {Component} from 'react';
import axios from 'axios';
import {RadioGroup} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";

const server = 'http://localhost:5000/'

export default class Admin extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeUser_Right = this.onChangeUser_Right.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            user_right: '',
            users: [],
            user_id: ''
        }
    }

    componentDidMount() {
        axios.get(server + 'users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user),
                        username: response.data[0].username,
                        user_id: response.data[0]._id
                    })
                    // console.log(response.data)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    onChangeUsername(e) {
        // console.log(e.target.value)
        this.setState({
            user_id: e.target.value,
            username: axios.get(server + 'users/' + this.state.user_id).username
        })
    }

    onChangeUser_Right(e) {
        this.setState({
            user_right: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        // const id = this.state._id


        const post = {
            // password: this.state.password,
            user_right: this.state.user_right
        }

        console.log(post);

        axios.post(server + 'users/update/' + this.state.user_id, post)
            .then(res => console.log(res));

        //window.location = '/';
    }

    onDelete(e) {

        const id = this.state.user_id

        axios.delete(server + 'users/' + id)
            .then(response => {
                console.log(response.data)
            });

    }

    render() {
        return (
            <div>
                <h3>Modify Selected User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                                required
                                className="form-control"
                                name={this.state.user_id}
                                value={this.state.username}
                                onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function (user) {
                                    return <option
                                        key={user.username}
                                        value={user._id}
                                    >{user.username}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <FormControl component="fieldset">
                            <FormLabel component="legend">User Right</FormLabel>
                            <RadioGroup aria-label="User Right" name="right" value={this.state.user_right}
                                        onChange={this.onChangeUser_Right}>
                                <FormControlLabel value="view" control={<Radio/>} label="View"/>
                                <FormControlLabel value="edit" control={<Radio/>} label="Edit"/>
                                <FormControlLabel value="admin" control={<Radio/>} label="Admin"/>
                            </RadioGroup>
                        </FormControl>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Save Changes" className="btn btn-primary"/>
                    </div>
                    <div>
                        <Button variant={"Primary"} id={'deleteButton'} type="button"
                        >Delete User</Button>
                    </div>
                </form>
            </div>
        )
    }
}