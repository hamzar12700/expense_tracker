import React, { useState, useEffect } from "react";
import axios from "axios";
import DataForm from "./DataForm";
import '../App.css'


const API = "http://localhost:5000/api/items";

const RightSide = () => {
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);

  const initialFormState = {
    item: "",
    amount: "",
    category: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const fetchItems = async () => {
    try {
      const res = await axios.get(API);
      setItems(res.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, formData);
        setEditId(null);
      } else {
        await axios.post(API, formData);
      }

      setFormData(initialFormState);
      fetchItems();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="container bg-red-900 w-screen">
      <h2 className="title">Inventory Manager</h2>

      <form className="form-box" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Item Name"
          value={formData.item}
          onChange={(e) =>
            setFormData({ ...formData, item: e.target.value })
          }
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={(e) =>
            setFormData({ ...formData, amount: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          required
        />

        <div className="form-buttons">
          <button type="submit" className="add-btn">
            {editId ? "Update Item" : "Add Item"}
          </button>

          {editId && (
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setEditId(null);
                setFormData(initialFormState);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <DataForm
        items={items}
        deleteItem={deleteItem}
        setEditId={setEditId}
        setFormData={setFormData}
      />
    </div>
  );
};

export default RightSide;
