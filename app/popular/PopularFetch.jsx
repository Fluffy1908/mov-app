'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
 
export default function PopularFetch() {
  const [popularData, setPopularData] = useState(null)
  const apiKey = ""
 
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      setPopularData(result)
    }
 
    fetchData().catch((e) => {
      console.error('An error occurred while fetching: ', e)
    })
  }, [])
 
  return (
    <div>
      {popularData ? (
        <>
          {popularData.results.map(movie => (
            <div className='flex m-20 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-5'>

              {/* <Image 
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              width={500}
              heigh={500}
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

                <p>Total voters:</p>
              </div>

            </div>
          ))}
        </>
      ) : (
        'Loading ...'
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