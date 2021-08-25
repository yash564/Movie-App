import React, { Component } from "react";
import Header from "./components/Header/Header.jsx";
import Movies from "./components/Movies/Movies.jsx";
import Pagination from "./components/Pagination/Pagination";
import axios from "axios";
import { API_KEY, API_URL, IMAGE_URL } from "./API/secrets.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Favourite from "./components/Favourite/Favourite.jsx";
import Moviepage from "./components/Moviepage/Moviepage.jsx";

class App extends Component {
  state = {
    moviesData: [],
    currentMovie: "avengers",
    pages: [],
    currPage: 1
  };

  async componentDidMount() {
    // API call
    // params => api key , page , query
    // https://api.themoviedb.org/3/search/movie?api_key=bdd243ea847239dc0799805e63e189f0&query=avengers&page=1&include_adult=false

    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: 1, query: this.state.currentMovie },
    });
    let moviesData = data.data.results.slice(0, 10);
    let pagesCount = data.data.total_pages;
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    this.setState({
      moviesData: moviesData,
      pages: pages,
    });
    console.log(moviesData);
  }

  setMovies = async (newMovieName) => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: 1, query: newMovieName },
    });
    let moviesData = data.data.results.slice(0, 10);
    let pagesCount = data.data.total_pages;
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    this.setState({
      moviesData: moviesData,
      currentMovie: newMovieName,
      pages: pages,
    });
  }

  nextPage = async () => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: this.state.currPage + 1, query: this.state.currentMovie },
    });
    let moviesData = data.data.results.slice(0, 10);
    this.setState({
      moviesData: moviesData,
      currPage: this.state.currPage + 1
    });
  }

  previousPage = async () => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: this.state.currPage - 1, query: this.state.currentMovie },
    });
    let moviesData = data.data.results.slice(0, 10);
    this.setState({
      moviesData: moviesData,
      currPage: this.state.currPage - 1
    });
  }

  setPage = async (pagesCount) => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: pagesCount, query: this.state.currentMovie },
    });
    let moviesData = data.data.results.slice(0, 10);
    this.setState({
      moviesData: moviesData,
      currPage: pagesCount
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header setMovies={this.setMovies}></Header>
          <Switch>
            <Route path="/" exact>
              {this.state.moviesData.length ?
                <React.Fragment>
                  <Movies movies={this.state.moviesData}></Movies>
                  <Pagination pages={this.state.pages} previousPage={this.previousPage} currPage={this.state.currPage} nextPage={this.nextPage} setPage={this.setPage}></Pagination>
                </React.Fragment> :
                <h1 className="d-flex justify-content-center align-items-center">Oops No Movies Found!!</h1>
              }
            </Route>

            <Route path="/fav" exact>
              <Favourite></Favourite>
            </Route>

            <Route path="/moviepage" exact component={Moviepage}>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;