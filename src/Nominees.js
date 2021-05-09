import { Component } from 'react';
import Banner from './Banner.js';

class Nominees extends Component {
  render() {
    const { nomineeCount, nominees, handler } = this.props;

    return (
      <div>
        <h2>Nominees</h2>

        <Banner nomineeCount={nomineeCount} />

        {nominees.map(item => {
         return (<li key={item.imdbID}><button onClick={() => handler(item.imdbID)}>x</button> {item.Title} ({item.Year})</li>);
        })}

      </div>
    );
  }
}

export default Nominees;
