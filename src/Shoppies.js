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
      nominees: [{}],
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

  handleSearch() {
    const { currentQuery } = this.state;
    if (currentQuery === '') return;
    this.setState({searchLoaded: false});
    fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${currentQuery}&type=movie`)
      .then(result => result.json())
      .then(result => {
            if (result.Response === "True") {
              const { Type, Poster, ...returned } = result.Search[0];
              this.setState({
                searchQuery: currentQuery,
                searchList: returned,
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

  renderSearch() {
    const { currentQuery } = this.state;
    return (
      <div id="search">
        <input type="text" value={currentQuery} onChange={this.handleInputChange} />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    )
  }

  render() {
    return (
      <div id="content">

        <h1 id="title">The Shoppies</h1>

        {this.renderSearch()}

        <div id="container">
          <SearchResults {...this.state} handler={this.nomineeAddHandler} />
          <Nominees {...this.state} handler={this.nomineeRemoveHandler} />
        </div>

      </div>
    );
  }
}

export default Shoppies;
