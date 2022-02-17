import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Button,
  Typography,
  ToggleButton,
  Drawer,
} from "@mui/material";
import { HashLink } from "react-router-hash-link";

import Social from "../Social/Social";
import { ReactComponent as LogoIcon } from "../../assets/icons/logo.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";

const pages = ["use-case", "about", "faq", "milestones"];

function Header() {
  const [open, setOpen] = React.useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <>
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
              value="closed"
              size="medium"
              aria-label="toggle menu"
              onClick={toggleMenu}
            >
              <MenuIcon color="black" width="32px" height="32px" />
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
              mint tweet
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="bottom" open={open} onClose={toggleMenu}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: { sx: 1, sm: 3 },
          }}
        >
          <Social />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            p: 2,
            flexDirection: { xs: "column", sm: "row" },
            flexWrap: "wrap",
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
              onClick={toggleMenu}
              sx={{
                flexBasis: { xs: "auto", sm: "40%" },
                flexGrow: 1,
              }}
            >
              <Typography variant="h2" sx={{ m: 0 }}>
                {page}
              </Typography>
            </Button>
          ))}
          <Button
            to="#steps"
            component={HashLink}
            smooth
            variant="contained"
            sx={{ width: "100%" }}
          >
            mint tweet
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

export default Header;
