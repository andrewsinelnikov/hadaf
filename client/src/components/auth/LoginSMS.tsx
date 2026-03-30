import { useState } from "react";
import { useAppDispatch } from "../../utils/hooks";
import { FormSubmit } from "../../types";
import { loginSMS, verifySMS } from "../../redux/actions/authAction";

type Step = "phone" | "code";

const LoginSMS = () => {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const dispatch = useAppDispatch();

  const handleSendCode = async (e: FormSubmit) => {
    e.preventDefault();
    await dispatch(loginSMS(phone));
    // Move to code step — toast will show "Code sent" on success,
    // and stay on phone step on error (interceptor handles that)
    setStep("code");
  };

  const handleVerify = (e: FormSubmit) => {
    e.preventDefault();
    dispatch(verifySMS(phone, code));
  };

  if (step === "code") {
    return (
      <form onSubmit={handleVerify}>
        <div className="form-group">
          <label className="form-label" htmlFor="code">
            Verification code
          </label>
          <input
            type="text"
            className="form-control"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="6-digit code"
            autoComplete="one-time-code"
            inputMode="numeric"
            autoFocus
          />
          <p
            style={{
              marginTop: "0.5rem",
              fontSize: "12px",
              color: "var(--lightdark-30-color)",
            }}>
            Sent to {phone}.{" "}
            <button
              type="button"
              onClick={() => { setStep("phone"); setCode(""); }}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                font: "inherit",
                fontSize: "12px",
                color: "var(--primary-color)",
                cursor: "pointer",
              }}>
              Change number
            </button>
          </p>
        </div>
        <button type="submit" className="btn" disabled={code.length !== 6}>
          Verify
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSendCode}>
      <div className="form-group">
        <label className="form-label" htmlFor="phone">
          Phone number
        </label>
        <input
          type="tel"
          className="form-control"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+1 234 567 8900"
          autoComplete="tel"
        />
      </div>
      <button type="submit" className="btn" disabled={!phone}>
        Send code
      </button>
    </form>
  );
};

export default LoginSMS;