import { Box, Container, Grid, Typography } from "@mui/material";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Container maxWidth="lg" sx={{ mt: 15, mb: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <img
            src="https://mui.com/static/images/cards/contemplative-reptile.jpg"
            alt="img"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          gap={2}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Typography>Title Lizard crypto {params.id}</Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a wide spread group ofLizards are a wides pread group
            ofLizards are a wide spread group ofLizards are a wides pread group
            ofLizards are a widespread group of
          </Typography>
          <Box>Creator: 0x213123123123123</Box>
          <Box>Start Date: 20-01-2024</Box>
          <Box>End Date: 20-01-2024</Box>
          <Box>Goal: 1 ETH</Box>
          <Box>Pledge Total: 20 ETH</Box>
          <Box>Pledge Member: 30</Box>
        </Grid>
      </Grid>
    </Container>
  );
}
