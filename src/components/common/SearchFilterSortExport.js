import React from 'react';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import SearchBox from './SearchBox';
import FilterMenu from './FilterMenu';
import SortMenu from './SortMenu';
import ExportButton from './ExportButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import DownloadIcon from '@mui/icons-material/Download';

const SearchFilterSortExport = ({
  searchTerm,
  handleSearchChange,
  filterOptions,
  handleFilterChange,
  sortOptions,
  handleSortChange,
  handleExport,
  showSearch = true,
  showFilter = true,
  showSort = true,
  showExport = true,
}) => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box display="flex" justifyContent="flex-start" alignItems="center" mb={2} flexWrap="wrap">
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

export default SearchFilterSortExport;