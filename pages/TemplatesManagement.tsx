import AdminLayout from "../components/AdminLayout";
import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { Toast } from "@/components/prime";
const TemplatesManagement: React.FC = () => {
  const toast = useRef<Toast>(null);
  const [templates] = useState([
    { id: 1, name: "Biểu mẫu A", note: "Ghi chú cho biểu mẫu A", status: "Active" },
    { id: 2, name: "Biểu mẫu B", note: "Ghi chú cho biểu mẫu B", status: "Inactive" },
    { id: 3, name: "Biểu mẫu C", note: "Ghi chú cho biểu mẫu C", status: "Active" },
  ]);

  return (
    <AdminLayout title="Quản lý biểu mẫu">
      <Toast ref={toast} />
         <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden p-4">
            <div className="flex justify-end mb-4">
                <Button label="Thêm mới" icon="pi pi-plus" />
            </div>
            <div className="overflow-x-auto">
                <DataTable value={templates} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="id" header="ID" sortable></Column>
                    <Column field="name" header="Tên biểu mẫu" sortable></Column>
                    <Column field="note" header="Ghi chú"></Column>
                    <Column field="status" header="Trạng thái" sortable></Column>
                </DataTable>
            </div>
         </div>
    </AdminLayout>
  );
};
export default TemplatesManagement;
