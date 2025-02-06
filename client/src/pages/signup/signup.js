"use client";
import "../../app/globals.css";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/router';
import axios from "axios";
export default function SignUp() {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    ContactNumber: "",
    Club: "",
    Position: "",
    Security_Key: "",
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();
  useEffect(() => {
    const body = document.querySelector("body");
    if (darkMode) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
  }, [darkMode]);

  const formFields = [
    { label: "First Name", type: "text", field: "FirstName" },
    { label: "Last Name", type: "text", field: "LastName" },
    { label: "E-mail Address", type: "email", field: "Email" },
    { label: "Password", type: "password", field: "Password" },
    { label: "Contact Number", type: "tel", field: "ContactNumber" },
    { label: "Club / Committee Name", type: "text", field: "Club" },
    { label: "Your Position", type: "text", field: "Position" },
    { label: "Security Key", type: "text", field: "Security_Key" },
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.FirstName) newErrors.FirstName = "First Name is required";
    if (!formData.LastName) newErrors.LastName = "Last Name is required";
    if (!formData.Email.includes("@")) newErrors.Email = "Invalid Email format";
    if (formData.Password.length < 6)
      newErrors.Password = "Password must be at least 6 characters";
    if (!formData.ContactNumber) newErrors.ContactNumber = "Contact Number is required";
    if (!formData.Club)
      newErrors.Club = "Club/Committee Name is required";
    if (!formData.Position) newErrors.Position = "Position is required";
    if (!formData.Security_Key)
      newErrors.Security_Key = "Security Key is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Data:", formData);
    }
    try {
        const response = await axios.post("https://formbuilder-backend-2.onrender.com/api/v1/user/signup", formData);
        console.log("Response:", response.data);
        if (response.status === 201) {
          alert("User Registered Successfully!");
          router.push("/signin/signin");
        }
    } catch (error) {
        console.log("Error:", error);
        if (error.status === 401 || error.status === 400) {
          alert(error.message)
        } else{
          alert("Unable to Signup, Please try again")
        }
    }}


  const backgroundStyle = darkMode
    ? "bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"
    : "bg-gradient-to-br from-blue-100 via-blue-300 to-blue-100";
  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${backgroundStyle}`}>

      {/* Top section (Left on desktop) */}
      <div className="md:w-1/2 md:fixed md:left-0 md:top-0 md:h-full flex flex-col justify-center items-center text-center p-6 md:p-12 overflow-hidden">
      <img src="/assets/icell_dark.png" alt="logo" className="w-80 h-auto top-0 left-0 absolute mb-8" />
        {/* Dark mode button for mobile view */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`md:hidden absolute top-4 right-4 p-2 rounded-full ${
            darkMode ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          {darkMode ? <Sun className="text-yellow-300" /> : <Moon className="text-gray-800" />}
        </button>
        <motion.h1
          className={`text-4xl md:text-5xl font-bold mb-2 md:mb-4 ${
            darkMode ? "text-white" : "text-blue-600"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to
        </motion.h1>
        <motion.h2
          className={`text-3xl md:text-4xl font-semibold mb-4 md:mb-8 ${
            darkMode ? "text-blue-300" : "text-blue-800"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          ICell Form Builder Web
        </motion.h2>
        <motion.p
          className={`max-w-xl text-base md:text-lg mb-6 md:mb-10 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Your go-to solution for creating, managing, and deploying professional forms easily.
        </motion.p>
        <div className="flex space-x-4">
          <motion.button
            type="button"
            className={`px-6 md:px-8 py-2 md:py-3 rounded-full text-base md:text-lg border-2 transition duration-300 ${
              darkMode
                ? "bg-blue-600 text-white border-blue-400 hover:bg-blue-700"
                : "bg-white text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
            }`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="/signin/signin">Login</Link>
          </motion.button>
        </div>
      </div>
      {/* Bottom section (Right on desktop) */}
      <div className="md:w-1/2 md:ml-auto">
        <div className="md:h-screen md:overflow-y-auto">
          <motion.div
            className={`p-6 md:p-12 ${darkMode ? "bg-gray-800" : "bg-white"} rounded-t-[50px] md:rounded-none md:rounded-tl-[100px] md:rounded-bl-[100px] shadow-2xl min-h-full`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className={`text-2xl md:text-3xl font-bold ${darkMode ? "text-blue-300" : "text-blue-600"}`}>
                Create your account
              </h2>
              {/* Dark mode button for desktop view */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`hidden md:block p-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
              >
                {darkMode ? <Sun className="text-yellow-300" /> : <Moon className="text-gray-800" />}
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              {formFields.map((field) => (
                <motion.div
                  key={field.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4"
                >
                  <label
                    htmlFor={field.label.toLowerCase().replace(/ /g, "-")}
                    className={`block font-bold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.label.toLowerCase().replace(/ /g, "-")}
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                    value={formData[field.field]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [field.field]: e.target.value,
                      })
                    }
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                      darkMode
                        ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-500"
                        : "bg-white text-gray-800 border-blue-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors[field.field] && (
                    <span className="text-red-500 text-sm">
                      {errors[field.field]}
                    </span>
                  )}
                </motion.div>
              ))}
              <div className="text-center mt-6 md:mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className={`w-full mt-4 md:mt-6 p-3 rounded-full text-white font-semibold transition-all duration-300 ${
                    darkMode
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  Sign Up
                </motion.button>
                <p className={`mt-4 text-sm md:text-base ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Already have an account?{" "}
                  <Link href="/signin/signin" className="font-semibold underline hover:text-blue-800">
                    Sign In
                  </Link>
                </p>
                <p className={`mt-2 text-sm md:text-base ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  OR
                </p>
                <p className={`mt-2 text-sm md:text-base ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  If you have any problems, contact the technical team.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
