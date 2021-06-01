import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  main: {
    position: "relative",
  },

  wrapper: {
    // marginTop: theme.overrides.Header.maxHeight,
    maxWidth: theme.overrides.Container.content.maxWidth,
    // minHeight: `calc(100vh - ${theme.overrides.Header.maxHeight}px)`,
    minHeight: "calc(100vh - 54px)",
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
      <Box className={classes.wrapper} px={3}>
        {props.children}
      </Box>
    </main>
  );
};

export default MainContainer;
