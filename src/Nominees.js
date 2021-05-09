import { Component } from 'react';
import Banner from './Banner.js';

class Nominees extends Component {
  renderNominees() {
    const { nominees, handler } = this.props;

    return (
      <ul>
        {nominees.map(item => {return (
          <li><button onClick={handler(item.imdbID)}>x</button> {item.Title} ({item.Year})</li>
        )})}
      </ul>
    );
  }

  render() {
    const { nomineeCount } = this.props;

    return (
      <div>
        <h2>Nominees</h2>

        <Banner nomineeCount={nomineeCount} />

        {this.renderNominees}

      </div>
    );
  }
}

export default Nominees;
