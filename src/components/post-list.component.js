import React, {Component} from 'react';

import {Link} from 'react-router-dom';
import axios from 'axios';

const server = 'http://localhost:5000/'

const Post = props => (
    <tr>
        <td>{props.post.username}</td>
        <td>{props.post.postTitle}</td>
        <td>{props.post.postContents}</td>
        <td>
            <Link to={"/edit/" + props.post._id}>edit</Link> | <a href="#" onClick={() => {
            props.deletePost(props.post._id)
        }}>delete</a>
        </td>
    </tr>
)

export default class PostList extends Component {
    constructor(props) {
        super(props);

        this.deletePost = this.deletePost.bind(this)

        this.state = {posts: []};
    }

    componentDidMount() {
        axios.get(server + 'posts/')
            .then(response => {
                this.setState({posts: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deletePost(id) {
        axios.delete(server + 'posts/' + id)
            .then(response => {
                console.log(response.data)
            });

        this.setState({
            posts: this.state.posts.filter(el => el._id !== id)
        })
    }

    postList() {
        return this.state.posts.map(currentpost => {
            return <Post post={currentpost} deletePost={this.deletePost} key={currentpost._id}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>Posts</h3>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>postTitle</th>
                        <th>postContents</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.postList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
