'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import LoadingPage from '../components/LoadingAnimation';
 
export default function PopularFetch() {
  const [allMovies, setAllMovies] = useState([]); // Stores all movies
  const [displayedMovies, setDisplayedMovies] = useState([]); // Stores movies that are currently displayed
  const [popularData, setPopularData] = useState(null);
  const apiKey = "19645e77ac94e25c49e5cab3b05494eb";
  const itemsPerPage = 10;
 
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      setPopularData(result)
      setAllMovies(result.results);
      setDisplayedMovies(result.results.slice(0, itemsPerPage));
    }
 
    fetchData().catch((e) => {
      console.error('Error occurred on fetch', e)
    })
  }, [])

  const handleLoadMore = () => {
    const nextItems = allMovies.slice(
      displayedMovies.length,
      displayedMovies.length + itemsPerPage
    );
    setDisplayedMovies(displayedMovies.concat(nextItems));
  };

 
  return (
    <div>
      {popularData ? (
        <>
          {displayedMovies.map(movie => (
            <div className='flex shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-5' id="popular-mov-comp">
              {/* next obj: include max_width media query in tailwind and not in global.css, to simplify code */}

              {/* <Image 
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              width={600}
              heigh={600}
              alt={movie.original_title}
              /> */}
              <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} id='popular-img'/>

              <div className='flex-col ml-5'>
                <h2 key={movie.id} className='font-bold text-3xl mb-1'>
                  {movie.original_title}
                </h2>

                <p key={movie.id} className='text-lg'>
                  {movie.overview}
                </p>

                <p key={movie.id} className='mt-5 text-green-600 text-lg'>
                  Rating: {movie.vote_average}
                </p>

                <p key={movie.id} className='text-lg'>
                  Release date: {movie.release_date}
                </p>

                <p>Total voters: {movie.vote_count}</p>
                {movie.adult ? <p>Age: 18+</p> : ""}
              </div>

            </div>

          ))}

        <div className='text-center mt-10 mb-10'>
          {displayedMovies.length < allMovies.length && (
            <button 
              onClick={handleLoadMore}
              className='bg-transparent hover:bg-red-600 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-600 hover:border-transparent rounded' 
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









// async function getPopular() {
//     const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)

//     res.json()
// }

// export default async function PopularFetch() {
//     const popularMovies = await getPopular();
  
//     return (
//     <div>
//       <h1>Movies</h1>
//       {popularMovies.results.map(movie => (
//         <div key={movie.id}>
//           <h2>{movie.title }</h2>
//         </div>
//       ))}
//     </div>
//   )
// }