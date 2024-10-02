import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Container, Card, CardContent, Box, Pagination, Tooltip, IconButton, Checkbox } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AddSearchFilterSortExport from '../common/AddSearchFilterSortExport';

const EquipmentList = () => {
  // Mock data
  const [equipment, setEquipment] = useState([
    { id: 1, name: 'Diving Suit', status: 'Good', serialNumber: 'DS123456', purchaseDate: '2022-05-15', lastMaintenanceDate: '2023-09-01' },
    { id: 2, name: 'Oxygen Tank', status: 'Needs Maintenance', serialNumber: 'OT654321', purchaseDate: '2021-03-10', lastMaintenanceDate: '2023-08-20' },
    // Add more realistic dummy data to reflect a more comprehensive list
    { id: 3, name: 'Regulator', status: 'Good', serialNumber: 'RG789012', purchaseDate: '2020-06-25', lastMaintenanceDate: '2023-07-15' },
    { id: 4, name: 'BCD', status: 'Needs Maintenance', serialNumber: 'BCD345678', purchaseDate: '2019-11-10', lastMaintenanceDate: '2023-05-20' },
    { id: 5, name: 'Dive Computer', status: 'Good', serialNumber: 'DC901234', purchaseDate: '2021-02-18', lastMaintenanceDate: '2023-06-30' },
    { id: 6, name: 'Fins', status: 'Good', serialNumber: 'FN567890', purchaseDate: '2021-08-05', lastMaintenanceDate: '2023-07-10' },
    { id: 7, name: 'Mask', status: 'Good', serialNumber: 'MK123456', purchaseDate: '2022-01-12', lastMaintenanceDate: '2023-08-01' },
    { id: 8, name: 'Snorkel', status: 'Good', serialNumber: 'SN789012', purchaseDate: '2022-03-22', lastMaintenanceDate: '2023-07-25' },
    { id: 9, name: 'Weight Belt', status: 'Needs Maintenance', serialNumber: 'WB345678', purchaseDate: '2020-09-15', lastMaintenanceDate: '2023-04-10' },
    { id: 10, name: 'Wetsuit', status: 'Good', serialNumber: 'WS901234', purchaseDate: '2021-12-01', lastMaintenanceDate: '2023-06-20' },
    // Add more dummy data to reflect a more comprehensive list
    ...Array.from({ length: 38 }, (_, i) => ({
      id: i + 11,
      name: `Equipment ${i + 11}`,
      status: i % 2 === 0 ? 'Good' : 'Needs Maintenance',
      serialNumber: `SN${i + 11}456`,
      purchaseDate: `2021-01-${String(i + 11).padStart(2, '0')}`,
      lastMaintenanceDate: `2023-07-${String(i + 11).padStart(2, '0')}`,
    })),
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const itemsPerPage = 10;
  const filteredEquipment = equipment.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(item => {
    if (!filter || filter === 'All') return true;
    return item.status.toLowerCase().includes(filter.toLowerCase());
  }).sort((a, b) => {
    if (!sort) return 0;
    if (sort === 'Name') return a.name.localeCompare(b.name);
    if (sort === 'Status') return a.status.localeCompare(b.status);
    if (sort === 'Purchase Date') return new Date(a.purchaseDate) - new Date(b.purchaseDate);
    if (sort === 'Last Maintenance Date') return new Date(a.lastMaintenanceDate) - new Date(b.lastMaintenanceDate);
    return 0;
  });
  const paginatedEquipment = filteredEquipment.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
    setSelectedEquipment(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(equipId => equipId !== id)
        : [...prevSelected, id]
    );
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleDelete = (id) => {
    setEquipment(equipment.filter(item => item.id !== id));
  };

  const handleExport = () => {
    // Implement export functionality here
    const selectedItems = equipment.filter(item => selectedEquipment.includes(item.id));
    console.log('Exporting selected equipment:', selectedItems);
    // You would typically generate a CSV or PDF here
    setSelectedEquipment([]); // Reset selected equipment
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Equipment</Typography>
      <AddSearchFilterSortExport
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        filterOptions={['All', 'Good', 'Needs Maintenance']}
        handleFilterChange={handleFilterChange}
        sortOptions={['Name', 'Status', 'Purchase Date', 'Last Maintenance Date']}
        handleSortChange={handleSortChange}
        handleExport={handleExport}
        addLink="/equipment/new"
      />
      <Card>
        <CardContent>
          {paginatedEquipment.map((item) => (
            <Accordion
              key={item.id}
              expanded={expanded === item.id}
              onChange={handleAccordionChange(item.id)}
              sx={{ backgroundColor: selectedEquipment.includes(item.id) ? 'rgba(0, 0, 0, 0.04)' : 'inherit' }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ alignItems: 'center' }}>
                <Checkbox
                  checked={selectedEquipment.includes(item.id)}
                  onChange={() => handleSelect(item.id)}
                  onClick={(e) => e.stopPropagation()}
                />
                <Typography>{item.name} - {item.status}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography><strong>Serial Number:</strong> {item.serialNumber}</Typography>
                <Typography><strong>Purchase Date:</strong> {item.purchaseDate}</Typography>
                <Typography><strong>Last Maintenance Date:</strong> {item.lastMaintenanceDate}</Typography>
                <Tooltip title="Delete equipment">
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </AccordionDetails>
            </Accordion>
          ))}
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={Math.ceil(filteredEquipment.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EquipmentList;