import React, { useContext } from 'react'
import { Context } from '../store/appContext'

export const AlertModal = ({ id }) => {
  const { actions } = useContext(Context);

  return (
    <div className="modal fade" id="alertModal" tabIndex="-1" aria-labelledby="alertModal" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="alertModal">Eliminar contacto</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>¿Estas seguro que quieres eliminar este contacto?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => actions.deleteContact(id)}>Eliminar contacto</button>
          </div>
        </div>
      </div>
    </div>
  )
}
