import React, { useState } from 'react';
import { Pagination } from 'antd';
import _ from 'lodash';

export default function usePagination(initial = 1000) {
  // the size was saved as string when using sessionStorage.setItem
  //           Storage.setItem(key: string, value: string): void
  // so we need to convert it to number when using sessionStorage.getItem,
  // otherwise the result of "take+size" will become 600150 instead of 750 when take is numeric 600 but size is the text "150"
  const show_size = _.toNumber(sessionStorage.getItem('pageShowSize'));
  const [size, setSize] = useState(show_size ? show_size : initial);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const take = page === 1 ? 0 : (page - 1) * size + 1;
  // const offset = page === 1 ? size : take + size;
  const offset = page === 1 ? size : take + size - 1;

  const showSizeHandler = (page, size) => {
    setSize(size);
    sessionStorage.setItem('pageShowSize', size);
  };

  const paginator = (
    <Pagination
      current={page}
      onChange={setPage}
      pageSize={size}
      onShowSizeChange={showSizeHandler}
      pageSizeOptions={[100, 150, 200, 250, 500, 750, 1000, 1500, 2000]}
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
