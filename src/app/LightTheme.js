import createBreakpoints from "@material-ui/core/styles/createBreakpoints";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const breakpoints = createBreakpoints({});

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#51c4d3",
    },
    secondary: {
      main: "#e93b81",
    },
    background: {
      main: "#d8e3e7",
    },
  },

  typography: {
    fontFamily: "'Oxygen', sans-serif",
  },

  overrides: {
    Container: {
      content: {
        maxWidth: 1430,
      },
    },

    MuiButton: {
      root: {
        fontWeight: "bold",
        fontSize: "1rem",
        textTransform: "none",
        borderRadius: "5px",
        padding: "8px 16px",
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
          color: "#666666",

          "&:hover": {
            textDecoration: "underline",
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
