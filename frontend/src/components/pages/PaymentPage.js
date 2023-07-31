import React, { useState, createContext } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useCookies } from "react-cookie";
import DownloadForm from '../parts/DownloadForm';

function PaymentPage(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["nft_generate_id"]);

  const handlerGetUUIDButton = () => {
    const generateId = "genID-1111-1111-1111-1111-1111";
    setCookie("nft_generate_id", generateId);
  };

  const handlerDeleteCookieButton = () => {
    removeCookie("nft_generate_id");
  }

  return (
    <React.Fragment>
      {/* <Typography
        align='left'
        variant="body2"
        component="div"
        sx={{ ml: "0.5em", mt: '8px', flexGrow: 1, fontSize: 24, fontWeight: 'medium', color: '#edeff4' }}
      >payment page
      </Typography>
      <Button onClick={() => handlerGetUUIDButton()}>
        Set Cookie
      </Button>
      <Button onClick={() => handlerDeleteCookieButton()}>
        Delete Cookie
      </Button>
      <Typography
        align='left'
        variant="body2"
        component="div"
        sx={{ ml: "0.5em", mt: '8px', flexGrow: 1, fontSize: 24, fontWeight: 'medium', color: '#edeff4' }}
      >cookie value: {cookies.nft_generate_id}
      </Typography> */}

      <Typography
        align='left'
        variant="body2"
        component="div"
        sx={{ ml: "0.5em", mt: '8px', flexGrow: 1, fontSize: 24, fontWeight: 'medium', color: '#edeff4' }}
      >
        <div>ダウンロードページ</div>
      </Typography>

      <Typography
        align='left'
        variant="body2"
        component="div"
        sx={{ ml: "0.5em", mt: '8px', flexGrow: 1, fontSize: 18, fontWeight: 'medium', color: '#edeff4' }}
      >
        <div>未支払いの場合はダウンロードボタンを押した後支払ページにジャンプします。</div>
      </Typography>

      <DownloadForm />


    </React.Fragment>
  );
}

export default PaymentPage;