import createBreakpoints from "@material-ui/core/styles/createBreakpoints";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const breakpoints = createBreakpoints({});

let theme = createMuiTheme({
  palette: {},

  typography: {
    fontFamily: "'Oxygen', sans-serif",
  },

  overrides: {
    Container: {
      content: {
        maxWidth: 1430,
      },
    },

    MuiCssBaseline: {
      "@global": {
        html: {
          [breakpoints.down("sm")]: {
            fontSize: "75%", // 1rem = 12px
          },
          [breakpoints.down("md")]: {
            fontSize: "81.25%", // 1rem = 12px
          },
          [breakpoints.up("md")]: {
            fontSize: "75%", // 1rem = 12px
          },
          [breakpoints.up("lg")]: {
            fontSize: "81.25%", // 1rem = 13px
          },
          [breakpoints.up("xl")]: {
            fontSize: "87.5%", // 1rem = 14px
          },
        },

        a: {
          textDecoration: "none",
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
