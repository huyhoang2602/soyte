import { api } from "@/api";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import React, { useState } from "react";

export default function BieuMau1Table({ id,formData }) {

  const [tableData, setTableData] = useState(formData.data);
  const [formInfo, setFormInfo] = useState({
    title: formData.name,
    description: formData.description
  });
  const toRoman = (num) => {
  const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX"];
  return roman[num] || num;
};
const [visible, setVisible] = useState(false);
  const [creatorName, setCreatorName] = useState("");
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const updateProgress = (sectionIndex, optionIndex, value) => {
    const newData = [...tableData];
    newData[sectionIndex].option[optionIndex].progress.value = value;
    setTableData(newData);
  };

  const updateRating = (sectionIndex, optionIndex, value) => {
    const newData = [...tableData];
    newData[sectionIndex].option[optionIndex].rating.value = value;
    setTableData(newData);
  };

  const updateNote = (sectionIndex, optionIndex, value) => {
    const newData = [...tableData];
    newData[sectionIndex].option[optionIndex].note = value;
    setTableData(newData);
  };
  const handleSubmit = () => {
    setVisible(true);
  };
  const submitForm = async () => {
    try {
      const datamap = convertSubmissionData(tableData);

      const payload = {
        form_id: Number(id),
        creator_name: creatorName || "Người gửi ẩn danh",
        submission_data: datamap,
        status: "pending",
      };

      const res = await api.post("/feedbacks", payload);

      console.log("Submit success:", res.data);

      setVisible(false);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };
  const convertSubmissionData = (data:any) => {
    return data.map((section) => ({
      name: section.name,
      option: section.option.map((item) => ({
        tiendo: item.progress?.value ?? 0,
        danhgia: item.rating?.value ?? 0,
        ghichu: item.note || "",
      })),
    }));
  };
   return (
      <div className="w-[85%] mx-auto mt-10">
        <h3 className="text-center font-semibold text-lg">{formInfo.title}</h3>
  
        <p className="text-center mb-6">{formInfo.description}</p>
  
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2" rowSpan="2">
                STT
              </th>
              <th className="border border-gray-300 p-2" rowSpan="2">
                Nội dung thực hiện
              </th>
              <th className="border border-gray-300 p-2" rowSpan="2">
                Phương thức thực hiện
              </th>
              <th className="border border-gray-300 p-2" rowSpan="2">
                Sản phẩm đầu ra
              </th>
  
              <th className="border border-gray-300 p-2" colSpan="3">
                Tiến độ thực hiện
              </th>
  
              <th className="border border-gray-300 p-2" colSpan="2">
                Đánh giá
              </th>
  
              <th className="border border-gray-300 p-2" rowSpan="2">
                Ghi chú / Kiến nghị
              </th>
            </tr>
  
            <tr>
              <th className="border border-gray-300 p-2">Đã thực hiện</th>
              <th className="border border-gray-300 p-2">Đang thực hiện</th>
              <th className="border border-gray-300 p-2">Chưa thực hiện</th>
              <th className="border border-gray-300 p-2">Đạt</th>
              <th className="border border-gray-300 p-2">Không đạt</th>
            </tr>
          </thead>
  
          <tbody>
            {tableData.map((section, sIndex) => (
              <React.Fragment key={sIndex}>
                {/* Section */}
  
                <tr
                  className="bg-gray-50 font-semibold cursor-pointer"
                  onClick={() => toggleSection(sIndex)}
                >
                  <td className="border border-gray-300 w-[70px] relative text-center">
                    {/* icon bám trái */}
                    <i
                      className={`pi ${
                        openSections[sIndex]
                          ? "pi-chevron-down"
                          : "pi-chevron-right"
                      } absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer`}
                    />
  
                    {/* Roman căn giữa */}
                    <span className="font-semibold">{toRoman(sIndex)}</span>
                  </td>
  
                  <td colSpan="9" className="border border-gray-300 p-2">
                    {section.name}
                  </td>
                </tr>
  
                {!openSections[sIndex] &&
                  section.option.map((item, oIndex) => (
                    <tr key={oIndex}>
                      <td className="border border-gray-300 text-center p-2">
                        {oIndex + 1}
                      </td>
  
                      <td className="border border-gray-300 p-2">
                        {item.content}
                      </td>
  
                      <td className="border border-gray-300 p-2">
                        {item.method}
                      </td>
  
                      <td className="border border-gray-300 p-2">
                        {item.productOut}
                      </td>
  
                      {/* Progress */}
  
                      <td className="border border-gray-300 text-center">
                        <RadioButton
                          name={`progress-${sIndex}-${oIndex}`}
                          value={1}
                          checked={item.progress.value === 1}
                          onChange={() => updateProgress(sIndex, oIndex, 1)}
                          className="
                          [&_.p-radiobutton-box]:border-2
                          [&_.p-radiobutton-box]:border-slate-500
                        "
                        />
                      </td>
  
                      <td className="border border-gray-300 text-center">
                        <RadioButton
                          name={`progress-${sIndex}-${oIndex}`}
                          value={2}
                          checked={item.progress.value === 2}
                          onChange={() => updateProgress(sIndex, oIndex, 2)}
                          className="
                          [&_.p-radiobutton-box]:border-2
                          [&_.p-radiobutton-box]:border-slate-500
                        "
                        />
                      </td>
  
                      <td className="border border-gray-300 text-center">
                        <RadioButton
                          name={`progress-${sIndex}-${oIndex}`}
                          value={3}
                          checked={item.progress.value === 3}
                          onChange={() => updateProgress(sIndex, oIndex, 3)}
                          className="
                          [&_.p-radiobutton-box]:border-2
                          [&_.p-radiobutton-box]:border-slate-500
                        "
                        />
                      </td>
  
                      {/* Rating */}
  
                      <td className="border border-gray-300 text-center">
                        <RadioButton
                          name={`rating-${sIndex}-${oIndex}`}
                          value={1}
                          checked={item.rating.value === 1}
                          onChange={() => updateRating(sIndex, oIndex, 1)}
                          className="
                          [&_.p-radiobutton-box]:border-2
                          [&_.p-radiobutton-box]:border-slate-500
                        "
                        />
                      </td>
  
                      <td className="border border-gray-300 text-center">
                        <RadioButton
                          name={`rating-${sIndex}-${oIndex}`}
                          value={2}
                          checked={item.rating.value === 2}
                          onChange={() => updateRating(sIndex, oIndex, 2)}
                          className="
                          [&_.p-radiobutton-box]:border-2
                          [&_.p-radiobutton-box]:border-slate-500
                        "
                        />
                      </td>
  
                      {/* Note */}
  
                      <td className="border border-gray-300 p-1 w-[250px]">
                        <InputTextarea
                          value={item.note || ""}
                          onChange={(e) =>
                            updateNote(sIndex, oIndex, e.target.value)
                          }
                          rows={2}
                          autoResize
                          className="w-full h-full border-none outline-none shadow-none rounded-none p-2 bg-transparent resize-none"
                        />
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <div className="flex mt-6 justify-end mb-2">
          <Button
            label="Gửi biểu mẫu"
            icon="pi pi-send"
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-300"
          />
        </div>
        <Dialog
          header="Thông tin người gửi"
          visible={visible}
          style={{ width: "520px" }}
          onHide={() => setVisible(false)}
        >
          <div className="px-2 py-3 flex flex-col gap-4">
            {/* Họ tên */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-700">Họ và tên</label>
  
              <span className="p-input-icon-left w-full relative ">
                <i className="pi pi-user text-gray-400 absolute left-3 top-1/2 " />
  
                <InputText
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  placeholder="Nhập họ và tên"
                  className="w-full h-[42px] pl-10"
                />
              </span>
            </div>
  
            {/* Tuổi + Ngày sinh */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-gray-700">Tuổi</label>
  
                <span className="p-input-icon-left w-full relative">
                  <i className="pi pi-id-card text-gray-400 absolute left-3 top-1/2" />
                  <InputText
                    placeholder="Nhập tuổi"
                    className="w-full h-[42px] pl-10"
                  />
                </span>
              </div>
  
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-gray-700">Ngày sinh</label>
  
                <span className="p-input-icon-left w-full relative">
                  <i className="pi pi-calendar text-gray-400 absolute left-3 top-1/2" />
                  <InputText type="date" className="w-full h-[42px] pl-10" />
                </span>
              </div>
            </div>
  
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-700">Email</label>
  
              <span className="p-input-icon-left w-full relative">
                <i className="pi pi-envelope text-gray-400 absolute left-3 top-1/2" />
                <InputText
                  type="email"
                  placeholder="example@email.com"
                  className="w-full h-[42px] pl-10"
                />
              </span>
            </div>
  
            {/* Footer */}
            <div className="flex justify-end gap-3 pt-4 border-t mt-2">
              <Button
                label="Hủy"
                icon="pi pi-times"
                severity="secondary"
                outlined
                onClick={() => setVisible(false)}
              />
  
              <Button
                label="Gửi đánh giá"
                icon="pi pi-send"
                className="px-4"
                onClick={submitForm}
              />
            </div>
          </div>
        </Dialog>
      </div>
    );
}