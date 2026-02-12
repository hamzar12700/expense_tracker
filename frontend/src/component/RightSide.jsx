import React, { useState } from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import { toast } from "react-toastify";

const RightSide = () => {
  const [formData, setFormData] = useState({
    item: "",
    amount: 0,
    category: "",
  });

  const [formSubmit, setFormSubmit] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // ✅ IMPORTANT

  // ✅ Delete Function
  const deleteItem = (indexToDelete) => {
    setFormSubmit((prev) =>
      prev.filter((_, index) => index !== indexToDelete)
    );
    toast.info("Item deleted");
  };

  // ✅ Add + Update Function
  const submitHandler = () => {
    const { item, amount, category } = formData;

    if (!item || amount <= 0 || !category) {
      toast.error("Please fill all fields properly!");
      return;
    }

    if (editIndex !== null) {
      // Update Mode
      const updatedList = formSubmit.map((data, index) =>
        index === editIndex ? formData : data
      );

      setFormSubmit(updatedList);
      setEditIndex(null);
      toast.success("Item updated!");
    } else {
      // Add Mode
      setFormSubmit((prev) => [...prev, { ...formData }]);
      toast.success("Item added!");
    }

    setFormData({
      item: "",
      amount: 0,
      category: "",
    });
  };

  return (
    <div className="my-10 mx-10">
      <h1 className="text-2xl my-10">Your Todo List:</h1>

      {/* Top Add Form */}
      <div className="flex gap-2">
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-md focus:border-green-600 focus:outline-none"
          placeholder="Enter item name"
          value={formData.item}
          onChange={(e) =>
            setFormData({ ...formData, item: e.target.value })
          }
        />

        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-md focus:border-green-600 focus:outline-none"
        >
          <option value="" disabled>
            Select category
          </option>
          <option value="laptop">Laptop</option>
          <option value="mouse">Mouse</option>
        </select>

        <input
          type="number"
          value={formData.amount}
          onChange={(e) =>
            setFormData({
              ...formData,
              amount: Number(e.target.value),
            })
          }
          placeholder="Amount"
          className="w-full px-3 py-2 border rounded-md focus:border-green-600 focus:outline-none"
        />

        <button
          className="border px-5 rounded border-green-600 bg-green-600 text-white py-2"
          onClick={submitHandler}
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      {/* Header */}
      <div className="flex justify-between py-4 font-bold px-2 text-green-600">
        <h1>Item</h1>
        <h1>Amount</h1>
        <h1>Category</h1>
        <h1>Actions</h1>
      </div>

      {/* List */}
      <div className="mt-2">
        {formSubmit.map((items, index) => (
          <div
            key={index}
            className="w-full border border-green-600 h-20 mb-3 flex items-center justify-between rounded px-5"
          >
            {editIndex === index ? (
              <>
                <input
                  value={formData.item}
                  onChange={(e) =>
                    setFormData({ ...formData, item: e.target.value })
                  }
                  className="border px-2"
                />

                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amount: Number(e.target.value),
                    })
                  }
                  className="border px-2 w-20"
                />

                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                    })
                  }
                  className="border px-2"
                >
                  <option value="laptop">Laptop</option>
                  <option value="mouse">Mouse</option>
                </select>

                <button
                  onClick={submitHandler}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h1>{items.item}</h1>
                <h1>{items.amount}</h1>
                <h1>{items.category}</h1>

                <div className="flex gap-3 items-center">
                  <button
                    onClick={() => {
                      setEditIndex(index);
                      setFormData(items);
                    }}
                    className="text-blue-500"
                  >
                    Edit
                  </button>

                  <RiDeleteBinFill
                    className="cursor-pointer text-red-500"
                    onClick={() => deleteItem(index)}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSide;
