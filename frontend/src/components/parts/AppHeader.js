import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SaveProjectButton from '../elements/SaveProjectButton';
import LoadProjectButton from '../elements/LoadProjectButton';
import OutputListButton from '../elements/OutputListButton';

function AppHeader(props) {
  return (
    <React.Fragment>
      <Box className='AppBar' sx={{ flexGrow: 1, position: 'fixed', top: '0px', left: '0px', width: '100%', display: 'inline-block', height: '48px', zIndex: '2', color: '#edeff4' }}>
        <Grid container spacing={0} sx={{ minWidth: '800px' }}>
          <Grid item xs={6} sx={{ textAlign: 'left', pl: '45px' }}>
            <Typography
              align='left'
              variant="body2"
              component="div"
              sx={{ ml: "0.5em", mt: '8px', flexGrow: 1, fontSize: 24, fontWeight: 'medium' }}
            >
              {props.headerText}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'right', pr: '55px' }} >
            <LoadProjectButton />
            <SaveProjectButton />
            <OutputListButton />
          </Grid>
        </Grid>
      </Box>
    </React.Fragment >
  );
}

export default AppHeader;