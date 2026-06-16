import { useState } from "react";
import { useHotel } from "../context/HotelContext";

export default function KhachHang() {
  // Lấy danh sách và hàm cập nhật khachhang từ Context toàn cục
  const { khachhang, setKhachhang } = useHotel();

  // Các State quản lý giao diện
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State lưu trữ dữ liệu form thêm mới
  const [formData, setFormData] = useState({
    hoten: "",
    ngaysinh: "",
    gioitinh: "Nam",
    diachi: "",
    email: "",
    sdt: "",
    cccd: ""
  });

  // Bộ lọc tìm kiếm khách hàng theo Tên hoặc Số điện thoại
  const filteredKhachHang = khachhang.filter(kh => 
    kh.hoten.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kh.sdt.includes(searchTerm)
  );

  // Xử lý Thêm mới khách hàng
  const handleSubmit = (e) => {
    e.preventDefault();

    // Tự động sinh mã khách hàng mới tăng dần (KH001, KH002...)
    const currentIndex = khachhang.length > 0 
      ? Math.max(...khachhang.map(kh => parseInt(kh.makh.replace("KH", "")))) 
      : 0;
    const maKhMoi = `KH${String(currentIndex + 1).padStart(3, "0")}`;

    const khachHangMoi = {
      makh: maKhMoi,
      ...formData
    };

    // Tạo mảng mới chứa cả khách hàng cũ và khách hàng mới
    const danhSachMoi = [...khachhang, khachHangMoi];

    // 1. Cập nhật lên Giao diện (React State)
    setKhachhang(danhSachMoi);

    // 2. 💾 LƯU VÀO BỘ NHỚ: Cập nhật lại cục dữ liệu mới xuống trình duyệt
    localStorage.setItem("hotel_khachhang", JSON.stringify(danhSachMoi));

    // Đóng modal và reset form nhập liệu
    setIsModalOpen(false);
    setFormData({
      hoten: "",
      ngaysinh: "",
      gioitinh: "Nam",
      diachi: "",
      email: "",
      sdt: "",
      cccd: ""
    });
  };

  // Hàm xử lý Xóa khách hàng
  const handleXoaKhachHang = (makh) => {
    if (window.confirm(`Cậu có chắc chắn muốn xóa khách hàng mang mã ${makh} này không?`)) {
      // Lọc bỏ khách hàng được chọn ra khỏi mảng
      const danhSachSauXoa = khachhang.filter(kh => kh.makh !== makh);

      // 1. Cập nhật lên Giao diện (React State)
      setKhachhang(danhSachSauXoa);
      
      // 2. 💾 CẬP NHẬT LẠI BỘ NHỚ: Ghi đè danh sách mới đã xóa xuống trình duyệt
      localStorage.setItem("hotel_khachhang", JSON.stringify(danhSachSauXoa));
    }
  };

  return (
    <div className="space-y-6 text-gray-300">
      {/* Header điều khiển */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="m-0 text-xl font-bold text-white tracking-wide">Quản lý Thông tin Khách hàng</h1>
          <p className="text-xs text-gray-400 mt-1">Lưu trữ và truy xuất thông tin thực thể dữ liệu [khachhang]</p>
        </div>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg border-none cursor-pointer shadow-md transition-all self-start sm:self-auto"
        >
          + Thêm khách hàng mới
        </button>
      </div>

      {/* Thanh tìm kiếm */}
      <div className="max-w-md">
        <input
          type="text"
          placeholder="Tìm kiếm theo họ tên hoặc số điện thoại..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#1e293b]/40 border border-gray-800 text-gray-200 px-4 py-2 rounded-xl text-xs focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Bảng dữ liệu Khách hàng */}
      <div className="bg-[#1e293b]/20 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider font-semibold bg-[#0f172a]/40">
                <th className="px-4 py-3.5">Mã KH (makh)</th>
                <th className="px-4 py-3.5">Họ và tên</th>
                <th className="px-4 py-3.5">Số CCCD</th>
                <th className="px-4 py-3.5">Số điện thoại</th>
                <th className="px-4 py-3.5">Email</th>
                <th className="px-4 py-3.5 text-center">Giới tính</th>
                <th className="px-4 py-3.5">Địa chỉ</th>
                <th className="px-4 py-3.5">Ngày sinh</th>
                <th className="px-4 py-3.5 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/40">
              {filteredKhachHang.length > 0 ? (
                filteredKhachHang.map((kh) => (
                  <tr key={kh.makh} className="hover:bg-gray-800/10 transition-colors">
                    <td className="px-4 py-3.5 font-mono font-bold text-indigo-400">{kh.makh}</td>
                    <td className="px-4 py-3.5 font-semibold text-white">{kh.hoten}</td>
                    <td className="px-4 py-3.5 font-mono text-gray-300">{kh.cccd}</td>
                    <td className="px-4 py-3.5 font-mono text-gray-300">{kh.sdt}</td>
                    <td className="px-4 py-3.5 text-gray-400">{kh.email}</td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                        kh.gioitinh === "Nam" ? "bg-blue-500/10 text-blue-400" : "bg-pink-500/10 text-pink-400"
                      }`}>
                        {kh.gioitinh}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-gray-400 max-w-[150px] truncate" title={kh.diachi}>
                      {kh.diachi}
                    </td>
                    <td className="px-4 py-3.5 text-gray-400">
                      {kh.ngaysinh ? new Date(kh.ngaysinh).toLocaleDateString("vi-VN") : ""}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <button
                        type="button"
                        onClick={() => handleXoaKhachHang(kh.makh)}
                        className="bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 px-2.5 py-1 rounded transition-all text-xs font-medium cursor-pointer"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-4 py-8 text-center text-gray-500 text-xs">
                    Không tìm thấy dữ liệu khách hàng phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL THÊM KHÁCH HÀNG (POPUP FORM) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e293b] border border-gray-800 w-full max-w-lg rounded-xl p-6 shadow-2xl text-gray-300">
            
            {/* Header Modal */}
            <div className="flex items-center justify-between border-b border-gray-800/60 pb-3 mb-4">
              <div>
                <h2 className="text-sm font-bold text-white m-0">Đăng ký Thẻ Khách Hàng Mới</h2>
                <p className="text-[11px] text-gray-400 m-0 mt-0.5">Hệ thống tự động cấp phát mã định danh duy nhất [makh]</p>
              </div>
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)} 
                className="text-gray-400 hover:text-white bg-transparent border-none text-xl cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Form Nhập liệu */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Họ và tên (hoten)</label>
                <input
                  type="text" required placeholder="Nhập họ và tên đầy đủ..."
                  value={formData.hoten} onChange={(e) => setFormData({ ...formData, hoten: e.target.value })}
                  className="w-full bg-[#0f172a] border border-gray-800 text-gray-200 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Số CCCD / Định danh</label>
                  <input
                    type="text" required maxLength={15} placeholder="Nhập mã căn cước..."
                    value={formData.cccd} onChange={(e) => setFormData({ ...formData, cccd: e.target.value })}
                    className="w-full bg-[#0f172a] border border-gray-800 text-gray-200 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Số điện thoại (sdt)</label>
                  <input
                    type="text" required maxLength={15} placeholder="Nhập số điện thoại..."
                    value={formData.sdt} onChange={(e) => setFormData({ ...formData, sdt: e.target.value })}
                    className="w-full bg-[#0f172a] border border-gray-800 text-gray-200 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Thư điện tử (email)</label>
                <input
                  type="email" required placeholder="example@gmail.com..."
                  value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0f172a] border border-gray-800 text-gray-200 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Ngày sinh (ngaysinh)</label>
                  <input
                    type="date" required
                    value={formData.ngaysinh} onChange={(e) => setFormData({ ...formData, ngaysinh: e.target.value })}
                    className="w-full bg-[#0f172a] border border-gray-800 text-gray-200 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Giới tính (gioitinh)</label>
                  <select
                    value={formData.gioitinh} onChange={(e) => setFormData({ ...formData, gioitinh: e.target.value })}
                    className="w-full bg-[#0f172a] border border-gray-800 text-gray-200 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Địa chỉ thường trú (diachi)</label>
                <input
                  type="text" required placeholder="Thành phố, Tỉnh thành..."
                  value={formData.diachi} onChange={(e) => setFormData({ ...formData, diachi: e.target.value })}
                  className="w-full bg-[#0f172a] border border-gray-800 text-gray-200 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Bộ điều hướng hành động */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-800/60 mt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white px-4 py-2 rounded-lg text-xs font-medium border-none cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button 
                  type="submit" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-xs font-semibold border-none cursor-pointer shadow-md transition-colors"
                >
                  Lưu thông tin (Insert)
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
