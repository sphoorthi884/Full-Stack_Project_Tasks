const express = require("express");
const router = express.Router();

let items = [];
let nextId = 1;

/**
 * GET /api/items
 * Returns list of items
 */
router.get("/", (req, res) => {
  res.json(items);
});

/**
 * GET /api/items/:id
 * Returns single item by id
 */
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
});

/**
 * POST /api/items
 * Body: { title: string, description: string }
 */
router.post("/", (req, res) => {
  const { title, description } = req.body;
  if (!title || title.trim().length < 1) {
    return res.status(400).json({ error: "Title is required" });
  }
  const item = { id: nextId++, title: title.trim(), description: description ? description.trim() : "", createdAt: new Date() };
  items.push(item);
  res.status(201).json(item);
});

/**
 * PUT /api/items/:id
 * Body: { title?, description? }
 */
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: "Item not found" });

  const { title, description } = req.body;
  if (title !== undefined) item.title = title.trim();
  if (description !== undefined) item.description = description.trim();
  item.updatedAt = new Date();
  res.json(item);
});

/**
 * DELETE /api/items/:id
 */
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ error: "Item not found" });
  const removed = items.splice(idx, 1)[0];
  res.json({ deleted: removed });
});

module.exports = router;
