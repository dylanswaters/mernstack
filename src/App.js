import React from 'react';
import {BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

// Added the login component here
import Navbar from "./components/navbar.component";
import PostList from "./components/post-list.component";
import EditPost from "./components/edit-post.component";
import CreatePost from "./components/create-post.component";
import CreateUser from "./components/create-user.component";
import Login from "./components/login.component";


// This determines what 'urls' go to which component
function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        {/*This part I added should make it so the default directory is the login page*/}
        <Route path="/" exact component={Login} />
        {/*TODO make the navbar only appear after logging in*/}
        <Route path="/list" exact component={PostList} />
        <Route path="/edit/:id" exact component={EditPost} />
        <Route path="/create" exact component={CreatePost} />
        <Route path="/user" exact component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
