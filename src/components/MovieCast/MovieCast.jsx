import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import css from "./MovieCast.module.css";

const IMG = "https://image.tmdb.org/t/p/w200";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      })
      .then((res) => setCast(res.data.cast));
  }, [movieId]);

  if (!cast.length) return <p>No cast info</p>;

  return (
    <ul className={css.list}>
      {cast.map((actor) => (
        <li key={actor.id}>
          <img
            src={
              actor.profile_path
                ? IMG + actor.profile_path
                : "https://picsum.photos/250/375"
            }
            alt=""
          />
          <p>{actor.name}</p>
          <p>{actor.character}</p>
        </li>
      ))}
    </ul>
  );
}
