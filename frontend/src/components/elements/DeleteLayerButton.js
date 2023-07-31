import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import DeleteButtonIcon from '../../assets/icons/DeleteButtonIcon.svg'
import { Context } from "../pages/NFTGenerator"
import _ from 'lodash'

function DeleteLayerButton(props) {
  const {
    itemList,
    setItemList,
  } = useContext(Context);

  const HandleClick = event => {
    let temp_obj = _.cloneDeep(itemList);
    const itemKeys = Object.keys(temp_obj[String(`layer${props.layerId}`)]);
    for (let i = 0; i < itemKeys.length; i++) {
      temp_obj[String(`layer${props.layerId}`)][itemKeys[i]]['enable'] = false;
    }
    setItemList(temp_obj);
    props.setLayerIsEnable(false);
  }

  return (
    <React.Fragment>
      <Box
        onClick={() => HandleClick()}
        component='span'
        variant='body1'
        sx={{
          borderRadius: '2px',
          height: '18px',
          width: '18px',
          mt: '7px',
          mr: '9px',
          display: 'inline-block'
        }}
      >
        <img src={DeleteButtonIcon} width="18px" height="18px" alt='delete' />
      </Box>
    </React.Fragment >
  );
}

export default DeleteLayerButton;