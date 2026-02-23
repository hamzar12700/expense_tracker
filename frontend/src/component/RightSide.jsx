import React, { useState, useEffect } from "react";
import axios from "axios";
import DataForm from "./DataForm";
import "../App.css";

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
    <div className="w-full bg-white p-4 sm:p-6 rounded-xl shadow-md">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
        Inventory Manager
      </h2>

      {/* FORM */}
      <form
        onSubmit={submitHandler}
        className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6"
      >
        {/* Item Name */}
        <input
          type="text"
          placeholder="Enter Item Name"
          value={formData.item}
          onChange={(e) =>
            setFormData({ ...formData, item: e.target.value })
          }
          className="border p-3 rounded-lg flex-1 min-w-[180px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          required
        />

        {/* Amount */}
        <input
          type="number"
          placeholder="Enter Amount"
          value={formData.amount}
          onChange={(e) =>
            setFormData({ ...formData, amount: e.target.value })
          }
          className="border p-3 rounded-lg flex-1 min-w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          required
        />

        {/* Category Select */}
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="border p-3 rounded-lg flex-1 min-w-[150px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="Laptop">Laptop</option>
          <option value="Mouse">Mouse</option>
          <option value="Keyboard">Keyboard</option>
          <option value="Screen">Screen</option>
        </select>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
          >
            {editId ? "Update" : "Add"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setFormData(initialFormState);
              }}
              className="bg-gray-400 text-white px-5 py-3 rounded-lg hover:bg-gray-500 transition text-sm sm:text-base"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* DATA TABLE */}
      <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
        <DataForm
          items={items}
          deleteItem={deleteItem}
          setEditId={setEditId}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
};

export default RightSide;