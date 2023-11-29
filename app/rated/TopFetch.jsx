"use client";
import React, { useState, useEffect } from "react";
import LoadingPage from "../components/LoadingAnimation";

export default function TopFetch() {
  const [allMovies, setAllMovies] = useState();
  const apiKey = "19645e77ac94e25c49e5cab3b05494eb";

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
      setIsLoaded(true);
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
              className="flex shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-5"
              id="popular-mov-comp"
            >
              {/* next obj: include max_width media query in tailwind and not in global.css, to simplify code */}

              {/* <Image 
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              width={600}
              heigh={600}
              alt={movie.original_title}
              /> */}
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
        </>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
}
