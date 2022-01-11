import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { FarmData } from '../../types/types';

interface DataRowProps {
  data: FarmData
}

const DataRow: React.FC<DataRowProps> = ({ data }) => (
  <TableRow key={uuidv4()} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    <TableCell component="th" scope="row" align="right">{data.farmId}</TableCell>
    <TableCell align="right">{new Date(data.dateTime).toDateString()}</TableCell>
    <TableCell align="right">{data.sensorType}</TableCell>
    <TableCell align="right">{data.value}</TableCell>
  </TableRow>
);

export default DataRow;
