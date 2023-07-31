import React, { useContext, useState } from 'react';
import { Context } from "../../App";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

function createAppObjectURL(obj) {
  const url =
    (window.URL || window.webkitURL).createObjectURL(obj) ||
    window.createObjectURL(obj);
  return url;
}

function FolderSelector(prop) {
  const {
    folderList,
    setFolderList
  } = useContext(Context);

  const [thumbnailList, setThumbnailList] = useState([]);

  function DeleteFolderAlert() {
    window.alert(`フォルダを削除してもよろしいですか？`);
  }

  function MakeThumbnailList(fileList) {
    let tempList = [];
    for (let i = 0; i < fileList.length; i++) {
      const relativePath = fileList[i].webkitRelativePath;
      console.log(relativePath);
      tempList.push(
        <td className='thumbnailList' key={prop.inputkey + "-thumnail-" + i}>
          <img
            alt={fileList[i].name}
            src={createAppObjectURL(fileList[i])}
            height="50px"
          /><br />
          {fileList[i].name}
        </td>
      );
    }
    setThumbnailList(tempList);
  }

  const FileSelected = (e, inputkey) => {
    console.log(e);
    let temp_obj = {};
    if (Object.keys(folderList).length !== 0) {
      temp_obj = folderList;
    }
    if (temp_obj[String(inputkey)] === undefined) {
      temp_obj[String(inputkey)] = {}
    }
    temp_obj[String(inputkey)]["files"] = e.target.files;
    setFolderList(temp_obj);
    MakeThumbnailList(e.target.files);
  }

  const RateChanged = (e, inputkey) => {
    let temp_obj = {};
    if (Object.keys(folderList).length !== 0) {
      temp_obj = folderList;
    }
    if (temp_obj[String(inputkey)] === undefined) {
      temp_obj[String(inputkey)] = {}
    }
    temp_obj[String(inputkey)]["rate"] = e.target.value;
    setFolderList(temp_obj);
    console.log(temp_obj);
  }

  const NumberChanged = (e, inputkey) => {
    let temp_obj = {};
    if (Object.keys(folderList).length !== 0) {
      temp_obj = folderList;
    }
    if (temp_obj[String(inputkey)] === undefined) {
      temp_obj[String(inputkey)] = {}
    }
    temp_obj[String(inputkey)]["number"] = e.target.value;
    setFolderList(temp_obj);
    console.log(temp_obj);
  }

  return (
    <React.Fragment>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ bgcolor: 'rgb(143, 233, 143)' }}
        >
          <table>
            <tbody>
              <tr>
                <td className='tdFolderSelector'>
                  <Button
                    onClick={() => DeleteFolderAlert()}
                    color="error"
                  >
                    <HighlightOffIcon />
                  </Button>
                </td>
                <td className='tdFolderSelector'>
                  <input id="file"
                    type="file"
                    directory=""
                    webkitdirectory=""
                    key={prop.inputkey}
                    onChange={(value) => FileSelected(value, prop.inputkey)}
                  />
                </td>
                <td className='tdFolderSelector'>
                  <label >発生率</label>
                  <input
                    id="rate"
                    type="number"
                    onChange={(value) => RateChanged(value, prop.inputkey)}
                    step="0.01"
                    min={0}
                    max={100}
                    style={{ width: "50px" }}
                  />
                  <label>％</label>
                </td>
                <td className='tdFolderSelector'>
                  <label >最低</label>
                  <input
                    id="number"
                    type="number"
                    onChange={(value) => NumberChanged(value, prop.inputkey)}
                    min={0}
                    style={{ width: "50px" }}
                  />
                  <label>個</label>
                </td>
              </tr>
            </tbody>
          </table>
        </AccordionSummary>
        <AccordionDetails>
          <table>
            <tbody>
              <tr>
                {thumbnailList}
              </tr>
            </tbody>
          </table>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
}

export default FolderSelector;