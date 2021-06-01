import React from "react";

import SearchByGenres from "./SearchByGenres";

import { Box, Grid } from "@material-ui/core";

const Home = () => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={3}>
          <Box borderRight="2px solid #EAEEF9">
            <SearchByGenres />
          </Box>
        </Grid>

        <Grid item xs={12} md={9}></Grid>
      </Grid>
    </Box>
  );
};

export default Home;
