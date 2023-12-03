"use client";
import React, { useState, useEffect } from "react";
import LoadingPage from "../components/LoadingAnimation";

export default function TopFetch() {
  const [allMovies, setAllMovies] = useState();
  const apiKey = process.env.API_URL;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setAllMovies(result.results);
    };

    fetchData().catch((e) => {
      console.error("Error occurred on fetch", e);
    });
  }, []);

  return (
    <div>
      {allMovies ? (
        <>
          {allMovies.map((movie) => (
            <div
              key={movie.id} // key prop added here
              className="flex shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-5"
              id="popular-mov-comp"
            >
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                id="popular-img"
              />

              <div className="flex-col ml-5">
                <h2 className="font-bold text-3xl mb-1">
                  {movie.original_title}
                </h2>

                <p className="text-lg">{movie.overview}</p>

                <p className="mt-5 text-green-600 text-lg">
                  Rating: {movie.vote_average}
                </p>

                <p className="text-lg">Release date: {movie.release_date}</p>

                <p>Total voters: {movie.vote_count}</p>
                {movie.adult ? <p>Age: 18+</p> : ""}
              </div>
            </div>
          ))}
        </>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
}
