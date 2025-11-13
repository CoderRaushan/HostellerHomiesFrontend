// // // // // // ButlerBillTable.jsx
// // // // // import React, { useEffect, useMemo, useState } from "react";

// // // // // function monthOptions(lastN = 12) {
// // // // //   const out = [];
// // // // //   const now = new Date();
// // // // //   for (let i = 0; i < lastN; i++) {
// // // // //     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
// // // // //     out.push({ label: d.toLocaleString("default", { month: "long", year: "numeric" }), month: d.getMonth() + 1, year: d.getFullYear() });
// // // // //   }
// // // // //   return out;
// // // // // }

// // // // // export default function ButlerBillTable() {
// // // // //   const mainUri = import.meta.env.VITE_MAIN_URI;
// // // // //   const [rows, setRows] = useState([]);
// // // // //   const [daysInMonth, setDaysInMonth] = useState(31);
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
// // // // //   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
// // // // //   const [hostelNo, setHostelNo] = useState("");
// // // // //   const token = localStorage.getItem("token");

// // // // //   useEffect(() => {
// // // // //     const butler = (() => {
// // // // //       try { return JSON.parse(localStorage.getItem("Butler") || "null"); } catch { return null; }
// // // // //     })();
// // // // //     if (butler?.hostelNo) setHostelNo(butler.hostelNo);
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     if (!hostelNo) return;
// // // // //     fetchData();
// // // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // // //   }, [hostelNo, selectedMonth, selectedYear]);

// // // // //   const fetchData = async () => {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const res = await fetch(`${mainUri}/api/bill/hostel`, {
// // // // //         method: "POST",
// // // // //         headers: {
// // // // //           "Content-Type": "application/json",
// // // // //           ...(token ? { Authorization: `Bearer ${token}` } : {})
// // // // //         },
// // // // //         body: JSON.stringify({ hostelNo, month: selectedMonth, year: selectedYear })
// // // // //       });
// // // // //       const data = await res.json();
// // // // //       if (!data.success) {
// // // // //         alert(data.message || "Failed to fetch");
// // // // //         setRows([]);
// // // // //         setLoading(false);
// // // // //         return;
// // // // //       }
// // // // //       setRows(data.rows || []);
// // // // //       setDaysInMonth(data.daysInMonth || 31);
// // // // //     } catch (err) {
// // // // //       console.error(err);
// // // // //       alert("Network error");
// // // // //       setRows([]);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   // CSV export for the whole table
// // // // //   const exportCSV = () => {
// // // // //     if (!rows || rows.length === 0) {
// // // // //       alert("No data");
// // // // //       return;
// // // // //     }
// // // // //     const header = ["Name", "AccountNo", ...Array.from({length: daysInMonth}, (_, i) => `Day ${i+1}`), "GuestsAmt", "Rebate", "ClosedDays", "Total"];
// // // // //     const lines = [header.join(",")];
// // // // //     for (const r of rows) {
// // // // //       const dayCols = (r.days || []).map(d => {
// // // // //         if (!d) return "";
// // // // //         // show items names & price; if closed show 'Closed; Rebate (Rs X)'
// // // // //         if (d.isClosed) {
// // // // //           const rebateItems = (d.items || []).filter(it => String(it.name||"").toLowerCase()==="rebate");
// // // // //           const rebateText = rebateItems.length ? `Rebate:${rebateItems.map(it => it.price).join(";")}` : "";
// // // // //           return `"Closed ${rebateText}"`;
// // // // //         }
// // // // //         // otherwise show items (name:price) and diet
// // // // //         const itemsText = (d.items || []).map(it => `${it.name}:${it.price}`).join(";");
// // // // //         const dietText = d.diet ? `${d.diet.name}:${d.diet.price}` : "";
// // // // //         const combined = [dietText, itemsText].filter(Boolean).join(" | ");
// // // // //         return `"${combined}"`;
// // // // //       });

// // // // //       const row = [
// // // // //         `"${(r.name||"").replace(/"/g,'""')}"`,
// // // // //         `"${(r.accountNumber||"")}"`,
// // // // //         ...dayCols,
// // // // //         r.totals?.guestsTotal || 0,
// // // // //         r.totals?.rebateTotal || 0,
// // // // //         r.totals?.closedDays || 0,
// // // // //         r.totals?.total || 0
// // // // //       ];
// // // // //       lines.push(row.join(","));
// // // // //     }

// // // // //     const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
// // // // //     const url = URL.createObjectURL(blob);
// // // // //     const a = document.createElement("a");
// // // // //     a.href = url;
// // // // //     a.download = `hostel-${hostelNo}-${selectedYear}-${String(selectedMonth).padStart(2,"0")}.csv`;
// // // // //     document.body.appendChild(a);
// // // // //     a.click();
// // // // //     a.remove();
// // // // //     URL.revokeObjectURL(url);
// // // // //   };

// // // // //   return (
// // // // //     <div className="p-4">
// // // // //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
// // // // //         <div className="flex items-center gap-2">
// // // // //           <label className="text-sm">Hostel:</label>
// // // // //           <input value={hostelNo} onChange={(e)=> setHostelNo(e.target.value)} className="border px-2 py-1 rounded" />
// // // // //         </div>

// // // // //         <div className="flex items-center gap-2">
// // // // //           <select value={selectedMonth} onChange={(e)=> setSelectedMonth(Number(e.target.value))} className="border px-2 py-1 rounded">
// // // // //             {monthOptions(24).map(opt => <option key={`${opt.month}-${opt.year}`} value={opt.month}>{opt.label}</option>)}
// // // // //           </select>
// // // // //           <input type="number" value={selectedYear} onChange={(e)=> setSelectedYear(Number(e.target.value))} className="w-24 border px-2 py-1 rounded" />
// // // // //           <button onClick={fetchData} className="bg-blue-600 text-white px-3 py-1 rounded">Refresh</button>
// // // // //           <button onClick={exportCSV} className="bg-green-600 text-white px-3 py-1 rounded">Export CSV</button>
// // // // //         </div>
// // // // //       </div>

// // // // //       {loading ? (<div>Loading...</div>) : (
// // // // //         <div className="overflow-auto border rounded shadow-sm">
// // // // //           <table className="min-w-max w-full table-auto border-collapse">
// // // // //             <thead>
// // // // //               <tr className="bg-gray-100 sticky top-0">
// // // // //                 <th className="p-2 border">Name</th>
// // // // //                 <th className="p-2 border">Ac No</th>
// // // // //                 {Array.from({length: daysInMonth}, (_, i) => (
// // // // //                   <th key={i} className="p-1 border text-xs">{i+1}</th>
// // // // //                 ))}
// // // // //                 <th className="p-2 border">Guests Amt</th>
// // // // //                 <th className="p-2 border">Rebate</th>
// // // // //                 <th className="p-2 border">Closed Days</th>
// // // // //                 <th className="p-2 border">Total</th>
// // // // //               </tr>
// // // // //             </thead>
// // // // //             <tbody>
// // // // //               {rows.length === 0 ? (
// // // // //                 <tr><td colSpan={3 + daysInMonth} className="p-3 text-center">No records</td></tr>
// // // // //               ) : rows.map((r) => (
// // // // //                 <tr key={r.studentId} className="hover:bg-gray-50">
// // // // //                   <td className="p-2 border">{r.name}</td>
// // // // //                   <td className="p-2 border">{r.accountNumber}</td>
// // // // //                   {(r.days || Array.from({length: daysInMonth})).map((d, idx) => (
// // // // //                     <td key={idx} className={`p-1 border align-top text-xs ${d && d.isClosed ? 'bg-red-50' : ''}`}>
// // // // //                       {d ? (
// // // // //                         <>
// // // // //                           {d.isClosed ? (
// // // // //                             <div>
// // // // //                               <div className="text-red-600 font-semibold">Closed</div>
// // // // //                               {(d.items || []).map((it,ii) => <div key={ii} className="text-xs">• {it.name} (Rs {it.price})</div>)}
// // // // //                             </div>
// // // // //                           ) : (
// // // // //                             <div>
// // // // //                               {d.diet ? <div className="text-xs">Diet: Rs {d.diet.price}</div> : null}
// // // // //                               {(d.items || []).length ? (
// // // // //                                 <div className="text-xs">
// // // // //                                   {(d.items||[]).map((it,ii) => <div key={ii}>• {it.name}: Rs {it.price}</div>)}
// // // // //                                 </div>
// // // // //                               ) : null}
// // // // //                             </div>
// // // // //                           )}
// // // // //                         </>
// // // // //                       ) : <div className="text-xs text-gray-400">-</div>}
// // // // //                     </td>
// // // // //                   ))}
// // // // //                   <td className="p-2 border text-right">Rs. {r.totals?.guestsTotal || 0}</td>
// // // // //                   <td className="p-2 border text-right">Rs. {r.totals?.rebateTotal || 0}</td>
// // // // //                   <td className="p-2 border text-center">{r.totals?.closedDays || 0}</td>
// // // // //                   <td className="p-2 border text-right font-semibold">Rs. {r.totals?.total || 0}</td>
// // // // //                 </tr>
// // // // //               ))}
// // // // //             </tbody>
// // // // //           </table>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // // ButlerBillTable.jsx

// // // // import React, { useEffect, useState } from "react";

// // // // /**
// // // //  * Styled Butler bill table for butler to view per-student monthly bill matrix
// // // //  * - Expects VITE_MAIN_URI set
// // // //  * - Reads Butler from localStorage (hostelNo)
// // // //  * - Sends token in Authorization header if present
// // // //  */

// // // // function monthOptions(lastN = 24) {
// // // //   const out = [];
// // // //   const now = new Date();
// // // //   for (let i = 0; i < lastN; i++) {
// // // //     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
// // // //     out.push({ label: d.toLocaleString("default", { month: "long", year: "numeric" }), month: d.getMonth() + 1, year: d.getFullYear() });
// // // //   }
// // // //   return out;
// // // // }

// // // // export default function ButlerBillTable() {
// // // //   const mainUri = import.meta.env.VITE_MAIN_URI;
// // // //   const [rows, setRows] = useState([]);
// // // //   const [daysInMonth, setDaysInMonth] = useState(31);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
// // // //   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
// // // //   const [hostelNo, setHostelNo] = useState("");
// // // //   const token = localStorage.getItem("token");

// // // //   useEffect(() => {
// // // //     const butler = (() => {
// // // //       try { return JSON.parse(localStorage.getItem("Butler") || "null"); } catch { return null; }
// // // //     })();
// // // //     if (butler?.hostelNo) setHostelNo(butler.hostelNo);
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     if (!hostelNo) return;
// // // //     fetchData();
// // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // //   }, [hostelNo, selectedMonth, selectedYear]);

// // // //   const fetchData = async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const res = await fetch(`${mainUri}/api/bill/hostel`, {
// // // //         method: "POST",
// // // //         headers: {
// // // //           "Content-Type": "application/json",
// // // //           ...(token ? { Authorization: `Bearer ${token}` } : {})
// // // //         },
// // // //         body: JSON.stringify({ hostelNo, month: selectedMonth, year: selectedYear })
// // // //       });
// // // //       const data = await res.json();
// // // //       if (!data.success) {
// // // //         setRows([]);
// // // //         setDaysInMonth(31);
// // // //         console.error(data.message || "Failed to fetch");
// // // //         setLoading(false);
// // // //         return;
// // // //       }
// // // //       setRows(data.rows || []);
// // // //       setDaysInMonth(data.daysInMonth || 31);
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       setRows([]);
// // // //       setDaysInMonth(31);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const exportCSV = () => {
// // // //     if (!rows || rows.length === 0) {
// // // //       alert("No data to export");
// // // //       return;
// // // //     }
// // // //     const header = ["Name", "AccountNo", ...Array.from({length: daysInMonth}, (_, i) => `Day ${i+1}`), "GuestsAmt", "Rebate", "ClosedDays", "Total"];
// // // //     const lines = [header.join(",")];
// // // //     for (const r of rows) {
// // // //       const dayCols = (r.days || []).map(d => {
// // // //         if (!d) return "";
// // // //         if (d.isClosed) {
// // // //           const rebateItems = (d.items || []).filter(it => String(it.name||"").toLowerCase()==="rebate");
// // // //           const rebateText = rebateItems.length ? `Rebate:${rebateItems.map(it => it.price).join(";")}` : "";
// // // //           return `Closed ${rebateText}`;
// // // //         }
// // // //         const itemsText = (d.items || []).map(it => `${it.name}:${it.price}`).join(";");
// // // //         const dietText = d.diet ? `${d.diet.name}:${d.diet.price}` : "";
// // // //         const combined = [dietText, itemsText].filter(Boolean).join(" | ");
// // // //         // escape quotes
// // // //         return `"${(combined||"").replace(/"/g,'""')}"`;
// // // //       });

// // // //       const row = [
// // // //         `"${(r.name||"").replace(/"/g,'""')}"`,
// // // //         `"${(r.accountNumber||"")}"`,
// // // //         ...dayCols,
// // // //         r.totals?.guestsTotal || 0,
// // // //         r.totals?.rebateTotal || 0,
// // // //         r.totals?.closedDays || 0,
// // // //         r.totals?.total || 0
// // // //       ];
// // // //       lines.push(row.join(","));
// // // //     }

// // // //     const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
// // // //     const url = URL.createObjectURL(blob);
// // // //     const a = document.createElement("a");
// // // //     a.href = url;
// // // //     a.download = `hostel-${hostelNo || "hostel"}-${selectedYear}-${String(selectedMonth).padStart(2,"0")}.csv`;
// // // //     document.body.appendChild(a);
// // // //     a.click();
// // // //     a.remove();
// // // //     URL.revokeObjectURL(url);
// // // //   };

// // // //   // Small loading spinner
// // // //   const Spinner = ({size=18}) => (
// // // //     <svg className="animate-spin" width={size} height={size} viewBox="0 0 24 24">
// // // //       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
// // // //       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
// // // //     </svg>
// // // //   );

// // // //   return (
// // // //     <div className="p-6">
// // // //       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
// // // //         <div className="flex items-center gap-3">
// // // //           <h2 className="text-xl font-bold text-slate-800">Bill Table</h2>
// // // //           <div className="text-sm text-slate-500">Hostel: <span className="font-medium text-slate-700">{hostelNo || "—"}</span></div>
// // // //         </div>

// // // //         <div className="flex items-center gap-2">
// // // //           <select
// // // //             value={selectedMonth}
// // // //             onChange={(e)=> setSelectedMonth(Number(e.target.value))}
// // // //             className="px-3 py-2 border rounded shadow-sm bg-white text-sm"
// // // //             aria-label="Month"
// // // //           >
// // // //             {monthOptions(24).map(opt => <option key={`${opt.month}-${opt.year}`} value={opt.month}>{opt.label}</option>)}
// // // //           </select>

// // // //           <input
// // // //             type="number"
// // // //             value={selectedYear}
// // // //             onChange={(e)=> setSelectedYear(Number(e.target.value))}
// // // //             className="w-24 px-3 py-2 border rounded shadow-sm text-sm"
// // // //             min={2000}
// // // //             max={2100}
// // // //             aria-label="Year"
// // // //           />

// // // //           <button
// // // //             onClick={fetchData}
// // // //             className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 shadow"
// // // //             aria-label="Refresh"
// // // //           >
// // // //             {loading ? <Spinner size={16} /> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 12a9 9 0 10-9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
// // // //             <span className="text-sm">Refresh</span>
// // // //           </button>

// // // //           <button
// // // //             onClick={exportCSV}
// // // //             className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 shadow"
// // // //             aria-label="Export CSV"
// // // //           >
// // // //             <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
// // // //             <span className="text-sm">Export CSV</span>
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       {/* card */}
// // // //       <div className="bg-white border rounded-lg shadow-sm overflow-hidden ml-[50px]">
// // // //         {/* table scroll wrapper */}
// // // //         <div className="overflow-auto" style={{ maxHeight: "68vh" }}>
// // // //           <table className="min-w-max w-full table-auto border-collapse">
// // // //             <thead className="bg-slate-50 sticky top-0 z-20">
// // // //               <tr>
// // // //                 <th className="p-3 text-left border-r border-b w-[220px] sticky left-0 bg-slate-50 z-30">Name</th>
// // // //                 <th className="p-3 text-left border-r border-b w-[110px] sticky left-[220px] bg-slate-50 z-30">Ac No</th>

// // // //                 {Array.from({length: daysInMonth}, (_, i) => (
// // // //                   <th key={i} className="p-2 border-b text-center text-xs sticky top-0">{i+1}</th>
// // // //                 ))}

// // // //                 <th className="p-3 text-right border-l border-b w-[120px]">Guests</th>
// // // //                 <th className="p-3 text-right border-l border-b w-[120px]">Rebate</th>
// // // //                 <th className="p-3 text-center border-l border-b w-[120px]">Days <br /> Meals <br /> Closed</th>
// // // //                 <th className="p-3 text-right border-l border-b w-[130px]">Total</th>
// // // //               </tr>
// // // //             </thead>

// // // //             <tbody>
// // // //               {rows.length === 0 && !loading && (
// // // //                 <tr><td colSpan={4 + daysInMonth} className="p-6 text-center text-slate-500">No records for selected month/year.</td></tr>
// // // //               )}

// // // //               {loading && (
// // // //                 <tr>
// // // //                   <td colSpan={4 + daysInMonth} className="p-6 text-center">
// // // //                     <div className="flex items-center justify-center gap-3 text-slate-600">
// // // //                       <Spinner /> Loading...
// // // //                     </div>
// // // //                   </td>
// // // //                 </tr>
// // // //               )}

// // // //               {rows.map((r, ridx) => (
// // // //                 <tr key={r.studentId} className={`odd:bg-white even:bg-slate-50 hover:bg-slate-100`}>
// // // //                   {/* sticky left columns */}
// // // //                   <td className="p-2 border-r align-top sticky left-0 bg-white z-10" style={{ minWidth: 220 }}>
// // // //                     <div className="font-medium text-slate-800 text-sm">{r.name}</div>
// // // //                   </td>

// // // //                   <td className="p-2 border-r align-top sticky left-[220px] bg-white z-10" style={{ minWidth: 110 }}>
// // // //                     <div className="text-sm text-slate-700">{r.accountNumber || "—"}</div>
// // // //                     <div className="text-xs text-slate-400 mt-1">{r.urn || ""}</div>
// // // //                   </td>

// // // //                   {(r.days || Array.from({length: daysInMonth}).map(()=>null)).map((d, idx) => {
// // // //                     const cellKey = `${r.studentId}-${idx}`;
// // // //                     if (!d) {
// // // //                       return <td key={cellKey} className="p-1 border text-xs text-center text-slate-400">-</td>;
// // // //                     }

// // // //                     // cell content: closed vs open
// // // //                     if (d.isClosed) {
// // // //                       return (
// // // //                         <td key={cellKey} title={`Closed on ${d.date}`} className="p-2 border text-xs bg-red-50 text-red-700 align-top">
// // // //                           <div className="font-semibold">Closed</div>
// // // //                           {(d.items || []).length > 0 && (
// // // //                             <div className="mt-1 text-[11px] text-slate-700">
// // // //                               {d.items.map((it,i) => <div key={i}>• {it.name}: Rs {it.price}</div>)}
// // // //                             </div>
// // // //                           )}
// // // //                         </td>
// // // //                       );
// // // //                     }

// // // //                     return (
// // // //                       <td key={cellKey} title={`Day ${d.date}`} className="p-2 border text-xs align-top">
// // // //                         {d.diet ? <div className="text-[12px] text-slate-700">Diet<br /> {d.diet.price}</div> : <div className="text-[12px] text-slate-400">No diet</div>}
// // // //                         {(d.items || []).length > 0 && (
// // // //                           <div className="mt-1 text-[11px] text-slate-700">
// // // //                             {d.items.map((it,i) => <div key={i}>• {it.name}: Rs {it.price}</div>)}
// // // //                           </div>
// // // //                         )}
// // // //                       </td>
// // // //                     );
// // // //                   })}

// // // //                   <td className="p-2 border text-right text-sm font-semibold">Rs. {r.totals?.guestsTotal || 0}</td>
// // // //                   <td className="p-2 border text-right text-sm font-semibold">Rs. {r.totals?.rebateTotal || 0}</td>
// // // //                   <td className="p-2 border text-center">{r.totals?.closedDays || 0}</td>
// // // //                   <td className="p-2 border text-right font-bold bg-slate-50">Rs. {r.totals?.total || 0}</td>
// // // //                 </tr>
// // // //               ))}
// // // //             </tbody>
// // // //           </table>
// // // //         </div>
// // // //       </div>

// // // //       {/* mobile accessible stacked cards for very small screens */}
// // // //       <div className="md:hidden mt-4">
// // // //         {rows.map(r => (
// // // //           <div key={"m-"+r.studentId} className="bg-white border rounded-lg p-3 mb-3 shadow">
// // // //             <div className="flex items-center justify-between">
// // // //               <div>
// // // //                 <div className="font-semibold">{r.name}</div>
// // // //                 <div className="text-xs text-slate-500">Ac: {r.accountNumber} • Room: {r.room_no}</div>
// // // //               </div>
// // // //               <div className="text-right">
// // // //                 <div className="text-sm font-bold">Rs. {r.totals?.total || 0}</div>
// // // //                 <div className="text-xs text-slate-400">Closed: {r.totals?.closedDays || 0}</div>
// // // //               </div>
// // // //             </div>

// // // //             <div className="mt-3 text-xs text-slate-700">
// // // //               {Array.from({length: daysInMonth}, (_, i) => {
// // // //                 const d = (r.days || [])[i];
// // // //                 if (!d) return null;
// // // //                 return (
// // // //                   <div key={i} className="mb-1">
// // // //                     <span className="font-medium">Day {d.date}:</span>{" "}
// // // //                     {d.isClosed ? `Closed (${(d.items||[]).map(it=>it.name+':'+it.price).join(',')})` : `${d.diet ? 'Diet Rs '+d.diet.price : 'No diet'} ${d.items && d.items.length ? '| '+d.items.map(it=>it.name+':'+it.price).join(', ') : ''}`}
// // // //                   </div>
// // // //                 );
// // // //               })}
// // // //             </div>
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // // ButlerBillTable.jsx
// // // import React, { useEffect, useState } from "react";

// // // /**
// // //  * Styled Butler bill table for butler to view per-student monthly bill matrix
// // //  * - Expects VITE_MAIN_URI set
// // //  * - Reads Butler from localStorage (hostelNo)
// // //  * - Sends token in Authorization header if present
// // //  *
// // //  * Updated: day cell shows only items sum (excluding rebate). If no items -> blank cell ("-").
// // //  */

// // // function monthOptions(lastN = 24) {
// // //   const out = [];
// // //   const now = new Date();
// // //   for (let i = 0; i < lastN; i++) {
// // //     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
// // //     out.push({ label: d.toLocaleString("default", { month: "long", year: "numeric" }), month: d.getMonth() + 1, year: d.getFullYear() });
// // //   }
// // //   return out;
// // // }

// // // export default function ButlerBillTable() {
// // //   const mainUri = import.meta.env.VITE_MAIN_URI;
// // //   const [rows, setRows] = useState([]);
// // //   const [daysInMonth, setDaysInMonth] = useState(31);
// // //   const [loading, setLoading] = useState(false);
// // //   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
// // //   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
// // //   const [hostelNo, setHostelNo] = useState("");
// // //   const token = localStorage.getItem("token");

// // //   useEffect(() => {
// // //     const butler = (() => {
// // //       try { return JSON.parse(localStorage.getItem("Butler") || "null"); } catch { return null; }
// // //     })();
// // //     if (butler?.hostelNo) setHostelNo(butler.hostelNo);
// // //   }, []);

// // //   useEffect(() => {
// // //     if (!hostelNo) return;
// // //     fetchData();
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [hostelNo, selectedMonth, selectedYear]);

// // //   const fetchData = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const res = await fetch(`${mainUri}/api/bill/hostel`, {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //           ...(token ? { Authorization: `Bearer ${token}` } : {})
// // //         },
// // //         body: JSON.stringify({ hostelNo, month: selectedMonth, year: selectedYear })
// // //       });
// // //       const data = await res.json();
// // //       if (!data.success) {
// // //         setRows([]);
// // //         setDaysInMonth(31);
// // //         console.error(data.message || "Failed to fetch");
// // //         setLoading(false);
// // //         return;
// // //       }
// // //       setRows(data.rows || []);
// // //       setDaysInMonth(data.daysInMonth || 31);
// // //     } catch (err) {
// // //       console.error(err);
// // //       setRows([]);
// // //       setDaysInMonth(31);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const exportCSV = () => {
// // //     if (!rows || rows.length === 0) {
// // //       alert("No data to export");
// // //       return;
// // //     }
// // //     const header = ["Name", "AccountNo", ...Array.from({length: daysInMonth}, (_, i) => `Day ${i+1}`), "GuestsAmt", "Rebate", "ClosedDays", "Total"];
// // //     const lines = [header.join(",")];
// // //     for (const r of rows) {
// // //       const dayCols = (r.days || []).map(d => {
// // //         if (!d) return "";
// // //         if (d.isClosed) {
// // //           // closed cell: put "Closed" optionally include rebate
// // //           const rebateTotal = (d.items || []).reduce((acc,it) => acc + ((String(it.name||"").toLowerCase()==="rebate") ? Number(it.price||0) : 0), 0);
// // //           const rebateText = rebateTotal ? `Rebate:${rebateTotal}` : "";
// // //           return `"Closed ${rebateText}"`;
// // //         }
// // //         // compute items sum excluding rebate
// // //         const itemsSum = (d.items || []).reduce((acc, it) => {
// // //           return acc + ((String(it.name||"").toLowerCase() === "rebate") ? 0 : Number(it.price || 0));
// // //         }, 0);
// // //         return itemsSum ? `${itemsSum}` : "";
// // //       });

// // //       const row = [
// // //         `"${(r.name||"").replace(/"/g,'""')}"`,
// // //         `"${(r.accountNumber||"")}"`,
// // //         ...dayCols,
// // //         r.totals?.guestsTotal || 0,
// // //         r.totals?.rebateTotal || 0,
// // //         r.totals?.closedDays || 0,
// // //         r.totals?.total || 0
// // //       ];
// // //       lines.push(row.join(","));
// // //     }

// // //     const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
// // //     const url = URL.createObjectURL(blob);
// // //     const a = document.createElement("a");
// // //     a.href = url;
// // //     a.download = `hostel-${hostelNo || "hostel"}-${selectedYear}-${String(selectedMonth).padStart(2,"0")}.csv`;
// // //     document.body.appendChild(a);
// // //     a.click();
// // //     a.remove();
// // //     URL.revokeObjectURL(url);
// // //   };

// // //   // Small loading spinner
// // //   const Spinner = ({size=18}) => (
// // //     <svg className="animate-spin" width={size} height={size} viewBox="0 0 24 24">
// // //       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
// // //       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
// // //     </svg>
// // //   );

// // //   return (
// // //     <div className="p-6">
// // //       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
// // //         <div className="flex items-center gap-3">
// // //           <h2 className="text-xl font-bold text-slate-800">Bill Table</h2>
// // //           <div className="text-sm text-slate-500">Hostel: <span className="font-medium text-slate-700">{hostelNo || "—"}</span></div>
// // //         </div>

// // //         <div className="flex items-center gap-2">
// // //           <select
// // //             value={selectedMonth}
// // //             onChange={(e)=> setSelectedMonth(Number(e.target.value))}
// // //             className="px-3 py-2 border rounded shadow-sm bg-white text-sm"
// // //             aria-label="Month"
// // //           >
// // //             {monthOptions(24).map(opt => <option key={`${opt.month}-${opt.year}`} value={opt.month}>{opt.label}</option>)}
// // //           </select>

// // //           <input
// // //             type="number"
// // //             value={selectedYear}
// // //             onChange={(e)=> setSelectedYear(Number(e.target.value))}
// // //             className="w-24 px-3 py-2 border rounded shadow-sm text-sm"
// // //             min={2000}
// // //             max={2100}
// // //             aria-label="Year"
// // //           />

// // //           <button
// // //             onClick={fetchData}
// // //             className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 shadow"
// // //             aria-label="Refresh"
// // //           >
// // //             {loading ? <Spinner size={16} /> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 12a9 9 0 10-9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
// // //             <span className="text-sm">Refresh</span>
// // //           </button>

// // //           <button
// // //             onClick={exportCSV}
// // //             className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 shadow"
// // //             aria-label="Export CSV"
// // //           >
// // //             <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
// // //             <span className="text-sm">Export CSV</span>
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* card */}
// // //       <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
// // //         {/* table scroll wrapper */}
// // //         <div className="overflow-auto" style={{ maxHeight: "68vh" }}>
// // //           <table className="min-w-max w-full table-auto border-collapse">
// // //             <thead className="bg-slate-50 sticky top-0 z-20">
// // //               <tr>
// // //                 <th className="p-3 text-left border-r border-b w-[220px] sticky left-0 bg-slate-50 z-30">Name</th>
// // //                 <th className="p-3 text-left border-r border-b w-[110px] sticky left-[220px] bg-slate-50 z-30">Ac No</th>

// // //                 {Array.from({length: daysInMonth}, (_, i) => (
// // //                   <th key={i} className="p-2 border-b text-center text-xs sticky top-0">{i+1}</th>
// // //                 ))}

// // //                 <th className="p-3 text-right border-l border-b w-[120px]">Guests</th>
// // //                 <th className="p-3 text-right border-l border-b w-[120px]">Rebate</th>
// // //                 <th className="p-3 text-center border-l border-b w-[120px]">Days <br /> Meals <br /> Closed</th>
// // //                 <th className="p-3 text-right border-l border-b w-[130px]">Total</th>
// // //               </tr>
// // //             </thead>

// // //             <tbody>
// // //               {rows.length === 0 && !loading && (
// // //                 <tr><td colSpan={4 + daysInMonth} className="p-6 text-center text-slate-500">No records for selected month/year.</td></tr>
// // //               )}

// // //               {loading && (
// // //                 <tr>
// // //                   <td colSpan={4 + daysInMonth} className="p-6 text-center">
// // //                     <div className="flex items-center justify-center gap-3 text-slate-600">
// // //                       <Spinner /> Loading...
// // //                     </div>
// // //                   </td>
// // //                 </tr>
// // //               )}

// // //               {rows.map((r, ridx) => (
// // //                 <tr key={r.studentId} className={`odd:bg-white even:bg-slate-50 hover:bg-slate-100`}>
// // //                   {/* sticky left columns */}
// // //                   <td className="p-2 border-r align-top sticky left-0 bg-white z-10" style={{ minWidth: 220 }}>
// // //                     <div className="font-medium text-slate-800 text-sm">{r.name}</div>
// // //                   </td>

// // //                   <td className="p-2 border-r align-top sticky left-[220px] bg-white z-10" style={{ minWidth: 110 }}>
// // //                     <div className="text-sm text-slate-700">{r.accountNumber || "—"}</div>
// // //                     <div className="text-xs text-slate-400 mt-1">{r.urn || ""}</div>
// // //                   </td>

// // //                   {(r.days || Array.from({length: daysInMonth}).map(()=>null)).map((d, idx) => {
// // //                     const cellKey = `${r.studentId}-${idx}`;
// // //                     if (!d) {
// // //                       return <td key={cellKey} className="p-1 border text-xs text-center text-slate-400">-</td>;
// // //                     }

// // //                     // if closed -> show Closed + rebate items (if any)
// // //                     if (d.isClosed) {
// // //                       const rebateTotal = (d.items || []).reduce((acc,it) => acc + ((String(it.name||"").toLowerCase()==="rebate") ? Number(it.price||0) : 0), 0);
// // //                       return (
// // //                         <td key={cellKey} title={`Closed on ${d.date}`} className="p-2 border text-xs bg-red-50 text-red-700 align-top">
// // //                           <div className="font-semibold">Closed</div>
// // //                           {rebateTotal ? <div className="mt-1 text-[11px] text-slate-700">• Rebate (Rs. {rebateTotal})</div> : null}
// // //                         </td>
// // //                       );
// // //                     }

// // //                     // NOT closed: show items sum excluding rebate. If no items -> leave empty ("-")
// // //                     const itemsSum = (d.items || []).reduce((acc, it) => {
// // //                       return acc + ((String(it.name||"").toLowerCase() === "rebate") ? 0 : Number(it.price || 0));
// // //                     }, 0);

// // //                     return (
// // //                       <td key={cellKey} title={itemsSum ? `Items total: Rs ${itemsSum}` : ""} className="p-2 border text-xs align-top text-center">
// // //                         {itemsSum ? <div className="text-[12px] text-slate-700 font-medium">Rs. {itemsSum}</div> : <div className="text-[12px] text-slate-400">-</div>}
// // //                       </td>
// // //                     );
// // //                   })}

// // //                   <td className="p-2 border text-right text-sm font-semibold">Rs. {r.totals?.guestsTotal || 0}</td>
// // //                   <td className="p-2 border text-right text-sm font-semibold">Rs. {r.totals?.rebateTotal || 0}</td>
// // //                   <td className="p-2 border text-center">{r.totals?.closedDays || 0}</td>
// // //                   <td className="p-2 border text-right font-bold bg-slate-50">Rs. {r.totals?.total || 0}</td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       </div>

// // //       {/* mobile accessible stacked cards for very small screens */}
// // //       <div className="md:hidden mt-4">
// // //         {rows.map(r => (
// // //           <div key={"m-"+r.studentId} className="bg-white border rounded-lg p-3 mb-3 shadow">
// // //             <div className="flex items-center justify-between">
// // //               <div>
// // //                 <div className="font-semibold">{r.name}</div>
// // //                 <div className="text-xs text-slate-500">Ac: {r.accountNumber} • Room: {r.room_no}</div>
// // //               </div>
// // //               <div className="text-right">
// // //                 <div className="text-sm font-bold">Rs. {r.totals?.total || 0}</div>
// // //                 <div className="text-xs text-slate-400">Closed: {r.totals?.closedDays || 0}</div>
// // //               </div>
// // //             </div>

// // //             <div className="mt-3 text-xs text-slate-700">
// // //               {Array.from({length: daysInMonth}, (_, i) => {
// // //                 const d = (r.days || [])[i];
// // //                 if (!d) return null;
// // //                 const itemsSum = (d.items || []).reduce((acc, it) => acc + ((String(it.name||"").toLowerCase()==="rebate") ? 0 : Number(it.price || 0)), 0);
// // //                 if (d.isClosed) {
// // //                   const rebateTotal = (d.items || []).reduce((acc,it) => acc + ((String(it.name||"").toLowerCase()==="rebate") ? Number(it.price||0) : 0), 0);
// // //                   return <div key={i} className="mb-1">Day {d.date}: Closed {rebateTotal ? `| Rebate Rs ${rebateTotal}` : ""}</div>;
// // //                 }
// // //                 if (!itemsSum) return null;
// // //                 return <div key={i} className="mb-1">Day {d.date}: Items total Rs {itemsSum}</div>;
// // //               })}
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // // ButlerBillTable.jsx
// // import React, { useEffect, useState } from "react";

// // /**
// //  * Styled Butler bill table for butler to view per-student monthly bill matrix
// //  * - Expects VITE_MAIN_URI set
// //  * - Reads Butler from localStorage (hostelNo)
// //  * - Sends token in Authorization header if present
// //  *
// //  * Updated: day cell shows item-price expression like "20+15=35"
// //  */

// // function monthOptions(lastN = 24) {
// //   const out = [];
// //   const now = new Date();
// //   for (let i = 0; i < lastN; i++) {
// //     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
// //     out.push({ label: d.toLocaleString("default", { month: "long", year: "numeric" }), month: d.getMonth() + 1, year: d.getFullYear() });
// //   }
// //   return out;
// // }

// // export default function ButlerBillTable() {
// //   const mainUri = import.meta.env.VITE_MAIN_URI;
// //   const [rows, setRows] = useState([]);
// //   const [daysInMonth, setDaysInMonth] = useState(31);
// //   const [loading, setLoading] = useState(false);
// //   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
// //   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
// //   const [hostelNo, setHostelNo] = useState("");
// //   const token = localStorage.getItem("token");

// //   useEffect(() => {
// //     const butler = (() => {
// //       try { return JSON.parse(localStorage.getItem("Butler") || "null"); } catch { return null; }
// //     })();
// //     if (butler?.hostelNo) setHostelNo(butler.hostelNo);
// //   }, []);

// //   useEffect(() => {
// //     if (!hostelNo) return;
// //     fetchData();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [hostelNo, selectedMonth, selectedYear]);

// //   const fetchData = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await fetch(`${mainUri}/api/bill/hostel`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           ...(token ? { Authorization: `Bearer ${token}` } : {})
// //         },
// //         body: JSON.stringify({ hostelNo, month: selectedMonth, year: selectedYear })
// //       });
// //       const data = await res.json();
// //       if (!data.success) {
// //         setRows([]);
// //         setDaysInMonth(31);
// //         console.error(data.message || "Failed to fetch");
// //         setLoading(false);
// //         return;
// //       }
// //       setRows(data.rows || []);
// //       setDaysInMonth(data.daysInMonth || 31);
// //     } catch (err) {
// //       console.error(err);
// //       setRows([]);
// //       setDaysInMonth(31);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const exportCSV = () => {
// //     if (!rows || rows.length === 0) {
// //       alert("No data to export");
// //       return;
// //     }
// //     const header = ["Name", "AccountNo", ...Array.from({length: daysInMonth}, (_, i) => `Day ${i+1}`), "GuestsAmt", "Rebate", "ClosedDays", "Total"];
// //     const lines = [header.join(",")];
// //     for (const r of rows) {
// //       const dayCols = (r.days || []).map(d => {
// //         if (!d) return "";
// //         if (d.isClosed) {
// //           const rebateTotal = (d.items || []).reduce((acc,it) => acc + ((String(it.name||"").toLowerCase()==="rebate") ? Number(it.price||0) : 0), 0);
// //           return `"Closed ${rebateTotal ? `Rebate:${rebateTotal}` : ""}"`;
// //         }
// //         // write items sum excluding rebate in CSV (keep CSV numeric-friendly)
// //         const itemsSum = (d.items || []).reduce((acc, it) => acc + ((String(it.name||"").toLowerCase() === "rebate") ? 0 : Number(it.price || 0)), 0);
// //         return itemsSum ? `${itemsSum}` : "";
// //       });

// //       const row = [
// //         `"${(r.name||"").replace(/"/g,'""')}"`,
// //         `"${(r.accountNumber||"")}"`,
// //         ...dayCols,
// //         r.totals?.guestsTotal || 0,
// //         r.totals?.rebateTotal || 0,
// //         r.totals?.closedDays || 0,
// //         r.totals?.total || 0
// //       ];
// //       lines.push(row.join(","));
// //     }

// //     const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
// //     const url = URL.createObjectURL(blob);
// //     const a = document.createElement("a");
// //     a.href = url;
// //     a.download = `hostel-${hostelNo || "hostel"}-${selectedYear}-${String(selectedMonth).padStart(2,"0")}.csv`;
// //     document.body.appendChild(a);
// //     a.click();
// //     a.remove();
// //     URL.revokeObjectURL(url);
// //   };

// //   // Small loading spinner
// //   const Spinner = ({size=18}) => (
// //     <svg className="animate-spin" width={size} height={size} viewBox="0 0 24 24">
// //       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
// //       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
// //     </svg>
// //   );

// //   // helper: build expression "20+15=35" from items excluding rebate
// //   const buildItemsExpression = (items = []) => {
// //     const nonRebate = (items || []).filter(it => String(it.name || "").toLowerCase() !== "rebate");
// //     if (nonRebate.length === 0) return "";
// //     const prices = nonRebate.map(it => Number(it.price || 0));
// //     const sum = prices.reduce((a,b) => a + b, 0);
// //     // join with '+' and append =sum
// //     return `${prices.join("+")}=${sum}`;
// //   };

// //   return (
// //     <div className="p-6">
// //       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
// //         <div className="flex items-center gap-3">
// //           <h2 className="text-xl font-bold text-slate-800">Bill Table</h2>
// //           <div className="text-sm text-slate-500">Hostel: <span className="font-medium text-slate-700">{hostelNo || "—"}</span></div>
// //         </div>

// //         <div className="flex items-center gap-2">
// //           <select
// //             value={selectedMonth}
// //             onChange={(e)=> setSelectedMonth(Number(e.target.value))}
// //             className="px-3 py-2 border rounded shadow-sm bg-white text-sm"
// //             aria-label="Month"
// //           >
// //             {monthOptions(24).map(opt => <option key={`${opt.month}-${opt.year}`} value={opt.month}>{opt.label}</option>)}
// //           </select>

// //           <input
// //             type="number"
// //             value={selectedYear}
// //             onChange={(e)=> setSelectedYear(Number(e.target.value))}
// //             className="w-24 px-3 py-2 border rounded shadow-sm text-sm"
// //             min={2000}
// //             max={2100}
// //             aria-label="Year"
// //           />

// //           <button
// //             onClick={fetchData}
// //             className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 shadow"
// //             aria-label="Refresh"
// //           >
// //             {loading ? <Spinner size={16} /> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 12a9 9 0 10-9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
// //             <span className="text-sm">Refresh</span>
// //           </button>

// //           <button
// //             onClick={exportCSV}
// //             className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 shadow"
// //             aria-label="Export CSV"
// //           >
// //             <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
// //             <span className="text-sm">Export CSV</span>
// //           </button>
// //         </div>
// //       </div>

// //       {/* card */}
// //       <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
// //         {/* table scroll wrapper */}
// //         <div className="overflow-auto" style={{ maxHeight: "68vh" }}>
// //           <table className="min-w-max w-full table-auto border-collapse">
// //             <thead className="bg-slate-50 sticky top-0 z-20">
// //               <tr>
// //                 <th className="p-3 text-left border-r border-b w-[220px] sticky left-0 bg-slate-50 z-30">Name</th>
// //                 <th className="p-3 text-left border-r border-b w-[110px] sticky left-[220px] bg-slate-50 z-30">Ac No</th>

// //                 {Array.from({length: daysInMonth}, (_, i) => (
// //                   <th key={i} className="p-2 border-b text-center text-xs sticky top-0">{i+1}</th>
// //                 ))}

// //                 <th className="p-3 text-right border-l border-b w-[120px]">Guests</th>
// //                 <th className="p-3 text-right border-l border-b w-[120px]">Rebate</th>
// //                 <th className="p-3 text-center border-l border-b w-[120px]">Days <br /> Meals <br /> Closed</th>
// //                 <th className="p-3 text-right border-l border-b w-[130px]">Total</th>
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {rows.length === 0 && !loading && (
// //                 <tr><td colSpan={4 + daysInMonth} className="p-6 text-center text-slate-500">No records for selected month/year.</td></tr>
// //               )}

// //               {loading && (
// //                 <tr>
// //                   <td colSpan={4 + daysInMonth} className="p-6 text-center">
// //                     <div className="flex items-center justify-center gap-3 text-slate-600">
// //                       <Spinner /> Loading...
// //                     </div>
// //                   </td>
// //                 </tr>
// //               )}

// //               {rows.map((r, ridx) => (
// //                 <tr key={r.studentId} className={`odd:bg-white even:bg-slate-50 hover:bg-slate-100`}>
// //                   {/* sticky left columns */}
// //                   <td className="p-2 border-r align-top sticky left-0 bg-white z-10" style={{ minWidth: 220 }}>
// //                     <div className="font-medium text-slate-800 text-sm">{r.name}</div>
// //                   </td>

// //                   <td className="p-2 border-r align-top sticky left-[220px] bg-white z-10" style={{ minWidth: 110 }}>
// //                     <div className="text-sm text-slate-700">{r.accountNumber || "—"}</div>
// //                     <div className="text-xs text-slate-400 mt-1">{r.urn || ""}</div>
// //                   </td>

// //                   {(r.days || Array.from({length: daysInMonth}).map(()=>null)).map((d, idx) => {
// //                     const cellKey = `${r.studentId}-${idx}`;
// //                     if (!d) {
// //                       return <td key={cellKey} className="p-1 border text-xs text-center text-slate-400">-</td>;
// //                     }

// //                     // if closed -> show Closed + rebate items (if any)
// //                     if (d.isClosed) {
// //                       const rebateTotal = (d.items || []).reduce((acc,it) => acc + ((String(it.name||"").toLowerCase()==="rebate") ? Number(it.price||0) : 0), 0);
// //                       return (
// //                         <td key={cellKey} title={`Closed on ${d.date}`} className="p-2 border text-xs bg-red-50 text-red-700 align-top">
// //                           <div className="font-semibold">Closed</div>
// //                           {rebateTotal ? <div className="mt-1 text-[11px] text-slate-700">• Rebate (Rs. {rebateTotal})</div> : null}
// //                         </td>
// //                       );
// //                     }

// //                     // NOT closed: build expression like "20+15=35" from non-rebate items
// //                     const nonRebateItems = (d.items || []).filter(it => String(it.name || "").toLowerCase() !== "rebate");
// //                     if (nonRebateItems.length === 0) {
// //                       return <td key={cellKey} className="p-2 border text-xs align-top text-center"><div className="text-[12px] text-slate-400">-</div></td>;
// //                     }

// //                     const prices = nonRebateItems.map(it => Number(it.price || 0));
// //                     const sum = prices.reduce((a,b) => a + b, 0);
// //                     const expr = `${prices.join("+")}=${sum}`;

// //                     return (
// //                       <td key={cellKey} title={`Items: ${expr}`} className="p-2 border text-xs align-top text-center">
// //                         <div className="text-[12px] text-slate-700 font-medium">{expr}</div>
// //                       </td>
// //                     );
// //                   })}

// //                   <td className="p-2 border text-right text-sm font-semibold">Rs. {r.totals?.guestsTotal || 0}</td>
// //                   <td className="p-2 border text-right text-sm font-semibold">Rs. {r.totals?.rebateTotal || 0}</td>
// //                   <td className="p-2 border text-center">{r.totals?.closedDays || 0}</td>
// //                   <td className="p-2 border text-right font-bold bg-slate-50">Rs. {r.totals?.total || 0}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       {/* mobile accessible stacked cards for very small screens */}
// //       <div className="md:hidden mt-4">
// //         {rows.map(r => (
// //           <div key={"m-"+r.studentId} className="bg-white border rounded-lg p-3 mb-3 shadow">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <div className="font-semibold">{r.name}</div>
// //                 <div className="text-xs text-slate-500">Ac: {r.accountNumber} • Room: {r.room_no}</div>
// //               </div>
// //               <div className="text-right">
// //                 <div className="text-sm font-bold">Rs. {r.totals?.total || 0}</div>
// //                 <div className="text-xs text-slate-400">Closed: {r.totals?.closedDays || 0}</div>
// //               </div>
// //             </div>

// //             <div className="mt-3 text-xs text-slate-700">
// //               {Array.from({length: daysInMonth}, (_, i) => {
// //                 const d = (r.days || [])[i];
// //                 if (!d) return null;
// //                 if (d.isClosed) {
// //                   const rebateTotal = (d.items || []).reduce((acc,it) => acc + ((String(it.name||"").toLowerCase()==="rebate") ? Number(it.price||0) : 0), 0);
// //                   return <div key={i} className="mb-1">Day {d.date}: Closed {rebateTotal ? `| Rebate Rs ${rebateTotal}` : ""}</div>;
// //                 }
// //                 const expr = buildItemsExpression(d.items || []);
// //                 if (!expr) return null;
// //                 return <div key={i} className="mb-1">Day {d.date}: {expr}</div>;
// //               })}
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
// // ButlerBillTable.jsx
// import React, { useEffect, useState } from "react";

// /**
//  * ButlerBillTable.jsx
//  * - Shows per-student monthly bill matrix for a hostel (butler view)
//  * - Reads Butler from localStorage to get hostelNo
//  * - Sends token (if present) in Authorization header
//  * - Day cell display rules:
//  *    * closed => "Closed" (and rebate if present)
//  *    * no items => "-"
//  *    * one non-rebate item => "price" (e.g. 25)
//  *    * multiple non-rebate items => "p1+p2+...=sum" (e.g. 20+15=35)
//  */

// function monthOptions(lastN = 24) {
//   const out = [];
//   const now = new Date();
//   for (let i = 0; i < lastN; i++) {
//     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
//     out.push({ label: d.toLocaleString("default", { month: "long", year: "numeric" }), month: d.getMonth() + 1, year: d.getFullYear() });
//   }
//   return out;
// }

// export default function ButlerBillTable() {
//   const mainUri = import.meta.env.VITE_MAIN_URI;
//   const [rows, setRows] = useState([]);
//   const [daysInMonth, setDaysInMonth] = useState(31);
//   const [loading, setLoading] = useState(false);
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [hostelNo, setHostelNo] = useState("");
//   const token = localStorage.getItem("token");

//   // read Butler.hostelNo from localStorage
//   useEffect(() => {
//     const butler = (() => {
//       try { return JSON.parse(localStorage.getItem("Butler") || "null"); } catch { return null; }
//     })();
//     if (butler?.hostelNo) setHostelNo(butler.hostelNo);
//   }, []);

//   useEffect(() => {
//     if (!hostelNo) return;
//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [hostelNo, selectedMonth, selectedYear]);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${mainUri}/api/bill/hostel`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {})
//         },
//         body: JSON.stringify({ hostelNo, month: selectedMonth, year: selectedYear })
//       });
//       const data = await res.json();
//       if (!data.success) {
//         setRows([]);
//         setDaysInMonth(31);
//         console.error(data.message || "Failed to fetch");
//         setLoading(false);
//         return;
//       }
//       setRows(data.rows || []);
//       setDaysInMonth(data.daysInMonth || 31);
//     } catch (err) {
//       console.error(err);
//       setRows([]);
//       setDaysInMonth(31);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const exportCSV = () => {
//     if (!rows || rows.length === 0) {
//       alert("No data to export");
//       return;
//     }
//     const header = ["Name", "AccountNo", ...Array.from({length: daysInMonth}, (_, i) => `Day ${i+1}`), "GuestsAmt", "Rebate", "ClosedDays", "Total"];
//     const lines = [header.join(",")];
//     for (const r of rows) {
//       const dayCols = (r.days || []).map(d => {
//         if (!d) return "";
//         if (d.isClosed) {
//           const rebateTotal = (d.items || []).reduce((acc,it) => acc + ((String(it.name||"").toLowerCase()==="rebate") ? Number(it.price||0) : 0), 0);
//           return `"Closed ${rebateTotal ? `Rebate:${rebateTotal}` : ""}"`;
//         }
//         // write items sum excluding rebate in CSV (numeric-friendly)
//         const itemsSum = (d.items || []).reduce((acc, it) => acc + ((String(it.name||"").toLowerCase() === "rebate") ? 0 : Number(it.price || 0)), 0);
//         return itemsSum ? `${itemsSum}` : "";
//       });

//       const row = [
//         `"${(r.name||"").replace(/"/g,'""')}"`,
//         `"${(r.accountNumber||"")}"`,
//         ...dayCols,
//         r.totals?.guestsTotal || 0,
//         r.totals?.rebateTotal || 0,
//         r.totals?.closedDays || 0,
//         r.totals?.total || 0
//       ];
//       lines.push(row.join(","));
//     }

//     const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `hostel-${hostelNo || "hostel"}-${selectedYear}-${String(selectedMonth).padStart(2,"0")}.csv`;
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
//     URL.revokeObjectURL(url);
//   };

//   // Small loading spinner component
//   const Spinner = ({size=18}) => (
//     <svg className="animate-spin" width={size} height={size} viewBox="0 0 24 24">
//       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
//       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
//     </svg>
//   );

//   // helper: build expression "20+15=35" from items excluding rebate
//   const buildItemsExpression = (items = []) => {
//     const nonRebate = (items || []).filter(it => String(it.name || "").toLowerCase() !== "rebate");
//     if (nonRebate.length === 0) return "";
//     const prices = nonRebate.map(it => Number(it.price || 0));
//     const sum = prices.reduce((a,b) => a + b, 0);
//     if (prices.length === 1) return `${sum}`; // single item -> only number
//     return `${prices.join("+")}=${sum}`;        // multiple -> expr
//   };

//   return (
//     <div className="p-6">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
//         <div className="flex items-center gap-3">
//           <h2 className="text-xl font-bold text-slate-800">Bill Table</h2>
//           <div className="text-sm text-slate-500">Hostel: <span className="font-medium text-slate-700">{hostelNo || "—"}</span></div>
//         </div>

//         <div className="flex items-center gap-2">
//           <select
//             value={selectedMonth}
//             onChange={(e)=> setSelectedMonth(Number(e.target.value))}
//             className="px-3 py-2 border rounded shadow-sm bg-white text-sm"
//             aria-label="Month"
//           >
//             {monthOptions(24).map(opt => <option key={`${opt.month}-${opt.year}`} value={opt.month}>{opt.label}</option>)}
//           </select>

//           <input
//             type="number"
//             value={selectedYear}
//             onChange={(e)=> setSelectedYear(Number(e.target.value))}
//             className="w-24 px-3 py-2 border rounded shadow-sm text-sm"
//             min={2000}
//             max={2100}
//             aria-label="Year"
//           />

//           <button
//             onClick={fetchData}
//             className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 shadow"
//             aria-label="Refresh"
//           >
//             {loading ? <Spinner size={16} /> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 12a9 9 0 10-9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
//             <span className="text-sm">Refresh</span>
//           </button>

//           <button
//             onClick={exportCSV}
//             className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 shadow"
//             aria-label="Export CSV"
//           >
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
//             <span className="text-sm">Export CSV</span>
//           </button>
//         </div>
//       </div>

//       {/* table card */}
//       <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
//         <div className="overflow-auto" style={{ maxHeight: "68vh" }}>
//           <table className="min-w-max w-full table-auto border-collapse">
//             <thead className="bg-slate-50 sticky top-0 z-20">
//               <tr>
//                 <th className="p-3 text-left border-r border-b w-[220px] sticky left-0 bg-slate-50 z-30">Name</th>
//                 <th className="p-3 text-left border-r border-b w-[110px] sticky left-[220px] bg-slate-50 z-30">Ac No</th>

//                 {Array.from({length: daysInMonth}, (_, i) => (
//                   <th key={i} className="p-2 border-b text-center text-xs sticky top-0">{i+1}</th>
//                 ))}

//                 <th className="p-3 text-right border-l border-b w-[120px]">Guests</th>
//                 <th className="p-3 text-right border-l border-b w-[120px]">Rebate</th>
//                 <th className="p-3 text-center border-l border-b w-[120px]">Days <br /> Meals <br /> Closed</th>
//                 <th className="p-3 text-right border-l border-b w-[130px]">Total</th>
//               </tr>
//             </thead>

//             <tbody>
//               {rows.length === 0 && !loading && (
//                 <tr><td colSpan={4 + daysInMonth} className="p-6 text-center text-slate-500">No records for selected month/year.</td></tr>
//               )}

//               {loading && (
//                 <tr>
//                   <td colSpan={4 + daysInMonth} className="p-6 text-center">
//                     <div className="flex items-center justify-center gap-3 text-slate-600">
//                       <Spinner /> Loading...
//                     </div>
//                   </td>
//                 </tr>
//               )}

//               {rows.map((r) => (
//                 <tr key={r.studentId} className={`odd:bg-white even:bg-slate-50 hover:bg-slate-100`}>
//                   {/* sticky left columns */}
//                   <td className="p-2 border-r align-top sticky left-0 bg-white z-10" style={{ minWidth: 220 }}>
//                     <div className="font-medium text-slate-800 text-sm">{r.name}</div>
//                   </td>

//                   <td className="p-2 border-r align-top sticky left-[220px] bg-white z-10" style={{ minWidth: 110 }}>
//                     <div className="text-sm text-slate-700">{r.accountNumber || "—"}</div>
//                     <div className="text-xs text-slate-400 mt-1">{r.urn || ""}</div>
//                   </td>

//                   {(r.days || Array.from({length: daysInMonth}).map(()=>null)).map((d, idx) => {
//                     const cellKey = `${r.studentId}-${idx}`;
//                     if (!d) {
//                       return <td key={cellKey} className="p-1 border text-xs text-center text-slate-400">-</td>;
//                     }

//                     // CLOSED case
//                     if (d.isClosed) {
//                       const rebateTotal = (d.items || []).reduce((acc,it) => acc + ((String(it.name||"").toLowerCase()==="rebate") ? Number(it.price||0) : 0), 0);
//                       return (
//                         <td key={cellKey} title={`Closed on ${d.date}`} className="p-2 border text-xs bg-red-50 text-red-700 align-top text-center">
//                           <div className="font-semibold">Closed</div>
//                           {rebateTotal ? <div className="mt-1 text-[11px] text-slate-700">• Rebate (Rs. {rebateTotal})</div> : null}
//                         </td>
//                       );
//                     }

//                     // OPEN day: show expression or single number or '-'
//                     const nonRebateItems = (d.items || []).filter(it => String(it.name || "").toLowerCase() !== "rebate");
//                     if (nonRebateItems.length === 0) {
//                       return <td key={cellKey} className="p-2 border text-xs text-center text-slate-400">-</td>;
//                     }

//                     const prices = nonRebateItems.map(it => Number(it.price || 0));
//                     const sum = prices.reduce((a,b) => a + b, 0);
//                     let displayValue = "";
//                     if (prices.length === 1) displayValue = `${sum}`; // single item -> just number
//                     else displayValue = `${prices.join("+")}=${sum}`; // multiple -> expression

//                     return (
//                       <td key={cellKey} title={displayValue ? `Items: ${displayValue}` : undefined} className="p-2 border text-xs align-top text-center">
//                         <div className="text-[12px] text-slate-700 font-medium">{displayValue}</div>
//                       </td>
//                     );
//                   })}

//                   <td className="p-2 border text-right text-sm font-semibold">Rs. {r.totals?.guestsTotal || 0}</td>
//                   <td className="p-2 border text-right text-sm font-semibold">Rs. {r.totals?.rebateTotal || 0}</td>
//                   <td className="p-2 border text-center">{r.totals?.closedDays || 0}</td>
//                   <td className="p-2 border text-right font-bold bg-slate-50">Rs. {r.totals?.total || 0}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* mobile stacked cards */}
//       <div className="md:hidden mt-4">
//         {rows.map(r => (
//           <div key={"m-"+r.studentId} className="bg-white border rounded-lg p-3 mb-3 shadow">
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="font-semibold">{r.name}</div>
//                 <div className="text-xs text-slate-500">Ac: {r.accountNumber} • Room: {r.room_no}</div>
//               </div>
//               <div className="text-right">
//                 <div className="text-sm font-bold">Rs. {r.totals?.total || 0}</div>
//                 <div className="text-xs text-slate-400">Closed: {r.totals?.closedDays || 0}</div>
//               </div>
//             </div>

//             <div className="mt-3 text-xs text-slate-700">
//               {Array.from({length: daysInMonth}, (_, i) => {
//                 const d = (r.days || [])[i];
//                 if (!d) return null;
//                 if (d.isClosed) {
//                   const rebateTotal = (d.items || []).reduce((acc,it) => acc + ((String(it.name||"").toLowerCase()==="rebate") ? Number(it.price||0) : 0), 0);
//                   return <div key={i} className="mb-1">Day {d.date}: Closed {rebateTotal ? `| Rebate Rs ${rebateTotal}` : ""}</div>;
//                 }
//                 const expr = buildItemsExpression(d.items || []);
//                 if (!expr) return null;
//                 return <div key={i} className="mb-1">Day {d.date}: {expr}</div>;
//               })}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// ButlerBillTable.jsx
import React, { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/**
 * ButlerBillTable.jsx
 * - Full component with Download PDF button (no window.print)
 * - Uses html2canvas + jsPDF
 * - Paste/replace your existing file with this
 *
 * Install deps:
 * npm install html2canvas jspdf
 */

function monthOptions(lastN = 24) {
  const out = [];
  const now = new Date();
  for (let i = 0; i < lastN; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    out.push({
      label: d.toLocaleString("default", { month: "long", year: "numeric" }),
      month: d.getMonth() + 1,
      year: d.getFullYear(),
    });
  }
  return out;
}

export default function ButlerBillTable() {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const [rows, setRows] = useState([]);
  const [daysInMonth, setDaysInMonth] = useState(31);
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [hostelNo, setHostelNo] = useState("");
  const token = localStorage.getItem("token");

  const tableContainerRef = useRef(null);
  const tableRef = useRef(null);

  useEffect(() => {
    const butler = (() => {
      try {
        return JSON.parse(localStorage.getItem("Butler") || "null");
      } catch {
        return null;
      }
    })();
    if (butler?.hostelNo) setHostelNo(butler.hostelNo);
  }, []);

  useEffect(() => {
    if (!hostelNo) return;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hostelNo, selectedMonth, selectedYear]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${mainUri}/api/bill/hostel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          hostelNo,
          month: selectedMonth,
          year: selectedYear,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        setRows([]);
        setDaysInMonth(31);
        console.error(data.message || "Failed to fetch");
        setLoading(false);
        return;
      }
      setRows(data.rows || []);
      setDaysInMonth(data.daysInMonth || 31);
    } catch (err) {
      console.error(err);
      setRows([]);
      setDaysInMonth(31);
    } finally {
      setLoading(false);
    }
  };

  const escapeCell = (v) => {
    if (v == null) return "";
    const s = String(v);
    if (s.includes(",") || s.includes('"') || s.includes("\n")) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const exportCSV = () => {
    if (!rows || rows.length === 0) {
      alert("No data to export");
      return;
    }

    const header = [
      "Name",
      "AccountNo",
      ...Array.from({ length: daysInMonth }, (_, i) => `Day ${i + 1}`),
      "GuestsAmt",
      "Rebate",
      "ClosedDays",
      "Total",
    ];
    const lines = [header.join(",")];

    for (const r of rows) {
      const dayCols = [];
      const daysArr = r.days || [];
      for (let i = 0; i < daysInMonth; i++) {
        const d = daysArr[i];
        if (!d) {
          dayCols.push("");
          continue;
        }
        if (d.isClosed) {
          const rebateTotal = (d.items || []).reduce(
            (acc, it) =>
              acc +
              (String(it.name || "").toLowerCase() === "rebate"
                ? Number(it.price || 0)
                : 0),
            0
          );
          const txt = `Closed${rebateTotal ? ` Rebate:${rebateTotal}` : ""}`;
          dayCols.push(escapeCell(txt));
          continue;
        }
        const itemsSum = (d.items || []).reduce(
          (acc, it) =>
            acc +
            (String(it.name || "").toLowerCase() === "rebate"
              ? 0
              : Number(it.price || 0)),
          0
        );
        dayCols.push(itemsSum ? String(itemsSum) : "");
      }

      const row = [
        escapeCell(r.name || ""),
        escapeCell(r.accountNumber || ""),
        ...dayCols,
        String(r.totals?.guestsTotal || 0),
        String(r.totals?.rebateTotal || 0),
        String(r.totals?.closedDays || 0),
        String(r.totals?.total || 0),
      ];
      lines.push(row.join(","));
    }

    const blob = new Blob([lines.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hostel-${hostelNo || "hostel"}-${selectedYear}-${String(
      selectedMonth
    ).padStart(2, "0")}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const Spinner = ({ size = 18 }) => (
    <svg
      className="animate-spin"
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );

  const buildItemsExpression = (items = []) => {
    const nonRebate = (items || []).filter(
      (it) => String(it.name || "").toLowerCase() !== "rebate"
    );
    if (nonRebate.length === 0) return "";
    const prices = nonRebate.map((it) => Number(it.price || 0));
    const sum = prices.reduce((a, b) => a + b, 0);
    if (prices.length === 1) return `${sum}`;
    return `${prices.join("+")}=${sum}`;
  };

  return (
    <div className="p-6 ml-[50px] mt-[50px]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-slate-800">Bill Table</h2>
          <div className="text-sm text-slate-500">
            Hostel:{" "}
            <span className="font-medium text-slate-700">
              {hostelNo || "—"}
            </span>
          </div>
        </div>

        {/* Top-right controls (Download PDF button is very visible) */}
        <div className="flex items-center gap-2 z-50">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="px-3 py-2 border rounded shadow-sm bg-white text-sm"
            aria-label="Month"
          >
            {monthOptions(24).map((opt) => (
              <option key={`${opt.month}-${opt.year}`} value={opt.month}>
                {opt.label}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="w-24 px-3 py-2 border rounded shadow-sm text-sm"
            min={2000}
            max={2100}
            aria-label="Year"
          />

          <button
            onClick={fetchData}
            className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 shadow"
            aria-label="Refresh"
          >
            {loading ? (
              <Spinner size={16} />
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 12a9 9 0 10-9 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            <span className="text-sm">Refresh</span>
          </button>

          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 shadow"
            aria-label="Export CSV"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm">Export CSV</span>
          </button>

        </div>
      </div>

      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <div
          ref={tableContainerRef}
          className="overflow-auto"
          style={{ maxHeight: "68vh" }}
        >
          <table
            ref={tableRef}
            className="min-w-max w-full table-auto border-collapse"
          >
            <thead className="bg-slate-50 sticky top-0 z-20">
              <tr>
                <th className="p-3 text-left border-r border-b w-[220px] sticky left-0 bg-slate-50 z-30">
                  Name
                </th>
                <th className="p-3 text-left border-r border-b w-[110px] sticky left-[220px] bg-slate-50 z-30">
                  Ac No
                </th>

                {Array.from({ length: daysInMonth }, (_, i) => (
                  <th
                    key={i}
                    className="p-2 border-b text-center text-xs sticky top-0"
                  >
                    {i + 1}
                  </th>
                ))}

                <th className="p-3 text-right border-l border-b w-[120px]">
                  Guests
                </th>
                <th className="p-3 text-right border-l border-b w-[120px]">
                  Rebate
                </th>
                <th className="p-3 text-center border-l border-b w-[120px]">
                  Days <br /> Meals <br /> Closed
                </th>
                <th className="p-3 text-right border-l border-b w-[130px]">
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan={4 + daysInMonth}
                    className="p-6 text-center text-slate-500"
                  >
                    No records for selected month/year.
                  </td>
                </tr>
              )}

              {loading && (
                <tr>
                  <td colSpan={4 + daysInMonth} className="p-6 text-center">
                    <div className="flex items-center justify-center gap-3 text-slate-600">
                      <Spinner /> Loading...
                    </div>
                  </td>
                </tr>
              )}

              {rows.map((r) => (
                <tr
                  key={r.studentId}
                  className={`odd:bg-white even:bg-slate-50 hover:bg-slate-100`}
                >
                  <td
                    className="p-2 border-r align-top sticky left-0 bg-white z-10"
                    style={{ minWidth: 220 }}
                  >
                    <div className="font-medium text-slate-800 text-sm">
                      {r.name}
                    </div>
                  </td>

                  <td
                    className="p-2 border-r align-top sticky left-[220px] bg-white z-10"
                    style={{ minWidth: 110 }}
                  >
                    <div className="text-sm text-slate-700">
                      {r.accountNumber || "—"}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {r.urn || ""}
                    </div>
                  </td>

                  {(
                    r.days ||
                    Array.from({ length: daysInMonth }).map(() => null)
                  ).map((d, idx) => {
                    const cellKey = `${r.studentId}-${idx}`;
                    if (!d) {
                      return (
                        <td
                          key={cellKey}
                          className="p-1 border text-xs text-center text-slate-400"
                        >
                          -
                        </td>
                      );
                    }

                    if (d.isClosed) {
                      const rebateTotal = (d.items || []).reduce(
                        (acc, it) =>
                          acc +
                          (String(it.name || "").toLowerCase() === "rebate"
                            ? Number(it.price || 0)
                            : 0),
                        0
                      );
                      return (
                        <td
                          key={cellKey}
                          title={`Closed on ${d.date}`}
                          className="p-2 border text-xs bg-red-50 text-red-700 align-top text-center"
                        >
                          <div className="font-semibold">Closed</div>
                          {rebateTotal ? (
                            <div className="mt-1 text-[11px] text-slate-700">
                              • Rebate (Rs. {rebateTotal})
                            </div>
                          ) : null}
                        </td>
                      );
                    }

                    const nonRebateItems = (d.items || []).filter(
                      (it) => String(it.name || "").toLowerCase() !== "rebate"
                    );
                    if (nonRebateItems.length === 0) {
                      return (
                        <td
                          key={cellKey}
                          className="p-2 border text-xs text-center text-slate-400"
                        >
                          -
                        </td>
                      );
                    }

                    const prices = nonRebateItems.map((it) =>
                      Number(it.price || 0)
                    );
                    const sum = prices.reduce((a, b) => a + b, 0);
                    const displayValue =
                      prices.length === 1
                        ? `${sum}`
                        : `${prices.join("+")}=${sum}`;

                    return (
                      <td
                        key={cellKey}
                        title={
                          displayValue ? `Items: ${displayValue}` : undefined
                        }
                        className="p-2 border text-xs align-top text-center"
                      >
                        <div className="text-[12px] text-slate-700 font-medium">
                          {displayValue}
                        </div>
                      </td>
                    );
                  })}

                  <td className="p-2 border text-right text-sm font-semibold">
                    Rs. {r.totals?.guestsTotal || 0}
                  </td>
                  <td className="p-2 border text-right text-sm font-semibold">
                    Rs. {r.totals?.rebateTotal || 0}
                  </td>
                  <td className="p-2 border text-center">
                    {r.totals?.closedDays || 0}
                  </td>
                  <td className="p-2 border text-right font-bold bg-slate-50">
                    Rs. {r.totals?.total || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* mobile stacked cards */}
      <div className="md:hidden mt-4">
        {rows.map((r) => (
          <div
            key={"m-" + r.studentId}
            className="bg-white border rounded-lg p-3 mb-3 shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{r.name}</div>
                <div className="text-xs text-slate-500">
                  Ac: {r.accountNumber} • Room: {r.room_no}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">
                  Rs. {r.totals?.total || 0}
                </div>
                <div className="text-xs text-slate-400">
                  Closed: {r.totals?.closedDays || 0}
                </div>
              </div>
            </div>

            <div className="mt-3 text-xs text-slate-700">
              {Array.from({ length: daysInMonth }, (_, i) => {
                const d = (r.days || [])[i];
                if (!d) return null;
                if (d.isClosed) {
                  const rebateTotal = (d.items || []).reduce(
                    (acc, it) =>
                      acc +
                      (String(it.name || "").toLowerCase() === "rebate"
                        ? Number(it.price || 0)
                        : 0),
                    0
                  );
                  return (
                    <div key={i} className="mb-1">
                      Day {d.date}: Closed{" "}
                      {rebateTotal ? `| Rebate Rs ${rebateTotal}` : ""}
                    </div>
                  );
                }
                const expr = buildItemsExpression(d.items || []);
                if (!expr) return null;
                return (
                  <div key={i} className="mb-1">
                    Day {d.date}: {expr}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
