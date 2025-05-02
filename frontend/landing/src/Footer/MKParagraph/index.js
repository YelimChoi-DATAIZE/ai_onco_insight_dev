import { forwardRef } from "react";
import PropTypes from "prop-types";
import { useMediaQuery, useTheme } from "@mui/material";
// Custom styles for MKTypography
import MKTypographyRoot from "../MKTypography/MKTypographyRoot";

const MKParagraph = forwardRef(
  (
    {
      color,
      fontWeight,
      textTransform,
      verticalAlign,
      textGradient,
      opacity,
      children,
      component,
      ...rest
    },
    ref,
  ) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

    const getVariant = () => {
      if (isSmallScreen) return "caption";
      if (isMediumScreen) return "caption";
      return "button";
    };

    const variant = getVariant();

    return (
      <MKTypographyRoot
        {...rest}
        ref={ref}
        component={component}
        ownerState={{
          color,
          textTransform,
          verticalAlign,
          opacity,
          textGradient,
          variant, // 여기에서 variant를 추가합니다.
        }}
        variant={variant} // 여기에서 variant를 명시적으로 전달합니다.
      >
        {children}
      </MKTypographyRoot>
    );
  },
);

// Setting default values for the props of MKParagraph
MKParagraph.defaultProps = {
  color: "dark",
  fontWeight: "bold",
  textTransform: "none",
  verticalAlign: "unset",
  textGradient: false,
  opacity: 1,
  component: "div",
};

// Typechecking props for the MKParagraph
MKParagraph.propTypes = {
  color: PropTypes.oneOf([
    "inherit",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "text",
    "white",
  ]),
  fontWeight: PropTypes.oneOf(["light", "regular", "medium", "bold"]),
  textTransform: PropTypes.oneOf([
    "none",
    "capitalize",
    "uppercase",
    "lowercase",
  ]),
  verticalAlign: PropTypes.oneOf([
    "unset",
    "baseline",
    "sub",
    "super",
    "text-top",
    "text-bottom",
    "middle",
    "top",
    "bottom",
  ]),
  textGradient: PropTypes.bool,
  children: PropTypes.node.isRequired,
  opacity: PropTypes.number,
  component: PropTypes.elementType,
};

export default MKParagraph;
