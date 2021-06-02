import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  poster: {
    width: "100%",
    height: "35rem",
    objectFit: "cover",
  },
}));

const MoviePanel = (props) => {
  const classes = useStyle();
  const { movie } = props;

  const date = new Date(movie.release_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <Box>
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt="Movie poster"
          className={classes.poster}
        />
      </Link>

      <Box mt={1}>
        <Typography variant="h6" align="center">
          {movie.title}
        </Typography>
      </Box>

      <Typography variant="body2" align="center" component="div">
        <Box color="text.opacity">{date}</Box>
      </Typography>

      <Box mt={1}>
        <Typography variant="body1">
          {movie.overview.substring(0, 100)}...
        </Typography>
      </Box>

      <Box mt={1}>
        <Link to={`/movie/${movie.id}`}>
          <Typography variant="body1" align="right" component="div">
            <Box color="primary.main">...see more</Box>
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default MoviePanel;
