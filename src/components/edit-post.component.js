import React, {Component} from 'react';
import axios from 'axios';

const server = 'http://localhost:5000/'

export default class EditPost extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePostTitle = this.onChangePostTitle.bind(this);
        this.onChangePostContents = this.onChangePostContents.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            postTitle: '',
            postContents: 0,
            users: []
        }
    }

    componentDidMount() {
        axios.get(server + 'posts/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    postTitle: response.data.postTitle,
                    postContents: response.data.postContents,
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get(server + 'users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangePostTitle(e) {
        this.setState({
            postTitle: e.target.value
        })
        console.log(this.props.match.params.id)
    }

    onChangePostContents(e) {
        this.setState({
            postContents: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const post = {
            username: this.state.username,
            postTitle: this.state.postTitle,
            postContents: this.state.postContents,
        }

        console.log(post);

        axios.post(server + 'posts/update/' + this.props.match.params.id, post)
            .then(res => console.log(res.data));

        //window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Edit Post</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                                required
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function (user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.postTitle}
                               onChange={this.onChangePostTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label>Contents:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.postContents}
                            onChange={this.onChangePostContents}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit Post" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
