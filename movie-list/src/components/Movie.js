import React, { useEffect, useState } from 'react'
import { useStyles } from '../styles/movieList';
import axios from 'axios';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
function Movie(props) {
    const items = JSON.parse(localStorage.getItem('movies'));
    const [movieDetail,setMovieDetail]=useState({});
    const [myMovieList,setMyMovieList]=useState(items);
    const [addingFlag,setAddingFlag]=useState(false);
    const classes = useStyles();

    const fetchMovieWithId = async ()=>{ 
      const response =await axios.get(`https://www.omdbapi.com/?apikey=156f8ea8&i=${props.movie.imdbID}`); 
      setMovieDetail(response.data); 
    }

  useEffect(()=>{
    fetchMovieWithId();
  },[myMovieList])

  function addMovieList(movieDetail){ 
    myMovieList.push(movieDetail)
    localStorage.setItem('movies', JSON.stringify(myMovieList)); 
    setAddingFlag(true)
  }
  function removeMovieList(movieDetail){ 


  setMyMovieList( myMovieList.filter(function(item) {
    return item.imdbID !== movieDetail.imdbID
  }))

    localStorage.setItem('movies', JSON.stringify(myMovieList)); 
    setAddingFlag(true)
  }
  return (
    <div className={classes.Movie} >
          <div className={classes.image}>
             <img src={props.movie.Poster} alt=""/>
          </div>
         <div className={classes.info}> 
            <h3>{props.movie.Title}</h3> 
            <h3>IMDB Puanı {movieDetail.imdbRating}</h3> 
            <h3>Yıl:{movieDetail.Year}</h3> 
            <h3>Tip:{movieDetail.Type}</h3> 
            <h3>Dil:{movieDetail.Language}</h3> 
            <h3>Aktörler:{movieDetail.Actors}</h3> 
            <p>{movieDetail.Plot}</p>
            {!props.listFlag  ?
            <Button 
              variant="outlined"
              onClick={()=>addMovieList(movieDetail)}
            >
              İzleme Listeme Ekle
            </Button> :
            <Button 
            variant="outlined"
            onClick={()=>removeMovieList(movieDetail)}
          >
            İzleme Listesinden Çıkar
          </Button>
            } 
         </div>   
    </div>
  )
}


export default Movie
