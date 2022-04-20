import React from "react";
import ExceptionalPageLayout from "../layouts/ExceptionalPageLayout";

const NotFound = () => {
  return (
    <ExceptionalPageLayout>
      <div className='notFound'>
        <h2>404 | Page Not Found</h2>
        <p>Sorry, we can’t seem to find the page you’re looking for.</p>
      </div>
    </ExceptionalPageLayout>
  );
};

export default NotFound;
