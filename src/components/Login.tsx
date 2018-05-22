import * as React from 'react';

import axios from 'axios';
import './styles/Sidebar.css';

interface IProps {
    title: string;
    closeModal: () => void;
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
    }

    public handleUsernameChange(event: any) {
        this.setState({ username: event.target.value });
    }

    public handlePasswordChange(event: any) {
        this.setState({ password: event.target.value });
    }

    public handleLogin(event: any): boolean {

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

        axios.post("http://localhost:3010/api/authenticate", {
            password: this.state.password,
            username: this.state.username
        })
        .then( (response) => {
            if ( response.data.success !== true ) {
                this.setState({
                    errorMessage: response.data.message
                })
                return false;
            }

            sessionStorage.setItem("jwtToken", response.data.token);
            this.closeModal();
            return true;
        })
        .catch((error) =>{
            this.setState({
                errorMessage: "Sorry something went wrong on our side."
            })
        });

        return false;
    }

    public closeModal(): void {
        this.props.closeModal();
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
                            <div className="control">
                                <input className={ "input " + this.state.passwordClass } type="password" placeholder="" onChange={ this.handlePasswordChange }/>
                            </div>
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link" onClick={ this.handleLogin }>Submit</button>
                            </div>
                            <div className="control">
                                <button className="button is-text" onClick={ this.closeModal }>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;