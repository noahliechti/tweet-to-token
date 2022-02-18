import { Typography, Card, CardMedia } from "@mui/material";

function Minter({ imageData }) {
  return (
    <>
      <Typography>
        Your Tweet is ready to be minted. This process can take a while.{" "}
        <b>Don't reload</b> the page.
      </Typography>

      <Card sx={{ width: 1, mt: 2 }}>
        <CardMedia
          component="img"
          image={`data:image/png;base64,${imageData}`}
          alt="screenshot of tweet"
        />
      </Card>
    </>
  );
}

export default Minter;
