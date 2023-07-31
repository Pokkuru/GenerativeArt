import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import DeleteButtonIcon from '../../assets/icons/DeleteButtonIcon.svg'
import { Context } from "../pages/NFTGenerator"
import _ from 'lodash'

function DeleteFileButton(props) {
  const {
    itemList,
    setItemList,
  } = useContext(Context);

  const HandleClick = event => {
    let temp_obj = _.cloneDeep(itemList);
    temp_obj[String(`layer${props.layerId}`)][String(`item${props.itemId}`)]['enable'] = false;
    setItemList(temp_obj);
    props.setIsEnable(false);
  }

  return (
    <React.Fragment>
      <Box
        onClick={() => HandleClick()}
        component='span'
        sx={{
          borderRadius: '2px',
          height: '18px',
          width: '18px',
          display: 'inline-block', mt: '8.5px'
        }}
      >
        <img src={DeleteButtonIcon} width="18px" height="18px" alt='delete' />
      </Box>
    </React.Fragment >
  );
}

export default DeleteFileButton;