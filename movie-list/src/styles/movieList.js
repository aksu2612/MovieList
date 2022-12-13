import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  header:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    backgroundColor:'#babababa',
    height: '600px',
    fontSize: '3rem',
    textAlign:'left'
  },
  movieList:{
    display:'flex',
    flexWrap:'wrap',
    listStyle:'none',
    minWidth:'400px',
  },
  Movie:{
    display:'flex',
    flexWrap:'wrap',
    borderRadius:'30px',
    backgroundColor:'#8DE4FF',
    margin:'20px',
  }, 
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton:{
    
  },
  image:{
    marginLeft:'20px', 
    display:'flex',
    width:'370px'
  }
}));