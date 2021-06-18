import * as React from 'react';
require('./index.css');

interface keyable {
  [key: string]: any
}

interface State {
  apiResult?: keyable[];
  searchResult?: keyable[];
  sort?: string
}

const container = {
  padding: '5% 10%'
}

const search = {
  padding: '10px',
  fontSize: '17px',
  border: '1px solid #04AA6D',
  backgroundColor: '#f2f2f2'
}

const tableContainer = {
  marginTop: '20px',
  height: '400px',
  overflow: 'auto',
  marginBottom: '20px',
  border: '1px solid #04AA6D'
}

export class App extends React.Component<{}, State> {
  constructor(props) {
    super(props)
    this.onSearch = this.onSearch.bind(this)
    this.state = {
      apiResult: [],
      searchResult: [],
      sort: ''
    };
  }
  componentDidMount() {
    this.fetchApi()
  }
  onSearch(e: React.ChangeEvent<HTMLInputElement>) {
    let input = e.target.value
    let result = Array<keyable>()
    let prop = this.state.apiResult
    for (var val of prop!) {
      if (val.title.toLowerCase().search(input.toLowerCase()) === 0) {
        result.push(val)
      }
    }
    this.setState({ searchResult: result })
  }
  orderBy(searchResult, order) {
    switch (order) {
      case 'asc':
        this.setState({ sort: 'des' })
        return searchResult.sort((a, b) => (a.vote_average - b.vote_average))
      case 'des':
        this.setState({ sort: 'asc' })
        return searchResult.sort((a, b) => (b.vote_average - a.vote_average))
      default:
        this.setState({ sort: 'asc' })
        return searchResult.sort((a, b) => (b.vote_average - a.vote_average))
    }
  }
  fetchApi() {
    let key = '6953e1931b6994157197955210678c4a'
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=35`)
      .then(res => res.json())
      .then((result) => {
        this.setState({
          apiResult: result.results,
          searchResult: result.results
        })
      },
        (error) => {
          console.log('error ' + error)
        })
  }
  render() {
    let tableData = this.state.searchResult ? this.state.searchResult : null
    return (
      <div style={container}>
        <input
          type="text"
          placeholder="Search by title"
          style={search}
          onChange={this.onSearch}
        />
        <div style={tableContainer}>
          <table>
            <thead>
              <tr>
                <th className='id'>
                  #
              </th>
                <th className='title'>
                  Name
              </th>
                <th
                  className='rating'
                  onClick={() => {
                    this.setState({ searchResult: this.orderBy(tableData, this.state.sort ? this.state.sort : 'des') })
                  }}
                >
                  Rating{this.state.sort ? this.state.sort === 'asc' ? ' ↓' : ' ↑' : ''}
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData &&
                Object.keys(tableData).map(function (element) {
                  return (
                    <tr key={element}>
                      <td className='id'>{element}</td>
                      <td>{tableData![element].title}</td>
                      <td className='ratingData'>{tableData![element].vote_average}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <span className='info'>
          *Click on Rating to sort table
        </span>
      </div>
    )
  }
}

export default App
