import { Theme, merge } from "theme-ui";
import base from "./base";

// Use this gradient
// linear-gradient(30deg, rgba(231,152,89,0.95) 20%, rgba(214,83,206,1) 80%)

const classic: Theme = merge(base, {
  fonts: {
    body: '"Lucida Handwriting", cursive',
    heading: '"Courier New", monospace',
    monospace: "Menlo, monospace",
  },
  colors: {
    text: "white",
    background: "#161d37",
    secondary: "rgb(242, 239, 243)",
  },
  buttons: {
    primary: {
      fontFamily: "inherit",
      color: "white",
      borderRadius: "10",
      textTransform: "capitalize",
      bg: "#266ed9",
      transition: "background 100ms ease-in-out",
      "&:hover": {
        bg: "#99ff99",
        color: "black",
      },
    },
    secondary: {
      color: "#161d37",
      bg: "#99ff99",
      "&:hover": {
        color: "#99ff99",
      },
    },
  },
  cards: {
    primary: {
      background:
        "linear-gradient(60deg, rgba(131,52,229,0.95) 40%, rgba(14,183,206,1) 80%)",
    },
  },
  forms: {
    input: {
      fontFamily: "body",
      borderRadius: 5,
      backgroundColor: "secondary",
      border: "transparent",
      color: "gray",
      outlineColor: "secondary",
    },
  },
  text: {
    heading: {
      letterSpacing: "2px",
    },
  },
});

export default classic;
