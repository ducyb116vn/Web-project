import { useState } from "react";
import { useHotel } from "../context/HotelContext";

export default function Phong() {
  // Lấy dữ liệu và hàm xử lý từ Context toàn cục (tất cả các key đã chuyển về chữ thường)
  const { phong, khachhang, nhanvien, datPhongMoi } = useHotel();
  
  // State quản lý Modal và Phòng đang được chọn để đặt
  const [selectedPhong, setSelectedPhong] = useState(null);

  // State quản lý Form nhập liệu Đặt Phòng (Đảm bảo khớp 100% thuộc tính BẢNG datphong)
  const [formData, setFormData] = useState({
    makh: "",
    manv: "",
    ngaynhan: "",
    ngaytra: "",
    songuoi: 1
  });

  // Mở modal đặt phòng (Chỉ áp dụng với phòng có tinhtrang là "Trống")
  const handleOpenModal = (p) => {
    if (p.tinhtrang !== "Trống") return;
    setSelectedPhong(p);
    
    // Reset form và set mặc định giá trị đầu tiên của mảng khách hàng/nhân viên nếu có
    setFormData({
      makh: khachhang[0]?.makh || "",
      manv: nhanvien[0]?.manv || "",
      ngaynhan: "",
      ngaytra: "",
      songuoi: 1
    });
  };

  // Xử lý gửi dữ liệu Form lên Context để ghi nhận (Insert)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Gọi hàm xử lý từ Context truyền kèm mã phòng hiện tại
    const success = datPhongMoi({
      ...formData,
      maphong: selectedPhong.maphong
    });

    if (success) {
      setSelectedPhong(null); // Đóng modal thành công
    }
  };

  return (
    <div className="space-y-6 text-gray-300">
      {/* Tiêu đề trang */}
      <div>
        <h1 className="m-0 text-xl font-bold text-white tracking-wide">Sơ đồ và Trạng thái Phòng</h1>
        <p className="text-xs text-gray-400 mt-1">Giao diện quản lý trực quan tương tác trực tiếp với thực thể [phong] và [datphong]</p>
      </div>

      {/* Grid danh sách các phòng */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {phong.map((p) => {
          const isTrong = p.tinhtrang === "Trống";
          return (
            <div
              key={p.maphong}
              onClick={() => handleOpenModal(p)}
              className={`border rounded-xl p-4 flex flex-col justify-between h-32 transition-all duration-200 ${
                isTrong
                  ? "bg-[#1e293b]/30 border-emerald-500/20 hover:border-emerald-500 shadow-md hover:shadow-emerald-500/5 cursor-pointer"
                  : "bg-rose-950/10 border-rose-500/20 opacity-80 cursor-not-allowed"
              }`}
            >
              {/* Header của thẻ phòng */}
              <div className="flex justify-between items-start">
                <span className="text-lg font-bold font-mono text-white">{p.maphong}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold tracking-wide ${
                  isTrong ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                }`}>
                  {p.tinhtrang}
                </span>
              </div>
              
              {/* Body hiển thị thông tin loại và đơn giá */}
              <div>
                <p className="text-xs text-gray-400 m-0">Loại: {p.loaiphong}</p>
                <p className="text-[13px] font-semibold text-indigo-400 m-0 mt-1">
                  {p.dongia.toLocaleString("vi-VN")}đ/đêm
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL LẬP PHIẾU ĐẶT PHÒNG (INSERT DATPHONG) */}
      {selectedPhong && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e293b] border border-gray-800 w-full max-w-md rounded-xl p-6 shadow-2xl text-gray-300">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-800/60 pb-3 mb-4">
              <div>
                <h2 className="text-sm font-bold text-white m-0">Lập Phiếu Đặt Phòng</h2>
                <p className="text-[11px] text-gray-400 m-0 mt-0.5">Phòng đang chọn: <span className="text-indigo-400 font-mono font-bold">{selectedPhong.maphong}</span></p>
              </div>
              <button 
                type="button"
                onClick={() => setSelectedPhong(null)} 
                className="text-gray-400 hover:text-white bg-transparent border-none text-xl cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Chọn khách hàng (Khóa ngoại makh liên kết bảng khachhang) */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">Khách hàng thuê (makh - FK)</label>
                <select
                  required
                  value={formData.makh}
                  onChange={(e) => setFormData({ ...formData, makh: e.target.value })}
                  className="w-full bg-[#0f172a] border border-gray-800 text-gray-200 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  {khachhang.map(kh => (
                    <option key={kh.makh} value={kh.makh}>
                      {kh.hoten} ({kh.makh})
                    </option>
                  ))}
                </select>
              </div>

              {/* Chọn nhân viên tiếp nhận (Khóa ngoại manv liên kết bảng nhanvien) */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Nhân viên thực hiện (manv - FK)</label>
                <select
                  required
                  value={formData.manv}
                  onChange={(e) => setFormData({ ...formData, manv: e.target.value })}
                  className="w-full bg-[#0f172a] border border-gray-800 text-gray-200 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  {nhanvien.map(nv => (
                    <option key={nv.manv} value={nv.manv}>
                      {nv.hoten} ({nv.manv})
                    </option>
                  ))}
                </select>
              </div>

              {/* Hàng: Ngày nhận & Ngày trả (ngaynhan, ngaytra) */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Ngày nhận phòng</label>
                  <input
                    type="date" required
                    value={formData.ngaynhan}
                    onChange={(e) => setFormData({ ...formData, ngaynhan: e.target.value })}
                    className="w-full bg-[#0f172a] border border-gray-800 text-gray-200 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Ngày trả phòng</label>
                  <input
                    type="date" required
                    value={formData.ngaytra}
                    onChange={(e) => setFormData({ ...formData, ngaytra: e.target.value })}
                    className="w-full bg-[#0f172a] border border-gray-800 text-gray-200 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Số lượng người ở (songuoi) */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Số lượng người ở (songuoi)</label>
                <input
                  type="number" required min={1} max={6}
                  value={formData.songuoi}
                  onChange={(e) => setFormData({ ...formData, songuoi: e.target.value })}
                  className="w-full bg-[#0f172a] border border-gray-800 text-gray-200 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Nút điều hướng hành động */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-800/60 mt-4">
                <button 
                  type="button" 
                  onClick={() => setSelectedPhong(null)} 
                  className="bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white px-4 py-2 rounded-lg text-xs font-medium border-none cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button 
                  type="submit" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-xs font-semibold border-none cursor-pointer shadow-md transition-colors"
                >
                  Xác nhận đặt phòng
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}