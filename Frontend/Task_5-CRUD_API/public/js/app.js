const API_BASE = "/api/items";

const itemsList = document.getElementById("itemsList");
const itemForm = document.getElementById("itemForm");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const itemIdInput = document.getElementById("itemId");
const cancelBtn = document.getElementById("cancelEdit");
const saveBtn = document.getElementById("saveBtn");

function el(tag, props = {}, ...children) {
  const e = document.createElement(tag);
  Object.assign(e, props);
  children.forEach(c => { if (typeof c === "string") e.appendChild(document.createTextNode(c)); else e.appendChild(c); });
  return e;
}

async function loadItems() {
  itemsList.innerHTML = "<li class='loading'>Loading...</li>";
  try {
    const res = await fetch(API_BASE);
    const items = await res.json();
    renderItems(items);
  } catch (err) {
    itemsList.innerHTML = "<li class='error'>Failed to load items.</li>";
    console.error(err);
  }
}

function renderItems(items) {
  if (!items.length) {
    itemsList.innerHTML = "<li class='muted'>No items yet — create one above.</li>";
    return;
  }
  itemsList.innerHTML = "";
  items.forEach(item => {
    const li = el("li", { className: "item-card" },
      el("div", { className: "item-head" },
        el("strong", {}, item.title),
        el("div", { className: "actions" },
          el("button", { className: "btn small", onclick: () => startEdit(item) }, "Edit"),
          el("button", { className: "btn small danger", onclick: () => deleteItem(item.id) }, "Delete")
        )
      ),
      el("p", {}, item.description || ""),
      el("small", { className: "muted" }, item.createdAt ? new Date(item.createdAt).toLocaleString() : "")
    );
    itemsList.appendChild(li);
  });
}

function startEdit(item) {
  itemIdInput.value = item.id;
  titleInput.value = item.title;
  descInput.value = item.description;
  saveBtn.textContent = "Update";
  cancelBtn.classList.remove("hidden");
}

cancelBtn.addEventListener("click", () => {
  itemIdInput.value = "";
  itemForm.reset();
  saveBtn.textContent = "Save";
  cancelBtn.classList.add("hidden");
});

itemForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = itemIdInput.value;
  const payload = { title: titleInput.value.trim(), description: descInput.value.trim() };

  if (!payload.title) {
    alert("Title required");
    return;
  }

  try {
    if (id) {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Failed to update");
    } else {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Failed to create");
    }

    itemForm.reset();
    itemIdInput.value = "";
    saveBtn.textContent = "Save";
    cancelBtn.classList.add("hidden");
    await loadItems();
  } catch (err) {
    alert("Request failed — check console.");
    console.error(err);
  }
});

async function deleteItem(id) {
  if (!confirm("Delete this item?")) return;
  try {
    const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Delete failed");
    await loadItems();
  } catch (err) {
    alert("Delete failed — check console.");
    console.error(err);
  }
}

loadItems();
