import { Toolbar, AppBar, IconButton, Box, Typography } from "@mui/material";
import { ReactComponent as LogoIcon } from "../../assets/icons/logo.svg";
import Social from "../Social/Social";

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
      sx={{
        boxShadow: 0,
        border: 3,
        borderRadius: 2,
        mt: { xs: 1, sm: 6, md: 10 },
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pl: 2,
          pr: 2,
          pt: { xs: 2, md: "12px" },
          pb: { xs: 2, md: "12px" },
        }}
      >
        <IconButton
          size="large"
          aria-label="scroll to top"
          sx={{
            width: 40,
            height: 40,
            p: 0,
            borderRadius: 1,
            mr: { xs: 0, sm: 10 },
          }}
          href="/"
          onClick={scrollToTop}
          color="inherit"
        >
          <LogoIcon />
        </IconButton>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "row",
            justifyContent: "center",
            gap: { sx: 1, sm: 3 },
          }}
        >
          <Social />
        </Box>
        <Typography
          variant="body2"
          sx={{ maxWidth: "120px", textAlign: "end", fontWeight: "bold" }}
        >
          Copyright &copy; {new Date().getFullYear()} tweettoken.io
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
