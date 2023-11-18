'use client'
import React, { useState, useEffect } from 'react'
 
export default function PopularFetch() {
  const [popularData, setPopularData] = useState(null)
 
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=7cd84399b71e108a5f5269c09183bd44')
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
 
  return <p>{popularData ? `Your data: ${popularData}` : 'Loading...'}</p>
}









// async function getPopular() {
//     const res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=7cd84399b71e108a5f5269c09183bd44')

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