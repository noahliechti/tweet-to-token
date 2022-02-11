import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Button,
  Typography,
  ToggleButton,
} from "@mui/material";
import { HashLink } from "react-router-hash-link";

import { ReactComponent as LogoIcon } from "../../assets/icons/logo.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";

const pages = ["about", "faq", "milestones"];

function Header() {
  // const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    // setIsOpen(event.currentTarget);
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{
        boxShadow: 0,
        mb: 2,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="span" component="h1">
          <IconButton
            size="large"
            aria-label="go to home page"
            href="/"
            sx={{ p: 0, borderRadius: 1 }}
            color="inherit"
          >
            <LogoIcon />
          </IconButton>
        </Typography>

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <ToggleButton
            value="hidden"
            size="medium"
            aria-label="toggle menu"
            onClick={toggleMenu}
          >
            <MenuIcon color="rgba(0, 0, 0, 0.87)" />
          </ToggleButton>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "flex-end",
            columnGap: 3,
            display: { xs: "none", md: "flex" },
          }}
        >
          {pages.map((page) => (
            <Button
              key={page}
              variant="text"
              to={`#${page}`}
              component={HashLink}
              smooth
              color="inherit"
            >
              <Typography variant="h2" sx={{ m: 0 }}>
                {page}
              </Typography>
            </Button>
          ))}
          <Button to="#steps" component={HashLink} smooth variant="contained">
            create
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
