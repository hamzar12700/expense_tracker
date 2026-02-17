import Item from "../models/itemModel.js";


// ✅ Get All Items
export async function getItems(req, res) {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}


// ✅ Get Single Item
export async function getSingleItem(req, res) {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item Not Found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}


// ✅ Create Item
export async function createItem(req, res) {
  try {
    const { item, amount, category } = req.body;

    if (!item || !amount || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newItem = new Item({
      item,
      amount,
      category,
    });

    await newItem.save();

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}


// ✅ Update Item
export async function updateItem(req, res) {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item Not Found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}


// ✅ Delete Item
export async function deleteItem(req, res) {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item Not Found" });
    }

    res.status(200).json({ message: "Item Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}
