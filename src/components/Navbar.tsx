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

class Navbar extends React.Component<IProps> {

    constructor(props: IProps){
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    public handleLoginClick(event :any): void {
        const type = event.currentTarget.dataset.id;
        this.props.openModal(type);
    }

    public render() {
        return (
            <nav className="navbar is-transparent">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        <span className="icon" style={ fontStyle }>
                            <i className="fas fa-money-check-alt" />
                        </span>
                        <span style={{ fontWeight:'bold' }}>
                            UPCOMING
                        </span>
                    </a>
                    <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
                        <span />
                        <span />
                        <span />
                    </div>
                </div>

                <div id="navbarExampleTransparentExample" className="navbar-menu">
                    <div className="navbar-start">
                    <a className="navbar-item" href="https://bulma.io/">
                        Home
                    </a>
                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link" href="/documentation/overview/start/">
                        Docs
                        </a>
                        <div className="navbar-dropdown is-boxed">
                            <a className="navbar-item" href="/documentation/overview/start/">
                                Overview
                            </a>
                            <a className="navbar-item" href="https://bulma.io/documentation/modifiers/syntax/">
                                Modifiers
                            </a>
                            <a className="navbar-item" href="https://bulma.io/documentation/columns/basics/">
                                Columns
                            </a>
                            <a className="navbar-item" href="https://bulma.io/documentation/layout/container/">
                                Layout
                            </a>
                            <a className="navbar-item" href="https://bulma.io/documentation/form/general/">
                                Form
                            </a>
                            <hr className="navbar-divider" />
                            <a className="navbar-item" href="https://bulma.io/documentation/elements/box/">
                                Elements
                            </a>
                            <a className="navbar-item is-active" href="https://bulma.io/documentation/components/breadcrumb/">
                                Components
                            </a>
                        </div>
                    </div>
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