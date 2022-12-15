import React, { useContext,useState,useEffect } from 'react';
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
import { AppContext } from '../context';
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
    const [userMovie ,setUserMovie]= useState({});
    let addingMovie ={
        Title:"",
        Language:"",
        Year:"",
        Actors:"",
        Poster:"",
    }

    async function Search(value){
        if(value.length === 0){
            fetchMovies();
        }
        if(value.length>2 ){
            let response ='';
            if(type !=="" && imdb !==0 && year !==0){
              response =await axios.get(`https://www.omdbapi.com/?apikey=156f8ea8&s=${value}&type=${type}&y=${year}&imdbRating=${imdb}`);
            }
            else{
              response =await axios.get(`https://www.omdbapi.com/?apikey=156f8ea8&s=${value}`);

            }
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

    async function fetchMovies(){
        const response =await axios.get('https://www.omdbapi.com/?apikey=156f8ea8&s=any'); 
        setMovies(response.data.Search); 
    
    }  
    const { movieList } = useContext(AppContext);
    console.log(movieList)

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

  //Todo Form eklendiğinde kullanılacak validation metodu
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
  
  const { dispatchMovieEvent } = useContext(AppContext);
  const handleAddMovie = () => {
        setUserMovie(addingMovie)
		dispatchMovieEvent('ADD_MOVIE', {  addingMovie });
        setOpen(false)
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
                                <TextField onChange={(val)=>addingMovie.Title=val.target.value} name="title" fullWidth  required  label="Film Adı" />
                                <TextField onChange={(val)=>addingMovie.Year=val.target.value}  name="year" fullWidth  required   label="Yıl" />
                                <TextField onChange={(val)=>addingMovie.Type=val.target.value} name="type" fullWidth  required  label="Tip" />
                                <TextField onChange={(val)=>addingMovie.Actors=val.target.value} name="actors" fullWidth  required   label="Aktörler" />
                                <TextField onChange={(val)=>addingMovie.Poster=val.target.value} name="poster" fullWidth  required   label="Afiş Url" />
                                <Button 
                                    variant="outlined"
                                    onClick={handleAddMovie}
                                >
                                    İzleme Listesine Ekle
                                </Button>
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
                        onChange={(event)=>setType(event.target.value)} 
                        className={classes.yearDropdown}
                    >
                        <MenuItem value="">
                            <em>Tür Seçiniz</em>
                        </MenuItem>
                        <MenuItem value={"movie"}>Movie</MenuItem>
                        <MenuItem value={"episode"}>Episode</MenuItem>
                        <MenuItem value={"series"}>Series</MenuItem>
                    </Select>
                <Select 
                        value={year}
                        label="Yıl Seçiniz"
                        onChange={(event)=>setYear(event.target.value)} 
                        className={classes.yearDropdown}
                    >
                        <MenuItem value="">
                            <em>Yıl Seçiniz</em>
                        </MenuItem>
                        <MenuItem value={"2022"}>2022</MenuItem>
                        <MenuItem value={"2021"}>2021</MenuItem>
                        <MenuItem value={"2020"}>2020</MenuItem>
                    </Select>
                  
                    <Select 
                        value={imdb}
                        label="IMDB Seçiniz"
                        onChange={(event)=> setImdb(event.target.value)}
                        className={classes.yearDropdown}
                    >
                        <MenuItem value="">
                            <em>IMDB Seçiniz</em>
                        </MenuItem>
                        {/*TO DO Döngüye alıp iteractive üret.  */}
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
                        onChange={(val)=>Search(val.currentTarget.value)}
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