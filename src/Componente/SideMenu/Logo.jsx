import { Stack, Typography } from '@mui/material'
import React from 'react'
import logo from '../../assets/Images/image.png'

export default function Logo() {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
        <img src={logo} alt="dashboard-logo" width="50" height="50" />
        <Typography variant="h6">Hatly Dashboard</Typography>
    </Stack>
  )
}
