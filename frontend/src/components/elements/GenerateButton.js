import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import fileDownload from 'js-file-download';
import { Context } from "../pages/NFTGenerator";
import '../../App.css';

function GenerateButton(props) {
  const {
    numberOfArts,
    itemList,
    setIsLoading
  } = useContext(Context);

  function postItems() {
    const data = new FormData();
    let file_keys = [];
    const layerKeys = Object.keys(itemList);
    layerKeys.sort();
    let layerCountable = true;
    let layerIdx = 0;
    let dirs = [];
    for (let i = 0; i < layerKeys.length; i++) {
      dirs.push(itemList[layerKeys[i]]['dir_name']);
      const itemKeys = Object.keys(itemList[layerKeys[i]]);
      if (layerCountable === true) {
        layerIdx += 1;
      }
      let itemIdx = 1;
      for (let j = 0; j < itemKeys.length; j++) {
        if (itemList[layerKeys[i]][itemKeys[j]]['enable']) {
          data.append(`file-layer${layerIdx}-item${itemIdx}`, itemList[layerKeys[i]][itemKeys[j]]['image']);
          data.append(`number-layer${layerIdx}-item${itemIdx}`, itemList[layerKeys[i]][itemKeys[j]]['number']);
          data.append(`rate-layer${layerIdx}-item${itemIdx}`, itemList[layerKeys[i]][itemKeys[j]]['rate']);
          file_keys.push(`layer${layerIdx}-item${itemIdx}`);
          itemIdx += 1;
        }
        if (itemIdx > 1) {
          layerCountable = true;
        } else {
          layerCountable = false;
        }
      }
    }
    data.append("dirs", JSON.stringify(dirs));
    data.append("file-keys", JSON.stringify(file_keys));
    data.append('max-items', JSON.stringify(numberOfArts))
    // for (let val of data.entries()) {
    //   console.log(val);
    // }
    setIsLoading(true);
    axios.post(`https://${process.env.REACT_APP_HOST_ADDRESS}:${process.env.REACT_APP_PORT}/api/generate`, data, {
      // responseType: 'arraybuffer',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'multipart/form-data'
      }
    })
      .then(function (response) {
        console.log(response);
        const targetId = response.data.processingId;
        setTimeout(() => {
          CheckStatus(targetId);
        }, 1000);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function CheckStatus(targetId) {
    const data = new FormData();
    data.append("targetId", JSON.stringify(targetId));
    data.append("maxItem", JSON.stringify(numberOfArts));
    for (let val of data.entries()) {
      console.log(val);
    }
    let downloading = false;
    const interval = setInterval(() => {
      axios.post(`https://${process.env.REACT_APP_HOST_ADDRESS}:${process.env.REACT_APP_PORT}/api/status`, data, {
        responseType: 'arraybuffer',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'content-type': 'multipart/form-data'
        }
      })
        .then(function (response) {
          console.log(response);
          console.log(response.data.byteLength);
          if (downloading === false) {
            if (response.data.byteLength > 0) {
              downloading = true;
              clearInterval(interval);
              fileDownload(response.data, "result.zip");
              setIsLoading(false);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }, 3000);
  }

  return (
    <Button
      variant="contained"
      onClick={() => postItems()}
      size="small"
      sx={{ borderRadius: '4px', mr: "15px", fontWeight: 'bold', fontSize: '10px', minWidth: '100px', pt: '5px' }}
      className='GradGenButton'
    >作成開始</Button>
  );
}

export default GenerateButton;