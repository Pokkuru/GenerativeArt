import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function InputLabelText(props) {
  return (
    <Box
      component='span'
      sx={{
        borderRadius: '2px',
        height: '31px',
        width: '72px',
        display: 'inline-block',
      }}
    >
      <Typography
        align='left'
        component="span"
        variant='body1'
        sx={{ width: '66px', flexGrow: 1, fontSize: '10px', fontWeight: 'bold', height: '31px', pb: '0px', pr: '6px' }}
      >
        {props.textVal}
      </Typography>
    </Box>
  );
}

export default InputLabelText;