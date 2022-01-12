import { ChangeEvent, FC } from 'react';
import { Pagination } from '@mui/material';

interface PaginationBarProps {
  pages: number,
  handlePageChange(e: ChangeEvent<unknown>, page: number): void
}

const PaginationBar: FC<PaginationBarProps> = ({
  pages,
  handlePageChange,
}) => (
  <Pagination
    count={pages}
    onChange={(e, val) => handlePageChange(e, val)}
  />
);

export default PaginationBar;
