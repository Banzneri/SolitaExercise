import { ChangeEvent, FC } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import { FarmData } from '../../types/types';
import DataRow from './DataRow';
import PaginationBar from './PaginationBar';

const headerStyles = {
  fontWeight: 'bold',
  color: 'white',
};

interface DataTableProps {
  data: FarmData[]
  pages: number
  handlePageChange(e: ChangeEvent<unknown>, page: number): void,
  page: number,
}

const DataTable: FC<DataTableProps> = ({
  data,
  pages,
  handlePageChange,
  page,
}) => (
  <TableContainer>
    <Table aria-label="simple table" size="small">
      <TableHead>
        <TableRow sx={headerStyles}>
          <TableCell>Time</TableCell>
          <TableCell align="right">Sensor</TableCell>
          <TableCell align="right">Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((e) => <DataRow key={uuid()} data={e} />)}
      </TableBody>
    </Table>
    {data && <PaginationBar pages={pages} handlePageChange={handlePageChange} page={page} />}
  </TableContainer>
);

export default DataTable;
