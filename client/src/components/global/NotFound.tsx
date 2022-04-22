import { Link } from "react-router-dom";
import NormalPageLayout from "../layouts/NormalPageLayout";

const NotFound = () => {
  return (
    <NormalPageLayout>
      <div className='notFound'>
        <h2>
          4<i className='far fa-question-circle fa-spin' />4 | Page not found
        </h2>
        <div className='msg'>
          Sorry, we can’t seem to find the page you’re looking for.
        </div>
        <div>
          The link you followed may be broken, or the page may have been
          removed, had its name changed or is temporarily unavailable.
        </div>
        <div className='msg'>
          <Link to='/Home'>Home</Link>
          <Link to='/help'>Help</Link>
        </div>
      </div>
    </NormalPageLayout>
  );
};

export default NotFound;
