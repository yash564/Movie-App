import React, { Component } from "react";
import { API_KEY,IMAGE_URL,API_URL } from "../../API/secrets";
import { Link } from "react-router-dom";
import "./Movie.css";
import axios from "axios";

class Movie extends Component {
  state = {
    detailedMovieObj:{}
  };

  async componentDidMount() {
    let data=await axios.get(`${API_URL}/movie/${this.props.movie.id}?api_key=${API_KEY}`);
    let detailedMovieObj=data.data;
    let posterPath=IMAGE_URL+detailedMovieObj.poster_path;
    this.setState({
      detailedMovieObj:{...detailedMovieObj,poster_path:posterPath}
    })
  }

  render() {
    let { poster_path, title, vote_average } = this.props.movie;
    let posterPath = IMAGE_URL + poster_path;
    return (
      <div className="movie-item">
        <div className="movie-poster">
          <Link to={{pathname:"/moviepage",state:this.state.detailedMovieObj}}>
            <img src={posterPath} alt="" />
          </Link>
        </div>
        <div className="movie-info">
          <div className="movie-title">{title}</div>
          <div className="movie-rating">{vote_average} IMDB</div>
        </div>
      </div>
    );
  }
}

export default Movie;