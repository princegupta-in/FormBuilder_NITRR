import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";

const Form = () => {
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [formMeta, setFormMeta] = useState({ formName: "", formDes: "" });

  useEffect(() => {
    // Fetch form data from the API
    const fetchFormData = async () => {
      try {
        const response = await fetch("https://formbuilder-backend-2.onrender.com/api/v1/form/6798f7f27e8071b6afd4cc2b");
        const data = await response.json();
        console.log(data)
        setFormFields(data.questions || []);
        setFormMeta({ formName: data.formName, formDes: data.formDes });
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchFormData();
  }, []);

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? (prevData[name] || []).includes(value)
            ? prevData[name].filter((v) => v !== value)
            : [...(prevData[name] || []), value]
          : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://formbuilder-backend-2.onrender.com/api/v1/form-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form data submitted successfully:", formData);
        alert("Form submitted successfully!");
      } else {
        console.error("Failed to submit form data:", response.statusText);
        alert("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <div className="form-wrapper">
      {/* Banner Section */}
      <img
        src='/assets/forms.jpg'
        alt="Banner Image"
        className="banner-image w-24 h-24"
      />

      {/* Form Section */}
      <Box component="form" onSubmit={handleSubmit} className="form-container">
        <motion.h1
          className="form-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {formMeta.formName}
        </motion.h1>
        <motion.p
          className="form-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {formMeta.formDes}
        </motion.p>

        {formFields.map((field, index) => (
          <motion.div
            key={field.id}
            className="form-field"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 * index }}
          >
            <InputLabel htmlFor={field.id} className="field-label">
              {field.questionName}
            </InputLabel>
            <FormControl fullWidth>
              {field.questionType === "single" && (
                <Select
                  name={field.id}
                  required={field.required}
                  value={formData[field.id] || ""}
                  onChange={handleChange}
                  id={field.id}
                  className="field-input"
                >
                  <MenuItem value="">
                    <em>Select an option</em>
                  </MenuItem>
                  {field.options.map((option, idx) => (
                    <MenuItem key={idx} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              )}
              {field.questionType === "multiple" && (
                <FormGroup>
                  {field.options.map((option, idx) => (
                    <FormControlLabel
                      key={idx}
                      control={
                        <Checkbox
                          name={field.id}
                          value={option}
                          checked={(formData[field.id] || []).includes(option)}
                          onChange={handleChange}
                        />
                      }
                      label={option}
                    />
                  ))}
                </FormGroup>
              )}
              {["text", "email", "phoneNum"].includes(field.questionType) && (
                <TextField
                  type={field.questionType}
                  name={field.id}
                  id={field.id}
                  placeholder={`Enter your ${field.questionName}`}
                  required={field.required}
                  value={formData[field.id] || ""}
                  onChange={handleChange}
                  className="field-input"
                />
              )}
              {field.required && (
                <FormHelperText className="error-text">
                  This field is required.
                </FormHelperText>
              )}
            </FormControl>
          </motion.div>
        ))}
        <motion.button
          type="submit"
          className="submit-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>
      </Box>

      {/* Styles */}
      <style jsx>{`
        body {
          margin: 0;
          padding: 0;
          background: linear-gradient(to right, rgba(221, 234, 238, 0.853), rgb(136, 226, 248));
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        /* Add a background design */
        body::before {
          background: url('https://wallpapercave.com/wp/wp5670302.jpg') no-repeat center center / cover; /* Replace with your background image */
          background-size: cover;
          background-position: top center;
          background-attachment: fixed; /* This keeps the background image fixed during scroll */
          background-repeat: no-repeat;
          height: 100%; /* Make sure the body takes full height */
          margin: 0;
        }

        /* Form container style */
        .form-container {
          background-color: rgb(255, 251, 251); /* Slightly transparent white */
          border-radius: 25px;
          padding: 40px; /* Increased padding for better spacing */
          box-shadow: 0 10px 30px rgb(13, 21, 19);
          animation: fadeIn 0.5s ease-in-out;
          width: 100%; /* Increased width */
          font-family: 'Georgia', sans-serif;
        }

        /* Input and select fields style */
        input,
        select {
          transition: all 0.3s ease-in-out;
          padding: 12px 15px;
          border-radius: 5px;
          border: 1px solid #c13939;
          width: 100%;
          margin-bottom: 20px;
        }

        /* Focus effect for input and select fields */
        input:focus,
        select:focus {
          border: 2px solid #927daa; /* Change border color on focus */
          box-shadow: 0 0 5px rgba(190, 182, 199, 0.5);
        }

        /* Button style */
        button {
          padding: 12px 20px;
          border: none;
          background-color: #29262d; /* Primary button color */
          color: rgb(232, 223, 223);
          font-size: 16px;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease-in-out;
        }

        /* Hover effect for button */
        button:hover {
          background-color: #075635; /* Change button color on hover */
        }

        /* Animation for form container */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Additional styling for a smoother layout */
        .container {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        h1 {
          color: #0f0718;
          text-align: center;
          margin-bottom: 40px;
        }

        @media (max-width: 768px) {
          .form-container {
            padding: 20px;
            width: 90%;
          }
          h1 {
            font-size: 1.5rem;
          }
          input,
          select {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default Form;
