const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			agenda: "fernando_gimeno",
			agendas: [],
			contacts: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			getAgendas: (limit = 100) => {
				fetch(`https://playground.4geeks.com/contact/agendas?offset=0&limit=${limit}`)
					.then((response) => {
						if (!response.ok) {
							throw new Error("Ocurrió un error al obtener los datos");
						}
						return response.json();
					})
					.then((data) => setStore({ agendas: data.agendas }))
			},
			setAgenda: (nameAgenda) => setStore({ agenda: nameAgenda }),
			createAgenda: (name) => {
				fetch(`https://playground.4geeks.com/contact/agendas/${name}`, {
					method: "POST",
				})
					.then((response) => {
						if (response.status === 400) throw new Error("La agenda ya existe")
						return response.json();
					})
					.then((data) => console.log(data))
					.catch((error) => console.error(error));
			},
			getContacts: (nameAgenda) => {
				fetch(`https://playground.4geeks.com/contact/agendas/${nameAgenda}`)
					.then((response) => {
						if (response.status === 404) {
							getActions().createAgenda(agenda)
						}
						return response.json();
					})
					.then((data) => setStore({ contacts: data.contacts }))
					.catch((error) => console.error(error));
			},
			getContactById: (contactId) => {
				const { contacts } = getStore();
				return contacts.find((contact) => contact.id === contactId);
			},
			createContact: (contact) => {
				const { contacts, agenda } = getStore();

				fetch(`https://playground.4geeks.com/contact/agendas/${agenda}/contacts`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(contact),
				})
					.then((response) => {
						if (response.status === 422) throw new Error("Debes enviar el campo 'name' para crear un contacto")
						return response.json()
					})
					.then((data) => setStore({ contacts: [...contacts, data] }))
					.catch((error) => console.error(error));
			},
			updateContact: (contactId, contact) => {
				const { contacts, agenda } = getStore();
				fetch(`https://playground.4geeks.com/contact/agendas/${agenda}/contacts/${contactId}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(contact),
				})
					.then((response) => {
						if (response.status === 404) throw new Error(`La tarea con el id #${contactId} que intentas actualizar no existe en el slug: ${agenda}`)
						return response.json()
					})
					.then((data) => {
						setStore({ contacts: contacts.map((contact) => contact.id === contactId ? data : contact) })
					})
					.catch((error) => console.error(error));
			},
			deleteContact: (contactId) => {
				const { contacts, agenda } = getStore();

				fetch(`https://playground.4geeks.com/contact/agendas/${agenda}/contacts/${contactId}`, {
					method: "DELETE",
				})
					.then((response) => {
						if (response.status === 404) throw new Error(`La tarea con el id #${contactId} que intentas eliminar no existe en el slug: ${agenda}`)
						if (response.status === 204) {
							setStore({ contacts: contacts.filter((contact) => contact.id !== contactId) })
							return
						}
					})
					.catch((error) => console.error(error));
			},
		}
	};
};

export default getState;
