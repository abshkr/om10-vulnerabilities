import React from 'react';
import { Link } from 'react-router-dom';

export default function LinkRenderer(props) {
  const query = props?.data[props?.index] || props?.value;

  return (
    <Link
      to={{
        pathname: props?.endpoint,
        search: `?${props?.field}=${query}`,
      }}
    >
      {props?.value}
    </Link>
  );
}
