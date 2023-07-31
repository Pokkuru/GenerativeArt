import React from 'react';
import ContentsDownloadByIdButton from '../elements/ContentsDownloadByIdButton';
import InputGenerateId from '../elements/InputGenerateId';

function DownloadForm(props) {

  return (
    <React.Fragment>
      <InputGenerateId />
      <ContentsDownloadByIdButton />
    </React.Fragment>
  );
}

export default DownloadForm;