import React, { useContext, useEffect, useState } from 'react';
import NumberArtsInput from '../elements/NumberArtsInput';
import AddLayerButton from '../elements/AddLayerButton';
import GenerateButton from '../elements/GenerateButton';
import { Context } from "../pages/NFTGenerator";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import _ from 'lodash'
import Loading from '../elements/Loading';

function Controller(props) {
  const {
    layerList,
    setLayerList,
    itemList,
    numberOfArts,
    isLoading
  } = useContext(Context);
  const [combinationAlertMessage, setCombinationAlertMessage] = useState('');

  function CheckOverflowNumbers() {
    let temp_obj = _.cloneDeep(itemList);
    const layerMax = Object.keys(temp_obj).length;
    let combinations = 1;
    if (temp_obj.length === 0) {
      combinations = 0;
    } else {
      for (let layerIdx = 0; layerIdx < layerMax; layerIdx++) {
        const itemMax = Object.keys(temp_obj[`layer${layerIdx + 1}`]).length;
        combinations *= itemMax;
      }
    }
    // resultが正：作成個数が多い、resultが負：組み合わせ数が多い(0以下ならOK)
    const result = numberOfArts - combinations;
    return [combinations, result];
  }

  useEffect(() => {
    const val = CheckOverflowNumbers();
    if (val[1] > 0) {
      setCombinationAlertMessage(`組み合わせの最大値は［全${val[0]}通り］です。作成個数を減らしてください。`)
    } else {
      setCombinationAlertMessage('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfArts, itemList]);

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1, position: 'fixed', top: '48px', left: '0px', width: '100%', display: 'inline-block', height: '71px', zIndex: '2', color: '#edeff4', bgcolor: '#050a10' }}>
        <Grid container spacing={0} sx={{ minWidth: '800px' }}>
          <Grid item xs={12} sx={{ textAlign: 'right', pt: '30px', pr: '40px' }} >
            {isLoading &&
              <Loading />
            }
            <Typography
              align='right'
              variant="body2"
              component="span"
              sx={{ mr: "10px", mt: '8px', flexGrow: 1, fontSize: '11px', fontWeight: 'bold', color: '#ff2100' }}
            >
              {combinationAlertMessage}
            </Typography>
            <NumberArtsInput />
            <AddLayerButton layerList={layerList} setLayerList={setLayerList} />
            <GenerateButton />
          </Grid>
        </Grid>
      </Box>
    </React.Fragment >
  );

}
export default Controller;