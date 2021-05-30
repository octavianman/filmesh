import React from "react";

import { Box } from "@material-ui/core";

const Movie = (props) => {
  const id = props.match.params.id;

  console.log(id);

  return <Box>Movie</Box>;
};

export default Movie;
