import * as React from 'react';

import axios from 'axios';
import * as Noty from 'noty';
import { API_ENDPOINT } from '../utils/api-config'

interface IProps {
    title: string;
    closeModal: () => void;
    switchButton: () => void;
}

interface IState {
    email: string,
    emailCheckIcon: string,
    emailClass: string,
    emailValid: boolean,
    emailValidMessage: string,
    password: string,
    passwordClass: string,
    username: string,
    usernameCheckIcon: string,
    usernameClass: string,
    usernameValid: boolean,
    usernameValidMessage: string
}

class Register extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            email: "",
            emailCheckIcon: "",
            emailClass: "",
            emailValid: false,
            emailValidMessage: "",
            password: "",
            passwordClass: "",
            username: "",
            usernameCheckIcon: "",
            usernameClass: "",
            usernameValid: false,
            usernameValidMessage: ""
        };
        
        this.closeModal = this.closeModal.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.switchButton = this.switchButton.bind(this);
    }

    public checkUsernameInBackend(username: string) {
        return axios.post( API_ENDPOINT + "checkUsername/" + username);
    }

    public checkEmailInBackend(email: string) {
        return axios.post( API_ENDPOINT + "checkEmail/" + email);
    }

    public async handleUsernameChange(event: any) {
        const usernameChange = event.target.value;
        if ( usernameChange === "" ){
            this.setState({ 
                username: "",
                usernameClass: "",
                usernameValid: false,
                usernameValidMessage: ""
            });
            return;
        }
        
        this.checkUsernameInBackend( usernameChange )
            .then( (res) => {
                const usernameAvailable = res.data !== true;
                if ( usernameAvailable ) {
                    this.setState({ 
                        username: usernameChange,
                        usernameClass: "is-success",
                        usernameValid: true,
                        usernameValidMessage: "Alright!"
                    });
                } else {
                    this.setState({ 
                        username: usernameChange,
                        usernameClass: "is-danger",
                        usernameValid: false,
                        usernameValidMessage: "This username is already in use!"
                    });
                }
            }).catch((err) => {
                // tslint:disable-next-line:no-console
                console.error(err);
            });
        
    }

    public handlePasswordChange(event: any) {
        this.setState({
            password: event.target.value
        })
    }

    public handleEmailChange(event: any) {

        const emailChange = event.target.value;
        if ( emailChange === "" ){
            this.setState({ 
                email: "",
                emailClass: "",
                emailValidMessage: ""
            });
            return;
        }
        
        this.checkEmailInBackend( emailChange )
            .then( (res) => {
                const emailAvailable = res.data !== true;
                if ( emailAvailable ) {
                    this.setState({ 
                        email: emailChange,
                        emailClass: "is-success",
                        emailValidMessage: "Great!"
                    });
                } else {
                    this.setState({ 
                        email: emailChange,
                        emailClass: "is-danger",
                        emailValidMessage: "This email is already in use!"
                    });
                }
            }).catch((err) => {
                // tslint:disable-next-line:no-console
                console.error(err);
            });
    }

    public handleRegister() {
        if ( !this.state.usernameValid ) {
            this.setState({ 
                usernameClass: "is-danger",
                usernameValidMessage: "This username is not valid!"
            });
            return false;
        }
        else if ( this.state.username === "" && this.state.password === "" ) {
            this.setState({ 
                passwordClass: "is-danger",
                usernameClass: "is-danger"
            });
            return false;
        } else if ( this.state.username === "" && this.state.password !== "" ) {
            this.setState({ 
                passwordClass: "is-success",
                usernameClass: "is-danger"
            });
            return false;
        } else if ( this.state.username !== "" && this.state.password === "" ) {
            this.setState({ 
                passwordClass: "is-danger",
                usernameClass: "is-success"
            });
            return false;
        }


        new Noty({
            text: 'User created with username: ' + this.state.username,
            theme: 'nest',
            timeout: 3000,
            type: 'success',
        }).show();
        this.props.switchButton();
        return false;
    }

    public switchButton(event: any): void {
        event.preventDefault();
        this.props.switchButton();
    }

    public closeModal(event: any): void {
        event.preventDefault();
        this.props.closeModal();
    }

    public render() {
        return (
            <div className="uc-sidebar" >
                <div className="container">
                    <div className="field">
                        <div className="field">
                            <label className="label">Username</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className={ "input " + this.state.usernameClass } type="text" placeholder="JohnDoe" onBlur={ this.handleUsernameChange }/>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-user" />
                                </span>
                            </div>
                            { this.state.usernameValidMessage !== "" ?
                                <p className={"help " + this.state.usernameClass }>{ this.state.usernameValidMessage }</p>
                            : "" }
                        </div>

                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className={ "input " +  this.state.emailClass } type="email" placeholder="johndoe@example.com" defaultValue="" onBlur={ this.handleEmailChange } />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-envelope" />
                                </span>
                            </div>
                            { this.state.emailValidMessage !== "" ?
                                <p className={"help " + this.state.emailClass }>{ this.state.emailValidMessage }</p>
                            : "" }
                        </div>

                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control has-icons-left ">
                                <input className={ "input " + this.state.passwordClass } type="password" placeholder="" onChange={ this.handlePasswordChange }/>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-lock" />
                                </span>
                            </div>
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link" onClick={ this.handleRegister }>Register</button>
                            </div>
                            <div className="control">
                                <button className="button is-text" onClick={ this.switchButton }>Already have an account?</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;