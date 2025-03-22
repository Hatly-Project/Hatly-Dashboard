import React, { useState, useEffect } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";

// Custom input for Material UI
const CustomPhoneInput = React.forwardRef((props, ref) => (
  <TextField {...props} inputRef={ref} fullWidth label="Phone" variant="outlined" />
));

// Separate Phone Input Component
export default function PhoneInputComponent({ initialPhone, onPhoneChange }) {
  const [temporaryPhone, setTemporaryPhone] = useState(initialPhone || "");

  // Sync with initialPhone when it changes
  useEffect(() => {
    setTemporaryPhone(initialPhone || "");
  }, [initialPhone]);

  // Handle phone change (no re-render outside)
  const handlePhoneChange = (value) => {
    setTemporaryPhone(value);
  };

  // Only update when leaving the input
  const handlePhoneBlur = () => {
    if (isValidPhoneNumber(temporaryPhone)) {
      onPhoneChange(temporaryPhone);  
    } else {
      toast.error("Invalid phone number");
      onPhoneChange("");
    }
  };

  return (
    <PhoneInput
    style={{alignItems: 'end',}}
      placeholder="Enter phone number"
      international
      value={temporaryPhone}
      onChange={handlePhoneChange}
      onBlur={handlePhoneBlur} // Only update on blur
      inputComponent={CustomPhoneInput}
    />
  );
}
