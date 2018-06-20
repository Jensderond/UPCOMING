import * as React from 'react';

// import axios from 'axios';
// import * as Noty from 'noty';
// import { API_ENDPOINT } from '../../utils/api-config'
import { GithubPicker } from 'react-color'

interface IProps {
    currency: string;
}

interface IState {
    color: string,
    colorClass: string,
    date: Date,
    defaultColors: string[],
    description: string,
    errorMessage: string,
    name: string,
    nameClass: string,
    price: number
}

class NewService extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            color: "",
            colorClass: "",
            date: new Date(),
            defaultColors: ['#b9090b', '#7bdbc7', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB', '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB'],
            description: "",
            errorMessage: "",
            name: "",
            nameClass: "",
            price: 0
        };

        this.dismissNotification = this.dismissNotification.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    public handleNameChange(event: any) {
        this.setState({ name: event.target.value.toString() });
        // tslint:disable-next-line:no-console
        console.log('Name Changed');
    }

    public handleDescriptionChange(event: any) {
        this.setState({ description: event.target.value.toString() });
        // tslint:disable-next-line:no-console
        console.log('Description Changed');
    }

    public handlePriceChange(event: any) {
        this.setState({ price: event.target.value });
        // tslint:disable-next-line:no-console
        console.log('Price Changed');
    }

    public handleDateChange(event: any) {
        this.setState({ date: event.target.value });
        // tslint:disable-next-line:no-console
        console.log('Date Changed');
    }

    public handleColorChange(color: any) {
        this.setState({
            color: color.hex.toString(),
        });
        // tslint:disable-next-line:no-console
        console.log('Description Changed');
    }

    public handleSave(event: any) {
        event.preventDefault();
        // tslint:disable-next-line:no-console
        console.log('Service save');
    }

    public dismissNotification(): void {
        this.setState({
            errorMessage: ""
        })
    }





    public render() {
        const errorMessage = this.state.errorMessage;
        const currencySymbol = this.props.currency === '€' ? 'fas fa-euro-sign' : 'fas fa-dollar-sign';

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
                                <label className="label">Name:</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input className={ "input " + this.state.nameClass } type="text" placeholder="Netflix" onChange={ this.handleNameChange }/>
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-suitcase" />
                                    </span>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Description:</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input className={ "input " + this.state.nameClass } type="text" placeholder="Movie streaming service" onChange={ this.handleDescriptionChange }/>
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-suitcase" />
                                    </span>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Price:</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input className={ "input " } type="number" placeholder="9.99" step=".01" onChange={ this.handlePriceChange }/>
                                    <span className="icon is-small is-left">
                                        <i className={ currencySymbol } />
                                    </span>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Date of last payment:</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input className={ "input " } type="date" onChange={ this.handleDateChange }/>
                                    <span className="icon is-small is-left">
                                        <i className="far fa-calendar-alt" />
                                    </span>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Service Color:</label>
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
                                    <button className="button is-primary" onClick={ this.handleSave }>Save service</button>
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