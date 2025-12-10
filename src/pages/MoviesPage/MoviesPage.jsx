import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [params, setParams] = useSearchParams();
  const query = params.get("query") ?? "";

  useEffect(() => {
    if (!query) return;

    axios
      .get("https://api.themoviedb.org/3/search/movie", {
        params: { query },
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      })
      .then((res) => setMovies(res.data.results));
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setParams({ query: e.target.elements.search.value });
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit}>
        <input className={css.input} name="search" />
        <button className={css.button}>Search</button>
      </form>
      <div className={css.list}>
        <MovieList movies={movies} />
      </div>
    </div>
  );
}
