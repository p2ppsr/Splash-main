import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Container, Card, CardContent, IconButton, Snackbar, Box, Pagination, Tooltip, Checkbox } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AddSearchFilterSortExport from '../common/AddSearchFilterSortExport';

const DiveLogList = () => {
  const [diveLogs, setDiveLogs] = useState([
    { id: 1, date: '2023-10-01', location: 'Great Barrier Reef', depth: '20m', duration: '50 minutes', waterTemperature: '26°C', visibility: '30m', notes: 'Saw a turtle and a school of fish.' },
    { id: 2, date: '2023-10-02', location: 'Blue Hole, Belize', depth: '40m', duration: '45 minutes', waterTemperature: '24°C', visibility: '25m', notes: 'Amazing visibility, saw a shark.' },
    { id: 3, date: '2023-10-03', location: 'Red Sea', depth: '30m', duration: '60 minutes', waterTemperature: '27°C', visibility: '20m', notes: 'Coral reefs were stunning.' },
    // Add more realistic dummy data to reflect 50 dive logs
    { id: 4, date: '2023-10-04', location: 'Cenote Dos Ojos, Mexico', depth: '15m', duration: '40 minutes', waterTemperature: '25°C', visibility: '35m', notes: 'Beautiful underwater caves.' },
    { id: 5, date: '2023-10-05', location: 'Silfra, Iceland', depth: '18m', duration: '30 minutes', waterTemperature: '2°C', visibility: '100m', notes: 'Crystal clear water between tectonic plates.' },
    { id: 6, date: '2023-10-06', location: 'Richelieu Rock, Thailand', depth: '25m', duration: '50 minutes', waterTemperature: '28°C', visibility: '20m', notes: 'Saw a whale shark.' },
    { id: 7, date: '2023-10-07', location: 'SS Thistlegorm, Egypt', depth: '30m', duration: '45 minutes', waterTemperature: '26°C', visibility: '15m', notes: 'Explored the famous wreck.' },
    { id: 8, date: '2023-10-08', location: 'Barracuda Point, Sipadan', depth: '35m', duration: '55 minutes', waterTemperature: '29°C', visibility: '25m', notes: 'Huge schools of barracuda.' },
    { id: 9, date: '2023-10-09', location: 'Manta Ray Night Dive, Hawaii', depth: '12m', duration: '35 minutes', waterTemperature: '27°C', visibility: '20m', notes: 'Manta rays feeding at night.' },
    { id: 10, date: '2023-10-10', location: 'Navy Pier, Australia', depth: '14m', duration: '40 minutes', waterTemperature: '25°C', visibility: '10m', notes: 'Diverse marine life.' },
    // Add more dummy data to reflect 50 dive logs
    ...Array.from({ length: 40 }, (_, i) => ({
      id: i + 11,
      date: `2023-10-${String(i + 11).padStart(2, '0')}`,
      location: `Location ${i + 11}`,
      depth: `${15 + i % 10}m`,
      duration: `${40 + i % 20} minutes`,
      waterTemperature: `${24 + i % 5}°C`,
      visibility: `${20 + i % 10}m`,
      notes: `Notes for dive log ${i + 11}`,
    })),
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [selectedLogs, setSelectedLogs] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const logsPerPage = 10;
  const filteredLogs = diveLogs.filter(log =>
    log.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.notes.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(log => {
    if (!filter || filter === 'All') return true;
    return log.location.toLowerCase().includes(filter.toLowerCase());
  }).sort((a, b) => {
    if (!sort) return 0;
    if (sort === 'Date') return new Date(a.date) - new Date(b.date);
    if (sort === 'Depth') return parseInt(a.depth) - parseInt(b.depth);
    return 0;
  });
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * logsPerPage, currentPage * logsPerPage);

  const handleDelete = (id) => {
    setDiveLogs(diveLogs.filter(log => log.id !== id));
    setSnackbarOpen(true);
  };

  const handleExport = () => {
    // Implement export functionality here
    const selectedItems = diveLogs.filter(log => selectedLogs.includes(log.id));
    console.log('Exporting selected dive logs:', selectedItems);
    // You would typically generate a CSV or PDF here
    setSelectedLogs([]); // Reset selected logs
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleFilterChange = (filterValue) => {
    setFilter(filterValue);
  };

  const handleSortChange = (sortValue) => {
    setSort(sortValue);
  };

  const handleSelect = (id) => {
    setSelectedLogs(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(logId => logId !== id)
        : [...prevSelected, id]
    );
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Dive Logs</Typography>
      <AddSearchFilterSortExport
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        filterOptions={['All', 'Great Barrier Reef', 'Blue Hole, Belize', 'Red Sea', 'Cenote Dos Ojos, Mexico', 'Silfra, Iceland', 'Richelieu Rock, Thailand', 'SS Thistlegorm, Egypt', 'Barracuda Point, Sipadan', 'Manta Ray Night Dive, Hawaii', 'Navy Pier, Australia']}
        handleFilterChange={handleFilterChange}
        sortOptions={['Date', 'Depth']}
        handleSortChange={handleSortChange}
        handleExport={handleExport}
        addLink="/divelog/new"
      />
      <Card>
        <CardContent>
          {paginatedLogs.map((log) => (
            <Accordion
              key={log.id}
              expanded={expanded === log.id}
              onChange={handleAccordionChange(log.id)}
              sx={{ backgroundColor: selectedLogs.includes(log.id) ? 'rgba(0, 0, 0, 0.04)' : 'inherit' }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ alignItems: 'center' }}>
                <Checkbox
                  checked={selectedLogs.includes(log.id)}
                  onChange={() => handleSelect(log.id)}
                  onClick={(e) => e.stopPropagation()}
                />
                <Typography>{log.date} - {log.location}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography><strong>Depth:</strong> {log.depth}</Typography>
                <Typography><strong>Duration:</strong> {log.duration}</Typography>
                <Typography><strong>Water Temperature:</strong> {log.waterTemperature}</Typography>
                <Typography><strong>Visibility:</strong> {log.visibility}</Typography>
                <Typography><strong>Notes:</strong> {log.notes}</Typography>
                <Tooltip title="Delete dive log">
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(log.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </AccordionDetails>
            </Accordion>
          ))}
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={Math.ceil(filteredLogs.length / logsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </CardContent>
      </Card>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Dive log deleted successfully"
      />
    </Container>
  );
};

export default DiveLogList;