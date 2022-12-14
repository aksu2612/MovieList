import './App.css';
import MoviesCard from './components/MoviesCard' 
import Header from './components/Header';
import React, { useState } from 'react'; 
import { AppContext } from './context';

function App() {
	const [ movieList, setMovieList ] = useState([]);
	
	const dispatchMovieEvent = (actionType, payload) => {
		switch (actionType) {
			case 'ADD_MOVIE':
        const getMovie = JSON.parse(localStorage.getItem('movies'));
				setMovieList([ ...getMovie, payload ]);
        localStorage.setItem('movies', JSON.stringify(movieList));
				return;
			case 'REMOVE_MOVIE':
        const localStoregeMovie = JSON.parse(localStorage.getItem('movies'));
        const filteredList=  localStoregeMovie.filter(item => item.imdbID !==payload.imdbID); 
        setMovieList(filteredList);
        localStorage.setItem('movies', JSON.stringify(filteredList));
				return;
			default:
				return;
		}
	};

	return (
		<div className="App">
			<AppContext.Provider value={{ movieList, dispatchMovieEvent }}>
				<Header />
				<MoviesCard />
			</AppContext.Provider>
		</div>
	);
}

export default App;