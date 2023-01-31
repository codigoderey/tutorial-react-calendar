import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";

const Recurrent = () => {
	const [value, onChange] = useState(new Date());

	const onSaveDates = () => {
		const totalWeeks = 12;

		fetch("http://localhost:3000/days", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				date: new Date(value).toLocaleDateString()
			})
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.error(error);
			});

		// loop to save the dates in the database
		for (let i = 0; i < totalWeeks; i++) {
			value.setDate(value.getDate() + 7);
			fetch("http://localhost:3000/days", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					date: value.toLocaleDateString()
				})
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	return (
		<div className="full-screen flex">
			<Calendar calendarType="US" value={value} onChange={onChange} />
			<button
				style={{ padding: ".5rem 1rem", marginTop: "1rem" }}
				onClick={onSaveDates}>
				Save
			</button>
		</div>
	);
};

export default Recurrent;
