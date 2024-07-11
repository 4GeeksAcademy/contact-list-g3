import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserDetail } from "../component/UserDetail.jsx";
import { Context } from "../store/appContext.js";

export const UserList = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getContacts(store.slug);
	}, []);

	return (
		<div className="container">
			<Link to="/add-contact" className="btn btn-success mb-2 w-100">Add new contact</Link>
			<ul className="list-group">
				{
					store.contacts.length > 0 ? (
						store.contacts.map((contact) => (
							<UserDetail
								key={contact.id}
								id={contact.id}
								name={contact.name}
								email={contact.email}
								phone={contact.phone}
								address={contact.address}
							/>
						))) : (
						<div className="alert alert-warning text-center">
							<i className="fas fa-info-circle"></i> No hay contactos para mostrar
						</div>
					)
				}
			</ul>
		</div>
	)
};