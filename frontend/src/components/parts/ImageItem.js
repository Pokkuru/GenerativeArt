import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DeleteFileButton from '../elements/DeleteFileButton';
import InputNumberOfParts from '../elements/InputNumberOfParts';
import InputRarelityOfParts from '../elements/InputRarelityOfParts';
import InputLabelText from '../elements/InputLabelText';
import React, { useState } from 'react';

function createAppObjectURL(obj) {
  const url =
    (window.URL || window.webkitURL).createObjectURL(obj) ||
    window.createObjectURL(obj);
  return url;
}

function ImageItem(props) {
  const [isEnable, setIsEnable] = useState(true)

  function IsZenkaku(str) {
    if (str.match(/^[^\x01-\x7E\uFF61-\uFF9F]+$/)) {
      //全角文字
      return (2);
    } else {
      //全角文字以外
      return (1);
    }
  }

  function AdjustedFileName(props) {
    let startIdx = 0;
    let strList = [];
    let tempCharElemCount = 0;
    for (let cIdx = 0; cIdx < props.fileName.length; cIdx++) {
      tempCharElemCount += IsZenkaku(props.fileName[cIdx]);
      if (cIdx === props.fileName.length - 1) {
        strList.push(props.fileName.slice(startIdx, props.fileName.length));
      }
      if (tempCharElemCount > 13) {
        strList.push(props.fileName.slice(startIdx, cIdx));
        tempCharElemCount = 0;
        startIdx = cIdx + 1;
      }
    }
    return (
      <React.Fragment>
        {strList.map(
          (elem, i) =>
            <Typography sx={{ fontSize: '10px' }} key={`filename-${elem}`} >
              {elem} < br />
            </Typography>
        )
        }
      </React.Fragment >
    );
  }


  return (
    <React.Fragment>
      {isEnable &&
        <Grid container spacing={0} sx={{ bgcolor: '#1d1c1f', width: '100%', height: '62px', pr: '1px', mb: '1px' }}>
          <Grid item sx={{ width: '20px', bgcolor: '#050a10' }}>
            <Box sx={{ width: '100%', display: 'block', height: '62px', bgcolor: '#050a10' }} />
          </Grid>
          <Grid item xs>
            <Box sx={{ borderStyle: 'solid', borderWidth: '1px', borderColor: '#7c787c', width: '100%', height: '62px', borderTop: 'none' }}>

              <Grid container spacing={0} sx={{ bgcolor: '#1d1c1f', width: '100%', height: '62px' }}>
                <Grid item sx={{ width: '20px', height: '62px', borderStyle: 'solid', borderWidth: '1px', pt: '22px', pr: '5px', borderTop: 'none', borderLeft: 'none', borderBottom: 'none', borderColor: '#7c787c' }}>
                  <Typography sx={{ fontSize: '12px', overflow: 'clip', color: '#edeff4' }}>
                    {props.itemId}
                  </Typography>
                </Grid>
                <Grid item sx={{ width: '80px', height: '62px', display: 'inline-block', textAlign: 'left' }}>
                  <Box
                    component='span'
                    sx={{ mt: '6px', ml: '20px', mr: '12px', height: '48px', width: '48px', display: 'inline-block', bgcolor: 'white', color: '#edeff4' }}
                  >
                    <img
                      alt={props.filesource.name}
                      src={createAppObjectURL(props.filesource)}
                      height="50px"
                      style={{ backgroundColor: 'white' }}
                    />
                  </Box>
                </Grid>
                <Grid item sx={{ mt: '8px', width: '80px', textAlign: 'left', overflow: 'clip' }}>
                  <AdjustedFileName fileName={props.filesource.name} />
                </Grid>

                <Grid item xs>

                  <Grid container spacing={0} justifyContent="flex-end">
                    <Grid item xs sx={{ ml: '5px', textAlign: 'right', overflow: 'clip', verticalAlign: 'middle' }}>
                      <Typography sx={{ fontSize: '10px', overflow: 'clip', color: '#ff210a', fontWeight: 'bold', mt: '25px' }}>

                      </Typography>
                    </Grid>

                    <Grid item sx={{ height: "62px", width: '181px' }} >
                      <Grid container spacing={0} sx={{ width: '181px' }}>
                        <Grid item sx={{ width: '72px', height: '31px', textAlign: 'right', mt: '5px' }}>
                          <InputLabelText textVal='出現個数' />
                        </Grid>
                        <Grid item sx={{ width: '82px', height: '31px', pr: '8px' }}>
                          <InputNumberOfParts layerId={props.layerId} itemId={props.itemId} />
                        </Grid>
                        <Grid item sx={{ width: '27px', height: '31px', pr: '9px' }}>
                          <DeleteFileButton setIsEnable={setIsEnable} layerId={props.layerId} itemId={props.itemId} />
                        </Grid>
                      </Grid>

                      <Grid container spacing={0} sx={{ width: '181px' }}>
                        <Grid item sx={{ width: '72px', height: '31px', textAlign: 'right', mt: '-5px' }}>
                          <InputLabelText textVal='出現率' />

                        </Grid>
                        <Grid item sx={{ width: '82px', height: '31px', pr: '8px', mt: '-1px' }}>
                          <InputRarelityOfParts itemId={props.itemId} layerId={props.layerId} />
                        </Grid>
                        <Grid item sx={{ width: '27px', height: '31px', pr: '9px' }}>
                        </Grid>
                      </Grid>
                    </Grid>

                  </Grid>


                </Grid>

              </Grid>
            </Box>
          </Grid >
        </Grid >
      }

    </React.Fragment >
  );
}

export default ImageItem;