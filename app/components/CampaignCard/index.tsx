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

const index = () => {
  const text = `Lizards are a widespread group of squamate reptiles, with over 6,000
    species, ranging across all continents except Antarctica`;
  return (
    <Link href="/campaign/1">
      <Card>
        <CardMedia
          sx={{ height: 140 }}
          image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {showShortDescription(text, 6)}
          </Typography>
          <Box display="flex" justifyContent="space-between" marginTop={2}>
            <Box>
              <Typography>20 ETH</Typography>
              <Typography variant="body2" color="text.secondary">
                Raised of 10 ETH
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
              <Typography>Not started</Typography>
            </Box>
            <Typography variant="body2">
              By {showSortAddress("0xb123asdasd12344as123")}
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
