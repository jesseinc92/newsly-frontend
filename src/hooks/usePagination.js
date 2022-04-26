import { useState } from 'react';

const usePagination = () => {

  const [pageNum, setPageNum] = useState(1);

  const handlePagination = (e) => {
    if (e.target.innerText === 'previous' && pageNum !== 1) {
      setPageNum(num => num - 1);
    }
    if (e.target.innerText === 'next') setPageNum(num => num + 1);
  }

  return [pageNum, handlePagination];
}

export default usePagination;