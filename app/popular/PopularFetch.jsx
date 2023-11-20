'use client'
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
        <ul>
          {popularData.results.map(movie => (
            <li key={movie.id}>{movie.original_title}</li>
          ))}
        </ul>
      ): (
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