import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const AddContact = () => {
	const [newContact, setNewContact] = useState({
		name: "",
		phone: "",
		email: "",
		address: "",
	});
	const { store, actions } = useContext(Context);

	const navigate = useNavigate();

	function handleSubmit(event) {
		event.preventDefault();
		actions.createContact(newContact);
		navigate("/")
	}

	return (
		<form onSubmit={handleSubmit} className="container">
			<h1 className="text-center">Add new contact</h1>
			<div className="row mb-4">
				<div className="col">
					<label className="form-label" htmlFor="full-name">Full Name</label>
					<input className="form-control" type="text" id="full-name" name="full-name" placeholder="Full Name" value={newContact.name} onChange={(e) => setNewContact({ ...newContact, name: e.target.value })} required />
				</div>
			</div>
			<div className="row mb-4">
				<div className="col">
					<label className="form-label" htmlFor="email">Email</label>
					<input className="form-control" type="email" id="email" name="email" placeholder="Email" value={newContact.email} onChange={(e) => setNewContact({ ...newContact, email: e.target.value })} />
				</div>
			</div>
			<div className="row mb-4">
				<div className="col">
					<label className="form-label" htmlFor="phone">Phone</label>
					<input className="form-control" type="phone" id="phone" name="phone" placeholder="Phone" value={newContact.phone} onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })} />
				</div>
			</div>
			<div className="row mb-4">
				<div className="col">
					<label className="form-label" htmlFor="address">Address</label>
					<input className="form-control" type="text" id="address" name="address" placeholder="Address" value={newContact.address} onChange={(e) => setNewContact({ ...newContact, address: e.target.value })} />
				</div>
			</div>
			<div className="row">
				<div className="col">
					<button className="btn btn-primary w-100" type="submit">Save</button>
					<Link to="/">or get back to contacts</Link>
				</div>
			</div>
		</form>
	);
};