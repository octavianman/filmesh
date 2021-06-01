import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box, Typography } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  image: {
    width: "5rem",
    height: "8rem",
  },
}));

const SearchBarMovie = (props) => {
  const classes = useStyle();
  const { movie } = props;

  const date = new Date(movie.release_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <Box p={2} border="1px solid #EAEAEA" display="flex">
      <Avatar
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt="Movie poster"
        className={classes.image}
        variant="square"
      ></Avatar>

      <Box ml={2}>
        <Typography variant="h6">{movie.title}</Typography>

        <Typography variant="body2" component="div">
          <Box color="text.opacity">{date}</Box>
        </Typography>

        <Box mt={1}>
          <Typography variant="body1">
            {movie.overview.substring(0, 200)}...
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchBarMovie;
