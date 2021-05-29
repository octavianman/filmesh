import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(3),
    // marginTop: theme.overrides.Header.maxHeight,
    maxWidth: theme.overrides.Container.content.maxWidth,
    // minHeight: `calc(100vh - ${theme.overrides.Header.maxHeight}px)`,
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
    <main>
      <Box className={classes.wrapper}>{props.children}</Box>
    </main>
  );
};

export default MainContainer;
