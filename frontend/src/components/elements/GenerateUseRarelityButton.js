import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import fileDownload from 'js-file-download'
import { Context } from "../../App";

function GenerateUseRarelityButton(props) {
  const {
    folderList,
    numberOfArts
  } = useContext(Context);

  function postItems() {
    const data = new FormData();
    const keys = Object.keys(folderList);

    let rates = [];
    let numbers = [];
    let file_keys = [];
    let rate_check_objs = {}
    for (let i = 0; i < keys.length; i++) {
      for (let j = 0; j < folderList[String(keys[i])]["files"].length; j++) {
        data.append(`${keys[i]}-${j}`, folderList[String(keys[i])]["files"][j]);
        file_keys.push(`${keys[i]}-${j}`);
      }
      // console.log(temp_imgs);
      rates.push(folderList[String(keys[i])]["rate"]);
      const tmp = keys[i].split('-');
      console.log(tmp);
      if (rate_check_objs[String(tmp[0])] === undefined) {
        rate_check_objs[String(tmp[0])] = parseFloat(folderList[String(keys[i])]["rate"]);
      } else {
        rate_check_objs[String(tmp[0])] += parseFloat(folderList[String(keys[i])]["rate"]);
      }

      if (folderList[String(keys[i])]["number"] === undefined) {
        numbers.push(1);
      } else {
        numbers.push(folderList[String(keys[i])]["number"]);
      }
    }

    for (let k in rate_check_objs) {
      console.log(rate_check_objs[k]);
      if (rate_check_objs[k] !== 100) {
        window.alert(`${k}の発生率の合計が100でないため実行できません`)
        return;
      }
    }

    data.append("rates", JSON.stringify(rates));
    data.append("count", JSON.stringify(rates.length));
    data.append("min_numbers", JSON.stringify(numbers));
    console.log(numberOfArts);
    if (numberOfArts === 0) {
      data.append("numberOfArts", JSON.stringify(10));
    } else {
      data.append("numberOfArts", JSON.stringify(numberOfArts));
    }
    data.append("file-keys", JSON.stringify(file_keys));
    console.log(file_keys);
    for (let val of data.entries()) {
      console.log(val);
    }
    axios.post(`http://${process.env.REACT_APP_HOST_ADDRESS}:${process.env.REACT_APP_PORT}/api/generateUseRarelity`, data, {
      responseType: 'arraybuffer',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'multipart/form-data'
      }
    })
      .then(function (response) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        fileDownload(response.data, "result.zip");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Button
      variant="contained"
      onClick={() => postItems()}
      style={{ fontSize: '0.3em', minWidth: '100px' }}
      size="small"
      sx={{ ml: "3px", mr: "3px" }}
    >発生率付き作成開始</Button>
  );
}

export default GenerateUseRarelityButton;