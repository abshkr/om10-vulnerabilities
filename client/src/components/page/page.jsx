import React from 'react';
import './page.css';

const Page = ({ name, page, children }) => {
  return (
    <div className="page">
      <div>{children}</div>
    </div>
  );
};

export default Page;
