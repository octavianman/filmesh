import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { db } from "../../services/firebase";

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
    const getMoviesByRatings = async () => {
      const documents = await db.collection("movies").get();

      let moviesByRatings = documents.docs.map((doc) => {
        const reviews = doc.data().reviews;
        const ratingSum = reviews.reduce(
          (sum, item) => (sum += item.rating),
          0
        );
        const ratingAverage = ratingSum / reviews.length;

        return { id: doc.id, rating: ratingAverage };
      });

      moviesByRatings = moviesByRatings.sort((a, b) => b.rating - a.rating);
      moviesByRatings = moviesByRatings.slice(0, 4);

      const movies = [];

      for (const movie of moviesByRatings) {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}`,
          {
            params: {
              api_key: process.env.REACT_APP_MOVIEDB_API_KEY,
            },
          }
        );

        movies.push(response.data);
      }
      setTopRatedMovies(movies);
    };

    getMoviesByRatings();
  }, []);

  const renderedTopMovies = topRatedMovies.map((movie) => (
    <Grid
      item
      xs={12}
      sm={6}
      md={6}
      lg={3}
      key={movie.id}
      className={classes.topRated}
    >
      <Link to={`/movie/${movie.id}`}>
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
    </Grid>
  ));

  return (
    <Box pb={8}>
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

            <Grid container>{renderedTopMovies}</Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
