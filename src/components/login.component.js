import React, {Component} from "react";
import {StyleSheet, View, Text} from "react-native";
import MaterialUnderlineTextbox from "../components/MaterialUnderlineTextbox";
import axios from 'axios';
import {render} from "react-dom";


export default class Login extends Component {
    constructor(props) {
        super(props);
        // Pretty sure this is the part that tells it to update what you see when the described command changes
        this.onEnterUsername = this.onEnterUsername.bind(this);
        this.onEnterPassword = this.onEnterPassword.bind(this);
        this.onNewAccount = this.onNewAccount.bind(this);

        this.state = {
            username: '',
            password: ''
        }
    }

    // Setting the payload when entering values? e is the payload
    onEnterUsername(e){
        this.setState({
            username: e.target.value
        })
    }

    onEnterPassword(e){
        this.setState({
            password: e.target.value
        })
    }

    // Not sure if this works, but the idea is that it takes you to the account creation page
    onNewAccount() {
        window.location = '/account'
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.signIn}>Sign In</Text>
                <MaterialUnderlineTextbox
                    style={styles.materialUnderlineTextbox}
                />
                <MaterialUnderlineTextbox
                    style={styles.materialUnderlineTextbox}
                />
                <Text style={styles.createAccount}>Create Account</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    signIn: {
        fontFamily: "roboto-regular",
        color: "#121212",
        height: 35,
        width: 210,
        textAlign: "center",
        marginTop: 102,
        marginLeft: 83
    },
    materialUnderlineTextbox: {
        height: 43,
        width: 210,
        marginTop: 113,
        marginLeft: 83
    },
    createAccount: {
        fontFamily: "roboto-regular",
        color: "#121212",
        height: 53,
        width: 210,
        textAlign: "center",
        marginTop: 94,
        marginLeft: 83
    }
});

// export default LoginComponent; Do we need this?
