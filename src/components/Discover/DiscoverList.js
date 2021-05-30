import React, { useEffect, useState } from "react";
import axios from "axios";

import genreToId from "./constants/genreToId.constant";
import MoviePanel from "./MoviePanel";

import { Box, Grid, Typography } from "@material-ui/core";

const renderedGenre = (genre) => {
  return genre.charAt(0).toUpperCase() + genre.slice(1);
};

const DiscoverList = (props) => {
  const genre = props.match.params.genre;

  const [currentPage, setCurrentPage] = useState(1);
  const [showingMovies, setShowingMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            api_key: process.env.REACT_APP_MOVIEDB_API_KEY,
            with_genres: genreToId[genre],
            include_adult: false,
            page: currentPage,
          },
        }
      );

      setShowingMovies([...showingMovies, ...response.data.results]);
    };

    getMovies();

    // eslint-disable-next-line
  }, [currentPage]);

  const renderedMovies = showingMovies.map((movie) => {
    return (
      <Grid item xs={12} md={3} key={movie.id}>
        <MoviePanel movie={movie} />
      </Grid>
    );
  });

  return (
    <Box mt="70px" py={3}>
      <Box mb={4}>
        <Typography variant="h2" align="center">
          {renderedGenre(genre)} movies
        </Typography>
      </Box>

      <Grid container spacing={5}>
        {renderedMovies}
      </Grid>
    </Box>
  );
};

export default DiscoverList;
