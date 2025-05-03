import PropTypes from "prop-types";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import Box from "@mui/material/Box";
import MKTypography from "./MKTypography";

function CenteredFooter({
  company = { href: "*", name: "DATAIZE AI" },
  links = [],
  light = false,
}) {
  const { href, name } = company;
  const year = new Date().getFullYear();

  const renderLinks = links.map((link) => (
    <MKTypography
      key={link.name}
      component={Link}
      href={link.href}
      variant="body2"
      color={light ? "white" : "secondary"}
      fontWeight="regular"
    >
      {link.name}
    </MKTypography>
  ));

  return (
    <Box component="footer" py={2}>
      <Grid container justifyContent="center">
        <Grid item xs={10} lg={12}>
          <Grid item xs={12} lg={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Link
                to="/home"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={"/static/Images/Logo.svg"}
                  alt="Logo"
                  style={{ width: "120px" }}
                />
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={8} lg={8} sx={{ textAlign: "center", mt: "20px" }}>
          <MKTypography variant="body2" color={light ? "white" : "secondary"}>
            Copyright &copy; {year} Seoul Medical Infomatics Intelligence Lab
            Inc. All Rights Reserved.
          </MKTypography>
        </Grid>
      </Grid>
    </Box>
  );
}

// Setting default values for the props of CenteredFooter
CenteredFooter.defaultProps = {
  company: { href: "*", name: "DATAIZE AI" },
  links: [
    { href: "*", name: "Company" },
    { href: "*", name: "About Us" },
    // { href: "https://www.creative-tim.com/presentation", name: "Team" },
    // { href: "https://www.creative-tim.com/templates/react", name: "Products" },
    { href: "*", name: "Blog" },
    { href: "*", name: "License" },
  ],
  // socials: [
  //   { icon: <FacebookIcon fontSize="small" />, link: "https://www.facebook.com/CreativeTim/" },
  //   {
  //     icon: <TwitterIcon fontSize="small" />,
  //     link: "https://twitter.com/creativetim",
  //   },
  //   {
  //     icon: <InstagramIcon fontSize="small" />,
  //     link: "https://www.instagram.com/creativetimofficial/",
  //   },
  //   {
  //     icon: <PinterestIcon fontSize="small" />,
  //     link: "https://ro.pinterest.com/thecreativetim/",
  //   },
  //   { icon: <GitHubIcon fontSize="small" />, link: "https://github.com/creativetimofficial" },
  // ],
  light: false,
};

// Typechecking props for the CenteredFooter
CenteredFooter.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  socials: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  light: PropTypes.bool,
};

export default CenteredFooter;
