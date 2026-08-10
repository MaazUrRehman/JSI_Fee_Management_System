// import jsPDF from "jspdf";

// /* ============================================================
//    TYPES
// ============================================================ */

// export interface OtherReceiptStudent {
//   student_id?: string | number;
//   student_name?: string;
//   father_name?: string;
//   class?: string | number;
//   department?: string;
//   student_group?: string;
//   shift?: string;
//   phone?: string;
//   address?: string;
// }

// export interface OtherReceiptPDFInfo {
//   receipt_no?: string;
//   month: string;
//   year: number | string;
//   issue_date?: string;
//   due_date?: string;
//   paid_date?: string;
//   fees: number;
//   fees_details?: string;
//   total_amount: number;
//   paid_amount?: number;
//   remaining_amount?: number;
//   status: "Paid" | "Unpaid" | string;
// }

// /* ============================================================
//    PALETTE
// ============================================================ */

// const BLUE: [number, number, number] = [16, 55, 122];
// const HEAD_BG: [number, number, number] = [240, 244, 250];
// const LINE: [number, number, number] = [190, 205, 228];
// const TEXT: [number, number, number] = [38, 38, 38];
// const MUTED: [number, number, number] = [95, 105, 120];
// const RED: [number, number, number] = [196, 30, 30];
// const GREEN: [number, number, number] = [17, 122, 60];
// const WHATSAPP: [number, number, number] = [37, 150, 70];
// const PAGE_BG: [number, number, number] = [246, 247, 249];

// const money = (v = 0) =>
//   Math.round(v).toLocaleString("en-US", { maximumFractionDigits: 0 });

// const formatDateValue = (value?: string) => {
//   if (!value) return "-";
//   const parsed = new Date(value);
//   if (Number.isNaN(parsed.getTime())) return String(value);
//   return parsed.toLocaleDateString("en-GB");
// };

// /* ============================================================
//    SMALL HELPERS
// ============================================================ */

// function pillTitle(doc: jsPDF, text: string, cx: number, y: number, w: number) {
//   const x = cx - w / 2;
//   doc.setFillColor(...BLUE);
//   doc.roundedRect(x, y, w, 8.6, 1.6, 1.6, "F");
//   const label = text.toUpperCase();
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(12);
//   const size = Math.min(12, (12 * (w - 8)) / doc.getTextWidth(label));
//   doc.setFontSize(size);
//   doc.setTextColor(255, 255, 255);
//   doc.text(label, cx, y + 6, { align: "center" });
// }

// function row(
//   doc: jsPDF,
//   label: string,
//   value: string,
//   x: number,
//   y: number,
//   colonX: number,
//   valueX: number,
// ) {
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(10);
//   doc.setTextColor(...TEXT);
//   doc.text(label, x, y);
//   doc.text(":", colonX, y);
//   doc.setFont("helvetica", "normal");
//   doc.setTextColor(60, 60, 60);
//   doc.text(value, valueX, y);
// }

// function fitFontSize(
//   doc: jsPDF,
//   text: string,
//   font: string,
//   style: string,
//   targetW: number,
//   max = 40,
// ) {
//   doc.setFont(font, style);
//   doc.setFontSize(10);
//   const w10 = doc.getTextWidth(text);
//   return Math.min(max, (targetW / w10) * 10);
// }

// /* --- simple line icons (blue, 7x7mm) --- */
// function iconBox(doc: jsPDF, x: number, y: number) {
//   doc.setDrawColor(...BLUE);
//   doc.setLineWidth(0.45);
//   doc.roundedRect(x, y, 7, 7, 1.4, 1.4);
// }

// function icoId(doc: jsPDF, x: number, y: number) {
//   iconBox(doc, x, y);
//   doc.circle(x + 2.3, y + 3, 0.9);
//   doc.line(x + 4.2, y + 2.3, x + 5.7, y + 2.3);
//   doc.line(x + 4.2, y + 3.5, x + 5.7, y + 3.5);
//   doc.line(x + 1.4, y + 5.3, x + 5.7, y + 5.3);
// }

// function icoPerson(doc: jsPDF, x: number, y: number) {
//   doc.setDrawColor(...BLUE);
//   doc.setLineWidth(0.5);
//   doc.circle(x + 3.5, y + 2.1, 1.5);
//   doc.lines(
//     [
//       [1.6, -2.6],
//       [3.8, 0],
//       [1.6, 2.6],
//     ],
//     x + 0.6,
//     y + 7,
//   );
// }

// function icoFather(doc: jsPDF, x: number, y: number) {
//   doc.setDrawColor(...BLUE);
//   doc.setLineWidth(0.5);
//   doc.circle(x + 3.5, y + 2, 1.4);
//   doc.lines(
//     [
//       [1.6, -2.6],
//       [3.8, 0],
//       [1.6, 2.6],
//     ],
//     x + 0.6,
//     y + 7,
//   );
//   doc.setFillColor(...BLUE);
//   doc.triangle(x + 3.5, y + 3.9, x + 2.7, y + 5, x + 4.3, y + 5, "F");
// }

// function icoDoc(doc: jsPDF, x: number, y: number) {
//   doc.setDrawColor(...BLUE);
//   doc.setLineWidth(0.45);
//   doc.roundedRect(x + 0.6, y, 5.8, 7, 1.2, 1.2);
//   doc.line(x + 2, y + 2, x + 5, y + 2);
//   doc.line(x + 2, y + 3.5, x + 5, y + 3.5);
//   doc.line(x + 2, y + 5, x + 4, y + 5);
// }

// function icoBag(doc: jsPDF, x: number, y: number) {
//   doc.setDrawColor(...BLUE);
//   doc.setLineWidth(0.45);
//   doc.roundedRect(x, y + 1.8, 7, 5.2, 1.2, 1.2);
//   doc.roundedRect(x + 2.4, y, 2.2, 1.8, 0.6, 0.6);
//   doc.line(x, y + 4, x + 7, y + 4);
// }

// function icoCalendar(doc: jsPDF, x: number, y: number, star = false) {
//   doc.setDrawColor(...BLUE);
//   doc.setLineWidth(0.45);
//   doc.roundedRect(x, y + 0.8, 7, 6.2, 1.2, 1.2);
//   doc.line(x, y + 2.8, x + 7, y + 2.8);
//   doc.line(x + 1.8, y, x + 1.8, y + 1.4);
//   doc.line(x + 5.2, y, x + 5.2, y + 1.4);
//   doc.setFillColor(...BLUE);
//   if (star) {
//     doc.circle(x + 3.5, y + 4.9, 0.9, "F");
//   } else {
//     for (let r = 0; r < 2; r++)
//       for (let c = 0; c < 3; c++)
//         doc.rect(x + 1.5 + c * 1.6, y + 3.7 + r * 1.6, 0.9, 0.9, "F");
//   }
// }

// function icoPhone(doc: jsPDF, cx: number, cy: number, r = 2.6) {
//   doc.setFillColor(...BLUE);
//   doc.circle(cx, cy, r, "F");
//   doc.setDrawColor(255, 255, 255);
//   doc.setLineWidth(0.55);
//   doc.line(cx - 1.1, cy - 1.2, cx - 0.2, cy - 0.3);
//   doc.line(cx + 0.2, cy + 0.3, cx + 1.1, cy + 1.2);
//   doc.setLineWidth(0.5);
//   doc.line(cx - 0.2, cy - 0.3, cx + 0.3, cy + 0.2);
//   doc.setFillColor(255, 255, 255);
//   doc.circle(cx - 1.25, cy - 1.35, 0.42, "F");
//   doc.circle(cx + 1.25, cy + 1.35, 0.42, "F");
// }

// function icoWhatsApp(doc: jsPDF, cx: number, cy: number, r = 2.6) {
//   doc.setFillColor(...WHATSAPP);
//   doc.circle(cx, cy, r, "F");
//   doc.triangle(cx - 1.9, cy + 0.9, cx - 0.6, cy + 1.6, cx - 1.5, cy + 2.4, "F");
//   doc.setDrawColor(255, 255, 255);
//   doc.setLineWidth(0.5);
//   doc.circle(cx, cy - 0.1, 1.5);
//   doc.setFillColor(255, 255, 255);
//   doc.circle(cx - 0.75, cy - 0.75, 0.45, "F");
//   doc.circle(cx + 0.75, cy + 0.6, 0.45, "F");
//   doc.setLineWidth(0.45);
//   doc.line(cx - 0.55, cy - 0.5, cx + 0.55, cy + 0.4);
// }

// function addIcon(doc: jsPDF, path: string, x: number, y: number, size = 6) {
//   doc.addImage(path, "PNG", x, y, size, size);
// }

// /* --- rubber stamp --- */
// function stamp(
//   doc: jsPDF,
//   label: string,
//   cx: number,
//   cy: number,
//   paid: boolean,
//   date?: string,
// ) {
//   const color = paid ? GREEN : RED;
//   const ANGLE = -13;
//   const rad = (ANGLE * Math.PI) / 180;
//   const cos = Math.cos(rad);
//   const sin = Math.sin(rad);

//   const rot = (dx: number, dy: number): [number, number] => [
//     cx + dx * cos - dy * sin,
//     cy + dx * sin + dy * cos,
//   ];

//   const box = (hw: number, hh: number, lw: number) => {
//     doc.setLineWidth(lw);
//     const pts: Array<[number, number]> = [
//       rot(-hw, -hh),
//       rot(hw, -hh),
//       rot(hw, hh),
//       rot(-hw, hh),
//     ];
//     for (let i = 0; i < 4; i++) {
//       const a = pts[i]!;
//       const b = pts[(i + 1) % 4]!;
//       doc.line(a[0], a[1], b[0], b[1]);
//     }
//   };

//   doc.saveGraphicsState();
//   doc.setGState(new (doc as unknown as { GState: new (o: object) => unknown }).GState({ opacity: 0.85 }));
//   doc.setDrawColor(...color);
//   box(23, 8.5, 1.1);
//   box(21, 6.8, 0.4);
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(20);
//   doc.setTextColor(...color);
//   const t = rot(0, 2.3);
//   doc.text(label, t[0], t[1], {
//     align: "center",
//     angle: -ANGLE,
//   } as Parameters<jsPDF["text"]>[3]);
//   if (date) {
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(8);
//     doc.setTextColor(...color);
//     const d = rot(0, 6);
//     doc.text(date, d[0], d[1], {
//       align: "center",
//       angle: -ANGLE,
//     } as Parameters<jsPDF["text"]>[3]);
//   }
//   doc.restoreGraphicsState();
// }

// /* ============================================================
//    MAIN - Other Receipt PDF Generator
// ============================================================ */

// export const generateOtherReceiptPDF = (
//   student: OtherReceiptStudent,
//   info: OtherReceiptPDFInfo
// ) => {
//   const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
//   const isPaid = String(info.status).toLowerCase() === "paid";
//   const W = 210;

//   /* ---------- page + frame ---------- */
//   doc.setFillColor(...PAGE_BG);
//   doc.rect(0, 0, W, 297, "F");
//   doc.setFillColor(255, 255, 255);
//   doc.roundedRect(6, 6, 198, 285, 4, 4, "F");
//   doc.setDrawColor(...BLUE);
//   doc.setLineWidth(1.1);
//   doc.roundedRect(6, 6, 198, 285, 4, 4);

//   /* ---------- badge ---------- */
//   doc.setFillColor(...BLUE);
//   doc.roundedRect(151, 8.5, 49, 11, 2, 2, "F");
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(13);
//   doc.setTextColor(255, 255, 255);
//   doc.text(isPaid ? "PAID RECEIPT" : "FEE VOUCHER", 175.5, 16.1, {
//     align: "center",
//   });

//   /* ---------- header ---------- */
//   const TITLE = "JSI TUITION & COACHING CENTRE";
//   const SUPERVISION = "Under the Supervision of Sir Engr. Hafiz Muhammad Faizan-ul-Haq";
//   const TAGLINE = "A Promise of Improvement";

//   const titleSize = 25.5;
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(titleSize);
//   const titleW = doc.getTextWidth(TITLE);
//   const titleLeft = 105 - titleW / 2;
//   const titleRight = 105 + titleW / 2;

//   const supSize = fitFontSize(doc, SUPERVISION, "helvetica", "bold", titleW, 14);
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(supSize);
//   doc.setTextColor(20, 20, 20);
//   doc.text(SUPERVISION, titleLeft, 25, { align: "left" });

//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(titleSize);
//   doc.setTextColor(...BLUE);
//   doc.text(TITLE, titleLeft, 35.5, { align: "left" });

//   doc.setFont("times", "bolditalic");
//   doc.setFontSize(14);
//   doc.setTextColor(20, 20, 20);
//   doc.text(TAGLINE, titleRight, 42.5, { align: "right" });

//   /* ---------- student information ---------- */
//   const sTop = 50;
//   doc.setDrawColor(...BLUE);
//   doc.setLineWidth(0.7);
//   doc.roundedRect(10, sTop, 190, 54, 3.5, 3.5);
//   pillTitle(doc, "Student Information", 105, sTop - 4.3, 74);

//   doc.setLineWidth(0.6);
//   doc.line(105, sTop + 4.5, 105, sTop + 49.5);

//   const ys = [sTop + 10, sTop + 20.5, sTop + 31, sTop + 41.5, sTop + 50.5];

//   const leftRows: Array<
//     [(d: jsPDF, x: number, y: number) => void, string, string]
//   > = [
//     [icoId, "Student ID", String(student.student_id ?? "-")],
//     [icoPerson, "Student Name", String(student.student_name ?? "-")],
//     [icoFather, "Father Name", String(student.father_name ?? "-")],
//     [icoDoc, "Class", String(student.class ?? "-")],
//   ];

//   leftRows.forEach(([ico, label, value], i) => {
//     ico(doc, 15, ys[i]! - 5);
//     row(doc, label, value, 26, ys[i]!, 57, 63);
//   });

//   const rightRows: Array<[boolean, string, string]> = [
//     [false, "Issue Date", formatDateValue(info.issue_date ?? new Date().toISOString())],
//     [false, isPaid ? "Paid Date" : "Due Date", formatDateValue(isPaid ? (info.paid_date ?? new Date().toISOString()) : info.due_date)],
//     [false, "Fee Month", `${isNaN(Number(info.month)) ? info.month : new Date(0, Number(info.month) - 1).toLocaleString("en-US", { month: "long" })} ${info.year}`],
//     [false, "Status", isPaid ? "PAID" : "UNPAID"],
//   ];

//   rightRows.forEach(([isStar, label, value], i) => {
//     icoCalendar(doc, 111, ys[i]! - 5.5, isStar);
    
//     if (label === "Status") {
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(10);
//       doc.setTextColor(...TEXT);
//       doc.text(label, 122, ys[i]!);
//       doc.text(":", 153, ys[i]!);
//       doc.setTextColor(...(isPaid ? GREEN : RED));
//       doc.setFont("helvetica", "bold");
//       doc.text(value, 159, ys[i]!);
//     } else {
//       row(doc, label, value, 122, ys[i]!, 153, 159);
//     }
//   });

//   // Add Phone & Address in Student Info box (extra rows)
//   if (student.phone || student.address) {
//     const extraY = sTop + 54 + 4;
//     doc.setDrawColor(...LINE);
//     doc.setLineWidth(0.3);
//     doc.line(10, extraY, 200, extraY);
    
//     if (student.phone) {
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(9);
//       doc.setTextColor(...TEXT);
//       doc.text("Phone:", 15, extraY + 5);
//       doc.setFont("helvetica", "normal");
//       doc.setTextColor(60, 60, 60);
//       doc.text(String(student.phone), 45, extraY + 5);
//     }
    
//     if (student.address) {
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(9);
//       doc.setTextColor(...TEXT);
//       doc.text("Address:", 105, extraY + 5);
//       doc.setFont("helvetica", "normal");
//       doc.setTextColor(60, 60, 60);
//       doc.text(String(student.address), 130, extraY + 5);
//     }
//   }

//   /* ---------- watermark ---------- */
//   doc.saveGraphicsState();
//   doc.setGState(new (doc as unknown as { GState: new (o: object) => unknown }).GState({ opacity: 0.07 }));
//   const wmW = 260;
//   const wmH = 200;
//   doc.addImage("/pdf-assets/JSI_logo.jpeg", "JPEG", 105 - wmW / 2, 148 - wmH / 2, wmW, wmH, "jsi-watermark", "FAST");
//   doc.restoreGraphicsState();

//   /* ---------- fee details ---------- */
//   const tTop = 106;
//   const INSTR_TOP = 170;
//   const PAY_TOP = 230;
//   const cSno = 10,
//     cDesc = 32,
//     cAmt = 152,
//     tRight = 200;

//   const items = [{ name: info.fees_details || "Other Fees", amount: info.fees }];

//   const headH = 10;
//   const barH = 10;
//   const totalH = 25;
//   const maxRowsH = INSTR_TOP - 6 - tTop - barH - headH - totalH;
//   const rowH = Math.max(6.6, Math.min(9.5, maxRowsH / Math.max(items.length, 1)));
//   const tableH = barH + headH + items.length * rowH + totalH;

//   doc.setFillColor(...BLUE);
//   doc.roundedRect(cSno, tTop, tRight - cSno, barH, 3, 3, "F");
//   doc.rect(cSno, tTop + barH - 4, tRight - cSno, 4, "F");
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(12.5);
//   doc.setTextColor(255, 255, 255);
//   doc.text("FEE DETAILS", 105, tTop + 7.6, { align: "center" });

//   const hY = tTop + barH;
//   doc.setFillColor(...HEAD_BG);
//   doc.rect(cSno, hY, tRight - cSno, headH, "F");
//   doc.setTextColor(...BLUE);
//   doc.setFontSize(10.5);
//   doc.text("S.No.", (cSno + cDesc) / 2, hY + 7.2, { align: "center" });
//   doc.text("Description", (cDesc + cAmt) / 2, hY + 7.2, { align: "center" });
//   doc.text("Amount (PKR)", (cAmt + tRight) / 2, hY + 7.2, { align: "center" });

//   let y = hY + headH;
//   const rowBase = rowH * 0.68 + 1.6;
//   doc.setFontSize(Math.min(10.5, rowH * 1.35));
//   items.forEach((it, i) => {
//     doc.setDrawColor(...LINE);
//     doc.setLineWidth(0.3);
//     doc.line(cSno, y, tRight, y);

//     doc.setFont("helvetica", "normal");
//     doc.setTextColor(...TEXT);
//     doc.text(`${i + 1}.`, (cSno + cDesc) / 2, y + rowBase, { align: "center" });
//     doc.text(it.name, cDesc + 6, y + rowBase);

//     doc.setTextColor(...TEXT);
//     doc.text(money(Math.abs(it.amount)), tRight - 6, y + rowBase, { align: "right" });
//     y += rowH;
//   });

//   /* ---------- totals block ---------- */
//   const totalsTop = y;
//   doc.setDrawColor(...LINE);
//   doc.setLineWidth(0.4);
//   doc.line(cSno, totalsTop, tRight, totalsTop);

//   const paidAmt = info.paid_amount ?? (isPaid ? info.total_amount : 0);
//   const remainingAmt = info.remaining_amount ?? Math.max(info.total_amount - paidAmt, 0);

//   const totalsRows: Array<{
//     label: string;
//     value: number;
//     color: [number, number, number];
//     size: number;
//   }> = [
//     { label: "TOTAL AMOUNT", value: info.total_amount, color: BLUE, size: 13 },
//     { label: "REMAINING AMOUNT", value: remainingAmt, color: remainingAmt > 0 ? RED : GREEN, size: 11.5 },
//     { label: "PAID AMOUNT", value: paidAmt, color: GREEN, size: 11.5 },
//   ];

//   totalsRows.forEach((t, i) => {
//     const ty = totalsTop + 6.2 + i * 7.8;
//     if (i > 0) {
//       doc.setDrawColor(...LINE);
//       doc.setLineWidth(0.3);
//       doc.line(cSno, ty - 6.2, tRight, ty - 6.2);
//     }
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(t.size);
//     doc.setTextColor(...t.color);
//     doc.text(t.label, cAmt - 6, ty, { align: "right" });
//     doc.text(money(t.value), tRight - 6, ty, { align: "right" });
//   });

//   y = totalsTop + totalH;

//   doc.setDrawColor(...LINE);
//   doc.setLineWidth(0.4);
//   doc.line(cDesc, hY, cDesc, totalsTop);
//   doc.line(cAmt, hY, cAmt, y);

//   doc.setDrawColor(...BLUE);
//   doc.setLineWidth(0.7);
//   doc.roundedRect(cSno, tTop, tRight - cSno, tableH, 3.5, 3.5);

//   /* ---------- important instructions ---------- */
//   const iTop = Math.max(INSTR_TOP, tTop + tableH + 5);
//   const insH = Math.max(34, PAY_TOP - 11 - iTop);

//   doc.setDrawColor(...BLUE);
//   doc.setLineWidth(0.7);
//   doc.roundedRect(10, iTop, 190, insH, 3.5, 3.5);
//   pillTitle(doc, "Important Instructions", 105, iTop - 4.3, 82);

//   const instructions = [
//     "Please pay the fee by the due date. A late fee of Rs. 100/- will be charged after the 10th of the month, and Rs. 200/- after the 20th of the month.",
//     "All fees are non-refundable and non-transferable once paid.",
//     "The sibling discount is applicable only while two or more siblings remain enrolled. If one sibling withdraws, the regular fee will apply from the following month.",
//     "Please keep this voucher as proof of payment.",
//   ];

//   const insTextX = 24.5;
//   const insTextW = 140 - insTextX;

//   let insFont = 10.2;
//   let insBlocks: string[][] = [];
//   let insLine = 4.9;
//   const insTop = iTop + 8.5;
//   const insBottom = iTop + insH - 3;

//   for (; insFont >= 7.4; insFont -= 0.2) {
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(insFont);
//     insBlocks = instructions.map((t) => doc.splitTextToSize(t, insTextW) as string[]);
//     insLine = insFont * 0.46;
//     const gap = insLine * 0.75;
//     const totalLines = insBlocks.reduce((n, b) => n + b.length, 0);
//     const h = totalLines * insLine + (insBlocks.length - 1) * gap;
//     if (insTop + h <= insBottom) break;
//   }
//   const insGap = insLine * 0.75;

//   let insY = insTop;
//   insBlocks.forEach((lines, i) => {
//     doc.setFillColor(...BLUE);
//     doc.circle(17.5, insY - 1.3, 2.5, "F");
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(7.5);
//     doc.setTextColor(255, 255, 255);
//     doc.text(String(i + 1), 17.5, insY + 0.3, { align: "center" });

//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(insFont);
//     doc.setTextColor(...TEXT);
//     lines.forEach((l, li) => doc.text(l, insTextX, insY + li * insLine, { align: "left" }));
//     insY += lines.length * insLine + insGap;
//   });

//   const stampDateText = isPaid
//     ? formatDateValue(new Date().toISOString())
//     : formatDateValue(info.due_date);
//   stamp(doc, isPaid ? "PAID" : "UNPAID", 172, iTop + insH / 2 + 1, isPaid, stampDateText);

//   /* ---------- payment methods ---------- */
//   const pTop = PAY_TOP;
//   const payH = 28;
//   const GAP = 6;
//   const outerL = 10;
//   const outerW = 190;
//   const cardW = (outerW - GAP * 2) / 3;
//   const cardX = (i: number) => outerL + i * (cardW + GAP);

//   ["OPTION # 01", "OPTION # 02", "OPTION # 03"].forEach((t, i) => {
//     const x = cardX(i);
//     const cx = x + cardW / 2;

//     doc.setDrawColor(...BLUE);
//     doc.setLineWidth(0.7);
//     doc.roundedRect(x, pTop, cardW, payH, 3.5, 3.5);

//     doc.setFillColor(...BLUE);
//     doc.roundedRect(cx - cardW / 2 + 5, pTop + 3.2, cardW - 10, 5.6, 1.2, 1.2, "F");
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(8);
//     doc.setTextColor(255, 255, 255);
//     doc.text(t, cx, pTop + 7.2, { align: "center" });
//   });

//   pillTitle(doc, "Payment Methods (for online payments)", 105, pTop - 9.2, 110);

//   const bank: Array<[string, string]> = [
//     ["Bank Name", "HBL"],
//     ["Account Title", "MUHAMMAD FAIZAN"],
//     ["Account #", "22837900565703"],
//     ["IBAN", "PK11HABB0022837900565703"],
//     ["Branch Name", "MEHRAN, MALIR HALT."],
//   ];
//   let bY = pTop + 12.2;
//   const bankX = cardX(0) + 3.5;
//   const bankValX = bankX + 23;
//   const bankValMaxW = cardW - (bankValX - cardX(0)) - 3.5;
//   bank.forEach(([k, v]) => {
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(6.6);
//     doc.setTextColor(...TEXT);
//     doc.text(k, bankX, bY);
//     doc.text(":", bankX + 20, bY);
//     doc.setTextColor(...BLUE);
//     doc.setFontSize(6.2);
//     const vSize = Math.min(6.2, (6.2 * bankValMaxW) / doc.getTextWidth(v));
//     doc.setFontSize(vSize);
//     doc.text(v, bankValX, bY);
//     bY += 3.4;
//   });

//   const wallets = [
//     { title: "Easypaisa Account #", num: "0312-0397239" },
//     { title: "Jazzcash Account #", num: "0340-8797239" },
//   ];
//   wallets.forEach((w, i) => {
//     const cx = cardX(i + 1) + cardW / 2;
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(9);
//     doc.setTextColor(...TEXT);
//     doc.text(w.title, cx, pTop + 13, { align: "center" });
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(13);
//     doc.setTextColor(...BLUE);
//     doc.text(w.num, cx, pTop + 19, { align: "center" });
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(7.5);
//     doc.setTextColor(...MUTED);
//     doc.text("Account Title :", cx, pTop + 23.2, { align: "center" });
//     doc.setTextColor(...TEXT);
//     doc.text("MUHAMMAD FAIZAN-UL-HAQ", cx, pTop + 26.6, { align: "center" });
//   });

//   /* ---------- footer ---------- */
//   const fTop = 282;
//   doc.setDrawColor(...LINE);
//   doc.setLineWidth(0.4);
//   doc.line(10, fTop - 3.5, 200, fTop - 3.5);
//   doc.line(78, fTop - 1, 78, fTop + 8.5);
//   doc.line(140, fTop - 1, 140, fTop + 8.5);

//   doc.addImage("/pdf-assets/phone.png", "PNG", 12, fTop - 2, 5.5, 4.5);
//   doc.addImage("/pdf-assets/whatsapp.png", "PNG", 12, fTop + 3, 5.5, 4.5);
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(8.5);
//   doc.setTextColor(...BLUE);
//   doc.text("0312-0397239", 20, fTop + 2.2);
//   doc.text("0340-8797239", 20, fTop + 7.2);

//   addIcon(doc, "/pdf-assets/web.png", 80.5, fTop + 1, 6);
//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(8.5);
//   doc.setTextColor(...BLUE);
//   doc.text("www.jsieducationalnetwork.com", 89, fTop + 5, { align: "left" });

//   doc.setFillColor(...BLUE);
//   doc.circle(146, fTop + 2.6, 2.1, "F");
//   doc.triangle(144.4, fTop + 3.8, 147.6, fTop + 3.8, 146, fTop + 6.2, "F");
//   doc.setFillColor(255, 255, 255);
//   doc.circle(146, fTop + 2.4, 0.8, "F");
//   doc.setTextColor(...TEXT);
//   doc.setFontSize(8);
//   doc.text("A-73/22 Salman Farsi Society, Malir Halt,", 150, fTop + 2);
//   doc.text("Near Salman Farsi Masjid, Karachi.", 150, fTop + 7);

//   /* ---------- save ---------- */
//   const fileName = `${isPaid ? "Payment_Receipt" : "Fee_Voucher"}_${student.student_id ?? "Unknown_ID"}_${(student.student_name ?? "Unknown_Student").replace(/\s+/g, "_")}_${student.class ?? "Unknown_Class"}_JSI.pdf`;
//   doc.save(fileName);
//   return doc;
// };


























import jsPDF from "jspdf";

/* ============================================================
   TYPES
============================================================ */

export interface OtherReceiptStudent {
  student_id?: string | number;
  student_name?: string;
  father_name?: string;
  class?: string | number;
  department?: string;
  student_group?: string;
  shift?: string;
  phone?: string;
  address?: string;
}

export interface OtherReceiptPDFInfo {
  receipt_no?: string;
  month: string;
  year: number | string;
  issue_date?: string;
  due_date?: string;
  paid_date?: string;
  fees: number;
  fees_details?: string;
  total_amount: number;
  paid_amount?: number;
  remaining_amount?: number;
  status: "Paid" | "Unpaid" | string;
}

/* ============================================================
   PALETTE
============================================================ */

const BLUE: [number, number, number] = [16, 55, 122];
const HEAD_BG: [number, number, number] = [240, 244, 250];
const LINE: [number, number, number] = [190, 205, 228];
const TEXT: [number, number, number] = [38, 38, 38];
const MUTED: [number, number, number] = [95, 105, 120];
const RED: [number, number, number] = [196, 30, 30];
const GREEN: [number, number, number] = [17, 122, 60];
const WHATSAPP: [number, number, number] = [37, 150, 70];
const PAGE_BG: [number, number, number] = [246, 247, 249];

const money = (v = 0) =>
  Math.round(v).toLocaleString("en-US", { maximumFractionDigits: 0 });

const formatDateValue = (value?: string) => {
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return String(value);
  return parsed.toLocaleDateString("en-GB");
};

/* ============================================================
   SMALL HELPERS
============================================================ */

function pillTitle(doc: jsPDF, text: string, cx: number, y: number, w: number) {
  const x = cx - w / 2;
  doc.setFillColor(...BLUE);
  doc.roundedRect(x, y, w, 8.6, 1.6, 1.6, "F");
  const label = text.toUpperCase();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  const size = Math.min(12, (12 * (w - 8)) / doc.getTextWidth(label));
  doc.setFontSize(size);
  doc.setTextColor(255, 255, 255);
  doc.text(label, cx, y + 6, { align: "center" });
}

function row(
  doc: jsPDF,
  label: string,
  value: string,
  x: number,
  y: number,
  colonX: number,
  valueX: number,
) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...TEXT);
  doc.text(label, x, y);
  doc.text(":", colonX, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  doc.text(value, valueX, y);
}

function fitFontSize(
  doc: jsPDF,
  text: string,
  font: string,
  style: string,
  targetW: number,
  max = 40,
) {
  doc.setFont(font, style);
  doc.setFontSize(10);
  const w10 = doc.getTextWidth(text);
  return Math.min(max, (targetW / w10) * 10);
}

/* --- simple line icons (blue, 7x7mm) --- */
function iconBox(doc: jsPDF, x: number, y: number) {
  doc.setDrawColor(...BLUE);
  doc.setLineWidth(0.45);
  doc.roundedRect(x, y, 7, 7, 1.4, 1.4);
}

function icoId(doc: jsPDF, x: number, y: number) {
  iconBox(doc, x, y);
  doc.circle(x + 2.3, y + 3, 0.9);
  doc.line(x + 4.2, y + 2.3, x + 5.7, y + 2.3);
  doc.line(x + 4.2, y + 3.5, x + 5.7, y + 3.5);
  doc.line(x + 1.4, y + 5.3, x + 5.7, y + 5.3);
}

function icoPerson(doc: jsPDF, x: number, y: number) {
  doc.setDrawColor(...BLUE);
  doc.setLineWidth(0.5);
  doc.circle(x + 3.5, y + 2.1, 1.5);
  doc.lines(
    [
      [1.6, -2.6],
      [3.8, 0],
      [1.6, 2.6],
    ],
    x + 0.6,
    y + 7,
  );
}

function icoFather(doc: jsPDF, x: number, y: number) {
  doc.setDrawColor(...BLUE);
  doc.setLineWidth(0.5);
  doc.circle(x + 3.5, y + 2, 1.4);
  doc.lines(
    [
      [1.6, -2.6],
      [3.8, 0],
      [1.6, 2.6],
    ],
    x + 0.6,
    y + 7,
  );
  doc.setFillColor(...BLUE);
  doc.triangle(x + 3.5, y + 3.9, x + 2.7, y + 5, x + 4.3, y + 5, "F");
}

function icoDoc(doc: jsPDF, x: number, y: number) {
  doc.setDrawColor(...BLUE);
  doc.setLineWidth(0.45);
  doc.roundedRect(x + 0.6, y, 5.8, 7, 1.2, 1.2);
  doc.line(x + 2, y + 2, x + 5, y + 2);
  doc.line(x + 2, y + 3.5, x + 5, y + 3.5);
  doc.line(x + 2, y + 5, x + 4, y + 5);
}

function icoBag(doc: jsPDF, x: number, y: number) {
  doc.setDrawColor(...BLUE);
  doc.setLineWidth(0.45);
  doc.roundedRect(x, y + 1.8, 7, 5.2, 1.2, 1.2);
  doc.roundedRect(x + 2.4, y, 2.2, 1.8, 0.6, 0.6);
  doc.line(x, y + 4, x + 7, y + 4);
}

function icoCalendar(doc: jsPDF, x: number, y: number, star = false) {
  doc.setDrawColor(...BLUE);
  doc.setLineWidth(0.45);
  doc.roundedRect(x, y + 0.8, 7, 6.2, 1.2, 1.2);
  doc.line(x, y + 2.8, x + 7, y + 2.8);
  doc.line(x + 1.8, y, x + 1.8, y + 1.4);
  doc.line(x + 5.2, y, x + 5.2, y + 1.4);
  doc.setFillColor(...BLUE);
  if (star) {
    doc.circle(x + 3.5, y + 4.9, 0.9, "F");
  } else {
    for (let r = 0; r < 2; r++)
      for (let c = 0; c < 3; c++)
        doc.rect(x + 1.5 + c * 1.6, y + 3.7 + r * 1.6, 0.9, 0.9, "F");
  }
}

function icoPhone(doc: jsPDF, cx: number, cy: number, r = 2.6) {
  doc.setFillColor(...BLUE);
  doc.circle(cx, cy, r, "F");
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.55);
  doc.line(cx - 1.1, cy - 1.2, cx - 0.2, cy - 0.3);
  doc.line(cx + 0.2, cy + 0.3, cx + 1.1, cy + 1.2);
  doc.setLineWidth(0.5);
  doc.line(cx - 0.2, cy - 0.3, cx + 0.3, cy + 0.2);
  doc.setFillColor(255, 255, 255);
  doc.circle(cx - 1.25, cy - 1.35, 0.42, "F");
  doc.circle(cx + 1.25, cy + 1.35, 0.42, "F");
}

function icoWhatsApp(doc: jsPDF, cx: number, cy: number, r = 2.6) {
  doc.setFillColor(...WHATSAPP);
  doc.circle(cx, cy, r, "F");
  doc.triangle(cx - 1.9, cy + 0.9, cx - 0.6, cy + 1.6, cx - 1.5, cy + 2.4, "F");
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.5);
  doc.circle(cx, cy - 0.1, 1.5);
  doc.setFillColor(255, 255, 255);
  doc.circle(cx - 0.75, cy - 0.75, 0.45, "F");
  doc.circle(cx + 0.75, cy + 0.6, 0.45, "F");
  doc.setLineWidth(0.45);
  doc.line(cx - 0.55, cy - 0.5, cx + 0.55, cy + 0.4);
}

function addIcon(doc: jsPDF, path: string, x: number, y: number, size = 6) {
  doc.addImage(path, "PNG", x, y, size, size);
}

/* --- rubber stamp --- */
function stamp(
  doc: jsPDF,
  label: string,
  cx: number,
  cy: number,
  paid: boolean,
  date?: string,
) {
  const color = paid ? GREEN : RED;
  const ANGLE = -13;
  const rad = (ANGLE * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  const rot = (dx: number, dy: number): [number, number] => [
    cx + dx * cos - dy * sin,
    cy + dx * sin + dy * cos,
  ];

  const box = (hw: number, hh: number, lw: number) => {
    doc.setLineWidth(lw);
    const pts: Array<[number, number]> = [
      rot(-hw, -hh),
      rot(hw, -hh),
      rot(hw, hh),
      rot(-hw, hh),
    ];
    for (let i = 0; i < 4; i++) {
      const a = pts[i]!;
      const b = pts[(i + 1) % 4]!;
      doc.line(a[0], a[1], b[0], b[1]);
    }
  };

  doc.saveGraphicsState();
  doc.setGState(new (doc as unknown as { GState: new (o: object) => unknown }).GState({ opacity: 0.85 }));
  doc.setDrawColor(...color);
  box(23, 8.5, 1.1);
  box(21, 6.8, 0.4);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(...color);
  const t = rot(0, 2.3);
  doc.text(label, t[0], t[1], {
    align: "center",
    angle: -ANGLE,
  } as Parameters<jsPDF["text"]>[3]);
  if (date) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...color);
    const d = rot(0, 6);
    doc.text(date, d[0], d[1], {
      align: "center",
      angle: -ANGLE,
    } as Parameters<jsPDF["text"]>[3]);
  }
  doc.restoreGraphicsState();
}

/* ============================================================
   MAIN - Other Receipt PDF Generator
============================================================ */

export const generateOtherReceiptPDF = (
  student: OtherReceiptStudent,
  info: OtherReceiptPDFInfo
) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const isPaid = String(info.status).toLowerCase() === "paid";
  const W = 210;

  /* ---------- page + frame ---------- */
  doc.setFillColor(...PAGE_BG);
  doc.rect(0, 0, W, 297, "F");
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(6, 6, 198, 260, 4, 4, "F");
  doc.setDrawColor(...BLUE);
  doc.setLineWidth(1.1);
  doc.roundedRect(6, 6, 198, 260, 4, 4);

  /* ---------- badge ---------- */
  doc.setFillColor(...BLUE);
  doc.roundedRect(151, 8.5, 49, 11, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text(isPaid ? "PAID RECEIPT" : "FEE VOUCHER", 175.5, 16.1, {
    align: "center",
  });

  /* ---------- header ---------- */
  const TITLE = "JSI TUITION & COACHING CENTRE";
  const SUPERVISION = "Under the Supervision of Sir Engr. Hafiz Muhammad Faizan-ul-Haq";
  // const TAGLINE = "A Promise of Improvement";

  const titleSize = 25.5;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(titleSize);
  const titleW = doc.getTextWidth(TITLE);
  const titleLeft = 105 - titleW / 2;
  const titleRight = 105 + titleW / 2;

  // supervision line -> title se thoda lamba
  const supSize = fitFontSize(doc, SUPERVISION, "helvetica", "bold", titleW + 15, 14);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(supSize);
  doc.setTextColor(20, 20, 20);
  doc.text(SUPERVISION, titleLeft, 25, { align: "left" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(titleSize);
  doc.setTextColor(...BLUE);
  doc.text(TITLE, titleLeft, 35.5, { align: "left" });

  // tagline -> image
  doc.addImage(
    "/pdf-assets/a_promise_of_improvement.png",
    "PNG",
    titleRight - 75,
    36,
    78,
    7
  );

  /* ---------- student information ---------- */
  const sTop = 50;
  doc.setDrawColor(...BLUE);
  doc.setLineWidth(0.7);
  doc.roundedRect(10, sTop, 190, 54, 3.5, 3.5);
  pillTitle(doc, "Student Information", 105, sTop - 4.3, 74);

  doc.setLineWidth(0.6);
  doc.line(105, sTop + 4.5, 105, sTop + 52);

  const ys = [sTop + 10, sTop + 20.5, sTop + 31, sTop + 41.5, sTop + 50.5];

  // Left side - without icons
  const leftRows: Array<[string, string]> = [
    ["Student ID", String(student.student_id ?? "-")],
    ["Student Name", String(student.student_name ?? "-")],
    ["Father Name", String(student.father_name ?? "-")],
    ["Class", String(student.class ?? "-")],
  ];

  leftRows.forEach(([label, value], i) => {
    row(doc, label, value, 15, ys[i]!, 45, 50);
  });

  // Right side - without icons
  const rightRows: Array<[string, string]> = [
    ["Issue Date", formatDateValue(info.issue_date ?? new Date().toISOString())],
    [isPaid ? "Paid Date" : "Due Date", formatDateValue(isPaid ? (info.paid_date ?? new Date().toISOString()) : info.due_date)],
    ["Fee Month", `${isNaN(Number(info.month)) ? info.month : new Date(0, Number(info.month) - 1).toLocaleString("en-US", { month: "long" })} ${info.year}`],
  ];

  rightRows.forEach(([label, value], i) => {
    row(doc, label, value, 111, ys[i]!, 141, 146);
  });

  // Status row - alag se with color
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...TEXT);
  doc.text("Status", 111, ys[3]!);
  doc.text(":", 141, ys[3]!);
  if (isPaid) {
    doc.setTextColor(...GREEN);
    doc.text("PAID", 146, ys[3]!);
  } else {
    doc.setTextColor(...RED);
    doc.text("UNPAID", 146, ys[3]!);
  }

  // Add Phone & Address in Student Info box (extra rows)
  if (student.phone || student.address) {
    const extraY = sTop + 54 + 4;
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.3);
    doc.line(10, extraY, 200, extraY);
    
    if (student.phone) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(...TEXT);
      doc.text("Phone:", 15, extraY + 5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(60, 60, 60);
      doc.text(String(student.phone), 45, extraY + 5);
    }
    
    if (student.address) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(...TEXT);
      doc.text("Address:", 105, extraY + 5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(60, 60, 60);
      doc.text(String(student.address), 130, extraY + 5);
    }
  }

  /* ---------- watermark ---------- */
  doc.saveGraphicsState();
  doc.setGState(new (doc as unknown as { GState: new (o: object) => unknown }).GState({ opacity: 0.07 }));
  const wmW = 250;
  const wmH = 180;
  doc.addImage("/pdf-assets/JSI_logo.jpeg", "JPEG", 105 - wmW / 2, 156 - wmH / 2, wmW, wmH, "jsi-watermark", "FAST");
  doc.restoreGraphicsState();

  /* ---------- fee details ---------- */
  const tTop = 106;
  const INSTR_TOP = 167;
  const PAY_TOP = 222;
  const cSno = 10,
    cDesc = 32,
    cAmt = 152,
    tRight = 200;

  const items = [{ name: info.fees_details || "Other Fees", amount: info.fees }];

  const headH = 10;
  const barH = 10;
  const totalH = 25;
  const maxRowsH = INSTR_TOP - 6 - tTop - barH - headH - totalH;
  const rowH = Math.max(6.6, Math.min(9.5, maxRowsH / Math.max(items.length, 1)));
  const tableH = barH + headH + items.length * rowH + totalH;

  doc.setFillColor(...BLUE);
  doc.roundedRect(cSno, tTop, tRight - cSno, barH, 3, 3, "F");
  doc.rect(cSno, tTop + barH - 4, tRight - cSno, 4, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  doc.setTextColor(255, 255, 255);
  doc.text("FEE DETAILS", 105, tTop + 6.3, { align: "center" });

  const hY = tTop + barH;
  doc.setFillColor(...HEAD_BG);
  doc.rect(cSno, hY, tRight - cSno, headH, "F");
  doc.setTextColor(...BLUE);
  doc.setFontSize(10.5);
  doc.text("#", (cSno + cDesc) / 2, hY + 7.2, { align: "center" });
  doc.text("Description", (cDesc + cAmt) / 2, hY + 7.2, { align: "center" });
  doc.text("Amount (PKR)", (cAmt + tRight) / 2, hY + 7.2, { align: "center" });

  let y = hY + headH;
  const rowBase = rowH * 0.68 + 1.6;
  doc.setFontSize(Math.min(10.5, rowH * 1.35));
  items.forEach((it, i) => {
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.3);
    doc.line(cSno, y, tRight, y);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...TEXT);
    doc.text(`${i + 1}.`, (cSno + cDesc) / 2, y + rowBase, { align: "center" });
    doc.text(it.name, cDesc + 6, y + rowBase);

    doc.setTextColor(...TEXT);
    doc.text(money(Math.abs(it.amount)), tRight - 6, y + rowBase, { align: "right" });
    y += rowH;
  });

  /* ---------- totals block ---------- */
  const totalsTop = y;
  doc.setDrawColor(...LINE);
  doc.setLineWidth(0.4);
  doc.line(cSno, totalsTop, tRight, totalsTop);

  const paidAmt = info.paid_amount ?? (isPaid ? info.total_amount : 0);
  const remainingAmt = info.remaining_amount ?? Math.max(info.total_amount - paidAmt, 0);

  const totalsRows: Array<{
    label: string;
    value: number;
    color: [number, number, number];
    size: number;
  }> = [
    { label: "TOTAL AMOUNT", value: info.total_amount, color: BLUE, size: 13 },
    { label: "PAID AMOUNT", value: paidAmt, color: GREEN, size: 11.5 },
    { label: "REMAINING AMOUNT", value: remainingAmt, color: remainingAmt > 0 ? RED : GREEN, size: 11.5 },
  ];

  totalsRows.forEach((t, i) => {
    const ty = totalsTop + 6.2 + i * 7.8;
    if (i > 0) {
      doc.setDrawColor(...LINE);
      doc.setLineWidth(0.3);
      doc.line(cSno, ty - 6.2, tRight, ty - 6.2);
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(t.size);
    doc.setTextColor(...t.color);
    doc.text(t.label, cAmt - 6, ty, { align: "right" });
    doc.text(money(t.value), tRight - 6, ty, { align: "right" });
  });

  y = totalsTop + totalH;

  doc.setDrawColor(...LINE);
  doc.setLineWidth(0.4);
  doc.line(cDesc, hY, cDesc, totalsTop);
  doc.line(cAmt, hY, cAmt, y);

  doc.setDrawColor(...BLUE);
  doc.setLineWidth(0.7);
  doc.roundedRect(cSno, tTop, tRight - cSno, tableH, 3.5, 3.5);

  /* ---------- important instructions ---------- */
  const iTop = Math.max(INSTR_TOP, tTop + tableH + 2);
  const insH = Math.max(34, PAY_TOP - 11 - iTop);

  doc.setDrawColor(...BLUE);
  doc.setLineWidth(0.7);
  doc.roundedRect(10, iTop, 190, insH, 3.5, 3.5);
  pillTitle(doc, "Important Instructions", 105, iTop - 4.3, 82);

  const instructions = [
    "Please pay the fee by the due date. A late fee of Rs. 100/- will be charged after the 10th of the month, and Rs. 200/- after the 20th of the month.",
    "All fees are non-refundable and non-transferable once paid.",
    "The sibling discount is applicable only while two or more siblings remain enrolled. If one sibling withdraws, the regular fee will apply from the following month.",
    "Please keep this voucher as proof of payment.",
  ];

  const insTextX = 24.5;
  const insTextW = 140 - insTextX;

  let insFont = 10.2;
  let insBlocks: string[][] = [];
  let insLine = 4.9;
  const insTop = iTop + 8.5;
  const insBottom = iTop + insH - 3;

  for (; insFont >= 7.4; insFont -= 0.2) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(insFont);
    insBlocks = instructions.map((t) => doc.splitTextToSize(t, insTextW) as string[]);
    insLine = insFont * 0.46;
    const gap = insLine * 0.75;
    const totalLines = insBlocks.reduce((n, b) => n + b.length, 0);
    const h = totalLines * insLine + (insBlocks.length - 1) * gap;
    if (insTop + h <= insBottom) break;
  }
  const insGap = insLine * 0.75;

  let insY = insTop;
  insBlocks.forEach((lines, i) => {
    doc.setFillColor(...BLUE);
    doc.circle(17.5, insY - 1.3, 2.5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text(String(i + 1), 17.5, insY - 0.3, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(insFont);
    doc.setTextColor(...TEXT);
    lines.forEach((l, li) => doc.text(l, insTextX, insY + li * insLine, { align: "left" }));
    insY += lines.length * insLine + insGap;
  });

  const stampDateText = isPaid
    ? formatDateValue(new Date().toISOString())
    : formatDateValue(info.due_date);
  stamp(doc, isPaid ? "PAID" : "UNPAID", 172, iTop + insH / 2 + 1, isPaid, stampDateText);

  /* ---------- payment methods ---------- */
  const pTop = PAY_TOP;
  const payH = 28;
  const GAP = 6;
  const outerL = 10;
  const outerW = 190;
  const cardW = (outerW - GAP * 2) / 3;
  const cardX = (i: number) => outerL + i * (cardW + GAP);

  ["OPTION # 01", "OPTION # 02", "OPTION # 03"].forEach((t, i) => {
    const x = cardX(i);
    const cx = x + cardW / 2;

    doc.setDrawColor(...BLUE);
    doc.setLineWidth(0.7);
    doc.roundedRect(x, pTop, cardW, payH, 3.5, 3.5);

    // Heading - White background, Blue text, Blue border
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...BLUE);
    doc.setLineWidth(0.5);
    doc.roundedRect(cx - cardW / 2 + 5, pTop + 2.2, cardW - 10, 5.6, 1.2, 1.2, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...BLUE);
    doc.text(t, cx, pTop + 5.9, { align: "center" });
  });

  pillTitle(doc, "Payment Methods (for online payments)", 105, pTop - 10.2, 110);

  const bank: Array<[string, string]> = [
    ["Bank Name", "HBL"],
    ["Account Title", "MUHAMMAD FAIZAN"],
    ["Account #", "22837900565703"],
    ["IBAN", "PK11HABB0022837900565703"],
    ["Branch Name", "MEHRAN, MALIR HALT."],
  ];
  let bY = pTop + 12.2;
  const bankX = cardX(0) + 3.5;
  const bankValX = bankX + 23;
  const bankValMaxW = cardW - (bankValX - cardX(0)) - 3.5;
  bank.forEach(([k, v]) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.6);
    doc.setTextColor(...TEXT);
    doc.text(k, bankX, bY);
    doc.text(":", bankX + 20, bY);
    doc.setTextColor(...BLUE);
    doc.setFontSize(6.2);
    const vSize = Math.min(6.2, (6.2 * bankValMaxW) / doc.getTextWidth(v));
    doc.setFontSize(vSize);
    doc.text(v, bankValX, bY);
    bY += 3.4;
  });

  const wallets = [
    { title: "Easypaisa Account #", num: "0312-0397239" },
    { title: "Jazzcash Account #", num: "0340-8797239" },
  ];
  wallets.forEach((w, i) => {
    const cx = cardX(i + 1) + cardW / 2;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...TEXT);
    doc.text(w.title, cx, pTop + 13, { align: "center" });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...BLUE);
    doc.text(w.num, cx, pTop + 19, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...MUTED);
    doc.text("Account Title :", cx, pTop + 23.2, { align: "center" });
    doc.setTextColor(...TEXT);
    doc.text("MUHAMMAD FAIZAN-UL-HAQ", cx, pTop + 26.6, { align: "center" });
  });

  /* ---------- footer ---------- */
  const fTop = 255;
  doc.setDrawColor(...LINE);
  doc.setLineWidth(0.4);
  doc.line(10, fTop - 3.5, 200, fTop - 3.5);
  doc.line(78, fTop - 1, 78, fTop + 8.5);
  doc.line(140, fTop - 1, 140, fTop + 8.5);

  doc.addImage("/pdf-assets/phone.png", "PNG", 12, fTop - 2, 5, 4);
  doc.addImage("/pdf-assets/whatsapp.png", "PNG", 12, fTop + 3, 5, 4);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(...BLUE);
  doc.text("0312-0397239", 20, fTop + 1);
  doc.text("0340-8797239", 20, fTop + 6);

  addIcon(doc, "/pdf-assets/web.png", 80.5, fTop - 0.5, 6);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...BLUE);
  doc.text("www.jsieducationalnetwork.com", 89, fTop + 3.5, { align: "left" });

  doc.setFillColor(...BLUE);
  doc.circle(146, fTop + 2.6, 2.1, "F");
  doc.triangle(144.4, fTop + 3.8, 147.6, fTop + 3.8, 146, fTop + 6.2, "F");
  doc.setFillColor(255, 255, 255);
  doc.circle(146, fTop + 2.4, 0.8, "F");
  doc.setTextColor(...TEXT);
  doc.setFontSize(8);
  doc.text("A-73/22 Salman Farsi Society, Malir Halt,", 150, fTop + 2);
  doc.text("Near Salman Farsi Masjid, Karachi.", 150, fTop + 7);

  /* ---------- save ---------- */
  const fileName = `${isPaid ? "Payment_Receipt" : "Fee_Voucher"}_${student.student_id ?? "Unknown_ID"}_${(student.student_name ?? "Unknown_Student").replace(/\s+/g, "_")}_${student.class ?? "Unknown_Class"}_JSI.pdf`;
  doc.save(fileName);
  return doc;
};