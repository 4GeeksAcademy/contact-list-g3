import React, { useContext, useEffect } from "react"
import { Context } from "../store/appContext.js"
import { AddAgendaModal } from "./AddAgendaModal.jsx";

const SelectAgenda = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getAgendas();
  }, []);

  useEffect(() => {
    actions.getContacts(store.agenda)
  }, [store.agenda]);

  return (
    <>
      <div className="row">
        <div className="col">
          <label htmlFor="agenda" className="form-label">Agenda:</label>
          <select id="agenda" className="form-select mb-4" aria-label="Default select example" onChange={(e) => actions.setAgenda(e.target.value)}>
            {
              store.agendas.length > 0 && (
                store.agendas.map(agenda => (
                  <option key={agenda.id} value={agenda.slug}>{agenda.slug}</option>
                ))
              )
            }
          </select>
        </div>
        <div className="col-3 d-flex align-items-center">
          <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#agendaModal">New Agenda</button>
        </div>
      </div>
      <AddAgendaModal />
    </>
  )
}

export default SelectAgenda