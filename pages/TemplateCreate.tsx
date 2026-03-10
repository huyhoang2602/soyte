import AdminLayout from "../components/AdminLayout";
import React,
{
  useState,
  useRef
} from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "@/components/prime";

const TemplateCreate: React.FC = () =>
{
  const [ name, setName ] = useState("");
  const [ note, setNote ] = useState("");
  const [ status, setStatus ] = useState(null);
  const toast = useRef<Toast>(null);

  const statusOptions = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
  ];

  const handleSave = () =>
  {
    // Handle save logic here
    console.log({ name, note, status });
    toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Form saved successfully' });
  };

  const handleCancel = () =>
  {
    // Handle cancel logic here
    window.history.back();
  };


  return (
    <AdminLayout title="Tạo mới biểu mẫu">
      <Toast ref={toast} />
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden p-4">
        <div className="p-fluid">
          <div className="p-field mb-4">
            <label htmlFor="name">Tên biểu mẫu</label>
            <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="p-field mb-4">
            <label htmlFor="note">Ghi chú</label>
            <InputTextarea id="note" value={note} onChange={(e) => setNote(e.target.value)} rows={5} />
          </div>
          <div className="p-field mb-4">
            <label htmlFor="status">Trạng thái</label>
            <Dropdown id="status" value={status} options={statusOptions} onChange={(e) => setStatus(e.value)} placeholder="Select a Status" />
          </div>
          <div className="flex justify-end">
            <Button label="Hủy" icon="pi pi-times" onClick={handleCancel} className="p-button-text mr-2" />
            <Button label="Lưu" icon="pi pi-check" onClick={handleSave} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TemplateCreate;
