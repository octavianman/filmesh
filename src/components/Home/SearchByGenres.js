import React from "react";
import { Link } from "react-router-dom";

import GenreCard from "./SearchByGenres/GenreCard";

import { Box, Grid, Typography } from "@material-ui/core";

const genres = [
  { title: "ACTION", image: "action.jpg" },
  { title: "DRAMA", image: "drama.jpg" },
  { title: "FANTASY", image: "fantasy.jpg" },
  { title: "ADVENTURE", image: "adventure.jpg" },
  { title: "COMEDY", image: "comedy.jpg" },
  { title: "ANIMATION", image: "animation.jpg" },
  { title: "THRILLER", image: "thriller.jpg" },
];

const SearchByGenres = () => {
  const renderedGenres = genres.map((item, index) => {
    return (
      <Grid item xs={12} key={index}>
        <Link to={`/discover/${item.title.toLowerCase()}`}>
          <GenreCard image={item.image} title={item.title} />
        </Link>
      </Grid>
    );
  });

  return (
    <Box p={3} pb={10}>
      <Box mb={3}>
        <Typography variant="h4" align="center">
          <Box color="primary.dark">Browse by genre</Box>
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {renderedGenres}
      </Grid>
    </Box>
  );
};

export default SearchByGenres;
