"use client";

import { useState, useRef } from "react";
import { OtherReceiptForm } from "@/components/other-receipts/OtherReceiptForm";
import { OtherReceiptsTable } from "@/components/other-receipts/OtherReceiptsTable";
import { OtherReceipt } from "@/types/other_receipt";

export default function OtherReceiptsPage() {
  const tableRef = useRef<any>(null);
  const [editingData, setEditingData] = useState<OtherReceipt | undefined>();

  const refresh = () => {
    setEditingData(undefined);
    tableRef.current?.fetch();
  };

  return (
    <div className="p-6">
       
      <OtherReceiptForm initialData={editingData} onSuccess={refresh} />
      <OtherReceiptsTable ref={tableRef} onEdit={setEditingData} />
    </div>
  );
}
