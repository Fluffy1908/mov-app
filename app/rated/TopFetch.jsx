'use client'
import React, { useState, useEffect } from 'react'

export default function TopFetch() {
    const [allMovies, setAllMovies] = useState([]);
    const apiKey = "";

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`)
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          const result = await response.json()
          setAllMovies(result.results);
        }
     
        fetchData().catch((e) => {
          console.error('Error occurred on fetch', e)
        })
      }, []);
      
      return (
        <div>
          {allMovies && allMovies.map(movie => (
            <>
            <h1 key={movie.id}>{movie.original_title}</h1>


            </>
          ))}
        </div>
      );
}