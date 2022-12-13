import React from 'react'
import { useStyles } from '../styles/movieList';


function Header() {
    const classes = useStyles();
  return (
    <div className={classes.Header}>
      <h3>Film listeleme</h3>
    </div>
  )
}

export default Header