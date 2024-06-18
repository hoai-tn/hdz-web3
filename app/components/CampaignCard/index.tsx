import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { showShortDescription, showSortAddress } from "@/app/utils";
import { Box } from "@mui/material";
import Link from "next/link";
import { ICampaign } from "@/app/types/crowdFunding";

const index = ({ campaign }: { campaign: ICampaign }) => {
  const text = `Lizards are a widespread group of squamate reptiles, with over 6,000
    species, ranging across all continents except Antarctica`;
  return (
    <Link href={`/campaign/${campaign.id}`}>
      <Card sx={{ height: 400 }}>
        <CardMedia
          sx={{ height: 142 }}
          image={campaign.image}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {campaign.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {showShortDescription(campaign.description, 3)}
          </Typography>
          <Box display="flex" justifyContent="space-between" marginTop={2}>
            <Box>
              <Typography>{campaign.pledged} CTC</Typography>
              <Typography variant="body2" color="text.secondary">
                Raised of {campaign.goal} CTC
              </Typography>
            </Box>
            <Box>
              <Typography>20</Typography>
              <Typography variant="body2" color="text.secondary">
                Day left
              </Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" marginTop={2}>
            <Box display="flex" gap={1} alignItems="center">
              <Box bgcolor="red" width={10} height={10} borderRadius={50}></Box>
              <Typography>Start</Typography>
            </Box>
            <Typography variant="body2">
              By {showSortAddress(campaign.creator)}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button>Pledge To Campaign</Button>
        </CardActions>
      </Card>
    </Link>
  );
};

export default index;
