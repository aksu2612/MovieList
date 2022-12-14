import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios';
import { useStyles } from '../styles/movieList';
import Movie from './Movie';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; 
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';  

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const MoviesCard =(props)=> {
    const classes = useStyles();

    //to DO  tek bir objeye taşınıp Context api ile yürütülecek
    const [movies,setMovies]=useState([]);
    const [myMovies,setmyMovies]=useState([]);
    const [listFlag,setListFlag]=useState(false);
    const [type, setType] = React.useState('');
    const [year, setYear] = React.useState(0);
    const [imdb, setImdb] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    let addingMovie ={
        Title:"",
        Language:"",
        Year:"",
        Actors:"",
        Poster:"",
    }

    async function search(value){
        if(value.length === 0){
            fetchMovies();
        }
        if(value.length>2 ){
            let response =await axios.get(`https://www.omdbapi.com/?apikey=156f8ea8&s=${value}&type=${type}&y=${year}&imdbRating=${imdb}`);
            if(response.data.Response !== "False"){ 
                response.data.Search = response.data.Search.sort((a, b) => {
                    if (a.Year > b.Year  ) {
                      return -1;
                    }
                  });
                setMovies(response.data.Search);
            } 
            else{
                // to do:Error Message
            }
        }
    }

    function handleChangeType (event){
        setType(event.target.value);
     };
     function handleChangeYear (selectedYear){
        setYear(selectedYear.target.value);
     };
     function handleChangeIMDB (event){
        setImdb(event.target.value);
     };
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
    
     const handleClickOpen = () => {
        setOpen(true);
    };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    }
    if (!values.group) {
      errors.group = "Select a group";
    }
    return errors;
  };
 
  const handleClose = () => {
    setOpen(false);
  };
  const saveMovie = () => {
    
  };


    return (
        <div>
            <div>
                <div className={classes.searchButton}> 
                <div>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Film Ekleme
                    </Button>
                        <Dialog
                            open={open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle>{"Film Ekleme"}</DialogTitle>
                        <div className={classes.dialog}>
                           <form id='addingMovie'>

                                <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                            
                                    
                                <TextField onChange={(val)=>addingMovie.Title=val} name="title" fullWidth  required  label="Film Adı" />
                                <TextField name="year" fullWidth  required   label="Yıl" />
                                <TextField name="type" fullWidth  required  label="Tip" />
                                <TextField name="actors" fullWidth  required   label="Aktörler" />
                                <TextField name="poster" fullWidth  required   label="Afiş Url" />
                              
                                </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                </DialogActions>
                          </form>
                    </div>
                </Dialog>
                    <Button 
                        variant={listFlag ?"outlined" :"contained"}
                        onClick={()=>myMovieList()}
                        >
                            {listFlag ?   "Film Listesi":"Listem"}
                    </Button>
                    </div>
                </div>
                <div>
                   <Select 
                        value={type}
                        label="Tür Seçiniz"
                        onChange={(event)=>handleChangeType(event)} 
                        className={classes.yearDropdown}
                    >
                        <MenuItem value="">
                            <em>Seçiniz</em>
                        </MenuItem>
                        <MenuItem value={"movie"}>Movie</MenuItem>
                        <MenuItem value={"episode"}>Episode</MenuItem>
                        <MenuItem value={"series"}>Series</MenuItem>
                    </Select>
                <Select 
                        value={year}
                        label="Yıl Seçiniz"
                        onChange={(event)=>handleChangeYear(event)} 
                        className={classes.yearDropdown}
                    >
                        <MenuItem value="">
                            <em>Seçiniz</em>
                        </MenuItem>
                        <MenuItem value={"2022"}>2022</MenuItem>
                        <MenuItem value={"2021"}>2021</MenuItem>
                        <MenuItem value={"2020"}>2020</MenuItem>
                    </Select>
                  
                    <Select 
                        value={imdb}
                        label="IMDB Seçiniz"
                        onChange={(event)=>handleChangeIMDB(event)}
                        className={classes.yearDropdown}
                    >
                        <MenuItem value="">
                            <em>Seçiniz</em>
                        </MenuItem>
                        <MenuItem value={"10"}>10</MenuItem>
                        <MenuItem value={"9"}>9</MenuItem>
                        <MenuItem value={"8"}>8</MenuItem>
                        <MenuItem value={"7"}>7</MenuItem>
                        <MenuItem value={"6"}>6</MenuItem>
                        <MenuItem value={"5"}>5</MenuItem>
                        <MenuItem value={"4"}>4</MenuItem>
                        <MenuItem value={"3"}>3</MenuItem>
                        <MenuItem value={"2"}>2</MenuItem>
                        <MenuItem value={"1"}>1</MenuItem>

                    </Select>
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