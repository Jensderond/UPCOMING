import * as React from 'react';
import './App.css';
import Tile from './components/Tile';
import IState from './utils/IState';

import Modal from './components/Modal';
import Navbar from './components/Navbar';
// import Login from './components/Login';

class App extends React.Component<{}, IState> {
  constructor(props: React.ReactPropTypes) {
    super(props);
    this.state = {
      currency: "€",
      modalState: ""
    };
    this.openModel = this.openModel.bind(this);
    this.closeModel = this.closeModel.bind(this);
  }

  public openModel(): void {
    this.setState({
      modalState: "is-active"
    });
  }

  public closeModel(): void {
    this.setState({
      modalState: ""
    });
  }

// REMINDER: use Noty library for notifications!!
  public render() {
    return (
      <div className="App">
        <Navbar
          title="Navbar"
          openModal={ this.openModel }
        />
        <section className="section">
          <div className="container">

            <Tile 
              currency={ this.state.currency } 
              color="#1ed760"
              title="Spotify"
              />
            
          </div>
        </section>
        <Modal 
          title="LOGIN"
          modalState={ this.state.modalState }
          closeModal={ this.closeModel }
        />
      </div>
    );
  }
}

export default App;
