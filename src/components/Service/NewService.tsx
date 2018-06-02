import * as React from 'react';

// import axios from 'axios';
// import * as Noty from 'noty';
// import { API_ENDPOINT } from '../../utils/api-config'
import { GithubPicker } from 'react-color'

interface IProps {
    title: string;
    closeModal: () => void;
    switchButton: () => void;
}

interface IState {
    color: string,
    colorClass: string,
    defaultColors: string[],
    errorMessage: string,
    name: string,
    nameClass: string
}

class NewService extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            color: "",
            colorClass: "",
            defaultColors: ['#b9090b', '#7bdbc7', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB', '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB'],
            errorMessage: "",
            name: "",
            nameClass: ""
        };

        this.closeModal = this.closeModal.bind(this);
        this.dismissNotification = this.dismissNotification.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
    }

    public handleNameChange() {
        // tslint:disable-next-line:no-console
        console.log('Name save');
    }

    public handleColorChange(color: any) {
        this.setState({
            color: color.hex,
        });
    }

    public handleSave() {
        // tslint:disable-next-line:no-console
        console.log('Service save');
    }


    public closeModal(event: any): void {
        event.preventDefault();
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
                    <form>
                        <div className="field">
                            <div className="field">
                                <label className="label">Service Name</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input className={ "input " + this.state.nameClass } type="text" placeholder="Netflix" onChange={ this.handleNameChange }/>
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-suitcase" />
                                    </span>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Service Color</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input className={ "input " } type="text" value={this.state.color} disabled={true}/>
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-palette" />
                                    </span>
                                    <GithubPicker colors={ this.state.defaultColors } onChange={ this.handleColorChange }/>
                                </div>
                            </div>

                            <div className="field is-grouped">
                                <div className="control">
                                    <button className="button is-primary" >Save service</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default NewService;