import React from "react";
import { AppBar, Toolbar, IconButton, Box, Button } from "@mui/material";

import { ReactComponent as LogoIcon } from "../../assets/icons/logo.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";

const pages = ["Customers", "Create", "About", "FAQ", "Milestones"];

function Header() {
  // const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = (event) => {
    // setIsOpen(event.currentTarget);
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ boxShadow: 0, mt: 2, mb: 2 }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          size="large"
          aria-label="go to home page"
          href="/"
          sx={{ p: 0 }}
          // aria-controls="menu-appbar"
          // color="primary"
        >
          <LogoIcon color="black" />
        </IconButton>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="toggle menu"
            onClick={toggleMenu}
          >
            <MenuIcon color="black" />
          </IconButton>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button key={page}>{page}</Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
