import {
  useParams,
  useLocation,
  Link,
  NavLink,
  Outlet,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import css from "./MovieDetailsPage.module.css";

const IMG = "https://image.tmdb.org/t/p/w300";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();

  const backLink = location.state?.from ?? "/movies";

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // API İsteği
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      })
      .then((res) => setMovie(res.data));
  }, [movieId]);

  if (!movie) return <p>Loading movie details...</p>;

  return (
    <div>
      <Link to={backLink}>← Go back</Link>
      <h2>{movie.title}</h2>
      <img
        src={
          movie.poster_path
            ? IMG + movie.poster_path
            : "https://placehold.co/250x375?text=No+Image"
        }
        alt={movie.title}
        width="250"
      />
      <p>{movie.overview}</p>
      <h3>Additional</h3>
      <NavLink className={css.link} to="cast">
        Cast
      </NavLink>{" "}
      |{" "}
      <NavLink className={css.link} to="reviews">
        Reviews
      </NavLink>
      <Outlet />
    </div>
  );
}
