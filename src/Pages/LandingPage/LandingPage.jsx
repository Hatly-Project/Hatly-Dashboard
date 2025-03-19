import * as React from 'react';

import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import SideMenu from '../../Componente/SideMenu/SideMenu';
import Navbar from '../../Componente/NavBar/NavBar';
import Header from '../../Componente/Header/Header';
import MainGrid from '../../Componente/MainGrid/MainGrid';
 

export default function LandingPage(props) {
  return (
    <>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <Navbar />
        <Box
          component="main"
          sx={{ flexGrow: 1, overflow: 'auto' }}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <MainGrid />
          </Stack>
        </Box>
      </Box>
      </>
  );
}