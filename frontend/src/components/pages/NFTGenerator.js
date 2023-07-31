import React, { useState, createContext } from 'react';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import AppHeader from '../parts/AppHeader';
import Controller from '../parts/Controller';
import LayerComponent from '../parts/layerComponent';
import '../../App.css';

export const Context = createContext({
  layerList: {},
  setLayerList: () => { },
  folderList: {},
  setFolderList: () => { },
  itemList: {},
  setItemList: () => { },
  numberOfArts: {},
  setNumberOfArts: () => { },
  isLoading: {},
  setIsLoading: () => { }
});


function NFTGenerator(props) {
  const [folderList, setFolderList] = useState({});
  const [numberOfArts, setNumberOfArts] = useState(0);
  const [itemList, setItemList] = useState([]);
  const [layerList, setLayerList] = useState([
    <LayerComponent key="ContentLayer001" layerName="ContentLayer001" inputkey="ContentLayer001" layerId={1} />,
    <LayerComponent key="ContentLayer002" layerName="ContentLayer002" inputkey="ContentLayer002" layerId={2} />,
    <LayerComponent key="ContentLayer003" layerName="ContentLayer003" inputkey="ContentLayer003" layerId={3} />,
    <LayerComponent key="ContentLayer004" layerName="ContentLayer004" inputkey="ContentLayer004" layerId={4} />,
    <LayerComponent key="ContentLayer005" layerName="ContentLayer005" inputkey="ContentLayer005" layerId={5} />
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [itemFolders, setItemFolders] = useState([]);

  const genart_context = {
    layerList,
    setLayerList,
    folderList,
    setFolderList,
    itemList,
    setItemList,
    numberOfArts,
    setNumberOfArts,
    isLoading,
    setIsLoading,
    itemFolders,
    setItemFolders
  }

  return (
    <React.Fragment>
      <Context.Provider value={genart_context} className='AppContents'>
        <AppHeader headerText="NFT Generator" />
        <Controller />
        <Divider sx={{ backgroundColor: '#7c787c', top: '119px', position: 'fixed', width: '100%', zIndex: '2' }} />
        <Box sx={{ flexGrow: 1, position: 'fixed', top: '120px', left: '0px', width: '100%', display: 'inline-block', height: '14px', zIndex: '2', backgroundColor: '#050a10' }}></Box>

        <Container align="left" sx={{ pt: "134px", maxWidth: '85%' }}>
          {layerList}
        </Container>
      </Context.Provider>
    </React.Fragment>
  );
}

export default NFTGenerator;