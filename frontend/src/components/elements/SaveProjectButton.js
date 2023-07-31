import Button from '@mui/material/Button';
// import LayerComponent from '../layerComponent';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
      main: '#d4d9d8',
      contrastText: '#000000',
    },
  },
});

function SaveProjectButton(props) {
  // const onAddLayerButtonClick = event => {
  //   const padNum = String(props.layerList.length + 1).padStart(3, '0');
  //   const layerName = "ContentLayer" + padNum;
  //   console.log(layerName);
  //   const keyValue = "ContentLayer-" + padNum;
  //   props.setLayerList(props.layerList.concat(<LayerComponent key={keyValue} layerName={layerName} />))
  // }

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="outlined"
        color="secondary"
        sx={{
          fontSize: '10px',
          fontWeight: 'bold',
          textTransform: "none",
          mt: '13px',
          ml: '9px',
          mr: '9px',
          height: '22px',
          width: '66px',
          color: '#edeff4',
          backgroundColor: '#61437d',
          border: 'none',
          pt: '6.5px'
        }}
      >
        保存
      </Button>
    </ThemeProvider>
  );
}

export default SaveProjectButton;