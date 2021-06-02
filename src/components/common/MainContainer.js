import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  main: {
    position: "relative",
  },

  wrapper: {
    maxWidth: theme.overrides.Container.content.maxWidth,
    minHeight: "100vh",
    margin: "0 auto",

    [theme.breakpoints.down("sm")]: {
      paddingBottom: theme.spacing(10),
    },
  },
}));

const MainContainer = (props) => {
  const classes = useStyle();

  return (
    <main className={classes.main}>
      <Box className={classes.wrapper} px={3} pt="70px">
        {props.children}
      </Box>
    </main>
  );
};

export default MainContainer;
