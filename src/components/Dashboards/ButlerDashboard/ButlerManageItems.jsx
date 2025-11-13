
// // import React, { useEffect, useState } from "react";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // const blankItemForm = { name: "", price: "" };

// // export default function ButlerItemsManager() {
// //   const mainUri = import.meta.env.VITE_MAIN_URI || ""; // e.g. http://localhost:5000
// //   const rawButler = (() => {
// //     try {
// //       return JSON.parse(localStorage.getItem("Butler") || "null");
// //     } catch {
// //       return null;
// //     }
// //   })();
// //   const hostelNo = rawButler?.hostelNo || "";

// //   // state
// //   const [items, setItems] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   // Add/Edit Item form state
// //   const [itemForm, setItemForm] = useState({ ...blankItemForm });
// //   const [editingId, setEditingId] = useState(null);
// //   const [savingItem, setSavingItem] = useState(false);

// //   // meta small forms (bind to the currently selected item)
// //   const [selectedItemId, setSelectedItemId] = useState("");
// //   const [rebateValue, setRebateValue] = useState("");
// //   const [dietValue, setDietValue] = useState("");
// //   const [messOffValue, setMessOffValue] = useState("false");
// //   const [savingMeta, setSavingMeta] = useState(false);

// //   // notifications
// //   const notify = (msg, type = "info") => {
// //     if (type === "success") toast.success(msg);
// //     else if (type === "error") toast.error(msg);
// //     else toast.info(msg);
// //   };

// //   useEffect(() => {
// //     if (hostelNo) loadItems();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [hostelNo]);

// //   async function loadItems() {
// //     setLoading(true);
// //     try {
// //       const res = await fetch(
// //         `${mainUri}/api/items?hostelNo=${encodeURIComponent(hostelNo)}`
// //       );
// //       const data = await res.json();
// //       if (!data.success) {
// //         notify(data.message || "Failed to load items", "error");
// //       } else {
// //         setItems(Array.isArray(data.items) ? data.items : []);
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       notify("Network error while loading items", "error");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   // ---------- Add / Update Item ----------
// //   function startEdit(item) {
// //     setEditingId(item._id);
// //     setItemForm({
// //       name: item.name || "",
// //       price: item.price ?? "",
// //     });
// //     // also select this item for meta forms so admin doesn't need to re-select
// //     selectItem(item);
// //     window.scrollTo({ top: 0, behavior: "smooth" });
// //   }

// //   function resetItemForm() {
// //     setEditingId(null);
// //     setItemForm({ ...blankItemForm });
// //   }

// //   async function handleSaveItem(e) {
// //     e?.preventDefault();
// //     if (!itemForm.name || itemForm.price === "")
// //       return notify("Name and price required", "error");
// //     setSavingItem(true);
// //     try {
// //       const payload = {
// //         name: itemForm.name.trim(),
// //         price: Number(itemForm.price),
// //         hostelNo, // send hostelNo from butler automatically
// //       };
// //       const url = editingId
// //         ? `${mainUri}/api/items/${editingId}`
// //         : `${mainUri}/api/items`;
// //       const method = editingId ? "PUT" : "POST";

// //       const res = await fetch(url, {
// //         method,
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });

// //       const data = await res.json();
// //       if (!data.success) {
// //         notify(data.message || "Save failed", "error");
// //       } else {
// //         notify(editingId ? "Item updated" : "Item added", "success");
// //         if (editingId) {
// //           setItems((prev) =>
// //             prev.map((it) => (it._id === data.item._id ? data.item : it))
// //           );
// //         } else {
// //           setItems((prev) => [data.item, ...prev]);
// //         }
// //         resetItemForm();
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       notify("Network error while saving item", "error");
// //     } finally {
// //       setSavingItem(false);
// //     }
// //   }

// //   // ---------- Delete ----------
// //   async function handleDelete(id) {
// //     if (!confirm("Delete this item?")) return;
// //     try {
// //       const res = await fetch(`${mainUri}/api/items/${id}`, {
// //         method: "DELETE",
// //       });
// //       const data = await res.json();
// //       if (!data.success) {
// //         notify(data.message || "Delete failed", "error");
// //       } else {
// //         notify("Deleted", "success");
// //         setItems((prev) => prev.filter((it) => it._id !== id));
// //         if (selectedItemId === id) clearSelectedItem();
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       notify("Network error while deleting", "error");
// //     }
// //   }

// //   // ---------- Select / Clear item for meta forms ----------
// //   function selectItem(item) {
// //     if (!item) return;
// //     setSelectedItemId(item._id);
// //     setRebateValue(item.rebate ?? "");
// //     setDietValue(item.diet ?? "");
// //     setMessOffValue(String(!!item.isTodayMessOff));
// //     // scroll slightly to meta forms (optional)
// //     const el = document.getElementById("meta-forms");
// //     if (el) el.scrollIntoView({ behavior: "smooth" });
// //   }

// //   function clearSelectedItem() {
// //     setSelectedItemId("");
// //     setRebateValue("");
// //     setDietValue("");
// //     setMessOffValue("false");
// //   }

// //   // ---------- Rebate / Diet / IsTodayMessOff updates ----------
// //   async function updateMetaField(field, value) {
// //     if (!selectedItemId)
// //       return notify(
// //         "Select an item from the list first (Select button)",
// //         "error"
// //       );
// //     setSavingMeta(true);
// //     try {
// //       const payload = { [field]: value };
// //       const res = await fetch(`${mainUri}/api/items/${selectedItemId}`, {
// //         method: "PUT",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });
// //       const data = await res.json();
// //       if (!data.success) {
// //         notify(data.message || "Update failed", "error");
// //       } else {
// //         notify("Updated", "success");
// //         setItems((prev) =>
// //           prev.map((it) => (it._id === data.item._id ? data.item : it))
// //         );
// //         // keep selected item in sync
// //         selectItem(data.item);
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       notify("Network error while updating", "error");
// //     } finally {
// //       setSavingMeta(false);
// //     }
// //   }

// //   const selectedItemObj = items.find((it) => it._id === selectedItemId) || null;

// //   // ---------- Render ----------
// //   return (
// //     <div className="max-w-4xl mx-auto p-4 mt-20">
// //       <ToastContainer />

// //       {/* Add / Edit Item form */}
// //       <div className="bg-white p-4 rounded shadow mb-4">
// //         <h2 className="text-lg font-semibold mb-3">
// //           {editingId ? "Edit Item" : "Add Item"}
// //         </h2>
// //         <form
// //           onSubmit={handleSaveItem}
// //           className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end"
// //         >
// //           <div>
// //             <label className="block text-sm text-gray-600 mb-1">Name</label>
// //             <input
// //               value={itemForm.name}
// //               onChange={(e) =>
// //                 setItemForm((f) => ({ ...f, name: e.target.value }))
// //               }
// //               className="w-full border rounded px-3 py-2"
// //               placeholder="e.g. Milk"
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm text-gray-600 mb-1">
// //               Price (Rs.)
// //             </label>
// //             <input
// //               type="number"
// //               min="0"
// //               value={itemForm.price}
// //               onChange={(e) =>
// //                 setItemForm((f) => ({ ...f, price: e.target.value }))
// //               }
// //               className="w-full border rounded px-3 py-2"
// //               placeholder="e.g. 20"
// //             />
// //           </div>

// //           <div className="sm:col-span-2 flex flex-col sm:flex-row gap-2 mt-2">
// //             <button
// //               type="submit"
// //               disabled={savingItem}
// //               className={`w-full sm:w-auto px-4 py-2 rounded font-semibold text-white ${
// //                 savingItem ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
// //               }`}
// //             >
// //               {savingItem
// //                 ? "Saving..."
// //                 : editingId
// //                 ? "Update Item"
// //                 : "Add Item"}
// //             </button>
// //             <button
// //               type="button"
// //               onClick={resetItemForm}
// //               className="w-full sm:w-auto px-4 py-2 border rounded-md"
// //             >
// //               Reset
// //             </button>
// //             <button
// //               type="button"
// //               onClick={loadItems}
// //               className="w-full sm:w-auto px-4 py-2 border rounded-md"
// //             >
// //               Refresh
// //             </button>
// //             <button
// //               type="button"
// //               onClick={clearSelectedItem}
// //               className="w-full sm:w-auto px-4 py-2 border rounded-md"
// //             >
// //               Clear Selection
// //             </button>
// //           </div>
// //         </form>
// //       </div>

// //       <div id="meta-forms">
// //         <div className="bg-white p-4 rounded shadow mb-4">
// //           <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
// //             <div className="sm:col-span-3">
// //               <label className="block text-sm text-gray-600 mb-1">
// //                 Rebate (Rs.)
// //               </label>
// //               <input
// //                 type="number"
// //                 min="0"
// //                 value={rebateValue}
// //                 onChange={(e) => setRebateValue(e.target.value)}
// //                 className="w-full border rounded px-3 py-2"
// //                 disabled={!selectedItemObj}
// //                 placeholder={selectedItemObj ? `${selectedItemObj.rebate ?? 0}` : "Select an item below"}
// //               />
// //             </div>

// //             <div className="flex items-end">
// //               <button
// //                 disabled={!selectedItemObj || savingMeta}
// //                 onClick={() =>
// //                   updateMetaField("rebate", Number(rebateValue || 0))
// //                 }
// //                 className={`w-full sm:w-auto px-4 py-2 rounded text-white ${
// //                   !selectedItemObj || savingMeta
// //                     ? "bg-gray-400"
// //                     : "bg-green-600 hover:bg-green-700"
// //                 }`}
// //               >
// //                 {savingMeta ? "Saving..." : "Save Rebate"}
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white p-4 rounded shadow mb-4">
// //           <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
// //             <div className="sm:col-span-3">
// //               <label className="block text-sm text-gray-600 mb-1">
// //                 Diet (Rs.)
// //               </label>
// //               <input
// //                 type="number"
// //                 min="0"
// //                 value={dietValue}
// //                 onChange={(e) => setDietValue(e.target.value)}
// //                 className="w-full border rounded px-3 py-2"
// //                 disabled={!selectedItemObj}
// //                 placeholder={selectedItemObj ? `${selectedItemObj.diet ?? 0}` : "Select an item below"}
// //               />
// //             </div>

// //             <div className="flex items-end">
// //               <button
// //                 disabled={!selectedItemObj || savingMeta}
// //                 onClick={() => updateMetaField("diet", Number(dietValue || 0))}
// //                 className={`w-full sm:w-auto px-4 py-2 rounded text-white ${
// //                   !selectedItemObj || savingMeta
// //                     ? "bg-gray-400"
// //                     : "bg-green-600 hover:bg-green-700"
// //                 }`}
// //               >
// //                 {savingMeta ? "Saving..." : "Save Diet"}
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white p-4 rounded shadow mb-6">
// //           <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
// //             <div className="sm:col-span-3">
// //               <label className="block text-sm text-gray-600 mb-1">
// //                 IsTodayMessOff
// //               </label>
// //               <select
// //                 value={messOffValue}
// //                 onChange={(e) => setMessOffValue(e.target.value)}
// //                 className="w-full border rounded px-3 py-2"
// //                 disabled={!selectedItemObj}
// //               >
// //                 <option value="false">false</option>
// //                 <option value="true">true</option>
// //               </select>
// //             </div>

// //             <div className="flex items-end">
// //               <button
// //                 disabled={!selectedItemObj || savingMeta}
// //                 onClick={() =>
// //                   updateMetaField("isTodayMessOff", messOffValue === "true")
// //                 }
// //                 className={`w-full sm:w-auto px-4 py-2 rounded text-white ${
// //                   !selectedItemObj || savingMeta
// //                     ? "bg-gray-400"
// //                     : "bg-green-600 hover:bg-green-700"
// //                 }`}
// //               >
// //                 {savingMeta ? "Saving..." : "Save MessOff"}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Items list with Edit / Delete / Select */}
// //       <div className="bg-white p-4 rounded shadow">
// //         <h3 className="text-md font-medium mb-3">
// //           Items (Hostel: {hostelNo || "—"})
// //         </h3>
// //         {loading ? (
// //           <div>Loading...</div>
// //         ) : items.length === 0 ? (
// //           <div className="text-sm text-gray-500">
// //             No items yet for this hostel.
// //           </div>
// //         ) : (
// //           <div className="space-y-3">
// //             {items.map((it) => (
// //               <div
// //                 key={it._id}
// //                 className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border rounded p-3"
// //               >
// //                 <div className="w-full sm:w-auto">
// //                   <div className="text-sm font-semibold">
// //                     {it.name} — Rs. {it.price}
// //                   </div>
// //                   <div className="text-xs text-gray-500">
// //                     Rebate: {it.rebate ?? 0} • Diet: {it.diet ?? 0} •
// //                     IsTodayMessOff: {String(it.isTodayMessOff)}
// //                   </div>
// //                   <div className="text-xs text-gray-400 mt-1">
// //                     Hostel: {it.hostelNo}
// //                   </div>
// //                 </div>

// //                 <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0">
// //                   <button
// //                     onClick={() => startEdit(it)}
// //                     className="w-full sm:w-auto px-4 py-2 text-sm border rounded"
// //                   >
// //                     Edit
// //                   </button>
// //                   <button
// //                     onClick={() => handleDelete(it._id)}
// //                     className="w-full sm:w-auto px-4 py-2 text-sm border rounded text-red-600"
// //                   >
// //                     Delete
// //                   </button>
// //                   <button
// //                     onClick={() => selectItem(it)}
// //                     className={`w-full sm:w-auto px-4 py-2 text-sm border rounded ${
// //                       selectedItemId === it._id ? "bg-gray-200" : ""
// //                     }`}
// //                   >
// //                     {selectedItemId === it._id ? "Selected" : "Select"}
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useEffect, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const blankItemForm = { name: "", price: "" };

// export default function ButlerItemsManager() {
//   const mainUri = import.meta.env.VITE_MAIN_URI || ""; // e.g. http://localhost:5000
//   const rawButler = (() => {
//     try {
//       return JSON.parse(localStorage.getItem("Butler") || "null");
//     } catch {
//       return null;
//     }
//   })();
//   const hostelNo = rawButler?.hostelNo || "";

//   // items
//   const [items, setItems] = useState([]);
//   const [loadingItems, setLoadingItems] = useState(false);

//   // item form
//   const [itemForm, setItemForm] = useState({ ...blankItemForm });
//   const [editingId, setEditingId] = useState(null);
//   const [savingItem, setSavingItem] = useState(false);

//   // hostel settings
//   const [settings, setSettings] = useState({ rebate: 0, diet: 0, isTodayMessOff: false });
//   const [loadingSettings, setLoadingSettings] = useState(false);
//   const [savingSettings, setSavingSettings] = useState(false);

//   const notify = (msg, type = "info") => {
//     if (type === "success") toast.success(msg);
//     else if (type === "error") toast.error(msg);
//     else toast.info(msg);
//   };

//   useEffect(() => {
//     if (hostelNo) {
//       loadItems();
//       loadSettings();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [hostelNo]);

//   // ---------- Items ----------
//   async function loadItems() {
//     setLoadingItems(true);
//     try {
//       const res = await fetch(`${mainUri}/api/items?hostelNo=${encodeURIComponent(hostelNo)}`);
//       const data = await res.json();
//       if (!data.success) notify(data.message || "Failed to load items", "error");
//       else setItems(Array.isArray(data.items) ? data.items : []);
//     } catch (err) {
//       console.error(err);
//       notify("Network error while loading items", "error");
//     } finally {
//       setLoadingItems(false);
//     }
//   }

//   function startEditItem(item) {
//     setEditingId(item._id);
//     setItemForm({ name: item.name || "", price: item.price ?? "" });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }

// //   function resetItemForm() {
// //     setEditingId(null);
// //     setItemForm({ ...blankItemForm });
// //   }

//   async function saveItem(e) {
//     e?.preventDefault();
//     if (!itemForm.name || itemForm.price === "") return notify("Name & price required", "error");
//     setSavingItem(true);
//     try {
//       const payload = { name: itemForm.name.trim(), price: Number(itemForm.price), hostelNo };
//       const url = editingId ? `${mainUri}/api/items/${editingId}` : `${mainUri}/api/items`;
//       const method = editingId ? "PUT" : "POST";
//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const data = await res.json();
//       if (!data.success) notify(data.message || "Save failed", "error");
//       else {
//         notify(editingId ? "Item updated" : "Item added", "success");
//         if (editingId) setItems((p) => p.map((it) => (it._id === data.item._id ? data.item : it)));
//         else setItems((p) => [data.item, ...p]);
//         resetItemForm();
//       }
//     } catch (err) {
//       console.error(err);
//       notify("Network error while saving item", "error");
//     } finally {
//       setSavingItem(false);
//     }
//   }

//   async function deleteItem(id) {
//     if (!confirm("Delete this item?")) return;
//     try {
//       const res = await fetch(`${mainUri}/api/items/${id}`, { method: "DELETE" });
//       const data = await res.json();
//       if (!data.success) notify(data.message || "Delete failed", "error");
//       else {
//         notify("Deleted", "success");
//         setItems((p) => p.filter((it) => it._id !== id));
//       }
//     } catch (err) {
//       console.error(err);
//       notify("Network error while deleting", "error");
//     }
//   }

//   // ---------- Hostel Settings (hostel-wide) ----------
//   async function loadSettings() {
//     setLoadingSettings(true);
//     try {
//       const res = await fetch(`${mainUri}/api/hostel-settings?hostelNo=${encodeURIComponent(hostelNo)}`);
//       const data = await res.json();
//       if (!data.success) notify(data.message || "Failed to load settings", "error");
//       else {
//         // backend returns settings object (defaults if not present)
//         setSettings({
//           rebate: data.settings?.rebate ?? 0,
//           diet: data.settings?.diet ?? 0,
//           isTodayMessOff: !!data.settings?.isTodayMessOff,
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       notify("Network error while loading settings", "error");
//     } finally {
//       setLoadingSettings(false);
//     }
//   }

//   async function saveSettings(updates) {
//     setSavingSettings(true);
//     try {
//       const res = await fetch(`${mainUri}/api/hostel-settings/${encodeURIComponent(hostelNo)}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updates),
//       });
//       const data = await res.json();
//       if (!data.success) notify(data.message || "Failed to save settings", "error");
//       else {
//         notify("Settings updated", "success");
//         setSettings({
//           rebate: data.settings.rebate ?? settings.rebate,
//           diet: data.settings.diet ?? settings.diet,
//           isTodayMessOff: !!data.settings.isTodayMessOff,
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       notify("Network error while saving settings", "error");
//     } finally {
//       setSavingSettings(false);
//     }
//   }

//   // ---------- Render ----------
//   return (
//     <div className="max-w-4xl mx-auto p-4 mt-20">
//       <ToastContainer />

//       {/* Hostel settings area */}
//       <div className="bg-white p-4 rounded shadow mb-4">
//         <h2 className="text-lg font-semibold mb-3">Item Vlaues</h2>

//         {/* Rebate */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end mb-3">
//           <div className="sm:col-span-2">
//             <label className="block text-sm text-gray-600 mb-1">Rebate (Rs.)</label>
//             <input
//               type="number"
//               min="0"
//               value={settings.rebate}
//               onChange={(e) => setSettings((s) => ({ ...s, rebate: Number(e.target.value) }))}
//               className="w-full border rounded px-3 py-2"
//               disabled={loadingSettings}
//             />
//           </div>
//           <div>
//             <button
//               onClick={() => saveSettings({ rebate: Number(settings.rebate || 0) })}
//               disabled={savingSettings}
//               className={`w-full sm:w-auto px-4 py-2 rounded text-white ${savingSettings ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
//             >
//               {savingSettings ? "Saving..." : "Save Rebate"}
//             </button>
//           </div>
//         </div>

//         {/* Diet */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end mb-3">
//           <div className="sm:col-span-2">
//             <label className="block text-sm text-gray-600 mb-1">Diet (Rs.)</label>
//             <input
//               type="number"
//               min="0"
//               value={settings.diet}
             
//               onChange={(e) => setSettings((s) => ({ ...s, diet: Number(e.target.value) }))}
//               className="w-full border rounded px-3 py-2"
//               disabled={loadingSettings}
//             />
//           </div>
//           <div>
//             <button
//               onClick={() => saveSettings({ diet: Number(settings.diet || 0) })}
//               disabled={savingSettings}
//               className={`w-full sm:w-auto px-4 py-2 rounded text-white ${savingSettings ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
//             >
//               {savingSettings ? "Saving..." : "Save Diet"}
//             </button>
//           </div>
//         </div>

//         {/* IsTodayMessOff */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
//           <div className="sm:col-span-2">
//             <label className="block text-sm text-gray-600 mb-1">IsTodayMessOff</label>
//             <select
//               value={settings.isTodayMessOff ? "true" : "false"}
//               onChange={(e) => setSettings((s) => ({ ...s, isTodayMessOff: e.target.value === "true" }))}
//               className="w-full border rounded px-3 py-2"
//               disabled={loadingSettings}
//             >
//               <option value="false">false</option>
//               <option value="true">true</option>
//             </select>
//           </div>
//           <div>
//             <button
//               onClick={() => saveSettings({ isTodayMessOff: settings.isTodayMessOff })}
//               disabled={savingSettings}
//               className={`w-full sm:w-auto px-4 py-2 rounded text-white ${savingSettings ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
//             >
//               {savingSettings ? "Saving..." : "Save MessOff"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Add/Edit Item form */}
//       <div className="bg-white p-4 rounded shadow mb-4">
//         <h3 className="text-md font-medium mb-3">{editingId ? "Edit Item" : "Add Item"}</h3>
//         <form onSubmit={saveItem} className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
//           <div>
//             <label className="block text-sm text-gray-600 mb-1">Name</label>
//             <input value={itemForm.name} onChange={(e) => setItemForm((f) => ({ ...f, name: e.target.value }))} className="w-full border rounded px-3 py-2" placeholder="e.g. Milk" />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-600 mb-1">Price (Rs.)</label>
//             <input type="number" min="0" value={itemForm.price} onChange={(e) => setItemForm((f) => ({ ...f, price: e.target.value }))} className="w-full border rounded px-3 py-2" placeholder="e.g. 20" />
//           </div>
//           <div className="sm:col-span-2 flex flex-col sm:flex-row gap-2 mt-2">
//             <button type="submit" disabled={savingItem} className={`w-full sm:w-auto px-4 py-2 rounded font-semibold text-white ${savingItem ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}>{savingItem ? "Saving..." : (editingId ? "Update Item" : "Add Item")}</button>
//             {/* <button type="button" onClick={resetItemForm} className="w-full sm:w-auto px-4 py-2 border rounded-md">Reset</button> */}
//             <button type="button" onClick={loadItems} className="w-full sm:w-auto px-4 py-2 border rounded-md">Refresh</button>
//           </div>
//         </form>
//       </div>

//       {/* Items list (only name + price) */}
//       <div className="bg-white p-4 rounded shadow">
//         <h3 className="text-md font-medium mb-3">Items</h3>

//         {loadingItems ? <div>Loading...</div> : items.length === 0 ? <div className="text-sm text-gray-500">No items yet for this hostel.</div> : (
//           <div className="space-y-3">
//             {items.map((it) => (
//               <div key={it._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border rounded p-3">
//                 <div>
//                   <div className="text-sm font-semibold">{it.name} — Rs. {it.price}</div>
//                   <div className="text-xs text-gray-400 mt-1">Hostel: {it.hostelNo}</div>
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0">
//                   <button onClick={() => startEditItem(it)} className="w-full sm:w-auto px-4 py-2 text-sm border rounded">Edit</button>
//                   <button onClick={() => deleteItem(it._id)} className="w-full sm:w-auto px-4 py-2 text-sm border rounded text-red-600">Delete</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// src/components/ButlerItemsManager.jsx
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const blankItemForm = { name: "", price: "" };

export default function ButlerItemsManager() {
  const mainUri = import.meta.env.VITE_MAIN_URI || ""; // e.g. http://localhost:5000
  const rawButler = (() => {
    try {
      return JSON.parse(localStorage.getItem("Butler") || "null");
    } catch {
      return null;
    }
  })();
  const hostelNo = rawButler?.hostelNo || "";

  // items
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);

  // item form
  const [itemForm, setItemForm] = useState({ ...blankItemForm });
  const [editingId, setEditingId] = useState(null);
  const [savingItem, setSavingItem] = useState(false);

  // hostel settings (kept from your previous implementation)
  const [settings, setSettings] = useState({ rebate: 0, diet: 0, isTodayMessOff: false });
  const [loadingSettings, setLoadingSettings] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);

  const notify = (msg, type = "info") => {
    if (type === "success") toast.success(msg);
    else if (type === "error") toast.error(msg);
    else toast.info(msg);
  };

  useEffect(() => {
    if (hostelNo) {
      loadItems();
      loadSettings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hostelNo]);

  // ---------- Items ----------
  async function loadItems() {
    setLoadingItems(true);
    try {
      const res = await fetch(`${mainUri}/api/items?hostelNo=${encodeURIComponent(hostelNo)}`);
      const data = await res.json();
      if (!data.success) notify(data.message || "Failed to load items", "error");
      else setItems(Array.isArray(data.items) ? data.items : []);
    } catch (err) {
      console.error(err);
      notify("Network error while loading items", "error");
    } finally {
      setLoadingItems(false);
    }
  }

  function startEditItem(item) {
    setEditingId(item._id);
    setItemForm({ name: item.name || "", price: item.price ?? "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetItemForm() {
    setEditingId(null);
    setItemForm({ ...blankItemForm });
  }

  // ---------- SAVE ITEM (fixed) ----------
  async function saveItem(e) {
    e?.preventDefault();

    // Prevent duplicate submissions
    if (savingItem) return;
    if (!itemForm.name || itemForm.price === "") return notify("Name & price required", "error");

    setSavingItem(true);
    try {
      const payload = { name: itemForm.name.trim(), price: Number(itemForm.price), hostelNo };
      const url = editingId ? `${mainUri}/api/items/${editingId}` : `${mainUri}/api/items`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // If response isn't OK, try to parse meaningful error or use status text
      if (!res.ok) {
        // try parse JSON error body, but don't crash if it's not JSON
        let errMsg = `Request failed (${res.status})`;
        try {
          const errBody = await res.json();
          errMsg = errBody?.message || errBody?.error || JSON.stringify(errBody);
        } catch {
          // fallback to statusText
          errMsg = res.statusText || errMsg;
        }
        notify(errMsg, "error");
        return;
      }

      // response OK -> parse JSON safely
      let data;
      try {
        data = await res.json();
      } catch (parseErr) {
        // parsing failed even though res.ok — treat as success but warn
        notify(editingId ? "Item updated (parsed response failed)" : "Item added (parsed response failed)", "success");
        // refresh list to be safe
        await loadItems();
        resetItemForm();
        return;
      }

      if (!data || !data.success) {
        // backend returned a structured error
        notify((data && data.message) || "Save failed", "error");
        return;
      }

      // success
      notify(editingId ? "Item updated" : "Item added", "success");
      if (editingId) setItems((p) => p.map((it) => (it._id === data.item._id ? data.item : it)));
      else setItems((p) => [data.item, ...p]);

      resetItemForm();
    } catch (err) {
      console.error("saveItem error:", err);
      notify("Network error while saving item", "error");
    } finally {
      setSavingItem(false);
    }
  }

  async function deleteItem(id) {
    if (!confirm("Delete this item?")) return;
    try {
      const res = await fetch(`${mainUri}/api/items/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) notify(data.message || "Delete failed", "error");
      else {
        notify("Deleted", "success");
        setItems((p) => p.filter((it) => it._id !== id));
      }
    } catch (err) {
      console.error(err);
      notify("Network error while deleting", "error");
    }
  }

  // ---------- Hostel Settings (hostel-wide) ----------
  async function loadSettings() {
    setLoadingSettings(true);
    try {
      const res = await fetch(`${mainUri}/api/hostel-settings?hostelNo=${encodeURIComponent(hostelNo)}`);
      const data = await res.json();
      if (!data.success) notify(data.message || "Failed to load settings", "error");
      else {
        setSettings({
          rebate: data.settings?.rebate ?? 0,
          diet: data.settings?.diet ?? 0,
          isTodayMessOff: !!data.settings?.isTodayMessOff,
        });
      }
    } catch (err) {
      console.error(err);
      notify("Network error while loading settings", "error");
    } finally {
      setLoadingSettings(false);
    }
  }

  async function saveSettings(updates) {
    if (savingSettings) return;
    setSavingSettings(true);
    try {
      const res = await fetch(`${mainUri}/api/hostel-settings/${encodeURIComponent(hostelNo)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) {
        let errMsg = `Request failed (${res.status})`;
        try {
          const errBody = await res.json();
          errMsg = errBody?.message || JSON.stringify(errBody);
        } catch {}
        notify(errMsg, "error");
        return;
      }
      const data = await res.json();
      if (!data.success) notify(data.message || "Failed to save settings", "error");
      else {
        notify("Settings updated", "success");
        setSettings({
          rebate: data.settings.rebate ?? settings.rebate,
          diet: data.settings.diet ?? settings.diet,
          isTodayMessOff: !!data.settings.isTodayMessOff,
        });
      }
    } catch (err) {
      console.error(err);
      notify("Network error while saving settings", "error");
    } finally {
      setSavingSettings(false);
    }
  }

  // ---------- Render ----------
  return (
    <div className="max-w-4xl mx-auto p-4 mt-20">
      <ToastContainer />

      {/* Hostel settings area */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-lg font-semibold mb-3">Hostel Settings</h2>

        {/* Rebate */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end mb-3">
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Rebate (Rs.)</label>
            <input
              type="number"
              min="0"
              value={settings.rebate}
              onChange={(e) => setSettings((s) => ({ ...s, rebate: Number(e.target.value) }))}
              className="w-full border rounded px-3 py-2"
              disabled={loadingSettings}
            />
          </div>
          <div>
            <button
              onClick={() => saveSettings({ rebate: Number(settings.rebate || 0) })}
              disabled={savingSettings}
              className={`w-full sm:w-auto px-4 py-2 rounded text-white ${savingSettings ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
            >
              {savingSettings ? "Saving..." : "Save Rebate"}
            </button>
          </div>
        </div>

        {/* Diet */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end mb-3">
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Diet (Rs.)</label>
            <input
              type="number"
              min="0"
              value={settings.diet}
              onChange={(e) => setSettings((s) => ({ ...s, diet: Number(e.target.value) }))}
              className="w-full border rounded px-3 py-2"
              disabled={loadingSettings}
            />
          </div>
          <div>
            <button
              onClick={() => saveSettings({ diet: Number(settings.diet || 0) })}
              disabled={savingSettings}
              className={`w-full sm:w-auto px-4 py-2 rounded text-white ${savingSettings ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
            >
              {savingSettings ? "Saving..." : "Save Diet"}
            </button>
          </div>
        </div>

        {/* IsTodayMessOff */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">IsTodayMessOff</label>
            <select
              value={settings.isTodayMessOff ? "true" : "false"}
              onChange={(e) => setSettings((s) => ({ ...s, isTodayMessOff: e.target.value === "true" }))}
              className="w-full border rounded px-3 py-2"
              disabled={loadingSettings}
            >
              <option value="false">false</option>
              <option value="true">true</option>
            </select>
          </div>
          <div>
            <button
              onClick={() => saveSettings({ isTodayMessOff: settings.isTodayMessOff })}
              disabled={savingSettings}
              className={`w-full sm:w-auto px-4 py-2 rounded text-white ${savingSettings ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
            >
              {savingSettings ? "Saving..." : "Save MessOff"}
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Item form */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="text-md font-medium mb-3">{editingId ? "Edit Item" : "Add Item"}</h3>
        <form onSubmit={saveItem} className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input value={itemForm.name} onChange={(e) => setItemForm((f) => ({ ...f, name: e.target.value }))} className="w-full border rounded px-3 py-2" placeholder="e.g. Milk" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Price (Rs.)</label>
            <input type="number" min="0" value={itemForm.price} onChange={(e) => setItemForm((f) => ({ ...f, price: e.target.value }))} className="w-full border rounded px-3 py-2" placeholder="e.g. 20" />
          </div>
          <div className="sm:col-span-2 flex flex-col sm:flex-row gap-2 mt-2">
            <button type="submit" disabled={savingItem} className={`w-full sm:w-auto px-4 py-2 rounded font-semibold text-white ${savingItem ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}>{savingItem ? "Saving..." : (editingId ? "Update Item" : "Add Item")}</button>
            <button type="button" onClick={resetItemForm} className="w-full sm:w-auto px-4 py-2 border rounded-md">Reset</button>
            <button type="button" onClick={loadItems} className="w-full sm:w-auto px-4 py-2 border rounded-md">Refresh</button>
          </div>
        </form>
      </div>

      {/* Items list (only name + price) */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-md font-medium mb-3">Items </h3>

        {loadingItems ? <div>Loading...</div> : items.length === 0 ? <div className="text-sm text-gray-500">No items yet for this hostel.</div> : (
          <div className="space-y-3">
            {items.map((it) => (
              <div key={it._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border rounded p-3">
                <div>
                  <div className="text-sm font-semibold">{it.name} — Rs. {it.price}</div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0">
                  <button onClick={() => startEditItem(it)} className="w-full sm:w-auto px-4 py-2 text-sm border rounded">Edit</button>
                  <button onClick={() => deleteItem(it._id)} className="w-full sm:w-auto px-4 py-2 text-sm border rounded text-red-600">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
