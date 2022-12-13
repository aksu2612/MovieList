import './App.css';
import MoviesCard from './components/MoviesCard'
import SearchBar from './components/SearchBar';
import Header from './components/Header';
function App() {
  return (
    <div className="App">
        <Header/>
        <SearchBar/>
        <MoviesCard/>
    </div>
  );
}

export default App;
