import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ALERT } from "../../redux/types/alertType";

interface IProps {
  title: string;
  body: string | string[];
  bgColor: string;
}

const Toast = ({ title, body, bgColor }: IProps) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({ type: ALERT, payload: {} });
  };

  useEffect(() => {
    setTimeout(() => dispatch({ type: ALERT, payload: {} }), 5000);
  }, [dispatch]);

  return (
    <div className='toast'>
      <div className={`toast-box show`} style={{ background: `${bgColor}` }}>
        {/* <div className='toast-header' style={{ background: `${bgColor}` }}> */}
        <div className='toast-header' style={{ color: `${bgColor}` }}>
          <strong>{title}</strong>
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='toast'
            aria-label='Close'
            onClick={handleClose}>
            <i className='fa-solid fa-xmark fa-lg' />
          </button>
        </div>
        <div className='toast-body'>
          <div
            className='toast-body-sign'
            style={{
              color: `${
                title === "Success" ? "rgb(48, 206, 17)" : "rgb(210, 17, 17)"
              }`,
            }}>
            {title === "Success" ? (
              <i className='fa-solid fa-circle-check fa-2x' />
            ) : (
              <i className='fa-solid fa-circle-exclamation fa-2x' />
            )}
          </div>
          <div className='toast-body-msg'>
            {typeof body === "string" ? (
              body
            ) : (
              <ul>
                {body.map((text, index) => (
                  <li key={index}>{text}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
