import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export default styled(Typography)(({ theme, ownerState }) => {
  const { palette, typography, functions } = theme;
  const {
    color,
    textTransform,
    verticalAlign,
    fontWeight,
    opacity,
    textGradient,
  } = ownerState;

  const { gradients, transparent } = palette;
  const {
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold,
  } = typography;
  // const { linearGradient } = functions;

  // fontWeight styles
  const fontWeights = {
    light: fontWeightLight,
    regular: fontWeightRegular,
    medium: fontWeightMedium,
    bold: fontWeightBold,
  };

  // styles for the typography with textGradient={true}
  // const gradientStyles = () => ({
  //   backgroundImage:
  //     color !== "inherit" && color !== "text" && color !== "white" && gradients[color]
  //       ? linearGradient(gradients[color].main, gradients[color].state)
  //       : linearGradient(gradients.dark.main, gradients.dark.state),
  //   display: "inline-block",
  //   WebkitBackgroundClip: "text",
  //   WebkitTextFillColor: transparent.main,
  //   position: "relative",
  //   zIndex: 1,
  // });

  // color value
  const colorValue =
    color === "inherit" || !palette[color] ? "inherit" : palette[color].main;

  return {
    opacity,
    textTransform,
    verticalAlign,
    textDecoration: "none",
    color: "black",
    letterSpacing: "-0.125px",
    fontWeight: fontWeights[fontWeight] && fontWeights[fontWeight],
    ...textGradient,
  };
});
