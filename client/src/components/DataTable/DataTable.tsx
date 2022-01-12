import React, { ChangeEvent } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  Paper,
  TableCell,
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import { FarmData } from '../../types/types';
import DataRow from './DataRow';
import PaginationBar from './PaginationBar';

interface DataTableProps {
  data: FarmData[]
  pages: number
  handlePageChange(e: ChangeEvent<unknown>, page: number): void
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  pages,
  handlePageChange,
}) => (
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
        {data.map((e) => <DataRow key={uuid()} data={e} />)}
      </TableBody>
    </Table>
    {data && <PaginationBar pages={pages} handlePageChange={handlePageChange} />}
  </TableContainer>
);

export default DataTable;
