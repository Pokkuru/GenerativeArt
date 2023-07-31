import Button from '@mui/material/Button';
import React from 'react';

function ContentsDownloadByIdButton(props) {

  function handleButtonClicked(e) {

  }

  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={() => handleButtonClicked()}
        size="small"
        sx={{
          borderRadius: '4px',
          ml: "10px",
          mr: "10px",
          fontWeight: 'bold',
          fontSize: '10px',
          width: '101px',
          height: '26px',
          pt: '5px'
        }}
      >
        ダウンロード
      </Button>
    </React.Fragment>
  );
}

export default ContentsDownloadByIdButton;