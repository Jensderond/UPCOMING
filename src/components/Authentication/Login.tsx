import * as React from 'react';

import axios from 'axios';
import * as Noty from 'noty';
import { API_ENDPOINT } from '../../utils/api-config'
import '../styles/Sidebar.css';

interface IProps {
    title: string;
    closeModal: () => void;
    switchButton: () => void;
}

interface IState {
    errorMessage: string,
    password: string,
    passwordClass: string,
    username: string,
    usernameClass: string
}

class Login extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            errorMessage: "",
            password: "",
            passwordClass: "",
            username: "",
            usernameClass: ""
        };

        this.closeModal = this.closeModal.bind(this);
        this.dismissNotification = this.dismissNotification.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.switchButton = this.switchButton.bind(this);
        
    }

    public handleUsernameChange(event: any) {
        this.setState({ username: event.target.value });
    }

    public handlePasswordChange(event: any) {
        this.setState({ password: event.target.value });
    }

    public handleLogin(event: any): boolean {
        event.preventDefault();

        if ( this.state.username === "" && this.state.password === "" ) {
            this.setState({ 
                passwordClass: "is-danger",
                usernameClass: "is-danger"
            });
            return false;
        } else if ( this.state.username === "" && this.state.password !== "" ) {
            this.setState({ 
                passwordClass: "",
                usernameClass: "is-danger"
            });
            return false;
        } else if ( this.state.username !== "" && this.state.password === "" ) {
            this.setState({ 
                passwordClass: "is-danger",
                usernameClass: ""
            });
            return false;
        }

        axios.post( API_ENDPOINT + "authenticate", {
            password: this.state.password,
            username: this.state.username
        })
        .then( (response) => {
            if ( response.data.success !== true ) {
                this.setState({
                    errorMessage: response.data.message
                });
                return false;
            }
            else {
                localStorage.setItem("jwtToken", response.data.token);

                new Noty({
                    text: 'Welcome ' + response.data.username,
                    theme: 'nest',
                    timeout: 3000,
                    type: 'success',
                }).show();

                this.closeModal(event);
                return true;
            }
        })
        .catch(() =>{
            this.setState({
                errorMessage: "Sorry something went wrong on our side."
            })
        });

        return false;
    }

    public closeModal(event: any): void {
        event.preventDefault();
        this.props.closeModal();
    }

    public switchButton(event: any): void {
        event.preventDefault();
        this.props.switchButton();
    }

    public dismissNotification(): void {
        this.setState({
            errorMessage: ""
        })
    }

    public render() {
        const errorMessage = this.state.errorMessage;

        return (
            <div className="uc-sidebar" >
                <div className="container">
                    { errorMessage !== "" ?
                    <div className="notification is-danger">
                        <button className="delete" onClick={ this.dismissNotification }/>
                        { this.state.errorMessage }
                    </div>
                    : ""
                    }
                    <form>
                        <div className="field">
                            <div className="field">
                                <label className="label">Username</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input className={ "input " + this.state.usernameClass } type="text" placeholder="JohnDoe" onChange={ this.handleUsernameChange }/>
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user" />
                                    </span>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input className={ "input " + this.state.passwordClass } type="password" placeholder="" onChange={ this.handlePasswordChange }/>
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-lock" />
                                    </span>
                                </div>
                            </div>

                            <div className="field is-grouped">
                                <div className="control">
                                    <button className="button is-primary" onClick={ this.handleLogin }>Login</button>
                                </div>
                                <div className="control">
                                    <button className="button is-text" onClick={ this.switchButton }>Or create an account</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;