import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
};

const AddMovie = () => {
  const history = useHistory();
  const [addMovie, setAddMovie] = useState(initialMovie);

  const handleChanges = (e) => {
    e.preventDefault();
    setAddMovie({ ...addMovie, [e.target.name]: e.target.value });
  };

  const handleChangesToString = (e) => {
    e.preventDefault();
    setAddMovie({ ...addMovie, [e.target.name]: String(e.target.value) });
  };

  const submitMovie = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5000/api/movies`, addMovie).then((res) => {
      setAddMovie(initialMovie);
      history.push("/");
    });
  };

  return (
    <div>
      <h2>Add a Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChangesToString}
          placeholder="Title"
          value={addMovie.title}
        />
        <input
          type="text"
          name="director"
          onChange={handleChangesToString}
          placeholder="Director"
          value={addMovie.director}
        />
        <input
          type="text"
          name="metascore"
          onChange={handleChangesToString}
          placeholder="Metascore"
          value={addMovie.metascore}
        />
        <button onClick={submitMovie}>Add</button>
      </form>
    </div>
  );
};

export default AddMovie;
