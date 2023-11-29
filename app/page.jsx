import React from "react";
import LoadingPage from "./components/LoadingAnimation";

export default async function Home() {
  const apiKey = "19645e77ac94e25c49e5cab3b05494eb";

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`,
      { next: { revalidate: 1 } }
    );
    const revalidateData = await response.json();

    const loadMovieDetails = async (movieId) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
        );
        const movieDetails = await response.json();
        console.log(movieDetails);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    return (
      <main>
        <h2 className="text-center text-2xl mt-5">
          This page uses server-side rendering for better website SEO.
        </h2>

        {revalidateData ? (
          <>
            {revalidateData.results.map((movie) => (
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
          </>
        ) : (
          <LoadingPage />
        )}
      </main>
    );
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return <p>Error fetching content</p>;
  }
}
