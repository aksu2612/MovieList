import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useStyles } from '../styles/movieList';



function SearchBar(props) {
    const classes = useStyles();

  return ( <div>

       <div className={classes.searchButton}> 
          <Button variant="outlined">Film Ekle</Button>
          <Button variant="outlined">Film Listesi</Button>
       </div>
    <div className={classes.searchBar}>
        <TextField 
            id="outlined-basic" 
            label="Outlined" 
            variant="outlined" />

    </div>
  </div>
  )
}


export default SearchBar
