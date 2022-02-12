import { Box, Typography } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";

function MileStones() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Timeline position="alternate" sx={{ mt: 0, pt: 0, maxWidth: 480 }}>
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
              Mobile friendly
            </Typography>
            <Typography>
              Enable Tweet Creation on mobile Browsers other than Metamask
            </Typography>
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
    </Box>
  );
}

export default MileStones;
