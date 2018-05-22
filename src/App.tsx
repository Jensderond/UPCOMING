import * as React from 'react';
import './App.css';
import Tile from './components/Tile';

import { BrowserRouter } from 'react-router-dom';
import Modal from './components/Modal';
import Navbar from './components/Navbar';
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
                <Tile 
                  currency={ this.state.currency } 
                  color="#1ed760"
                  title="Spotify"
                  />

                {/*
                <PrivateRoute 
                  exact={true}
                  component={Tile}
                />
                */
                } 
                
              </div>
            </section>
            <Modal 
              title="LOGIN"
              modalState={ this.state.modalState }
              closeModal={ this.closeModal }
            />
          </div>
        </BrowserRouter>
      );
     }
  }
}

export default App;
