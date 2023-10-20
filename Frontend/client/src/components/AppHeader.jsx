import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import energaize_logo from '../images/energaize_logo.jpg';
export default function AppHeader() {
  return (
    <Box sx={{ flexGrow: 1 , boxShadow: "3px 3px 3px #DDE5ED"}}>
      <AppBar position="static" color="transparent" sx={{boxShadow: "3px 3px 3px #DDE5ED"}} >
        <Toolbar variant="dense">
        <img
        style={{width:'100px'}}
        src={energaize_logo}
        />

        <Typography variant="h4" sx={{
          color: '#204464',
          fontWeight: 'bold',
        }}>
          energAIze
        </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}