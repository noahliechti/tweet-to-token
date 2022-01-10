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
      sx={{ boxShadow: 0, border: 3, borderRadius: 2, mb: 2 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <IconButton
          size="large"
          aria-label="scroll to top"
          sx={{ width: 40, height: 40, p: 0 }}
          href=""
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
