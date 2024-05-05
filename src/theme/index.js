import { common } from "@mui/material/colors";

const Theme = () => {
  return {
    components: {},
    palette: {
      primary: {
        main: "#1959d1",
      },
      secondary: {
        main: "#ffffff",
      },
      text: {
        primary: common.black,
      },
      divider: "rgba(210,205,205,1)",
      background: {
        default: "#ffffff",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 420,
        md: 680,
        lg: 920,
        xl: 1200,
        big: 2000,
      },
    },
  };
};

export default Theme;
