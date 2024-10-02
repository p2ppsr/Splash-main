import React from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';

const SortMenu = ({ sortOptions, handleSortChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (sortValue) => {
    handleSortChange(sortValue);
    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <SortIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {sortOptions.map((option) => (
          <MenuItem key={option} onClick={() => handleMenuItemClick(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default SortMenu;