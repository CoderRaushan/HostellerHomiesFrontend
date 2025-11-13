
import { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

// NEW: imports for PDF generation
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

function getISTNow() {
  const nowUtc = new Date();
  const ist = new Date(nowUtc.getTime() + 5.5 * 60 * 60 * 1000);
  return ist;
}

function buildMonthMatrix(year, month /*1-12*/) {
  const first = new Date(Date.UTC(year, month - 1, 1));
  const wd = (first.getUTCDay() + 6) % 7; // Mon = 0 ... Sun = 6
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();

  const weeks = [];
  let week = new Array(7).fill(null);
  let dayCounter = 1;

  for (let i = wd; i < 7; i++) week[i] = dayCounter++;
  weeks.push(week);

  while (dayCounter <= daysInMonth) {
    week = new Array(7).fill(null);
    for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) week[i] = dayCounter++;
    weeks.push(week);
  }

  while (weeks.length < 6) weeks.push(new Array(7).fill(null));
  return weeks;
}

function csvEscape(s) {
  if (s === null || s === undefined) return "";
  const str = String(s);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export default function StudentBill() {
  const mainUri = import.meta.env.VITE_MAIN_URI || "";
  const rawStudent = (() => {
    try {
      return JSON.parse(localStorage.getItem("Student") || "null");
    } catch {
      return null;
    }
  })();
  const studentIdFromStorage = rawStudent?._id || rawStudent?.id || rawStudent?.studentId || null;
  const istNow = getISTNow();

  const [month, setMonth] = useState(istNow.getUTCMonth() + 1); // 1-12
  const [year, setYear] = useState(istNow.getUTCFullYear());
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(false);

  const showError = (msg) => toast.error(msg || "Something went wrong", { position: "top-right" });

  useEffect(() => {
    if (!studentIdFromStorage) {
      showError("Student not logged in (studentId missing).");
      setBill(null);
      return;
    }
    if (!mainUri) {
      showError("VITE_MAIN_URI not set.");
      setBill(null);
      return;
    }

    async function fetchBill() {
      setLoading(true);
      try {
        const res = await fetch(`${mainUri}/api/bill/student`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId: studentIdFromStorage, month, year })
        });
        const data = await res.json();
        if (!data) {
          showError("Empty response from server.");
          setBill(null);
          return;
        }
        if (!data.success) {
          showError(data.message || "Failed to load bill.");
          setBill(null);
          return;
        }
        setBill(data.bill || null);
      } catch (err) {
        console.error("fetch bill error:", err);
        showError("Network or server error while fetching bill.");
        setBill(null);
      } finally {
        setLoading(false);
      }
    }
    fetchBill();
  }, [studentIdFromStorage, month, year, mainUri]);

  const dayMap = useMemo(() => {
    const map = {};
    if (bill?.days && Array.isArray(bill.days)) {
      for (const d of bill.days) if (typeof d.date === "number") map[d.date] = d;
    }
    return map;
  }, [bill]);

  const weeks = useMemo(() => buildMonthMatrix(year, month), [year, month]);

  // totals: diet, items excluding rebate, rebate, closedDays
  const totals = useMemo(() => {
    let diet = 0, itemsExcludingRebate = 0, rebate = 0, closedDays = 0;
    if (bill?.days) {
      for (const d of bill.days) {
        if (d.diet && typeof d.diet.price === "number") diet += d.diet.price;
        const isClosed = d.isMessClose === true || (d.diet && String(d.diet.name || "").toLowerCase() === "closed");
        if (isClosed) closedDays++;
        if (Array.isArray(d.items)) {
          for (const it of d.items) {
            const priceNum = Number(it.price || 0);
            if (String(it.name || "").toLowerCase() === "rebate") rebate += priceNum;
            else itemsExcludingRebate += priceNum;
          }
        }
      }
    }
    const grand = diet + itemsExcludingRebate + rebate;
    return { diet, itemsExcludingRebate, rebate, grand, closedDays };
  }, [bill]);

  const istTodayDate = istNow.getUTCDate();
  const istTodayMonth = istNow.getUTCMonth() + 1;
  const istTodayYear = istNow.getUTCFullYear();

  // CSV export (now appends totals rows at the end)
  const exportCSV = () => {
    if (!bill) {
      showError("No bill to export");
      return;
    }

    const rows = [];
    // header
    rows.push(["Date", "IsClosed", "DietName", "DietPrice", "Items(semicolon separated name:price)", "RebateTotal"]);

    const daysMap = {};
    for (const d of bill.days || []) daysMap[d.date] = d;
    const daysInMonth = new Date(year, month, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const d = daysMap[day];
      const isClosed = d ? (d.isMessClose === true || String(d.diet?.name || "").toLowerCase() === "closed") : false;
      const dietName = d?.diet?.name || (d ? "" : "");
      const dietPrice = (d && typeof d.diet?.price === "number") ? d.diet.price : "";
      const items = (d?.items || []).map(it => `${it.name}:${it.price}`).join("; ");
      const rebateTotal = (d?.items || []).reduce((acc, it) => acc + ((String(it.name || "").toLowerCase() === "rebate") ? Number(it.price || 0) : 0), 0);
      rows.push([day, isClosed ? "YES" : "NO", dietName, dietPrice, items, rebateTotal]);
    }

    // blank row
    rows.push([]);

    // append totals rows (human-readable labels)
    rows.push(["Diet Total", totals.diet]);
    rows.push(["Guests (Items) Total (excluding Rebate)", totals.itemsExcludingRebate]);
    rows.push(["Rebate Total", totals.rebate]);
    rows.push(["Closed Days", totals.closedDays]);
    rows.push(["Total Bill Amount", totals.grand]);

    // convert to CSV text
    const csv = rows.map(r => r.map(csvEscape).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bill-${studentIdFromStorage || "student"}-${year}-${String(month).padStart(2,"0")}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // PRINT -> generate PDF using html2canvas + jsPDF (captures the bill area)
  const handlePrint = async () => {
    try {
      const input = document.getElementById("bill-root");
      if (!input) {
        console.error("bill-root not found");
        toast.error("PDF target not found");
        return;
      }

      // scale factor to improve resolution (adjust if necessary)
      const scale = 2;

      // use html2canvas to render the DOM node
      const canvas = await html2canvas(input, {
        scale,
        useCORS: true,
        logging: false,
        windowWidth: input.scrollWidth,
        windowHeight: input.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);

      // Create jsPDF in portrait using px units
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height] // temp format; we'll add pages below
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // scale image to page width
      const imgProps = { width: canvas.width, height: canvas.height };
      const ratio = Math.min(pageWidth / imgProps.width, pageHeight / imgProps.height);

      if (imgProps.height * ratio <= pageHeight) {
        pdf.addImage(imgData, "JPEG", 0, 0, imgProps.width * ratio, imgProps.height * ratio);
      } else {
        // Multi-page handling: draw slice by slice
        let remainingHeight = imgProps.height;
        let positionY = 0;
        const imgWidthOnPage = imgProps.width * ratio;

        while (remainingHeight > 0) {
          const sliceCanvas = document.createElement("canvas");
          sliceCanvas.width = imgProps.width;
          sliceCanvas.height = Math.min(imgProps.height - positionY, pageHeight / ratio);
          const ctx = sliceCanvas.getContext("2d");

          ctx.drawImage(
            canvas,
            0,
            positionY,
            sliceCanvas.width,
            sliceCanvas.height,
            0,
            0,
            sliceCanvas.width,
            sliceCanvas.height
          );

          const sliceData = sliceCanvas.toDataURL("image/jpeg", 0.95);
          pdf.addImage(sliceData, "JPEG", 0, 0, imgWidthOnPage, sliceCanvas.height * ratio);

          remainingHeight -= sliceCanvas.height;
          positionY += sliceCanvas.height;

          if (remainingHeight > 0) pdf.addPage();
        }
      }

      const filename = bill && bill.year && bill.month
        ? `bill-${bill.year}-${String(bill.month).padStart(2, "0")}.pdf`
        : `bill-${new Date().toISOString().slice(0,19).replace(/[:T]/g,"-")}.pdf`;

      pdf.save(filename);
    } catch (err) {
      console.error("PDF generation error:", err);
      toast.error("Failed to generate PDF");
    }
  };


  const chartData = {
    labels: ["Diet", "Items", "Rebate"],
    datasets: [
      {
        label: "Amount (Rs.)",
        data: [totals.diet, totals.itemsExcludingRebate, totals.rebate],
        backgroundColor: ["#1D4ED8", "#F59E0B", "#10B981"],
        borderColor: ["#1D4ED8", "#F59E0B", "#10B981"],
        borderWidth: 1
      }
    ]
  };

  return (
    // <-- IMPORTANT: id="bill-root" is here so pdf captures this exact area
    <div id="bill-root" className="pt-16 bg-white min-h-screen">
      <ToastContainer />
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* header & controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Monthly Mess Calendar</h1>
            <p className="text-sm text-slate-500 mt-1">Closed days are highlighted. Hover a date to see details (desktop) or tap (mobile).</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap mt-2 sm:mt-0">
            <select value={month} onChange={(e) => setMonth(Number(e.target.value))}
                    className="px-3 py-2 border rounded-md bg-white text-sm shadow-sm">
              {MONTHS.map((m, idx) => <option key={m} value={idx + 1}>{m}</option>)}
            </select>

            <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))}
                   className="w-24 px-3 py-2 border rounded-md bg-white text-sm shadow-sm" min={2000} max={2100} />

            {/* Buttons: hide on print via .hide-on-print only (sidebar/topbar remain visible when printing) */}
            <button onClick={exportCSV} className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm hide-on-print">Export CSV</button>
            <button onClick={handlePrint} className="px-3 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 text-sm hide-on-print">Print</button>
          </div>
        </div>

        {/* top chart + summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-2 bg-white border rounded-2xl p-3 shadow-sm">
            <div className="hidden sm:block">
              <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </div>
            <div className="sm:hidden px-3 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">Diet</div>
                  <div className="text-lg font-bold">Rs. {totals.diet}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Items</div>
                  <div className="text-lg font-bold">Rs. {totals.itemsExcludingRebate}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Rebate</div>
                  <div className="text-lg font-bold">Rs. {totals.rebate}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 border rounded-2xl p-4 shadow-md flex flex-col gap-3 justify-between">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-500">Diet Total</div>
                <div className="text-2xl font-bold text-slate-900">Rs. {totals.diet}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500">Closed Days</div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 font-semibold">
                  {totals.closedDays}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
              <div className="p-3 bg-white rounded-lg border flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">Guests (items)</div>
                  <div className="font-semibold text-slate-800">Rs. {totals.itemsExcludingRebate}</div>
                </div>
                <div className="text-xs text-slate-400">excl. rebate</div>
              </div>

              <div className="p-3 bg-white rounded-lg border flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">Rebate</div>
                  <div className="font-semibold text-green-700">Rs. {totals.rebate}</div>
                </div>
                <div className="text-xs text-slate-400">Handled separately</div>
              </div>
            </div>

            <div className="mt-2 p-3 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-center font-bold shadow-sm">
              Total Bill: Rs. {totals.grand}
            </div>

            <div className="text-xs text-slate-400 text-right">
              {loading ? "Loading..." : (bill ? `Last updated: ${new Date(bill.createdAt).toLocaleString()}` : "No bill")}
            </div>
          </div>
        </div>

        {/* calendar */}
        <div className="bg-white rounded-2xl shadow border overflow-hidden">
          <div className="p-4 sm:p-6 border-b">
            <h2 className="text-lg sm:text-xl font-semibold text-center text-slate-800">{MONTHS[month - 1]} {year} Calendar</h2>
          </div>

          <div className="grid grid-cols-7 text-xs sm:text-sm">
            {["Mon","Tues","Wed","Thurs","Fri","Sat","Sun"].map((h) => (
              <div key={h} className="text-center font-semibold p-2 sm:p-3 bg-blue-600 text-white border-r last:border-r-0">
                {h}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 border-t border-l">
            {weeks.flat().map((d, idx) => {
              const isBlank = d === null;
              const dayObj = !isBlank ? dayMap[d] : null;
              const items = dayObj?.items || [];
              const isClosed = dayObj ? (dayObj.isMessClose === true || String(dayObj.diet?.name || "").toLowerCase() === "closed") : false;
              const isTodayCell = !isBlank && d === istTodayDate && month === istTodayMonth && year === istTodayYear;

              const baseClasses = "border-r border-b relative p-3 text-left";
              const sizeClasses = "min-h-[86px] sm:min-h-[110px]";
              const closedClasses = "bg-red-50 border-red-300";
              const todayClasses = "ring-2 ring-yellow-200";
              const normalClasses = "bg-white";
              const cellClass = `${baseClasses} ${sizeClasses} ${isBlank ? "bg-slate-50" : (isClosed ? closedClasses : normalClasses)} ${isTodayCell && !isBlank ? todayClasses : ""}`;

              const tooltipLines = [];
              if (dayObj) {
                if (typeof dayObj.diet?.name === "string") tooltipLines.push(`Diet: ${dayObj.diet.name} (Rs ${dayObj.diet.price ?? 0})`);
                if (Array.isArray(dayObj.items) && dayObj.items.length > 0) {
                  const itemsText = dayObj.items.map(it => `${it.name} (Rs ${it.price})`).join("; ");
                  tooltipLines.push(`Items: ${itemsText}`);
                }
                if (dayObj.messOff) {
                  const mo = dayObj.messOff;
                  tooltipLines.push(`Off: ${mo.status || ""}`);
                  if (mo.leaving_date) tooltipLines.push(`Leaving: ${new Date(mo.leaving_date).toLocaleDateString()}`);
                  if (mo.return_date) tooltipLines.push(`Return: ${new Date(mo.return_date).toLocaleDateString()}`);
                } else if (dayObj.offInfo) {
                  const oi = dayObj.offInfo;
                  tooltipLines.push(`Off: ${oi.status || ""}`);
                }
              }

              return (
                <div key={idx} className={cellClass} title={tooltipLines.length ? tooltipLines.join("\n") : undefined}>
                  {isBlank ? null : (
                    <>
                      <div className="flex items-start justify-between">
                        <div className="text-blue-600 font-semibold text-sm sm:text-base">{d}</div>
                        {isTodayCell && <div className="text-xs text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded">Today</div>}
                      </div>

                      <div className="mt-2 text-xs sm:text-sm">
                        {isClosed ? (
                          <div>
                            <div className="text-sm text-red-700 font-semibold">Closed</div>
                            {items.length > 0 ? (
                              <ul className="mt-2 text-xs space-y-1 text-slate-700">
                                {items.map((it, i) => (<li key={i}>• {it.name} (Rs. {it.price})</li>))}
                              </ul>
                            ) : <div className="text-sm text-slate-500 mt-1">No items</div>}
                          </div>
                        ) : (
                          <>
                            {dayObj?.diet?.price != null ? (
                              <div className="text-sm text-slate-700">Diet: <span className="font-medium">Rs. {dayObj.diet.price}</span></div>
                            ) : (<div className="text-sm text-slate-400">No diet</div>)}
                            {items.length > 0 && (
                              <ul className="mt-2 text-xs space-y-1 text-slate-700">
                                {items.map((it, i) => (<li key={i}>• {it.name} (Rs. {it.price})</li>))}
                              </ul>
                            )}
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* footer */}
          <div className="p-4 sm:p-6 border-t">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="col-span-2 text-sm text-slate-600">
                <div>Diet Total: <span className="font-semibold text-slate-900">Rs. {totals.diet}</span></div>
                <div>Guests (Items) Total (excluding Rebate): <span className="font-semibold text-slate-900">Rs. {totals.itemsExcludingRebate}</span></div>
                <div>Rebate Total: <span className="font-semibold text-green-700">Rs. {totals.rebate}</span></div>
                <div>Closed Days: <span className="font-semibold text-red-600">{totals.closedDays}</span></div>
              </div>

              <div className="flex justify-end md:justify-center">
                <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-4 py-3 rounded-lg shadow-lg text-right">
                  <div className="text-xs opacity-90">Total Bill Amount</div>
                  <div className="text-xl sm:text-2xl font-extrabold">Rs. {totals.grand}</div>
                </div>
              </div>
            </div>

            <div className="text-xs text-right text-slate-400 mt-3">
              {loading ? "Loading..." : (bill ? `Last updated: ${new Date(bill.createdAt).toLocaleString()}` : "No bill")}
            </div>
          </div>
        </div>

        {!bill && !loading && (<div className="mt-4 text-center text-slate-600">No bill data for selected month/year.</div>)}
      </div>

      {/* Print CSS: hide only tiny action controls, keep sidebar/topbar visible.
          Also set smaller page margin so PDF includes more content by default. */}
      <style>{`
        @media print {
          .hide-on-print { display: none !important; }
          /* allow the app's sidebar/topbar to be printed as-is */
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          @page { size: auto; margin: 0.6cm; }
        }
      `}</style>
    </div>
  );
}
