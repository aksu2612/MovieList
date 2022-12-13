import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios';
import { useStyles } from '../styles/movieList';
import Movie from './Movie';

function MoviesCard(props) {
    const classes = useStyles();

    const [movies,setMovies]=useState([]);

    const fetchMovies = async ()=>{
        const response =await axios.get('https://www.omdbapi.com/?apikey=156f8ea8&s=any');
        setMovies(response.data.Search);
        console.log(movies);
    }
    useEffect(()=>{
        fetchMovies();
    },[])
    return (
        <div className={classes.movieList}>{
            movies.map((item)=>{
                return (
                <li>
                    <Movie movie={item}/>
                 
                </li>)
            })}
        </div>
  )
} 

export default MoviesCard