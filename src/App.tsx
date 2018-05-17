import * as React from 'react';
import './App.css';
import Tile from './components/Tile';
import IState from './utils/IState';

const fontStyle = {
  color: '#85bb65',
  fontSize: '3em' 
}

class App extends React.Component<{}, IState> {
  constructor(props: React.ReactPropTypes) {
    super(props);
    this.state = {
      currency: "€"
    };
  }

  public render() {
    return (
      <div className="App">
        
        <div style= { fontStyle }>
          <i className="fas fa-money-check-alt" />
        </div>
        <section className="section">
          <div className="container">
            <h1 className="title">
              UPCOMING
            </h1>
            <p className="subtitle">
              See where your <strong>Money</strong> is going!
            </p>

            <Tile 
              currency={ this.state.currency } 
              color="#1ed760"
              title="Spotify"
              />
            
          </div>
        </section>
      </div>
    );
  }
}

export default App;
