import { Typography, Grid } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";

import { ReactComponent as RoadmapGraphic } from "../../assets/graphics/roadmap.svg";

function Roadmap() {
  return (
    <Grid container spacing={8} alignItems="center">
      <Grid item md={6} sx={{ display: { xs: "none", md: "block" } }}>
        <RoadmapGraphic />
      </Grid>
      <Grid item xs={12} md={6}>
        <Timeline position="alternate" sx={{ mt: 0, pt: 0 }}>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary" sx={{ px: 0 }}>
              1'000 Tweets
            </TimelineOppositeContent>
            <TimelineSeparator sx={{ mx: 2 }}>
              <TimelineDot variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ px: 0 }}>
              <Typography variant="h3" component="span">
                Metadata
              </Typography>
              <Typography>Show metadata in the creating process</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary" sx={{ px: 0 }}>
              5'000 Tweets
            </TimelineOppositeContent>
            <TimelineSeparator sx={{ mx: 2 }}>
              <TimelineDot variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ px: 0 }}>
              <Typography variant="h3" component="span">
                Wallets
              </Typography>
              <Typography>Enable Tweet creation on mobile browsers</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary" sx={{ px: 0 }}>
              10'000 Tweets
            </TimelineOppositeContent>
            <TimelineSeparator sx={{ mx: 2 }}>
              <TimelineDot variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ px: 0 }}>
              <Typography variant="h3" component="span">
                Activity feed
              </Typography>
              <Typography>Activity feed of recent created Tweets</Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Grid>
    </Grid>
  );
}

export default Roadmap;
