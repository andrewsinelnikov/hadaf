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
          <i className='far fa-question-circle fa-spin' />
        </p>
        <p>
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>
        <div className='msg'>
          Maybe this page moved? Got deleted? Is hiding out in quarantine? Never
          existed in the first place?
          <p>
            Let's go <a href='#'>home</a> and try from there.
          </p>
        </div>
      </div>
    </ExceptionalPageLayout>
  );
};

export default NotFound;
