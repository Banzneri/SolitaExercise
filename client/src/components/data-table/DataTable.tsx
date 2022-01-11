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
import { FarmData } from '../../types/types';
import DataRow from './DataRow';

interface DataTableProps {
  data: FarmData[]
}

const DataTable: React.FC<DataTableProps> = ({ data }) => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="right">Farm id</TableCell>
          <TableCell align="right">Time</TableCell>
          <TableCell align="right">Sensor</TableCell>
          <TableCell align="right">Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((e) => <DataRow data={e} />)}
      </TableBody>
    </Table>
  </TableContainer>
);

export default DataTable;
