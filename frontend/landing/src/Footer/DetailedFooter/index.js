import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import Box from "@mui/material/Box";
import MKTypography from "../MKTypography";

function DetailedFooter({ content }) {
  const { brandIcon, brand, socials, menus, copyright } = content;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxHeight: "100vh",
      }}
    >
      <Box component="footer" sx={{ backgroundColor: "#F6F6F6" }}>
        <Container>
          <Grid container spacing={3} sx={{ mt: 5 }}>
            <Grid
              item
              xs={12}
              md={4}
              lg={6}
              mb={{ xs: 6, lg: 0 }}
              fontFamily="Noto Sans KR"
            >
              {brandIcon}
              <MKTypography
                variant="h6"
                textTransform="uppercase"
                mb={1}
                fontFamily="Noto Sans KR"
              >
                {brand.name}
              </MKTypography>
              <MKTypography
                variant="body2"
                color="text"
                mb={3}
                pb={1}
                pr={3}
                fontFamily="Noto Sans KR"
              >
                {copyright}
              </MKTypography>
              <Box display="flex" alignItems="center">
                {socials.map(({ icon, link }, key) => (
                  <MKTypography
                    key={link}
                    component="a"
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    variant="body2"
                    color="secondary"
                    mr={key === socials.length - 1 ? 0 : 3}
                    sx={{ fontSize: "1.125rem" }}
                    fontFamily="Noto Sans KR"
                  >
                    {icon}
                  </MKTypography>
                ))}
              </Box>
            </Grid>
            {menus.map(({ name: title, items }, key) => (
              <Grid
                key={title}
                item
                xs={3}
                md={2}
                lg={1.5}
                ml={key === 0 ? { xs: 0, lg: "auro" } : 0}
              >
                <MKTypography
                  component="h6"
                  variant="button"
                  fontWeight="bold"
                  textTransform="capitalize"
                  mb={1}
                  fontFamily="Noto Sans KR"
                >
                  {title}
                </MKTypography>
                <Box component="ul" p={0} m={0} sx={{ listStyle: "none" }}>
                  {items.map(({ name, route, href }) => (
                    <Box
                      key={name}
                      component="li"
                      p={0}
                      m={0}
                      lineHeight={1.25}
                    >
                      {href ? (
                        <MKTypography
                          component="a"
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          variant="button"
                          color="secondary"
                          fontWeight="regular"
                          textTransform="capitalize"
                          pb={0.5}
                          fontFamily="Noto Sans KR"
                        >
                          {name}
                        </MKTypography>
                      ) : (
                        <MKTypography
                          component={Link}
                          to={route}
                          variant="button"
                          color="secondary"
                          fontWeight="regular"
                          textTransform="capitalize"
                          pb={0.5}
                          fontFamily="Noto Sans KR"
                        >
                          {name}
                        </MKTypography>
                      )}
                    </Box>
                  ))}
                </Box>
              </Grid>
            ))}
            {/* <Grid item xs={12} pr={3} sx={{ textAlign: "center", mb: 3 }}>
            <Divider />
            {copyright}
          </Grid> */}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

// Typechecking props for the DetailedFooter
DetailedFooter.propTypes = {
  content: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  ).isRequired,
};

export default DetailedFooter;
