import createBreakpoints from "@material-ui/core/styles/createBreakpoints";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const breakpoints = createBreakpoints({});

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#51c4d3",
      dark: "#132c33",
    },
    secondary: {
      main: "#AF4D98",
    },
    background: {
      main: "#d8e3e7",
    },
    text: {
      opacity: "rgba(19, 44, 51, .4)",
    },
  },

  typography: {
    fontFamily: "'Oxygen', sans-serif",

    body1: {
      fontSize: "1.2rem",
    },

    body2: {
      fontSize: "1rem",
    },

    h1: {
      fontWeight: "700",
      fontSize: "4.5rem",
      color: "#132c33",
    },

    h2: {
      fontWeight: "700",
      fontSize: "2.4rem",
      color: "#132c33",
    },

    h3: {
      fontWeight: "700",
      fontSize: "2rem",
      color: "#132c33",
    },

    h4: {
      fontWeight: "700",
      fontSize: "1.6rem",
      color: "#132c33",
    },

    h5: {
      fontWeight: "700",
      fontSize: "1.4rem",
      color: "#132c33",
    },

    h6: {
      fontWeight: "bold",
      fontSize: "1.3rem",
      color: "#132c33",
    },
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

      outlinedPrimary: {
        color: "#51c4d3",
        borderColor: "#51c4d3",
        padding: "10px 16px",
        fontSize: "1.1rem",
        minWidth: "12rem",
      },
    },

    MuiOutlinedInput: {
      root: {
        background: "#fff",
        borderRadius: 10,
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
