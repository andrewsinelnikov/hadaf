import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ALERT } from "../../redux/types/alertType";

interface IProps {
  type: "success" | "error";
  body: string | string[];
}

const Toast = ({ type, body }: IProps) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const enterTimer = setTimeout(() => setVisible(true), 10);
    // Auto-dismiss after 6s
    const exitTimer = setTimeout(() => handleClose(), 6000);
    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => dispatch({ type: ALERT, payload: {} }), 300);
  };

  const messages = typeof body === "string" ? [body] : body;

  return (
    <div className={`toast-wrapper ${visible ? "toast-wrapper--visible" : ""}`}>
      <div className={`toast-card toast-card--${type}`}>
        <div className="toast-indicator" />
        <div className="toast-content">
          <div className="toast-icon">
            {type === "success" ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2.5 8.5L6.5 12.5L13.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 4v5M8 11.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </div>
          <div className="toast-messages">
            {messages.map((msg, i) => (
              <p key={i} className="toast-message">{msg}</p>
            ))}
          </div>
        </div>
        <button className="toast-close" onClick={handleClose} aria-label="Dismiss">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;