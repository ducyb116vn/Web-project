import { useState } from "react";
import { useHotel } from "../context/HotelContext";

export default function NhanVien() {
  const { nhanvien, setNhanvien } = useHotel();
  
  // State quản lý Form nhập liệu
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    manv: "", hoten: "", sdt: "", email: "", catruc: "Sáng", matkhau: "123456"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.manv || !formData.hoten) {
      alert("Mã nhân viên và Họ tên là bắt buộc!");
      return;
    }

    if (isEditing) {
      // Cập nhật nhân viên cũ
      setNhanvien(prev => prev.map(item => item.manv === formData.manv ? formData : item));
      setIsEditing(false);
    } else {
      // Kiểm tra trùng mã khóa chính PK
      if (nhanvien.some(item => item.manv === formData.manv)) {
        alert("Mã nhân viên này đã tồn tại trong hệ thống!");
        return;
      }
      setNhanvien(prev => [...prev, formData]);
    }

    // Reset Form
    setFormData({ manv: "", hoten: "", sdt: "", email: "", catruc: "Sáng", matkhau: "123456" });
  };

  const handleEdit = (nv) => {
    setFormData(nv);
    setIsEditing(true);
  };

  const handleDelete = (manv) => {
    if (confirm(`Bạn chắc chắn muốn xóa nhân viên ${manv}?`)) {
      setNhanvien(prev => prev.filter(item => item.manv !== manv));
    }
  };

  return (
    <div className="space-y-6 text-gray-300">
      <div>
        <h1 className="m-0 text-xl font-bold text-white tracking-wide">Quản lý Hồ sơ Nhân viên</h1>
        <p className="text-xs text-gray-400 mt-1">Điều hành danh sách nhân sự, phân chia ca trực và bảo mật tài khoản hệ thống [nhanvien]</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* KHỐI 1: FORM THÊM / CẬP NHẬT (Chiếm 1 cột) */}
        <div className="bg-[#1e293b]/20 border border-gray-800 rounded-xl p-5 h-fit space-y-4">
          <h3 className="m-0 text-xs font-bold text-indigo-400 uppercase tracking-wider border-b border-gray-800 pb-2">
            {isEditing ? "📝 Hiệu chỉnh nhân sự" : "➕ Đăng ký nhân viên mới"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <label className="text-[11px] text-gray-400 block font-semibold">Mã Nhân Viên (PK)</label>
              <input
                type="text"
                name="manv"
                value={formData.manv}
                onChange={handleInputChange}
                disabled={isEditing}
                placeholder="NV003"
                className="w-full bg-[#0f172a] border border-gray-800 text-gray-200 px-3 py-1.5 rounded-lg text-xs font-mono focus:outline-none focus:border-indigo-500 disabled:opacity-50"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-gray-400 block font-semibold">Họ và Tên</label>
              <input
                type="text"
                name="hoten"
                value={formData.hoten}
                onChange={handleInputChange}
                placeholder="Nguyễn Văn C"
                className="w-full bg-[#0f172a] border border-gray-800 text-gray-200 px-3 py-1.5 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-gray-400 block font-semibold">Số Điện Thoại</label>
              <input
                type="text"
                name="sdt"
                value={formData.sdt}
                onChange={handleInputChange}
                placeholder="0901234567"
                className="w-full bg-[#0f172a] border border-gray-800 text-gray-200 px-3 py-1.5 rounded-lg text-xs focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-gray-400 block font-semibold">Email liên hệ</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="nv@hotel.com"
                className="w-full bg-[#0f172a] border border-gray-800 text-gray-200 px-3 py-1.5 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-gray-400 block font-semibold">Ca Làm Việc</label>
              <select
                name="catruc"
                value={formData.catruc}
                onChange={handleInputChange}
                className="w-full bg-[#0f172a] border border-gray-800 text-gray-200 px-3 py-1.5 rounded-lg text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Sáng">Sáng (06h00 - 14h00)</option>
                <option value="Chiều">Chiều (14h00 - 22h00)</option>
                <option value="Đêm">Đêm (22h00 - 06h00)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-gray-400 block font-semibold">Mật Khẩu Hệ Thống</label>
              <input
                type="password"
                name="matkhau"
                value={formData.matkhau}
                onChange={handleInputChange}
                className="w-full bg-[#0f172a] border border-gray-800 text-gray-200 px-3 py-1.5 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex gap-2 pt-2">
              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({ manv: "", hoten: "", sdt: "", email: "", catruc: "Sáng", matkhau: "123456" });
                  }}
                  className="flex-1 bg-transparent border border-gray-700 text-gray-400 py-1.5 rounded-lg text-xs cursor-pointer font-medium hover:text-white"
                >
                  Hủy
                </button>
              )}
              <button
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors border-none"
              >
                {isEditing ? "Cập nhật" : "Lưu hồ sơ"}
              </button>
            </div>
          </form>
        </div>

        {/* KHỐI 2: DANH SÁCH BẢNG HIỂN THỊ (Chiếm 2 cột) */}
        <div className="bg-[#1e293b]/20 border border-gray-800 rounded-xl p-5 lg:col-span-2 space-y-3">
          <h3 className="m-0 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-800 pb-2">
            📋 Danh sách nhân sự hiện hành
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="text-gray-400 border-b border-gray-800 font-semibold bg-[#0f172a]/20">
                  <th className="py-2.5 px-3">Mã NV</th>
                  <th className="py-2.5 px-3">Họ và Tên</th>
                  <th className="py-2.5 px-3">Liên hệ</th>
                  <th className="py-2.5 px-3">Ca trực</th>
                  <th className="py-2.5 px-3 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/40">
                {nhanvien.map((nv) => (
                  <tr key={nv.manv} className="hover:bg-gray-800/10 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-indigo-400">{nv.manv}</td>
                    <td className="py-3 px-3 font-semibold text-white">{nv.hoten}</td>
                    <td className="py-3 px-3 space-y-0.5">
                      <p className="m-0 font-mono text-gray-300">{nv.sdt}</p>
                      <p className="m-0 text-gray-500 text-[11px]">{nv.email}</p>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        nv.catruc === "Sáng" ? "bg-amber-500/10 text-amber-400" :
                        nv.catruc === "Chiều" ? "bg-blue-500/10 text-blue-400" : "bg-purple-500/10 text-purple-400"
                      }`}>
                        Ca {nv.catruc}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center space-x-1">
                      <button
                        onClick={() => handleEdit(nv)}
                        className="bg-transparent hover:text-indigo-400 border-none cursor-pointer font-semibold text-gray-400 text-[11px]"
                      >
                        Sửa
                      </button>
                      <span className="text-gray-700">|</span>
                      <button
                        onClick={() => handleDelete(nv.manv)}
                        className="bg-transparent hover:text-red-400 border-none cursor-pointer font-semibold text-gray-400 text-[11px]"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}