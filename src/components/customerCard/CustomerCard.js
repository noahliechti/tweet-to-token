import { Card, CardContent, Typography } from "@mui/material";

function CustomerCard(props) {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.content.title}
        </Typography>
        <Typography variant="h5" component="div">
          {props.content.text}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CustomerCard;
