
import React, { useEffect, useState, useRef } from "react";

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

export default function StudentBillTable() {
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
        return JSON.parse(localStorage.getItem("Student") || "null");
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
    <div className="p-6 ml-[50px] mt-[50px] bg-gray-300" style={{height:"100vh"}}>
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
