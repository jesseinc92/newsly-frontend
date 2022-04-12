import React, { useState } from 'react';

const useFormChange = (initialState) => {
  const [data, setData] = useState(initialState);

  const handleChange = e => {
    const { name, value } = e.target;
    setData(data => ({
      ...data,
      [name]: value
    }));
  }

  return [data, handleChange];
}

export default useFormChange;