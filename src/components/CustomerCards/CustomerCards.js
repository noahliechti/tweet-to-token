import { Grid } from "@mui/material";
import CustomerCard from "./CustomerCard/CustomerCard";

import { ReactComponent as StepsGraphic } from "../../assets/graphics/steps.svg";

const cardsContent = [
  {
    title: "🎩 Celebrity who wants to connect with fans",
    text: "Whether you are verified or not, it is always good to give back to the community.",
  },
  {
    title: "🎉 NFT beginner minting his first NFT",
    text: "With our platform we made it easy to create your first NFT, even if you aren't very technical. ",
  },
  {
    title: "📚 Twitter poet looking to monetize his work",
    text: "Your tweets are art. Our platform allows you to generate an additional income stream.",
  },
];

function CustomerCards() {
  return (
    <Grid container spacing={8} alignItems="center">
      <Grid item md={6} sx={{ display: { xs: "none", md: "block" } }}>
        <StepsGraphic />
      </Grid>
      <Grid item xs={12} md={6}>
        {/* <Typography variant="body1" sx={{ textAlign: "center" }}>
          All types of people mint their tweets with us: from celebrities to
          people who just posted their first tweet.
        </Typography> */}
        {cardsContent.map((content) => (
          <CustomerCard key={content.title} content={content} />
        ))}
      </Grid>
    </Grid>
  );
}

export default CustomerCards;
