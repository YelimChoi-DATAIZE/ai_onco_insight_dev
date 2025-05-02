import Box from "@mui/material/Box";
import homefooterdataize from "../Images/Logo.svg";

import DetailedFooter from "./DetailedFooter";
import MKParagraph from "./MKParagraph";
function Footer() {
  const date = new Date().getFullYear();
  const footerContent = {
    brandIcon: (
      <Box
        component="img"
        src={homefooterdataize}
        alt="homefooterdataize"
        sx={{ width: 120, mb: 10, ml: "10px" }}
      />
    ),
    brand: {
      name: "Made in Korea for all around the world",
      description: "Made in Korea for all around the world",
    },
    socials: [
      {
        icon: <i className="fab fa-twitter" />,
        link: "https://www.dataize.io",
      },
      {
        icon: <i className="fab fa-instagram" />,
        link: "https://www.dataize.io",
      },

      {
        icon: <i className="fab fa-linkedin" />,
        link: "https://www.dataize.io",
      },
      {
        icon: <i className="fab fa-youtube" />,
        link: "https://www.dataize.io",
      },
    ],
    menus: [
      {
        name: "product",
        items: [
          { name: "services", href: "https://www.dataize.io/service" },
          { name: "usecase", href: "https://www.dataize.io/usecase" },
        ],
      },
      {
        name: "help",
        items: [
          { name: "get started", href: "https://www.dataize.io" },
          { name: "how to use API", href: "https://www.dataize.io" },
          { name: "help center", href: "https://www.dataize.io" },
          { name: "contact support", href: "https://www.dataize.io/" },
        ],
      },
      {
        name: "company",
        items: [
          { name: "about us", href: "https://www.dataize.io/about" },
          { name: "blog", href: "https://www.dataize.io" },
        ],
      },
      {
        name: "resources",
        items: [
          { name: "join community", href: "https://www.dataize.io" },
          { name: "fair use policy", href: "https://www.dataize.io" },
          { name: "GDPR", href: "https://www.dataize.io" },
          { name: "terms & privacy", href: "https://www.dataize.io" },
        ],
      },
    ],
    copyright: (
      <MKParagraph variant="button" color="secondary">
        Copyright &copy; {date}{" "}
        <MKParagraph
          component="a"
          href="https://www.dataize.io"
          target="_blank"
          rel="noreferrer"
          variant="button"
          color="secondary"
        >
          Seoul Medical Informatics Intelligence Lab Inc
        </MKParagraph>
        .
      </MKParagraph>
    ),
  };
  return <DetailedFooter content={footerContent} />;
}
export default Footer;
