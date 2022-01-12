import { Card, CardContent, Typography } from "@mui/material";

function CustomerCard({ content }) {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {content.title}
        </Typography>
        <Typography variant="h5" component="div">
          {content.text}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CustomerCard;
