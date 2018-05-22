import * as React from 'react';

import Login from '../components/Login';

interface IProps {
    title: string;
    modalState: string;
    closeModal: () => void;
}

interface IState {
    modalState: string;
}

class Modal extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
    }

    public closeModal() {
        this.props.closeModal();
    }

    public render() {
        return (
            <div className={ "modal " + this.props.modalState }>
                <div className="modal-background" />
                <div className="modal-content">
                    <div className="box">
                        { this.props.title }
                        <Login
                            title="Login"
                            closeModal={ this.closeModal }
                        />
                    </div> 
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={ this.closeModal } />
            </div>
        );
    }
}

export default Modal;