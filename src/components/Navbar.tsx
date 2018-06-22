import * as React from 'react';
import {Link} from "react-router-dom";

const fontStyle = {
    color: '#85bb65',
    fontSize: '3em',
    height: '1em',
    width: '1.5em'
}

interface IProps {
    title: string,
    openModal: (type: string) => void;
    logOut: () => void;
    isLoggedIn: boolean;
}

interface IState {
    navbarClass: string;
}

class Navbar extends React.Component<IProps, IState> {

    constructor(props: IProps){
        super(props);

        this.state = {
            navbarClass: ""
        };

        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    }

    public handleLoginClick(event :any): void {
        const type = event.currentTarget.dataset.id;
        this.props.openModal(type);
    }

    public handleLogoutClick(): void {
        this.props.logOut();
    }

    public toggleMobileMenu(): void {
        if ( this.state.navbarClass === "" ) {
            this.setState({
                navbarClass: "is-active"
            });
        } else {
            this.setState({
                navbarClass: ""
            });
        }
    }

    public render() {
        return (
            <nav className="navbar is-transparent">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/">
                        <span className="icon" style={ fontStyle }>
                            <i className="fas fa-money-check-alt" />
                        </span>
                            <span style={{ fontWeight:'bold' }}>
                            UPCOMING
                        </span>
                    </Link>
                    <div className={ "navbar-burger burger " + this.state.navbarClass } data-target="upcomingNavbar" onClick={ this.toggleMobileMenu }>
                        <span />
                        <span />
                        <span />
                    </div>
                </div>

                <div id="upcomingNavbar" className={ "navbar-menu " + this.state.navbarClass }>
                    <div className="navbar-start">
                        {/*<Route exact={true} path='/services/newService' component={NewService} />*/}
                        <Link className="navbar-item" to="/">Home</Link>
                        <Link className="navbar-item" to="/services/newService">New Service</Link>
                
                    </div>

                    <div className="navbar-end">
                        { this.props.isLoggedIn ?
                            <div className="navbar-item">
                                <div className="field is-grouped">
                                <p className="control">
                                    <a className="button is-warning" onClick={ this.handleLogoutClick } data-id="LOGOUT">
                                        <span>Logout</span>
                                    </a>            
                                </p>
                                </div>
                            </div>
                        : 
                            <div className="navbar-item">
                                <div className="field is-grouped">
                                <p className="control">
                                    <a className="bd-tw-button button">
                                        <span>
                                            Register
                                        </span>
                                    </a>
                                </p>
                                <p className="control">
                                    <a className="button is-primary" onClick={ this.handleLoginClick } data-id="LOGIN">
                                        <span>Login</span>
                                    </a>            
                                </p>
                                </div>
                            </div>
                        }
                        
                    </div>
                </div>
                            
            </nav>
            
        );
    }
}

export default Navbar;