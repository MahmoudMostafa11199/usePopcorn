import React, { useState, useEffect } from "react";
import { useKey } from "./useKey";
import StarRating from "./StarRating";
import { Loader } from "./Helping";

function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
  KEY,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  useKey("escape", onCloseMovie);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Poster: poster,
    Title: title,
    Actors: actors,
    Director: director,
    Genre: genre,
    Plot: plot,
    Released: released,
    Runtime: runtime,
    imdbRating,
    imdbID: imdbId,
  } = movie;

  const addWatched = () => {
    const newMovie = {
      imdbID: selectedId,
      poster,
      title,
      imdbRating: +imdbRating,
      runtime: runtime?.split(" ")[0],
      userRating,
    };

    onAddWatched(newMovie);

    onCloseMovie();
  };

  useEffect(() => {
    const fetchMovieDetails = async function () {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setIsLoading(false);
      setMovie(data);
    };
    fetchMovieDetails();
  }, [KEY, selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <React.Fragment>
                  <StarRating
                    maxRating={10}
                    size={24}
                    key={imdbId}
                    onSetRating={setUserRating}
                  />
                  {userRating && (
                    <button className="btn-add" onClick={addWatched}>
                      + Add to list
                    </button>
                  )}
                </React.Fragment>
              ) : (
                <p>
                  You rated with movie {watchedUserRating} <span> ⭐ </span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </React.Fragment>
      )}
    </div>
  );
}

export default MovieDetails;
