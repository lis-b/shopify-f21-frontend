import { Component } from 'react';

class SearchResults extends Component {
  render() {
    const { searchQuery, searchLoaded, searchFound, nominees, searchList, handler } = this.props;

    if (searchQuery === '') return (<div><h2>Please search for a movie</h2></div>);
    else if (!searchLoaded) return (<div><h2>Loading...</h2></div>);
    else if (!searchFound) return (<div><h2>No results for "{searchQuery}"</h2></div>);

    return (
      <div>
        <h2>Results for "{searchQuery}"</h2>

        <ul>
          {searchList.map(item => {
           if (nominees.some(nominee => nominee.imdbID === item.imdbID))
            return (<li key={item.imdbID}><button disabled>Nominated</button> {item.Title} ({item.Year})</li>);

           return (<li key={item.imdbID}><button onClick={() => handler(item.imdbID)}>Nominate</button> {item.Title} ({item.Year})</li>);
          })}
        </ul>

      </div>
    );
  }
}

export default SearchResults;
