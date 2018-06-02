import * as React from 'react';
import './App.css';

import {BrowserRouter, Route} from 'react-router-dom';
import Modal from './components/Authentication/Modal';
import Navbar from './components/Navbar';
import NewService from "./components/Service/NewService";
import ServicesList from "./components/ServicesList";
import { isLoggedIn, logOut } from './utils/helpers/Authentication';

interface IState {
  currency: string,
  modalState: string,
  isLoggedIn: boolean
};

class App extends React.Component<{}, IState> {
  constructor(props: React.ReactPropTypes) {
    super(props);
    this.state = {
      currency: "€",
      isLoggedIn: isLoggedIn(),
      modalState: ""
    };

    this.checkLogin = this.checkLogin.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  public checkLogin() {
    this.setState({
      isLoggedIn: isLoggedIn()
    })
  }

  public handleLogout() {
    logOut();
    this.checkLogin()
  }

  public openModal(): void {
    this.setState({
      modalState: "is-active"
    });
  }

  public closeModal(): void {
    this.checkLogin();
    this.setState({
      modalState: ""
    });
  }

// REMINDER: use Noty library for notifications!!
  public render() {

    if ( !this.state.isLoggedIn ){
      return (
        <BrowserRouter>
          <div className="App">
            <Navbar
              title="Navbar"
              openModal={ this.openModal }
              isLoggedIn={ this.state.isLoggedIn }
              logOut={ this.handleLogout }
            />
            <Modal 
              title="LOGIN"
              modalState="is-active"
              closeModal={ this.closeModal }
            />
          </div>
        </BrowserRouter>
      );
    } 
    else {
      return (
        <BrowserRouter>
          <div className="App">
            <Navbar
              title="Navbar"
              openModal={ this.openModal }
              isLoggedIn={ this.state.isLoggedIn }
              logOut={ this.handleLogout }
            />
            <section className="section">
              <div className="container">

                <Route
                  exact={true}
                  path="/"
                  // tslint:disable-next-line:jsx-no-lambda
                  render={() => (
                      <ServicesList currency={this.state.currency} />
                  )}
                />
                <Route
                    exact={true}
                    path="/services/newService"
                    component={NewService}
                />
                
              </div>
            </section>
          </div>
        </BrowserRouter>
      );
     }
  }
}

export default App;
