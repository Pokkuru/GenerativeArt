import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { DisplaySrcAdjuster } from "../../actions/DisplaySrcAdjuster";
import { Context } from "../pages/NFTGenerator"
import _ from 'lodash'

function InputNumberOfParts(props) {
  const {
    numberOfArts,
    itemList,
    setItemList,
  } = useContext(Context);
  const [displayedNumberOfParts, setDisplayedNumberOfParts] = useState(0);

  const HandleNumberChange = (e) => {
    let val = String(e.target.value).replaceAll(',', '');
    val = parseInt(val);
    const adjuster = new DisplaySrcAdjuster();
    if (val < 10000000) {
      setDisplayedNumberOfParts(adjuster.SetComma(val));
      let temp_obj = _.cloneDeep(itemList);
      temp_obj[String(`layer${props.layerId}`)][String(`item${props.itemId}`)]['number'] = val;
      temp_obj[String(`layer${props.layerId}`)][String(`item${props.itemId}`)]['rate'] = Number.parseFloat((val / numberOfArts) * 100).toFixed(2);
      setItemList(temp_obj);
    }

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
      <TextField id="outlined-basic" variant="outlined" size="small"
        value={displayedNumberOfParts}
        onChange={HandleNumberChange}
        sx={{
          mt: '9px', pr: '9px', fontSize: '10px', width: "72px", height: "18px", color: '#505050',
          "& .MuiInputBase-root": {
            height: '18px', width: "72px", borderRadius: '3px', border: 'none',
            "&.Mui-focused fieldset": {
              border: 'none'
            }
          }
        }}
        inputProps={{
          style: {
            backgroundColor: '#e8e9ed',
            fontSize: '10px',
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

export default InputNumberOfParts;