import React from 'react'
import Navbar from '../../Componente/NavBar/NavBar'
import { Box, Stack } from '@mui/material'
import Header from '../../Componente/Header/Header'
import MainGrid from '../../Componente/MainGrid/MainGrid'

export default function Home() {
  return (
    <div>
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
    </div>
  )
}
