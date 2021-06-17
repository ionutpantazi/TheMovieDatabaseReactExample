import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResult: null,
      searchResult: null,
      sort: null
    };
  }
  componentDidMount() {
    this.fetchApi()
  }
  onSearch(input) {
    let result = []
    let prop = this.state.apiResult
    for (var x = 0; x < prop.length; x++) {
      if (prop[x].title.toLowerCase().search(input.toLowerCase()) == 0) {
        result.push(prop[x])
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
      <div className='container'>
        <input
          type="text"
          placeholder="Search by title"
          className='search'
          onChange={({ target: { value: input } }) => this.onSearch(input)}
        />
        <div className='tableContainer'>
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
                  Rating{this.state.sort ? this.state.sort == 'asc' ? ' ↓' : ' ↑' : ''}
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData &&
                Object.keys(tableData).map(function (element) {
                  return (
                    <tr key={element}>
                      <td className='id'>{element}</td>
                      <td>{tableData[element].title}</td>
                      <td className='ratingData'>{tableData[element].vote_average}</td>
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
