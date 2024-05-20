import moment from 'moment/moment';
import React from 'react';

export default function   OrderTable  ({ orders, handleChangeOrderStatus, action }) {
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
        {orders.length > 0 &&
          orders.map((order, index) => (
            <tr key={index}>
              <td>{order.clientName}</td>
              <td>{order.category}</td>
              <td>{moment(order.orderDate).format('DD-MM-YYYY')}</td>
              <td>{order.weight}</td>
              <td>{order.address}</td>
              <td>{order.pincode}</td>
              <td>{order.status}</td>
              <td>
                {
                  action
                  &&
                  order.status === 'Order Place' && (
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => handleChangeOrderStatus(order._id, 'Accepted')}
                    >
                      Accept request
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleChangeOrderStatus(order._id, 'Rejected')}
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


