import React, { Component } from 'react';
import "./Moviepage.css";
import axios from "axios";
import Youtube from "react-youtube";
import {API_URL,API_KEY} from "../../API/secrets";


class Moviepage extends Component {
    state = { 
        videoObj:{}
     }

    async componentDidMount(){
        let response=await axios.get(`${API_URL}/movie/${this.props.location.state.id}/videos?api_key=${API_KEY}&language=en-US`);
        console.log(response);
        let videoObj=response.data.results.filter((videoObj)=>{
            if(videoObj.type=="Trailer"&&videoObj.site=="YouTube"){
                return true;
            }
            return false;
        });
        this.setState({
            videoObj:videoObj[0]
        })
    }

    render() { 
        const opts={
            height:"100%",
            width:"100%",
            playerVars:{
                autoplay:1,
            }
        }
        let {title,tagline,vote_average,poster_path,overview}=this.props.location.state;
        return ( 
            <div className="movie-page">
                <div className="movie-page-poster">
                    <img src={poster_path} alt="" />
                </div>
                <div className="movie-page-details">
                    <div className="movie-title-info">
                        <h1>{title} <br></br>{vote_average} IMDB</h1>
                        <span>{tagline}</span>
                        <p>{overview}</p>
                    </div>
                    <div className="movie-trailer">
                        <Youtube videoId={this.state.videoObj.key} opts={opts}></Youtube>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Moviepage;