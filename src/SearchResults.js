import { Component } from 'react';

class SearchResults extends Component {
  render() {
    const { searchQuery, searchLoaded, searchFound, nominees, searchList, handler } = this.props;
    const results = searchList.map(item => {
      if (nominees.some(nominee => nominee.imdbID === item.imdbID))
        return (<li><button disabled>Nominated</button> {item.Title} ({item.Year})</li>);

      return (<li><button onClick={handler(item.imdbID)}>Nominate</button> {item.Title} ({item.Year})</li>);
    });


    if (searchQuery === '') return (<div><h2>Please search for a movie</h2></div>);
    else if (!searchLoaded) return (<div><h2>Loading...</h2></div>);
    else if (!searchFound) return (<div><h2>No results for "{searchQuery}"</h2></div>);

    return (
      <div>
        <h2>Results for "{searchQuery}"</h2>

        <ul>
          {results}
        </ul>

      </div>
    );
  }
}

export default SearchResults;
