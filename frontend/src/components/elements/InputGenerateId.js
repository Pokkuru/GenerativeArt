import React, { useContext, useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import { Context } from "../pages/NFTGenerator";
import TextField from '@mui/material/TextField';

function InputGenerateId() {
  // const {
  //   setNumberOfArts
  // } = useContext(Context);
  const [generateId, setGenerateId] = useState('');

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setGenerateId(e.target.value);
    // let val = String(e.target.value).replaceAll(',', '');

  }

  return (
    <React.Fragment>
      <div>
        <TextField
          value={generateId}
          onChange={handleInputChange}
          id="InputGenerateId" variant="outlined" size="small"
          sx={{
            mt: '10px',
            mb: '10px',
            ml: '10%',
            fontSize: '10px',
            width: "80%",
            height: "26px",
            color: '#505050',
            "& .MuiInputBase-root": {
              width: "80%",
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px',
              borderBottomLeftRadius: '4px',
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
            maxLength: 50,
            style: {
              backgroundColor: '#e8e9ed',
              fontSize: '13px',
              width: "100%",
              textAlign: 'right',
              paddingTop: 1,
              paddingBottom: 1,
              paddingRight: 5,
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px',
              borderBottomLeftRadius: '4px',
              borderBottomRightRadius: '4px',
              height: '24px'
            }
          }}
          fullWidth
        />
      </div>
    </React.Fragment>
  );
}

export default InputGenerateId;