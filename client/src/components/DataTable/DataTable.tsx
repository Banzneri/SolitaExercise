import React from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  Paper,
  TableCell,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { FarmData } from '../../types/types';
import DataRow from './DataRow';

interface DataTableProps {
  data: FarmData[]
}

const DataTable: React.FC<DataTableProps> = ({ data }) => (
  <TableContainer component={Paper}>
    <Table aria-label="simple table" size="small">
      <TableHead>
        <TableRow>
          <TableCell>Time</TableCell>
          <TableCell align="right">Sensor</TableCell>
          <TableCell align="right">Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((e) => <DataRow key={uuidv4()} data={e} />)}
      </TableBody>
    </Table>
  </TableContainer>
);

export default DataTable;
