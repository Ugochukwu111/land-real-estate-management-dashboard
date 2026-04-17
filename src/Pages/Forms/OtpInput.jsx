import { useState, useRef } from "react";
import "./OtpInput.css";

export default function OtpInput({ length, onChangeOTP ,isOtpComplete}) {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const handleChange = (element, index) => {
    const { value } = element;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move to next input
    if (value && index < length - 1) {
      element.nextSibling.focus();
    }

    onChangeOTP(newOtp.join(""));
  };

  const handleBackSpace = (element, index) => {
    const newOtp = [...otp];
    newOtp[index] = "";

    if (otp[index]) {
      newOtp[index] = "";
      setOtp(newOtp);
      onChangeOTP(newOtp.join(""));
      return;
    }

    if (index > 0) {
      element.previousSibling.focus();
    }

    onChangeOTP(newOtp.join(""));
  };

  return (
    <div className="flex items-center justify-center otp-input-container">
      {otp.map((data, index) => {
        return (
          <input
            key={index}
            className={`${isOtpComplete ? '': 'border-red'}`}
            maxLength={1}
            type="text"
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => {
              if (e.key === "Backspace") {
                handleBackSpace(e.target, index);
              }
            }}
          />
        );
      })}
    </div>
  );
}
