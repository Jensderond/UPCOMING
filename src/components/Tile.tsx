import * as React from 'react';
import IState from '../utils/IState';

const logo = {
  color: 'white',
  fontSize: '3em' 
}

const text = {
    color: 'white'
}

interface IProps {
    currency: string;
    color: string;
    title: string;
}

class Tile extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    public render() {
      return (
        <div className="tile is-ancestor">
            <div className="tile is-parent is-12">
            <article className="tile is-child notification" style={{ background: this.props.color }}>
                <span className="tag is-white is-rounded" style={{ top: '10px', right: '10px', position: 'absolute' }}>
                    Entertainment
                </span>
                <div className="content">
                <div style= { logo }>
                    <i className="fab fa-spotify" />
                </div>
                <p className="title" style={ text }>{ this.props.title }</p>
                <p className="subtitle" style={ text }>{ this.props.currency } 15</p>
                <div className="content" style={ text }>
                    Payment in 3 days..
                </div>
                </div>
            </article>
            </div>
        </div>
      )
    }
  }
  
export default Tile