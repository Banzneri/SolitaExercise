import React from 'react';
import { TableRow, TableCell, styled } from '@mui/material';
import { FarmData } from '../../types/types';

interface DataRowProps {
  data: FarmData
}

const DataRow: React.FC<DataRowProps> = ({ data }) => (
  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    <TableCell>{new Date(data.dateTime).toDateString()}</TableCell>
    <TableCell align="right">{data.sensorType}</TableCell>
    <TableCell align="right">{data.value}</TableCell>
  </TableRow>
);

export default DataRow;
