import React, { useState } from "react";
import { useMovie } from "./useMovie";
import { useLocalStorageState } from "./useLocalStorageState";
import NavBar from "./NavBar";
import Main from "./Main";
import Box from "./Box";
import MovieList from "./MovieList";
import WatchedMovieList from "./WatchedMovieList";
import WatchedSummary from "./WatchedSummary";
import { Loader, ErrorMessage } from "./Helping";
import MovieDetails from "./MovieDetails";

const KEY = "5efa3a53";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const { movies, isLoading, error } = useMovie(query);

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  return (
    <React.Fragment>
      <NavBar
        movies={movies}
        query={query}
        onSetQuery={setQuery}
        onCloseMovie={handleCloseMovie}
      />
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
              KEY={KEY}
            />
          ) : (
            <React.Fragment>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </React.Fragment>
          )}
        </Box>
      </Main>
    </React.Fragment>
  );
}
