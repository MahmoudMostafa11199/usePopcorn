import React, { useRef } from "react";
import { useKey } from "./useKey";

export default function NavBar({ movies, query, onSetQuery, onCloseMovie }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search
        query={query}
        onSetQuery={onSetQuery}
        onCloseMovie={onCloseMovie}
      />
      <NumResult movies={movies} />
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, onSetQuery, onCloseMovie }) {
  const inputEl = useRef(null);

  useKey("enter", () => {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    onSetQuery("");
  });

  return (
    <div className="search-box">
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => onSetQuery(e.target.value)}
        ref={inputEl}
      />
      {query && (
        <button
          className="btn-clear"
          onClick={() => {
            onSetQuery("");
            onCloseMovie();
          }}
        >
          X
        </button>
      )}
    </div>
  );
}

function NumResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
