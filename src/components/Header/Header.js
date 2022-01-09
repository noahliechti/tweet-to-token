import { AppBar, Toolbar, IconButton, Stack, Box } from "@mui/material";
import { Link } from "react-router-dom";

import { ReactComponent as LogoIcon } from "../../assets/icons/logo.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";

function Header() {
  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            size="large"
            aria-label="go to home page"
            component={Link}
            to="/"

            // aria-controls="menu-appbar"
            // color="primary"
          >
            <LogoIcon color="black" />
          </IconButton>
          <Box>
            <IconButton size="large" aria-label="toggle menu">
              <MenuIcon color="black" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/* https://github.com/mui-org/material-ui/issues/16844#issuecomment-517205129 */}
      <Toolbar />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      ></Stack>
    </>
  );
}

export default Header;
