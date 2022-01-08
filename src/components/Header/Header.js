import { AppBar, Toolbar, IconButton } from "@mui/material";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Menu } from "../../assets/menu.svg";

function Header() {
  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton
            size="small"
            // aria-label="account of current user"
            // aria-controls="menu-appbar"
          >
            <Logo />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* https://github.com/mui-org/material-ui/issues/16844#issuecomment-517205129 */}
      <Toolbar />
    </>
  );
}

export default Header;
