import Banner from './Banner.js';
import SearchResults from './SearchResults.js';
import Nominees from './Nominees.js';
import Credit from './Credit.js';
import { Component } from 'react';
import { Search } from 'react-feather';
import ls from 'local-storage';

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

  componentDidMount() {
    let storedNominees = ls.get('shopify-f21-lisab-nominees');
    if (storedNominees === null) return;
    this.setState({nominees: storedNominees});
  }

  handleInputChange(event) {
    this.setState({currentQuery: event.target.value});
  }

  handleSearch(event) {
    event.preventDefault();
    const { currentQuery } = this.state;
    if (currentQuery === '') return;
    this.setState({searchLoaded: false, searchList: [{}]});
    fetch(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${currentQuery}&type=movie`)
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
    let newNominees = nominees.concat(searchList.find(item => item.imdbID === id));
    this.setState({
      nominees: newNominees,
      nomineeCount: nomineeCount+1,
    });
    ls.set('shopify-f21-lisab-nominees', newNominees);
  }

  nomineeRemoveHandler(id) {
    const { nominees, nomineeCount } = this.state;
    let newNominees = nominees.filter(nominee => nominee.imdbID !== id);
    this.setState({
      nominees: newNominees,
      nomineeCount: nomineeCount-1,
    });
    ls.set('shopify-f21-lisab-nominees', newNominees);
  }

  render() {
    const { currentQuery, nomineeCount } = this.state;
    return (
      <div id="content">

        <h1 id="title">The Shoppies</h1>

        <div id="search"><form onSubmit={this.handleSearch}>
          <input type="text" value={currentQuery} placeholder="Search"  onChange={this.handleInputChange} />
          <button type="submit"><Search /></button>
        </form></div>

        <Banner nomineeCount={nomineeCount} />

        <div id="container">
          <SearchResults {...this.state} handler={this.nomineeAddHandler} />
          <Nominees {...this.state} handler={this.nomineeRemoveHandler} />
        </div>

        <Credit />

      </div>
    );
  }
}

export default Shoppies;
