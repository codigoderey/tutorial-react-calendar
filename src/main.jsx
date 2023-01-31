import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Recurrent from "./Recurrent";
import "./index.css";
import "react-calendar/dist/Calendar.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />
	},
	{
		path: "/recurrent",
		element: <Recurrent />
	}
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
