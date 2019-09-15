import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export class Signup extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            data: '',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: '',
            firstnameValid: false,
            lastnameValid: false,
            emailValid: false,
            passwordValid: false,
            home: null,
            nameReg: /(?=.*[a-z]|[A-Z])^(?!.*[0-9])^(?!.*[`~!@#$%^&*()_+=[\]\\{}|;':",./<>?])/g,
            emailReg: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
            passReg: /(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^])^(?!.*[&*()[\]{}\\|,.<>;:'"`~])/g,
            errorMessage: '',
        }
	}
	
	render() {
        const { firstname, lastname, email, password, confirmPassword, firstnameValid, lastnameValid, emailValid, passwordValid } = this.state;
        const isEnabled = emailValid && firstnameValid && lastnameValid && passwordValid && this.state.password === this.state.confirmPassword; // Disable submit button if form not valid
        
        return (
            <div>
                <center> Welcome to the sign up page!</center>
       			 <Link style={{ margin: `10px`, textDecoration: "none", color: "black" }} to="/home">
					[Home]
				</Link>
                <center><div>
                    <div className="flex flex-column mt3">
                    <input
                        value={firstname}
                        onChange={e => {
                            this.setState({ firstname: e.target.value })
                            this.setState({ firstnameValid: e.target.value.match(this.state.nameReg)})
                        }}
                        type="text"
                        placeholder="First name."
                    /><br />
                    <input
                        value={lastname}
                        onChange={e => {
                            this.setState({ lastname: e.target.value })
                            this.setState({ lastnameValid: e.target.value.match(this.state.nameReg)})
                        }}
                        type="text"
                        placeholder="Last name."
                    /><br />
                    <input
                        value={email}
                        onChange={e => {
                            this.setState({ email: e.target.value })
                            this.setState({ emailValid: e.target.value.match(this.state.emailReg)})
                        }}
                        type="text"
                        placeholder="Email."
                    /><br />
                    <input
                        value={password}
                        onChange={e => {
                            this.setState({ password: e.target.value })
                            this.setState({ passwordValid:  e.target.value.match(this.state.passReg)})
                        }}
                        type="password"
                        placeholder="Password"
                    /><br />
                    <input
                        value={confirmPassword}
                        onChange={e => {
                            this.setState({ confirmPassword: e.target.value })
                        }}
                        type="password"
                        placeholder="Confirm password"
                    />
                    </div>
                    <br />
                    {this.state.errorMessage}
                </div></center>
            </div>
        )
	}
}

export default Signup;