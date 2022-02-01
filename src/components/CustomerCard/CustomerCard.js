import { Card, CardContent, Typography } from "@mui/material";

function CustomerCard({ content }) {
  return (
    <Card sx={{ mt: 2 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography
          sx={{ lineHeight: 1.4, mb: 2 }}
          variant="h3"
          // color="text.secondary"
          gutterBottom
        >
          {content.title}
        </Typography>
        <Typography component="div">{content.text}</Typography>
      </CardContent>
    </Card>
  );
}

export default CustomerCard;
