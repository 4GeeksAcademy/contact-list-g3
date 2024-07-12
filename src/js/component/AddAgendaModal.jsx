import React, { useState, useContext } from 'react'
import { Context } from '../store/appContext'

export const AddAgendaModal = () => {
  const { actions } = useContext(Context);
  const [agenda, setAgenda] = useState("");

  const handleClick = () => {
    if (!agenda) return;
    actions.createAgenda(agenda);
    actions.getAgendas();
  };

  return (
    <div className="modal fade" id="agendaModal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add agenda</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col">
                <label htmlFor="agendaName">Agenda name:</label>
                <input className="form-control" type="text" id="agendaName" placeholder="Agenda name" value={agenda} onChange={(e) => setAgenda(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleClick}>Add agenda</button>
          </div>
        </div>
      </div>
    </div>
  )
}
