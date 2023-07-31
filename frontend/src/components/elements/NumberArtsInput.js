import React, { useContext, useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Context } from "../pages/NFTGenerator";
import TextField from '@mui/material/TextField';
import { DisplaySrcAdjuster } from "../../actions/DisplaySrcAdjuster";

function NumberArtsInput() {
  const {
    setNumberOfArts
  } = useContext(Context);
  const [displayedNumberOfArts, setDisplayedNumberOfArts] = useState(0);

  const HandleNumberChange = (e) => {
    let val = String(e.target.value).replaceAll(',', '');
    val = parseInt(val);
    const adjuster = new DisplaySrcAdjuster();
    if (val < 10000000) {
      setNumberOfArts(val);
      setDisplayedNumberOfArts(adjuster.SetComma(val));
    }
  }

  return (
    <React.Fragment>
      <Box
        component="span"
        sx={{
          height: "26px",
          width: '161spx',
          display: 'inline-block'
        }}
        style={{
          backgroundColor: "#565b5f",
          color: "#edeff4",
          borderRadius: '4px',
          textAlign: 'left'
        }}>

        <Typography
          align='left'
          variant="body2"
          component="span"
          sx={{ ml: "1.6em", flexGrow: 1, fontSize: '10px', fontWeight: 'bold', width: '45px' }}
        >
          作成個数&emsp;
          <TextField
            value={displayedNumberOfArts}
            onChange={HandleNumberChange}
            id="NumberArtsInput" variant="outlined" size="small"
            sx={{
              ml: '5px',
              fontSize: '10px',
              width: "100px",
              height: "26px",
              color: '#505050',
              "& .MuiInputBase-root": {
                width: "100px",
                borderTopLeftRadius: '0px',
                borderTopRightRadius: '4px',
                borderBottomLeftRadius: '0px',
                borderBottomRightRadius: '4px',
                pl: '-5px',
                "&.Mui-focused fieldset": {
                  border: 'none'
                }
              },
              '& .MuiInput-underline:before': {
                borderColor: '#e8e9ed', // 通常時のボーダー色
              },
              '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                borderColor: '#e8e9ed',  // ホバー時のボーダー色
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#e8e9ed',    // 通常時のボーダー色(アウトライン)
                },
                '&:hover fieldset': {
                  borderColor: '#e8e9ed',    // ホバー時のボーダー色(アウトライン)
                },
              },
            }}
            inputProps={{
              maxLength: 9,
              style: {
                backgroundColor: '#e8e9ed',
                fontSize: '13px',
                width: "100%",
                textAlign: 'right',
                paddingTop: 1,
                paddingBottom: 1,
                paddingRight: 5,
                borderTopLeftRadius: '0px',
                borderTopRightRadius: '4px',
                borderBottomLeftRadius: '0px',
                borderBottomRightRadius: '4px',
                height: '24px'
              }
            }}
            fullWidth
          />
        </Typography>
      </Box>

    </React.Fragment>
  );
}

export default NumberArtsInput;