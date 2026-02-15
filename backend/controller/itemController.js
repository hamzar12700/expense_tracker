import Item, { find, findByIdAndUpdate, findByIdAndDelete } from "../models/itemModel.js";

// ✅ Get All Items
export async function getItems(req, res) {
  try {
    const items = await find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

// ✅ Create Item
export async function createItem(req, res) {
  try {
    const { item, amount, category } = req.body;

    const newItem = new Item({ item, amount, category });
    await newItem.save();

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

// ✅ Update Item
export async function updateItem(req, res) {
  try {
    const updated = await findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

// ✅ Delete Item
export async function deleteItem(req, res) {
  try {
    await findByIdAndDelete(req.params.id);
    res.json({ message: "Item Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}
