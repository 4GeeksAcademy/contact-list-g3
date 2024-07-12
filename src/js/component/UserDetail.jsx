import React from 'react';
import rigoImage from "../../img/rigo-baby.jpg";
import { UpdateContactModal } from './UpdateContactModal.jsx';
import { AlertModal } from './AlertModal.jsx';

export const UserDetail = ({ name, address, phone, email, id }) => {

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col">
          <img className="img-fluid rounded-circle" src={rigoImage} />
        </div>
        <div className="col-6">
          <h2>{name}</h2>
          <div className="d-flex flex-column text-secondary">
            <span><i className="fas fa-map-marker-alt"></i> {address ? address : "No hay información"}</span>
            <span><i className="fas fa-phone"></i> {phone ? phone : "No hay información"}</span>
            <span><i className="fas fa-envelope"></i> {email ? email : "No hay información"}</span>
          </div>
        </div>
        <div className="col text-end">
          <button className="btn" data-bs-toggle="modal" data-bs-target={`#contact${id}Modal`}>
            <i className="fas fa-pen text-primary"></i>
          </button>
          <button className="btn" data-bs-toggle="modal" data-bs-target="#alertModal">
            <i className="fas fa-trash text-danger"></i>
          </button>
        </div>
      </div>

      <UpdateContactModal id={id} name={name} />
      <AlertModal id={id} name={name} />
    </li>
  )
}