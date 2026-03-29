import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";

import { IParams } from "../../utils/TypeScript";
import { postAPI } from "../../utils/FetchData";

type Status = "loading" | "success" | "error";

const Active = () => {
  const { slug }: IParams = useParams<keyof IParams>() as IParams;
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("");
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!slug || hasFetched.current) return;
    hasFetched.current = true;

    postAPI("active", { active_token: slug })
      .then((res) => {
        setMessage(res.data.msg);
        setStatus("success");
      })
      .catch((err) => {
        setMessage(err.response?.data?.msg || "Something went wrong");
        setStatus("error");
      });
  }, [slug]);

  return (
    <div className="activate_page">
      <div className="activate_box">

        <div className="activate_logo">H</div>

        {status === "loading" && (
          <div className="activate_content">
            <div className="activate_spinner" />
            <p className="activate_label">Activating your account…</p>
          </div>
        )}

        {status === "success" && (
          <div className="activate_content">
            <div className="activate_icon activate_icon--success">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M5 14.5L11 20.5L23 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="activate_title">You're in.</h1>
            <p className="activate_body">
              Your account is active. Time to set your goals and make this season count.
            </p>
            <Link to="/login" className="activate_btn">
              Sign in
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="activate_content">
            <div className="activate_icon activate_icon--error">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 8v7M14 20h.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h1 className="activate_title">Link expired</h1>
            <p className="activate_body">
              {message === "Activation link is invalid or has expired"
                ? "This activation link has expired or already been used. Register again to get a new one."
                : message}
            </p>
            <Link to="/register" className="activate_btn activate_btn--ghost">
              Register again
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default Active;