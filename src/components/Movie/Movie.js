import React, { useEffect, useState } from "react";
import axios from "axios";

import { Box } from "@material-ui/core";

const Movie = (props) => {
  const id = props.match.params.id;

  const [movie, setMovie] = useState();

  console.log(movie);

  useEffect(() => {
    const getMovie = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}`,
        {
          params: {
            api_key: process.env.REACT_APP_MOVIEDB_API_KEY,
          },
        }
      );

      setMovie(response.data);
    };

    getMovie();
  }, [id]);

  return <Box>Movie</Box>;
};

export default Movie;
