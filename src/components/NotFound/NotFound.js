import { Container, Typography, Link } from "@mui/material";
import { ReactComponent as NotFoundGraphic } from "../../assets/graphics/notFound.svg";

function NotFound() {
  return (
    <>
      <Typography variant="h2" component="h1">
        Go back to <Link href="/">home</Link>
      </Typography>
      <Container
        maxWidth="sm"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: 600,
        }}
      >
        <a href="/">
          <NotFoundGraphic />
        </a>
      </Container>
    </>
  );
}

export default NotFound;
