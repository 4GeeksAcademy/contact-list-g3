import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import injectContext from "./store/appContext";

import { AddContact } from "./views/AddContact.jsx";
import { UserList } from "./views/UserList.jsx";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="container min-vh-100 d-flex flex-column align-items-center justify-content-center">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Routes>
						<Route path="/" element={<UserList />} />
						<Route path="/add-contact" element={<AddContact />} />
						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
