"use client";
import React, { useState, useEffect } from "react";
import LoadingPage from "../components/LoadingAnimation";

export default function PopularFetch() {
  const [allMovies, setAllMovies] = useState([]); // Stores all movies
  const [displayedMovies, setDisplayedMovies] = useState([]); // Stores movies that are currently displayed
  const [popularData, setPopularData] = useState(null);
  const [movieMore, setMovieMore] = useState(false);
  const apiKey = "123";
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setPopularData(result);
      setAllMovies(result.results);
      setDisplayedMovies(result.results.slice(0, itemsPerPage));
      setMovieId(
        result.results.map((id) => {
          return id;
        })
      );
    };

    fetchData().catch((e) => {
      console.error("Error occurred on fetch", e);
    });
  }, []);

  const handleLoadMore = () => {
    const nextItems = allMovies.slice(
      displayedMovies.length,
      displayedMovies.length + itemsPerPage
    );
    setDisplayedMovies(displayedMovies.concat(nextItems));
  };

  function setMovieTrue() {
    if (movieMore === false) {
      setMovieMore(true);
    } else if (movieMore === true) {
      setMovieMore(false);
    }
  }

  return (
    <div>
      {popularData ? (
        <>
          {displayedMovies.map((movie) => (
            <div
              className="flex shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-5"
              id="popular-mov-comp"
            >
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                id="popular-img"
              />

              <div className="flex-col ml-5">
                <h2 key={movie.id} className="font-bold text-3xl mb-1">
                  {movie.original_title}
                </h2>

                <p key={movie.id} className="text-lg">
                  {movie.overview}
                </p>

                <p key={movie.id} className="mt-5 text-green-600 text-lg">
                  Rating: {movie.vote_average}
                </p>

                <p key={movie.id} className="text-lg">
                  Release date: {movie.release_date}
                </p>

                <p key={movie.id}>Total voters: {movie.vote_count}</p>
                {movie.adult ? <p>Age: 18+</p> : ""}
              </div>
            </div>
          ))}

          <div className="text-center mt-10 mb-10">
            {displayedMovies.length < allMovies.length && (
              <button
                onClick={handleLoadMore}
                className="bg-transparent hover:bg-red-600 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-600 hover:border-transparent rounded"
              >
                Load More
              </button>
            )}
          </div>
        </>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
}
