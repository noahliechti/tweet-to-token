import { Toolbar, AppBar, IconButton, Typography, Box } from "@mui/material";
import { ReactComponent as LogoIcon } from "../../assets/icons/logo.svg";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          size="large"
          aria-label="scroll to top"
          sx={{ width: 64 }}
          onClick={scrollToTop}
        >
          <LogoIcon color="black" />
        </IconButton>
        <Typography>
          Copyright &copy; {new Date().getFullYear()} tweettotoken.io
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
