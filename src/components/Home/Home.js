import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import SearchByGenres from "./SearchByGenres";

import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box, Grid, Typography } from "@material-ui/core";
import { ImageIcon } from "../common/icons";

const useStyle = makeStyles((theme) => ({
  image: {
    width: "100%",
    objectFit: "cover",
  },

  mainTitle: {
    transition: "all .2s ease-in",

    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.1)",
      textDecoration: "underline",
    },
  },

  poster: {
    width: "16rem",
    height: "25rem",
    margin: "0 auto",
  },

  topRated: {
    transition: "all .2s ease-in",

    "&:hover": {
      transform: "scale(1.1)",
    },
  },
}));

const Home = () => {
  const classes = useStyle();

  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    const getLatestMovies = async () => {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/top_rated",
        {
          params: {
            api_key: process.env.REACT_APP_MOVIEDB_API_KEY,
          },
        }
      );

      const results = response.data.results.sort(
        (a, b) => b.vote_count - a.vote_count
      );

      setTopRatedMovies(results.slice(0, 4));
    };

    getLatestMovies();
  }, []);

  const renderedTopMovies = topRatedMovies.map((movie) => (
    <Link to={`/movie/${movie.id}`} key={movie.id} className={classes.topRated}>
      <Box mb={1}>
        <Avatar
          variant="square"
          alt="Movie poster"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          className={classes.poster}
        >
          <ImageIcon />
        </Avatar>
      </Box>

      <Typography variant="h5" align="center">
        {movie.title}
      </Typography>
      <Typography variant="h5" align="center">
        {new Date(movie.release_date).getFullYear()}
      </Typography>
    </Link>
  ));

  return (
    <Box pb={7}>
      <Grid container>
        <Grid item xs={12} md={3}>
          <Box borderRight="2px solid #EAEEF9" minHeight="calc(100vh - 132px)">
            <SearchByGenres />
          </Box>
        </Grid>

        <Grid item xs={12} md={9}>
          <Box pt={4} px={2}>
            <Box mb={5} position="relative">
              <img
                src="/images/main_movie.jpg"
                alt="Main movie poster"
                className={classes.image}
              />
              <Box position="absolute" bottom="3rem" left="3rem">
                <Link to="/movie/475557">
                  <Typography variant="h1" component="div">
                    <Box color="common.white" className={classes.mainTitle}>
                      Joker (2019)
                    </Box>
                  </Typography>
                </Link>
              </Box>
            </Box>

            <Box mb={3}>
              <Typography variant="h2">Find out top rated</Typography>
            </Box>

            <Grid container justify="space-between">
              {renderedTopMovies}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
