import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  header:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    backgroundColor:'#babababa',
    height: '60px',
    fontSize: '1.2rem',
    textAlign:'left'
  },
  movieList:{
    display:'flex',
    flexWrap:'wrap',
    listStyle:'none',
  },
  Movie:{
    display:'flex',
    flexWrap:'wrap',
    borderRadius:'30px',
    backgroundColor:'#DFEBEF',
    margin:'20px',
  
  }, 
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton:{
    
  },
  info:{
    margin:'20px',
    width:'200px', 
  },
  image:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:'20px', 
    display:'flex',
    width:'370px'
  },
  yearDropdown:{
    width:'200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin:'20px'
  },
  dialog:{
    height:'350px',
    width:'550px',
    marginTop:'30px'
  }
}));