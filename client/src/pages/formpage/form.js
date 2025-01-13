import React, { useEffect, useState } from "react";
import data from "./FormBuilder.json";
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

	useEffect(() => {
		setFormFields(data.questions);
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

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("Form Data Submitted:", formData);
	};

	return (
		<div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-100">
			{/* Banner Section */}
			<Box
				component="img"

				src={`${process.env.PUBLIC_URL}/assets/forms.jpg`}

				alt="Banner Image"
				sx={{
					width: "1350px",
					height: "450px",
					objectFit: "cover",
					objectPosition: "top",
					display: "block",
				}}
			/>

			{/* Form Section */}
			<Box
				component="form"
				onSubmit={handleSubmit}
				className="form-container"
				sx={{
					maxWidth: 800,
					margin: "20px auto",
					padding: 5,
					position: "relative",
				}}
			>
				<motion.h1
					className="text-6xl font-bold text-blue-600 mb-6 text-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					style={{ fontSize: "60px" }}
				>
					{data.formName}
				</motion.h1>
				<motion.p
					className="text-2xl text-gray-700 mb-4 text-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					style={{ fontSize: "15px" }}
				>
					{data.formDes}
				</motion.p>

				{formFields.map((field, index) => (
					<motion.div
						key={field.id}
						className="mb-4 p-10"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.3 * index }}
					>
						<InputLabel
							htmlFor={field.id}
							sx={{ marginBottom: "4px" }}
							className="text-gray-800 font-bold"
						>
							{field.questionName || (
								<span
									style={{
										fontWeight: "700",
										color: "black",
									}}
								>
									Question
								</span>
							)}
						</InputLabel>
						<FormControl fullWidth margin="none">
							{field.questionType === "single" && (
								<Select
									name={field.id}
									required={field.required}
									value={formData[field.id] || ""}
									onChange={handleChange}
									id={field.id}
									className="bg-white border-blue-300 text-gray-800"
								>
									<MenuItem value="">
										<em>Select an option</em>
									</MenuItem>
									{field.options.map((option, index) => (
										<MenuItem key={index} value={option}>
											{option}
										</MenuItem>
									))}
								</Select>
							)}
							{field.questionType === "multiple" && (
								<FormGroup>
									{field.options.map((option, index) => (
										<FormControlLabel
											key={index}
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
									placeholder={`Enter your ${field.questionName.toLowerCase()}`}
									required={field.required}
									value={formData[field.id] || ""}
									onChange={handleChange}
									margin="none"
									className="p-3 border rounded-lg focus:outline-none focus:ring-2 bg-white border-blue-300"
								/>
							)}
							{field.questionType === "Document" && (
								<TextField
									type="file"
									name={field.id}
									onChange={handleChange}
									margin="none"
								/>
							)}
							{field.required && (
								<FormHelperText className="text-red-500">
									This field is required.
								</FormHelperText>
							)}
						</FormControl>
					</motion.div>
				))}
				<motion.button
					type="submit"
					className="block mx-auto mt-6 p-4 rounded-full bg-black-600 text-black font-semibold hover:bg-blue-700"
					style={{
						backgroundColor: "purple",
						width: "50%",
						textAlign: "middle",
						display: "block",
						padding: "1rem", // Added padding
						margin: "1rem auto", // Center the button horizontally
					}}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					Submit
				</motion.button>
			</Box>

			{/* Embedded CSS */}
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
			`}</style>
		</div>
	);
};

export default Form;
