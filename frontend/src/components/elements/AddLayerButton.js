import Button from '@mui/material/Button';
import LayerComponent from '../parts/layerComponent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

function AddLayerButton(props) {
  const onAddLayerButtonClick = event => {
    const padNum = String(props.layerList.length + 1);
    const layerName = "ContentLayer" + padNum;
    const keyValue = "ContentLayer-" + padNum;
    // 21個目からのアラート
    // window.alert('21個目からは運営にお問い合わせください。 ~~.mail.com')
    props.setLayerList(props.layerList.concat(<LayerComponent key={keyValue} layerName={layerName} layerId={padNum} />));
  }

  return (
    <ThemeProvider theme={theme}>

      <Button
        variant="contained"
        onClick={() => onAddLayerButtonClick()}
        size="small"
        color="neutral"
        sx={{ borderRadius: '4px', ml: "10px", mr: "10px", fontWeight: 'bold', fontSize: '10px', width: '101px', height: '26px', pt: '5px' }}
      >
        レイヤー追加
      </Button>
    </ThemeProvider>
  );
}

export default AddLayerButton;