import React, { useState, useContext, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DeleteLayerButton from '../elements/DeleteLayerButton';
import FolderSelectButton from '../elements/FolderSelectButton';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Context } from "../pages/NFTGenerator";
import { DisplaySrcAdjuster } from "../../actions/DisplaySrcAdjuster";

const theme = createTheme({
  components: {
    MuiToolbar: {
      styleOverrides: {
        dense: {
          height: 36,
          minHeight: 36
        }
      }
    },
  },
  palette: {
    primary: {
      main: '#071822',
      contrastText: '#edeff4',
    },
    secondary: {
      main: '#172c3d',
      contrastText: '#edeff4',
    }
  }
});

function LayerComponent(props) {
  const {
    numberOfArts,
    itemList
  } = useContext(Context);
  const [countDisplayStr, setCountDisplayStr] = useState('0 / 0');
  const [thumbnailList, setThumbnailList] = useState([]);
  const [imageItemList, setImageItemList] = useState([]);
  const [accordionStatus, setAccordionStatus] = useState(true);
  const [alertEnable, setAlertEnable] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [layerIsEnable, setLayerIsEnable] = useState(true);

  function onAccordionStatusChangeButtonClick() {
    if (accordionStatus === true) {
      setAccordionStatus(false);
    } else {
      setAccordionStatus(true);
    }
  }

  function DisplayedLayerName(layerId) {
    const result = 'レイヤー' + String(layerId).padStart(3, '0');
    return (result);
  }

  useEffect(() => {
    const val = DisplayedCountOfArts();
    setCountDisplayStr(val);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfArts, itemList[`layer${props.layerId}`]]);

  function DisplayedCountOfArts() {
    const adjuster = new DisplaySrcAdjuster();
    let countNumberOfFiles = 0;
    if (`layer${String(props.layerId)}` in itemList) {
      const itemNumbers = Object.values(itemList[`layer${String(props.layerId)}`]);
      for (let idx = 0; idx < itemNumbers.length; idx++) {
        if (itemNumbers[idx]['enable']) {
          countNumberOfFiles += parseInt(itemNumbers[idx]['number']);
        }
      }
    }
    const result = `${String(countNumberOfFiles)} / ${adjuster.SetComma(numberOfArts)}`;
    if ((countNumberOfFiles - numberOfArts) < 0) {
      setAlertEnable(true);
      setAlertMessage('※作成個数に達していません。');
    } else if ((countNumberOfFiles - numberOfArts) > 0) {
      setAlertMessage('※作成個数を超えています。');
      setAlertEnable(true);
    } else {
      setAlertEnable(false);
    }
    return result;
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        {layerIsEnable &&
          <Grid container spacing={0} sx={{ minWidth: '800px' }}>
            <Grid item sx={{ width: '30px', height: '32px' }} >
              <Box
                component="span"
                onClick={() => onAccordionStatusChangeButtonClick()}
                sx={{
                  height: "32px",
                  width: '100%',
                  display: 'block',
                  bgcolor: '#302f3d',
                  color: '#edeff4',
                  verticalAlign: 'middle',
                  borderStyle: 'solid', borderWidth: '1px', borderColor: '#7c787c', borderRight: 'none'
                }}>
                {accordionStatus ? <ArrowDropDownIcon sx={{ fontSize: '30px', color: '#838386' }} /> : <ArrowRightIcon sx={{ fontSize: '30px', color: '#838386' }} />}
              </Box>
            </Grid>

            {/*  */}
            <Grid item xs sx={{ textAlign: "right", verticalAlign: 'middle' }}>
              <Accordion disableGutters={true} expanded={accordionStatus} sx={{ bgcolor: '#1a2c40', boxShadow: '0' }}>
                <Box
                  component="span"
                  sx={{
                    height: "32px", width: '100%', display: 'block', bgcolor: '#1a2c40', color: '#edeff4',
                    borderStyle: 'solid', borderWidth: '1px', borderColor: '#7c787c', borderLeft: 'none'
                  }}
                >
                  <Grid container spacing={0} justifyContent="flex-end">
                    <Grid item sx={{ width: '14px', height: '32px' }} >
                      <Box
                        component="span"
                        sx={{
                          height: "32px",
                          width: '100%',
                          display: 'block',
                          bgcolor: '#28272a',
                          color: '#edeff4',
                          verticalAlign: 'middle',
                        }}>
                      </Box>
                    </Grid>
                    <Grid item xs sx={{ textAlign: "left", bgcolor: '#28272a', }} justifyContent='flex-end'>
                      <Typography
                        align='left'
                        variant="body1"
                        component="span"
                        sx={{ height: '100%', width: '100%', flexGrow: 1, fontWeight: "medium", fontSize: '12px', mt: '7px', mb: '7px', display: 'block', color: '#edeff4', textTransform: "none", textAlign: "left" }}
                      >
                        {DisplayedLayerName(props.layerId)}
                        （
                        {countDisplayStr}
                        ）
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ display: 'inline-block', textAlign: "right", bgcolor: '#28272a' }}>

                      {alertEnable === true &&
                        <Typography
                          variant="body1"
                          component="span"
                          sx={{ height: '100%', width: '100%', flexGrow: 1, fontSize: '10px', mt: '9px', mb: '7px', display: 'block', color: '#ff2100', textTransform: "none", fontWeight: 'bold' }}
                        >
                          {alertMessage}
                        </Typography>

                      }
                    </Grid>

                    <Grid item sx={{ width: '66px', height: '32px' }} >
                      <Box
                        component="span"
                        sx={{
                          height: "32px",
                          width: '100%',
                          display: 'block',
                          bgcolor: '#28272a',
                          color: '#edeff4',
                          verticalAlign: 'middle',
                        }}>
                      </Box>
                    </Grid>

                    <Grid item sx={{ width: '114px', height: '32px', textAlign: 'left' }}>
                      <Box
                        component="span"
                        sx={{
                          height: "32px",
                          width: '114px',
                          display: 'block',
                          bgcolor: '#28272a',
                          color: '#edeff4',
                          textAlign: 'right',
                          verticalAlign: 'middle',
                        }}>
                        <FolderSelectButton thumbnailList={thumbnailList} setThumbnailList={setThumbnailList} setImageItemList={setImageItemList} layerId={props.layerId} />
                        <DeleteLayerButton setLayerIsEnable={setLayerIsEnable} layerId={props.layerId} />
                      </Box>
                    </Grid>


                  </Grid>
                </Box>
                <AccordionDetails sx={{ bgcolor: '#081923' }} style={{ textTransform: "none", padding: "0px 0px", color: '#edeff4' }}>
                  {imageItemList}
                </AccordionDetails>
              </Accordion>

            </Grid>
          </Grid>
        }
      </ThemeProvider>
    </React.Fragment >
  );
}

export default LayerComponent;