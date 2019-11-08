import React, {Component} from "react";
import {connect} from "react-redux";
import { Grid, Form, Button, Image, Message } from 'semantic-ui-react';
import {Link, Redirect} from "react-router-dom";

import {auth} from "../actions";

const styles = {
root: {
 marginTop: '10%'
}
}

class Login extends Component {

    state = {
        username: "",
        password: "",
        repassword: "",
    }

    onSubmit = e => {
        e.preventDefault();
        
        if (this.state.password === this.state.repassword)
          {  this.props.register(this.state.username, this.state.password);}
        else if (this.state.password !== this.state.repassword){
            window.alert("your passwords do not match");
            console.log("hello");
	    this.state = {repassword:""};
}
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }
        return (
          <Grid centered style={styles.root} textAlign='center'>
            <Grid.Column width={6}>
            <form onSubmit={this.onSubmit}>
                <fieldset>
                    <legend>Register</legend>
                    {this.props.errors.length > 0 && (
                        <ul>
                            {this.props.errors.map(error => (
                                <li key={error.field}>{error.message}</li>
                            ))}
                        </ul>
                    )}
                    <Form>
                      <Form.Field>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text" id="username"
                            onChange={e => this.setState({username: e.target.value})} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password" id="password"
                            onChange={e => this.setState({password: e.target.value})} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="password">Confirm Password</label>
                        <input
                            type="password" id="password"
                            onChange={e => this.setState({repassword: e.target.value})} />
                    </Form.Field>

                    
                        <Button type="submit" fluid size='large'>Register</Button>
                    </Form>

                    <Message>
                        Already have an account? <Link to="/login">Login</Link>
                    </Message>
                </fieldset>
            </form>
           </Grid.Column>
          </Grid>
        )
    }
}

const mapStateToProps = state => {
    let errors = [];
    if (state.auth.errors) {
        errors = Object.keys(state.auth.errors).map(field => {
            return {field, message: state.auth.errors[field]};
        });
    }
    return {
        errors,
        isAuthenticated: state.auth.isAuthenticated
    };
}

const mapDispatchToProps = dispatch => {
    return {
        register: (username, password) => dispatch(auth.register(username, password)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
