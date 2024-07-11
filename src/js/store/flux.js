const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			slug: "fernando_gimeno",
			contacts: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			createSlug: (name) => {
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
			getContacts: (slug) => {
				fetch(`https://playground.4geeks.com/contact/agendas/${slug}`)
					.then((response) => {
						if (response.status === 404) {
							getActions().createSlug(slug)
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
				const { contacts, slug } = getStore();

				fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`, {
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
				const { contacts, slug } = getStore();
				fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${contactId}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(contact),
				})
					.then((response) => {
						if (response.status === 404) throw new Error(`La tarea con el id #${contactId} que intentas actualizar no existe en el slug: ${slug}`)
						return response.json()
					})
					.then((data) => {
						setStore({ contacts: contacts.map((contact) => contact.id === contactId ? data : contact) })
					})
					.catch((error) => console.error(error));
			},
			deleteContact: (contactId) => {
				const { contacts, slug } = getStore();

				fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${contactId}`, {
					method: "DELETE",
				})
					.then((response) => {
						if (response.status === 404) throw new Error(`La tarea con el id #${contactId} que intentas eliminar no existe en el slug: ${slug}`)
						if (response.status === 204) {
							setStore({ contacts: contacts.filter((contact) => contact.id !== contactId) })
							return
						}
					})
					.catch((error) => console.error(error));
			},
			setSlug: (slugName) => setStore({ slug: slugName }),
		}
	};
};

export default getState;
