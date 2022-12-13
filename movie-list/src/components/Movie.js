import React, { useEffect, useState } from 'react'
import { useStyles } from '../styles/movieList';
import axios from 'axios';

function Movie({movie}) {
    const [movieDetail,setMovieDetail]=useState({});
    const classes = useStyles();
    const fetchMovieWithId = async ()=>{
     
    const response =await axios.get(`https://www.omdbapi.com/?apikey=156f8ea8&i=${movie.imdbID}`);
 
    setMovieDetail(response.data);
    console.log("movieDetail")
    console.log(movieDetail)
  }
  useEffect(()=>{
    fetchMovieWithId();
  },[])

  return (
    <div className={classes.Movie}>
          <div className={classes.image}>
             <img src={movie.Poster} alt=""/>
          </div>
         <div> 
           <h3>{movie.Title}</h3> 
           <h3>Yıl:{movie.Year}</h3> 
           <h3>Tip:{movie.Type}</h3> 
          <h3>Dil:{movieDetail.Language}</h3> 
          <h3>Aktörler:{movieDetail.Actors}</h3> 
          <p>{movieDetail.Plot}</p>
         </div>   
    </div>
  )
}


export default Movie
