import React, { useContext, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Context } from "../pages/NFTGenerator";

function InputRarelityOfParts(props) {
  const {
    itemList
  } = useContext(Context);
  const [rarelityDisplayStr, setRarelityDisplayStr] = useState('0%');

  useEffect(() => {
    let val = DisplayedRarelityOfArts();
    if (val === undefined || val === Infinity) {
      val = 0;
    }
    setRarelityDisplayStr(`${val}%`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemList[`layer${props.layerId}`]]);

  function DisplayedRarelityOfArts() {
    let result = 0;
    if (`layer${props.layerId}` in itemList) {
      if (`item${props.itemId}` in itemList[`layer${props.layerId}`]) {
        result = itemList[`layer${props.layerId}`][`item${props.itemId}`]['rate'];
      }
    }
    return result;
  }

  return (
    <Box
      component='span'
      sx={{
        borderRadius: '2px',
        height: '31px',
        width: '66px',
        display: 'inline-block',
        pr: '8px',
      }}
    >
      <TextField id="outlined-basic" variant="outlined" size="small" value={rarelityDisplayStr}
        sx={{
          // mt: '4px',
          pr: '9px', width: "72px", height: "18px", color: '#e8e5be', borderColor: '#2b2a2b', borderWidth: '1px',
          "& .MuiInputBase-root": {
            height: '18px', width: "72px", borderRadius: '3px', borderColor: '#2b2a2b', borderWidth: '1px',
            "&.Mui-focused fieldset": {
              borderColor: '#2b2a2b', borderWidth: '1.5px'
            }
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#2b2a2b', borderWidth: '1.5px'
            },
            '&:hover fieldset': {
              borderColor: '#2b2a2b', borderWidth: '1.5px'
            },
          }
        }}
        inputProps={{
          readOnly: true,
          style: {
            // color: '#e8e5be',
            color: '#b3b3b3',
            backgroundColor: '#1a171a',
            fontSize: '11px',
            width: "100%",
            textAlign: 'right',
            paddingTop: 1,
            paddingBottom: 1,
            paddingRight: 5,
            borderRadius: '3px',
            height: '16px'
          }
        }}
        fullWidth
      />
    </Box>
  );
}

export default InputRarelityOfParts;