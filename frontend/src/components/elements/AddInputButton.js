import Button from '@mui/material/Button';
import FolderSelector from '../old/folderSelector';
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
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

function AddInputButton(props) {
  const onAddInputButtonClick = event => {
    const padNum = String(props.folderSelectorList.length + 1).padStart(3, '0');
    const keyValue = `${props.layerName}-` + padNum;
    props.setFolderSelectorList(props.folderSelectorList.concat(<FolderSelector key={keyValue} inputkey={keyValue} />))
  }

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        onClick={() => onAddInputButtonClick()}
        style={{ fontSize: '0.3em' }}
        size="small"
        color="neutral"
      >
        フォルダ追加
      </Button>
    </ThemeProvider>
  );
}

export default AddInputButton;