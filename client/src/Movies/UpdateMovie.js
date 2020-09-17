import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  title: "",
  director: "",
  metascore: 0,
};

const UpdateMovie = () => {
  const history = useHistory();
  const { id } = useParams();
  const [movie, setMovie] = useState(initialMovie);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log("Getting response:", res);
        setMovie(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChanges = (e) => {
    e.preventDefault();
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        console.log(res);
        setMovie(initialMovie);
        history.push(`/movies/${id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          onChange={handleChanges}
          placeholder="Title"
          value={movie.title}
        />
        <label>Director:</label>
        <input
          type="text"
          name="director"
          onChange={handleChanges}
          placeholder="Director"
          value={movie.director}
        />
        <label>Metascore:</label>
        <input
          type="text"
          name="metascore"
          onChange={handleChanges}
          placeholder="Metascore"
          value={movie.metascore}
        />
        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
