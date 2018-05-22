import * as React from 'react';

const fontStyle = {
    color: '#85bb65',
    fontSize: '3em',
    height: '1em',
    width: '1.5em'
}

interface IProps {
    title: string,
    openModal: (type: string) => void;
}

interface IState {
    navbarClass: string;
}

class Navbar extends React.Component<IProps, IState> {

    constructor(props: IProps){
        super(props);

        this.state = {
            navbarClass: ""
        }

        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    }

    public handleLoginClick(event :any): void {
        const type = event.currentTarget.dataset.id;
        this.props.openModal(type);
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
                    <a className="navbar-item" href="http://localhost:3000/">
                        <span className="icon" style={ fontStyle }>
                            <i className="fas fa-money-check-alt" />
                        </span>
                        <span style={{ fontWeight:'bold' }}>
                            UPCOMING
                        </span>
                    </a>
                    <div className={ "navbar-burger burger " + this.state.navbarClass } data-target="upcomingNavbar" onClick={ this.toggleMobileMenu }>
                        <span />
                        <span />
                        <span />
                    </div>
                </div>

                <div id="upcomingNavbar" className={ "navbar-menu " + this.state.navbarClass }>
                    <div className="navbar-start">
                    <a className="navbar-item" href="http://localhost:3000/">
                        Home
                    </a>
                    <a className="navbar-item" href="/documentation/overview/start/">
                        Docs
                    </a>
                
                    </div>

                    <div className="navbar-end">
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
                    </div>
                </div>
            
                            
            </nav>
            
        );
    }
}

export default Navbar;