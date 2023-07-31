import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NFTGenerator from './components/pages/NFTGenerator';
// import PaymentPage from './components/pages/PaymentPage';

function App() {

  return (
    <React.Fragment>
      {/*<BrowserRouter>
        <Routes>
          <Route path="/" element={<NFTGenerator />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </BrowserRouter>
      */}
      <NFTGenerator />
    </React.Fragment>
  );
}

export default App;
