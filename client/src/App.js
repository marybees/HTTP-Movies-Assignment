import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";

import axios from "axios";

import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route
        path="/movies/:id"
        render={() => (
          <Movie
            addToSavedList={addToSavedList}
            movieList={movieList}
            setMovieList={setMovieList}
          />
        )}
      ></Route>

      <Route
        path="/add-movie/"
        render={() => (
          <UpdateMovie movieList={movieList} setMovieList={setMovieList} />
        )}
      ></Route>

      <Route
        path="/update-movie/:id"
        render={() => (
          <UpdateMovie movieList={movieList} setMovieList={setMovieList} />
        )}
      ></Route>
    </>
  );
};

export default App;
