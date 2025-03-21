import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';    

export default function ButtonNavFilter() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
          <button variant="outlined" onClick={handleClickOpen} style={{
              backgroundColor: "white",
              color: '#4141DA',
              padding: '10px',
              width: '100px',
              fontWeight: 'bold',
              borderRadius: '5px',
              display:'flex',
              alignItems: 'center',
              border: '1px solid rgba(65, 65, 218, 1)',
              justifyContent: 'center'
          }}>
              
             <p>Filter</p>
              <FilterAltOutlinedIcon/> 
            
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle>   
            <p>Filter</p>
             
        </DialogTitle>
        <DialogContent sx={{ width: '400px'}}>
            <div className='flex flex-col gap-2 mt-2'>
            <TextField
              label="Email"
              name="email"
              type="email"
            />
            <TextField
              label="Country"
              name="country" 
            />
            <TextField
              label="City"
              name="city"
            />
            <TextField
              label="Phone"
              name="phone"
              type="tel"
            />
            <TextField
              label="Role"
              name="role" 
            />
            <TextField
              label="Birthdate"
              name="birthdate"
                      />
            <RadioGroup
             defaultValue="female"
                name="radio-buttons-group"
                sx={{ display: 'flex', flexDirection: 'row', gap: '10px'}}
             >
             <FormControlLabel value="Verified" control={<Radio />} label="Verified" />
             <FormControlLabel value="Non Verified" control={<Radio />} label="Non Verified" />
             </RadioGroup>
            </div>
        </DialogContent>
        <DialogActions>
        <button onClick={handleClose}
            style={{
              backgroundColor: 'rgba(65, 65, 218, 1)',
              color: 'white',
              padding: '10px',
              width: '100px',
              borderRadius: '5px'
            }}>
                 Reset
        </button>
          <button style={{
              backgroundColor: 'red',
              color: 'white',
              padding: '10px',
              width: '200px',
              borderRadius: '5px'
            }}>Clear all filters</button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
