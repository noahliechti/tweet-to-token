import React from "react";
import { HashLink } from "react-router-hash-link";
import { Typography, Button, Box, Grid } from "@mui/material";
import { ReactComponent as BallonGraphic } from "../../assets/graphics/ballon.svg";

function LandingPage() {
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            pt: { xs: 4, md: 18, lg: 22 },
            maxWidth: { sm: 545, md: 430, lg: 580 },
          }}
        >
          <header>
            <Typography
              variant="h1"
              sx={{
                background:
                  "linear-gradient(130deg, rgba(56, 73, 221, 1) 0%, rgba(0, 210, 198, 0.7) 100%);background-clip: text;text-fill-color: transparent;",
              }}
            >
              Turn your Tweets into NFTs!
            </Typography>
            <Typography variant="subtitle1" component="p">
              Our high quality images are automatically enhanced with metadata
              and will make your NFTs stand out.
            </Typography>
          </header>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: { xs: "column", sm: "row" },
              rowGap: 2,
              columnGap: 2,
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              component={HashLink}
              to="#steps"
              smooth
              sx={{ flexGrow: 1 }}
            >
              Let's go!
            </Button>
            <Button
              variant="outlined"
              color="primary"
              component={HashLink}
              to="#use-case"
              smooth
              sx={{ flexGrow: 1 }}
            >
              use-case
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item md={6} sx={{ display: { xs: "none", md: "block" } }}>
        <Box color="primary" sx={{ ml: { md: 6, lg: 10 }, pt: 12 }}>
          <BallonGraphic />
        </Box>
      </Grid>
    </Grid>
  );
}

export default LandingPage;
