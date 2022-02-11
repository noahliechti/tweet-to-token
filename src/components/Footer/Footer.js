import { Toolbar, AppBar, IconButton, Typography } from "@mui/material";
import { ReactComponent as LogoIcon } from "../../assets/icons/logo.svg";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ boxShadow: 0, border: 3, borderRadius: 2, mb: 2, mt: 2 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <IconButton
          size="large"
          aria-label="scroll to top"
          sx={{ width: 40, height: 40, p: 0, borderRadius: 1 }}
          href="/"
          onClick={scrollToTop}
          color="inherit"
        >
          <LogoIcon />
        </IconButton>
        <Typography variant="body2">
          Copyright &copy; {new Date().getFullYear()} tweettoken.io
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
