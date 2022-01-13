import { ChangeEvent, FC } from 'react';
import { Pagination } from '@mui/material';

interface PaginationBarProps {
  pages: number,
  handlePageChange(e: ChangeEvent<unknown>, page: number): void,
  page: number,
}

const PaginationBar: FC<PaginationBarProps> = ({
  pages,
  handlePageChange,
  page,
}) => (
  <Pagination
    id="pagination"
    count={pages}
    onChange={(e, val) => handlePageChange(e, val)}
    defaultPage={1}
    size="large"
    shape="rounded"
    page={page}
  />
);

export default PaginationBar;
