import Button from '@mui/material/Button';
import ImageItem from '../parts/ImageItem';
import React, { useContext } from 'react';
import { Context } from "../pages/NFTGenerator"
import { split } from 'lodash';

function FolderSelectButton(props) {
  const {
    itemList,
    setItemList,
    itemFolders,
    setItemFolders
  } = useContext(Context);

  const inputRef = React.useRef(null);
  const fileUpload = () => {
    inputRef.current.click();
  };

  function MakeImageList(files) {
    let imageItemList = [];
    let temp_obj = {};
    let dir_name = "";
    for (let i = 0; i < files.length; i++) {
      let relativePath = files[i].webkitRelativePath;
      dir_name = relativePath.split("/")[0];
      imageItemList.push(
        <ImageItem
          itemId={i + 1}
          filesource={files[i]}
          key={files[i].name}
          layerId={props.layerId}
        />
      );
      if ((`layer${props.layerId}` in temp_obj) === false) {
        temp_obj[`layer${props.layerId}`] = {};
      }
      if ((`item${i + 1}` in temp_obj[String(`layer${props.layerId}`)]) === false) {
        temp_obj[`layer${props.layerId}`][`item${i + 1}`] = {};
      }
      temp_obj[`layer${props.layerId}`][`item${i + 1}`]['image'] = files[i];
      temp_obj[`layer${props.layerId}`][`item${i + 1}`]['number'] = 0;
      temp_obj[`layer${props.layerId}`][`item${i + 1}`]['rate'] = 0;
      temp_obj[`layer${props.layerId}`][`item${i + 1}`]['enable'] = true;
      // console.log(temp_obj[String(`layer${props.layerId}`)][String(`item${i + 1}`)]['image']);
    }
    temp_obj[`layer${props.layerId}`]['dir_name'] = dir_name;
    Object.assign(temp_obj, itemList);
    console.log(temp_obj);
    setItemList(temp_obj);
    props.setImageItemList(imageItemList);
  }

  const loadImage = async (e) => {
    e.persist();
    if (e.target.files.length === 0) {
      return 0;
    }
    MakeImageList(e.target.files);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="secondary"
        sx={{
          fontSize: '10px',
          width: '74px',
          height: '20px',
          p: '0px',
          mb: '10px',
          mr: '8px',
          pt: '1px',
          textTransform: "none",
          fontWeight: 'bold',
          color: '#edeff4',
          backgroundColor: '#615e62',
          borderColor: '#25313a',
          borderRadius: '3px'
        }}
        value="loadImage"
        onClick={fileUpload}
      >
        フォルダ選択
        <input
          id="load_file"
          hidden
          ref={inputRef}
          directory=""
          webkitdirectory=""
          type="file"
          onChange={(e) => loadImage(e)}
        />
      </Button>
    </React.Fragment>
  );
}

export default FolderSelectButton;