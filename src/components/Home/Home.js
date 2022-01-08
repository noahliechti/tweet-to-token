import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Typography variant="h1">
        Create NFTs from your Tweets and sell them on Ethereum!
      </Typography>
      <Button component={Link} to="/create" variant="contained" color="primary">
        Let's go!
      </Button>
      <Button component={Link} to="/home" variant="contained" color="secondary">
        How?
      </Button>
    </>
  );
}

export default Home;
