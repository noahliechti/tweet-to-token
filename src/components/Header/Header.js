import { AppBar, Toolbar, IconButton, Box } from "@mui/material";

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
            href="/"

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
    </>
  );
}

export default Header;
