import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/appContext';

export const UpdateContactModal = ({ id }) => {
  const { store, actions } = useContext(Context)

  const [selectedContact, setSelectedContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    setSelectedContact({ ...actions.getContactById(id) });
  }, [])

  function handleSubmit(event) {
    event.preventDefault();
    actions.updateContact(id, selectedContact);
  }

  return (
    <div className="modal fade" id={`contact${id}Modal`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Editar contacto</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className='row'>
              <div className="col">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input type="text" className="form-control" name="name" id="name" placeholder="Full name" value={selectedContact.name} onChange={(e) => setSelectedContact({ name: e.target.value })} />
              </div>
            </div>
            <div className='row'>
              <div className="col">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" name="email" id="email" placeholder="Email" value={selectedContact.email} onChange={(e) => setSelectedContact({ email: e.target.value })} />
              </div>
            </div>
            <div className='row'>
              <div className="col">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input type="number" className="form-control" name="phone" id="phone" placeholder="Phone" value={selectedContact.phone} onChange={(e) => setSelectedContact({ phone: e.target.value })} />
              </div>
            </div>
            <div className='row'>
              <div className="col">
                <label htmlFor="address" className="form-label">Address</label>
                <input type="text" className="form-control" name="address" id="address" placeholder="Address" value={selectedContact.address} onChange={(e) => setSelectedContact({ address: e.target.value })} />
              </div>
            </div>

          </div>
          <div className="modal-footer">
            <button type="sumbit" className="btn btn-primary" data-bs-dismiss="modal">Actualizar contacto</button>
          </div>
        </form>
      </div>
    </div>
  )
}
