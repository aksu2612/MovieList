import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios';
import { useStyles } from '../styles/movieList';
import Movie from './Movie';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const MoviesCard =(props)=> {
    const classes = useStyles();
    
    const [movies,setMovies]=useState([]);
    const [myMovies,setmyMovies]=useState([]);
    const [listFlag,setListFlag]=useState(false);

    async function search(value){
        if(value.length === 0){
            fetchMovies();
        }
        if(value.length>2 ){
            const response =await axios.get(`https://www.omdbapi.com/?apikey=156f8ea8&s=${value}`);
            if(response.data.Response !== "False"){ 
                setMovies(response.data.Search);
            } 
            else{
                // to do:Error Message
            }
        }
    }

    async function fetchMovies(){
        const response =await axios.get('https://www.omdbapi.com/?apikey=156f8ea8&s=any'); 
        setMovies(response.data.Search); 
    }
    useEffect(()=>{
        fetchMovies();      
    },[])

    function myMovieList(){
        const items = JSON.parse(localStorage.getItem('movies'));
        if (items) {
            setmyMovies(items);
        }
        setListFlag(!listFlag);
    }
    return (
        <div>
            <div>
                <div className={classes.searchButton}> 
                    <Button 
                    variant={listFlag ?"outlined" :"contained"}
                    onClick={()=>myMovieList()}
                    >
                        Film Listesi
                    </Button>
                </div>
               {!listFlag ?  
               <div className={classes.searchBar}>
                    <TextField 
                        id="outlined-basic" 
                        label="" //
                        variant="outlined"
                        placeholder='En az 3 Karakter giriniz'
                        onChange={(val)=>search(val.currentTarget.value)}
                        /> 
                </div>
               : null
               }
           
            </div>
            {listFlag ? 
            <div className={classes.movieList}>{
                myMovies.map((item)=>{
                        return (
                            <li>
                            <Movie movie={item} listFlag={listFlag}/>
                        </li>)
                    })}
                </div>
            :  
            <div className={classes.movieList}>{
                movies.map((item)=>{
                    return (
                        <li>
                        <Movie movie={item}/>
                    </li>)
                })}
            </div>
            }
          
        </div>
  )
} 

export default MoviesCard