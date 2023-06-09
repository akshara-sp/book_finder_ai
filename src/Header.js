import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { auth } from './firebase_config';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });
  

function Header({setLoggedIn}) {

  function logout() {
    auth.signOut();
    sessionStorage.removeItem('uid');
    setLoggedIn(false);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: {sm: 'block' }}}
          >
            BookFinderAI
          </Typography>
          <Box sx={{ display: {sm: 'block' } }}>
              <Button key={"Logout"} sx={{ color: '#fff' }} onClick={logout}>
                Logout
              </Button>
          </Box>
        </Toolbar>
      </AppBar>
      </ThemeProvider>
    </Box>
  );
}


export default Header;