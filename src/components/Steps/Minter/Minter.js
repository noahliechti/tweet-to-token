import { Typography, Card, CardMedia } from "@mui/material";
function Minter({ imageData }) {
  console.log(imageData);
  return (
    <>
      <Typography>
        Your Tweet is ready to be minted. Click on 'Create NFT' to proceed.
      </Typography>

      {imageData ? (
        <Card sx={{ width: 1, mt: 2 }}>
          <CardMedia
            component="img"
            image={`data:image/png;base64,${imageData}`}
            alt="screenshot of tweet"
          />
        </Card>
      ) : (
        ""
      )}
    </>
  );
}

export default Minter;
