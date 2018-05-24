import * as React from 'react';

import Login from '../components/Login';
import Register from './Register';

interface IProps {
    title: string;
    modalState: string;
    closeModal: () => void;
}

interface IState {
    modalType: string;
}

class Modal extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            modalType: "LOGIN"
        }

        this.closeModal = this.closeModal.bind(this);
        this.handleLoginSwitch = this.handleLoginSwitch.bind(this);
        this.handleRegisterSwitch = this.handleRegisterSwitch.bind(this);
    }

    public closeModal() {
        this.props.closeModal();
    }

    public handleRegisterSwitch() {
        this.setState({
            modalType: "REGISTER"
        })
    }

    public handleLoginSwitch() {
        this.setState({
            modalType: "LOGIN"
        })
    }

    public render() {

        const modalType = this.state.modalType === "LOGIN" ? (
            <Login
                title="Login"
                closeModal={ this.closeModal }
                switchButton={ this.handleRegisterSwitch }
            />
        ) : (
            <Register
                title="Register"
                closeModal={ this.closeModal }
                switchButton={ this.handleLoginSwitch }
            />
        );

        return (
            <div className={ "modal " + this.props.modalState }>
                <div className="modal-background" />
                <div className="modal-content">
                    <div className="box">
                        { this.state.modalType }
                        { modalType }
                    </div> 
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={ this.closeModal } />
            </div>
        );
    }
}

export default Modal;