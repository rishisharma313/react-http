import React, { useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    fetchMoviesHandler();
  }, []);

  async function fetchMoviesHandler(){
    setIsLoading(true);
    try
    {
      const response = await fetch('https://swapi.dev/api/films/');
      if(!response.ok){
        throw new Error('Something went wrong');
      }

      const data = await  response.json();

      
      const transformMovies = data.results.map(movieData =>{
        return {
          id:movieData.episode_id,
          title:movieData.title,
          openingText:movieData.opening_crawl,
          releaseDate:movieData.release_date
        }
      })
      setMovies(transformMovies);
      setIsLoading(false);
    } catch(error){
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        { !isLoading && movies.length > 0 && <MoviesList movies={movies} /> }
        { !isLoading && movies.length === 0 && <p>No Movies</p>}
        { isLoading && <p>Loading ...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
