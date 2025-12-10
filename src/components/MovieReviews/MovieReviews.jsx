import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      })
      .then((res) => setReviews(res.data.results));
  }, [movieId]);

  if (!reviews.length) return <p>No reviews</p>;

  return (
    <ul className="reviews-list">
      {reviews.map((r) => (
        <li key={r.id}>
          <h4>{r.author}</h4>
          <p>{r.content}</p>
        </li>
      ))}
    </ul>
  );
}
