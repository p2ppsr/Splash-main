import React from 'react';
import { Box, IconButton, Button, useMediaQuery, useTheme } from '@mui/material';
import SearchBox from './SearchBox';
import FilterMenu from './FilterMenu';
import SortMenu from './SortMenu';
import ExportButton from './ExportButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const AddSearchFilterSortExport = ({
  searchTerm,
  handleSearchChange,
  filterOptions,
  handleFilterChange,
  sortOptions,
  handleSortChange,
  handleExport,
  addLink,
  showSearch = true,
  showFilter = true,
  showSort = true,
  showExport = true,
}) => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box display="flex" justifyContent="flex-start" alignItems="flex-start" mb={2} flexWrap="wrap">
      {isMediumScreen ? (
        <IconButton component={Link} to={addLink} color="primary" sx={{ mr: 2 }}>
          <AddIcon />
        </IconButton>
      ) : (
        <Button component={Link} to={addLink} variant="contained" color="primary" sx={{ height: 'fit-content', mr: 2 }}>
          Add New
        </Button>
      )}
      {showSearch && <Box mr={2} mb={1}><SearchBox searchTerm={searchTerm} handleSearchChange={handleSearchChange} /></Box>}
      {showFilter && (
        <Box mr={2} mb={1}>
          {isMediumScreen ? (
            <IconButton onClick={handleFilterChange}>
              <FilterListIcon />
            </IconButton>
          ) : (
            <FilterMenu filterOptions={filterOptions} handleFilterChange={handleFilterChange} />
          )}
        </Box>
      )}
      {showSort && (
        <Box mr={2} mb={1}>
          {isMediumScreen ? (
            <IconButton onClick={handleSortChange}>
              <SortIcon />
            </IconButton>
          ) : (
            <SortMenu sortOptions={sortOptions} handleSortChange={handleSortChange} />
          )}
        </Box>
      )}
      {showExport && (
        <Box mb={1}>
          {isMediumScreen ? (
            <IconButton onClick={handleExport}>
              <DownloadIcon />
            </IconButton>
          ) : (
            <ExportButton handleExport={handleExport} />
          )}
        </Box>
      )}
    </Box>
  );
};

export default AddSearchFilterSortExport;