import Button from '@mui/material/Button';
import React from 'react';

function LoadProjectButton() {
  return (
    <Button
      variant="outlined"
      color="secondary"
      sx={{
        fontSize: '10px',
        ml: 1,
        fontWeight: 'bold',
        textTransform: "none",
        mt: '13px',
        height: '22px',
        width: '66px',
        color: '#edeff4',
        backgroundColor: '#61437d',
        border: 'none',
        pt: '6.5px'
      }}
    >
      読込み
    </Button>
  );
}

export default LoadProjectButton;