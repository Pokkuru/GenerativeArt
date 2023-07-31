import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { height } from "@mui/system";

function Loading(props) {
  return (

    <CircularProgress size='10px' sx={{ display: 'inline-block' }
    } />
  )
}

export default Loading;