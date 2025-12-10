import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchTrending() {
      const res = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/day",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        }
      );
      setMovies(res.data.results || []);
    }

    fetchTrending();
  }, []);

  return (
    <>
      <div className={css.container}>
        <h2>Trending Movies</h2>
        <div className={css.home}>
          <MovieList movies={movies} />
        </div>
      </div>
    </>
  );
}
