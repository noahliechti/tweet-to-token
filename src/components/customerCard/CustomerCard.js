import { Card, CardContent, Typography } from "@mui/material";

function CustomerCard() {
  return (
    <Card sx={{ boxShadow: 2 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          variant="h3"
          color="text.secondary"
          gutterBottom
        >
          🎩 Celebrity who wants to connect with fans
        </Typography>
        <Typography variant="h5" component="div">
          Whether you are verified or not, it is always good to give back to the
          community.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CustomerCard;
