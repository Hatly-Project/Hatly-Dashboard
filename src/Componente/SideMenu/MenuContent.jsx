import React, { useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { useNavigate } from 'react-router-dom';
import BreadCrumbContext from '../../context/BreadCrumbContext';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon /> , selected: true},
  { text: 'Trips', icon: <LocalAirportIcon /> , selected: false},
  { text: 'Shipments', icon: <LocalShippingIcon /> , selected: false},
  { text: 'Users', icon: <PeopleAltIcon />, selected: false},
  { text: 'Deals', icon: <HandshakeIcon />, selected: false},
];
 

export default function MenuContent() {
  const {setEndpoint} = useContext(BreadCrumbContext)
 
  const navigate = useNavigate();
const handleNavigate = (item) => {
  setEndpoint(item.text);
  navigate(item.text.toLowerCase()); 
  for (let i = 0; i < mainListItems.length; i++) {
    if (mainListItems[i].text === item.text) {
      mainListItems[i].selected = true;
    } else {
      mainListItems[i].selected = false;
    }
}
}
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={item.selected} onClick={() => handleNavigate(item)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
    </Stack>
  );
}