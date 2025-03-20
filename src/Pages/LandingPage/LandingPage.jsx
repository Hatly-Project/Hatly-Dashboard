import * as React from 'react';

import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import SideMenu from '../../Componente/SideMenu/SideMenu';
import Navbar from '../../Componente/NavBar/NavBar';
import Header from '../../Componente/Header/Header';
import MainGrid from '../../Componente/MainGrid/MainGrid';
import { Outlet } from 'react-router-dom';
 

export default function LandingPage(props) {
  return (
    <>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
      <Outlet></Outlet>
      </Box>
      </>
  );
}