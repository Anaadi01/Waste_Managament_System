import moment from 'moment';
import React from 'react';

export default function SupplyTable  ({ supplies, handleChangeSupplyStatus, action }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Client Name</th>
          <th>Category</th>
          <th>Date</th>
          <th>Weight</th>
          <th>Address</th>
          <th>Pincode</th>
          <th>Status</th>
          {
            action
            &&
          <th>Actions</th>
          }
        </tr>
      </thead>
      <tbody>
        {supplies.length > 0 &&
          supplies.map((supply, index) => (
            <tr key={index}>
              <td>{supply.clientName}</td>
              <td>{supply.category}</td>
              <td>{moment(supply.supplyDate).format('DD-MM-YYYY')}</td>
              <td>{supply.weight}</td>
              <td>{supply.address}</td>
              <td>{supply.pincode}</td>
              <td>{supply.status}</td>
              <td>
                {
                  action &&
                  supply.status === 'Request Send' && (
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => handleChangeSupplyStatus(supply._id, 'Accepted')}
                    >
                      Accept request
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleChangeSupplyStatus(supply._id, 'Rejected')}
                    >
                      Reject request
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};


