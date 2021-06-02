import React from "react";
import { Link } from "react-router-dom";

import { ImageIcon } from "../common/icons";

import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box, Typography } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  image: {
    width: "5rem",
    height: "8rem",
  },

  root: {
    padding: theme.spacing(2),
    border: "1px solid #EAEAEA",
    backgroundColor: theme.palette.common.white,
    height: "11rem",
    display: "flex",

    "&:hover": {
      backgroundColor: "#f5f5f5",
      cursor: "pointer",
    },
  },
}));

const SearchBarMovie = (props) => {
  const classes = useStyle();
  const { first, movie, last } = props;

  const date = new Date(movie.release_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <Link to={`/movie/${movie.id}`}>
      <Box
        className={classes.root}
        borderRadius={`${
          first ? "10px 10px 0px 0px" : last ? "0px 0px 10px 10px" : ""
        }`}
      >
        <Avatar
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt="Movie poster"
          className={classes.image}
          variant="square"
        >
          <ImageIcon />
        </Avatar>

        <Box ml={2}>
          <Typography variant="h6">{movie.title}</Typography>

          <Typography variant="body2" component="div">
            <Box color="text.opacity">{date}</Box>
          </Typography>

          <Box mt={1}>
            <Typography variant="body1">
              {movie.overview.substring(0, 135)}...
            </Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default SearchBarMovie;
