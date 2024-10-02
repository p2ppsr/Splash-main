import React from 'react';
import { Button, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const ExportButton = ({ handleExport }) => {
  return (
    <Tooltip title="Export data">
      <Button
        variant="outlined"
        color="primary"
        startIcon={<DownloadIcon />}
        onClick={handleExport}
      >
        Export
      </Button>
    </Tooltip>
  );
};

export default ExportButton;