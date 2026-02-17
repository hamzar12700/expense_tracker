import React from "react";
// import "./inventory.css";
import "../App.css"

const DataForm = ({ items, deleteItem, setEditId, setFormData }) => {
  if (!items || items.length === 0) {
    return <p className="empty">No items found.</p>;
  }

  return (
    <div className="list-container">
      {items.map((item) => (
        <div key={item._id} className="card">
          
          <div className="card-left">
            <h3>{item.item}</h3>
            <p>
              <span className="badge">Qty: {item.amount}</span>
              <span className="category">{item.category}</span>
            </p>
          </div>

          <div className="card-buttons">
            <button
              className="edit-btn"
              onClick={() => {
                setEditId(item._id);
                setFormData({
                  item: item.item,
                  amount: item.amount,
                  category: item.category,
                });
              }}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteItem(item._id)}
            >
              Delete
            </button>
          </div>

        </div>
      ))}
    </div>
  );
};

export default DataForm;
