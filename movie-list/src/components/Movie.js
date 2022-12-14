import React, { useContext, useEffect, useState } from 'react'
import { useStyles } from '../styles/movieList';
import axios from 'axios';
import Button from '@mui/material/Button';
import { AppContext } from '../context';

function Movie(props) {
  const items = JSON.parse(localStorage.getItem('movies'));
    const [movieDetail,setMovieDetail]=useState({});
    const [myMovieList,setMyMovieList]=useState(items ===null ? [] : items);
    const [addingFlag,setAddingFlag]=useState(false);
    const classes = useStyles();

    const fetchMovieWithId = async ()=>{ 
      const response =await axios.get(`https://www.omdbapi.com/?apikey=156f8ea8&i=${props.movie.imdbID}`); 
      setMovieDetail(response.data); 
    }

  useEffect(()=>{
    fetchMovieWithId();
  },[])

  function addMovieList(movieDetail){  
    const items = JSON.parse(localStorage.getItem('movies'));
    setMyMovieList(items);
    if(myMovieList.length === 0 ){ 
      myMovieList[0]=movieDetail
      localStorage.setItem('movies', JSON.stringify(myMovieList)); 
    }else{
      myMovieList.push(movieDetail)
      localStorage.setItem('movies', JSON.stringify(myMovieList)); 
    }
    setAddingFlag(true)
  }

  const { dispatchMovieEvent } = useContext(AppContext);
  const handleRemoveMovie = () => {
		dispatchMovieEvent('REMOVE_MOVIE', { imdbID: props.movie.imdbID });
	};

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
            onClick={handleRemoveMovie}
          >
            İzleme Listesinden Çıkar
          </Button>
            } 
            
         </div>   
    </div>
  )
}


export default Movie
