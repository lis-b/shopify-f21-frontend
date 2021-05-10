import { Component } from 'react';

class Nominees extends Component {
  render() {
    const { nominees, handler } = this.props;

    return (
      <div id="nominees">
        <h2>Nominees</h2>

        <ul>
          {nominees.map(item => {
         return (<li key={item.imdbID}>{item.Title} ({item.Year}) <button onClick={() => handler(item.imdbID)}>x</button></li>);
        })}
        </ul>

      </div>
    );
  }
}

export default Nominees;
