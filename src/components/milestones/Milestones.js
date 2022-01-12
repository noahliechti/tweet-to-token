import { Typography } from "@mui/material";
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
            Activity feed
          </Typography>
          <Typography>Activity feed of recent created Tweets</Typography>
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
            Marketplace
          </Typography>
          <Typography>In-App marketplace to buy and sell Tweets</Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

export default MileStones;
