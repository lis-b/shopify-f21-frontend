import SearchResults from './SearchResults.js';
import Nominees from './Nominees.js';
import { Component } from 'react';

class Shoppies extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.nomineeAddHandler = this.nomineeAddHandler.bind(this);
    this.nomineeRemoveHandler = this.nomineeRemoveHandler.bind(this);

    this.state = {
      nominees: [],
      nomineeCount: 0,

      currentQuery: '',
      searchQuery: '',
      searchList: [{}],
      searchLoaded: false,
      searchFound: true,
    }
  }

  handleInputChange(event) {
    this.setState({currentQuery: event.target.value});
  }

  handleSearch(event) {
    event.preventDefault();
    const { currentQuery } = this.state;
    if (currentQuery === '') return;
    this.setState({searchLoaded: false, searchList: [{}]});
    fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${currentQuery}&type=movie`)
      .then(result => result.json())
      .then(result => {
            if (result.Response === "True") {
              let returned = result.Search;
              returned = returned.map(({Type, Poster, ...list}) => list);

              // The following line is required due to certain searches returning the same movie twice.
              let duplicatesPruned = returned.filter((item, i) => returned.findIndex(otherItem => otherItem.imdbID === item.imdbID) === i);

              this.setState({
                searchQuery: currentQuery,
                searchList: duplicatesPruned,
                searchLoaded: true,
                searchFound: true,
              });
            } else {
              this.setState({
                searchQuery: currentQuery,
                searchList: [{}],
                searchLoaded: true,
                searchFound: false,
              })
            }
          });
  }

  nomineeAddHandler(id) {
    const { nominees, nomineeCount, searchList } = this.state;
    if (nomineeCount === 5) return;
    this.setState({
      nominees: nominees.concat(searchList.find(item => item.imdbID === id)),
      nomineeCount: nomineeCount+1,
    });
  }

  nomineeRemoveHandler(id) {
    const { nominees, nomineeCount } = this.state;
    this.setState({
      nominees: nominees.filter(nominee => nominee.imdbID !== id),
      nomineeCount: nomineeCount-1,
    })
  }

  render() {
    const { currentQuery } = this.state;
    return (
      <div id="content">

        <h1 id="title">The Shoppies</h1>

        <div id="search"><form onSubmit={this.handleSearch}>
          <input type="text" value={currentQuery} onChange={this.handleInputChange} />
          <button type="submit">Search</button>
        </form></div>

        <div id="container">
          <SearchResults {...this.state} handler={this.nomineeAddHandler} />
          <Nominees {...this.state} handler={this.nomineeRemoveHandler} />
        </div>

      </div>
    );
  }
}

export default Shoppies;
