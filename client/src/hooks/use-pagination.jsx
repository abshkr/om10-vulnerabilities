import React, { useState } from 'react';
import { Pagination } from 'antd';

export default function usePagination(initial = 500) {
  const show_size = sessionStorage.getItem('pageShowSize')
  const [size, setSize] = useState(show_size ? show_size : initial);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const take = page === 1 ? 0 : (page - 1) * size + 1;
  const offset = page === 1 ? size : take + size;

  const showSizeHandler = (page, size) => {
    setSize(size)
    sessionStorage.setItem('pageShowSize', size)
  }

  const paginator = (
    <Pagination
      current={page}
      onChange={setPage}
      pageSize={size}
      onShowSizeChange={showSizeHandler}
      pageSizeOptions={[150, 250, 500, 1000]}
      total={count}
      disabled={count === 0}
      showTotal={(total, range) => {
        if (total > 0) {
          return `${range[0]}-${range[1]} / ${total}`;
        }
        return ``;
      }}
    />
  );

  return {
    setCount,
    take,
    offset,
    paginator,
    setPage,
    count,
  };
}
