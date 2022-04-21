import React from "react";
import ExceptionalPageLayout from "../layouts/ExceptionalPageLayout";

const NotFound = () => {
  return (
    <ExceptionalPageLayout>
      <div className='notFound'>
        <h2>404 | Page Not Found</h2>
        <p>Sorry, we can’t seem to find the page you’re looking for.</p>
        <p> It may be temporarily unavailable, moved or no longer exist.</p>
        <p>
          The link you followed may be broken, or the page may have been
          removed.
        </p>
        <p>
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>
        <p>
          Maybe this page moved? Got deleted? Is hiding out in quarantine? Never
          existed in the first place?
        </p>
      </div>
    </ExceptionalPageLayout>
  );
};

export default NotFound;
