import * as React from 'react';

// import axios from 'axios';
import './styles/Sidebar.css';

interface IProps {
    title: string
}

interface IState {
    email: string,
    emailClass: string,
    password: string,
    username: string,
    usernameClass: string
}

class Login extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            email: "",
            emailClass: "input",
            password: "",
            username: "",
            usernameClass: "input"
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    public handleUsernameChange(event: any) {
        this.setState({ username: event.target.value });
    }

    public handlePasswordChange(event: any) {
        this.setState({ password: event.target.value });
    }

    public handleLogin(event: any): boolean {
        // axios.post("http://")

        return false;
    }

    public render() {
        return (
            <div className="uc-sidebar" >
                <div className="container">
                    <div className="field">
                        <div className="field">
                            <label className="label">Username</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className={ this.state.usernameClass } type="text" placeholder="Text input" defaultValue="username" />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-user" />
                                </span>
                                <span className="icon is-small is-right">
                                    <i className="fas fa-check" />
                                </span>
                            </div>
                            <p className="help is-success">This username is available</p>
                        </div>

                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className={ this.state.emailClass } type="email" placeholder="Email input" defaultValue="johndoe@example.com" />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-envelope" />
                                </span>
                                <span className="icon is-small is-right">
                                    <i className="fas fa-exclamation-triangle" />
                                </span>
                            </div>
                            <p className="help is-danger">This email is invalid</p>
                        </div>

                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input className="input" type="password" placeholder="" />
                            </div>
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link">Submit</button>
                            </div>
                            <div className="control">
                                <button className="button is-text">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;