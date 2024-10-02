import React from 'react';
import { TextField } from '@mui/material';

const SearchBox = ({ searchTerm, handleSearchChange }) => {
  return (
    <TextField
      label="Search"
      value={searchTerm}
      onChange={handleSearchChange}
      variant="outlined"
      size="small"
    />
  );
};

export default SearchBox;