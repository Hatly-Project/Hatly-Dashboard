import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ButtonNavFilter from './ButtonNavFilter';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
export default function UserNav() {
  return (
      <Box sx={{ flexGrow: 1, height: '80px'}}>
      <AppBar position="static" elevation={0}>
        <Toolbar sx={{ color: 'black', backgroundColor: 'white', height: '80px'}}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 , fontWeight: 'bold'}}>
            All users
          </Typography>
                  <div style={{
                      display: 'flex',
                      gap: '10px'
           }}>
            <button style={{
              backgroundColor: '#4141DA',
              color: 'white',
              padding: '10px',
              width: '150px',
              borderRadius: '5px',
              display: 'flex',
              gap:'5px',
              alignItems: 'center',
              justifyContent: 'center'
             }}>
                  <p>Add User</p>
                   <PersonAddAltOutlinedIcon/>
            </button>
            <ButtonNavFilter /> 
         </div>
               
        </Toolbar>
      </AppBar>
    </Box>
  );
}
