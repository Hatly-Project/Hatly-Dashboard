import * as React from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SessionsChart from "./SessionsChart";
import StatCard from "./StatCard";
import { useSelector } from "react-redux";
import UsersGrid from "../UsersGrid/UsersGrid";

export default function MainGrid() {
  
  const { users, UsersLoading } = useSelector((state) => state.users);
  const { trips, TripsLoading } = useSelector((state) => state.trips);
  const { shipments, shipmentsLoading } = useSelector(
    (state) => state.shipments
  );
  const { deals, dealsLoading } = useSelector((state) => state.deals);
  console.log("users", users);
  console.log("trips", trips);
  console.log("shipments", shipments);
  console.log("deals", deals);

  const data = [
    {
      title: "Users",
      value: `${users?.length}`,
      trend: "up",
      data: [
        200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360,
        340, 380, 360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600,
        880, 920,
      ],
      isLoading: UsersLoading,
    },
    {
      title: "Trips",
      value: `${ trips?.totalData}`,
      trend: "down",
      data: [
        1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840,
        600, 820, 780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400,
        360, 300, 220,
      ],
      isLoading: TripsLoading,
    },
    {
      title: "Shipments",
      value: `${  shipments?.totalData}`,
      trend: "neutral",
      data: [
        500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620,
        510, 530, 520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430,
        520, 510,
      ],
      isLoading: shipmentsLoading,
    },
    {
      title: "Deals",
      value: `${  deals?.totalData}`,
      trend: "down",
      data: [
        500, 400, 510, 30, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620,
        510, 530, 520, 410, 530, 520, 610, 530, 20, 610, 530, 20, 510, 430, 520,
        510,
      ],
      isLoading: dealsLoading,
    },
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card}  isloading={card.isLoading} />
          </Grid>
        ))}

        <Grid size={{ xs: 12, md: 12 }}>
          <SessionsChart deals={deals?.totalData} loading={dealsLoading} />
        </Grid>
        
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Users
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 12 }}>
          {/* <CustomizedDataGrid /> */}
          <UsersGrid/>
        </Grid>
      </Grid>
      {/* <Copyright sx={{ my: 4 }} /> */}
    </Box>
  );
}
