import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import SideMenu from "../../Componente/SideMenu/SideMenu";
import Navbar from "../../Componente/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Header from "../../Componente/Header/Header";
import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/Slices/usersSlice";
import { fetchDeals } from "../../redux/Slices/dealsSlice";
import { fetchTrips } from "../../redux/Slices/tripsSlice";
import { fetchShipments } from "../../redux/Slices/shipmentSlice";

export default function LandingPage() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchDeals());
    dispatch(fetchTrips());
    dispatch(fetchShipments());
  },[])
  return (
    <>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, overflow: "auto" }}>
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <Outlet></Outlet>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
