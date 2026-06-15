import { useState } from "react";
import { useHotel } from "../context/HotelContext";

export default function DichVu() {
  const { dichvu, phong, datphong, sudungdv, goiDichVu } = useHotel();

  // State quản lý Modal và nhập liệu
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [quantity, setQuantity] = useState(1);
  
  // State quản lý Tab danh mục đồ ăn/thức uống đang xem
  const [activeTab, setActiveTab] = useState("all");

  const activeRooms = phong.filter(p => p.tinhtrang === "Đang ở");

  // Hàm tự động phân loại dịch vụ để hiển thị lên UI mà không làm hỏng cấu trúc bảng DB
  const getCategory = (madv) => {
    const num = parseInt(madv.replace("DV", ""));
    if (num <= 5) return "drink";
    if (num <= 10) return "food";
    return "service";
  };

  // Lọc danh sách dịch vụ dựa theo Tab được chọn
  const filteredDichVu = dichvu.filter(dv => {
    if (activeTab === "all") return true;
    return getCategory(dv.madv) === activeTab;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRoom || !selectedService) return;

    const currentBooking = datphong.find(dp => dp.maphong === selectedRoom);
    if (!currentBooking) {
      alert("Không tìm thấy thông tin đặt phòng hợp lệ!");
      return;
    }

    goiDichVu(currentBooking.madat, selectedService, quantity);
    setIsModalOpen(false);
    setQuantity(1);
  };

  return (
    <div className="space-y-6 text-gray-300">
      {/* Header điều khiển */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="m-0 text-xl font-bold text-white tracking-wide">Danh mục Dịch vụ & Sử dụng</h1>
          <p className="text-xs text-gray-400 mt-1">Quản lý menu dịch vụ và ghi nhận gọi đồ theo thực thể [dichvu] và [sudungdv]</p>
        </div>
        
        <button
          onClick={() => {
            setIsModalOpen(true);
            if (activeRooms.length > 0) setSelectedRoom(activeRooms[0].maphong);
            if (dichvu.length > 0) setSelectedService(dichvu[0].madv);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg border-none cursor-pointer shadow-md transition-all self-start sm:self-auto"
        >
          + Gọi dịch vụ cho phòng
        </button>
      </div>

      {/* Bộ nút chuyển Tab bộ phận danh mục */}
      <div className="flex items-center gap-2 border-b border-gray-800 pb-px">
        {[
          { id: "all", label: "Tất cả menu" },
          { id: "food", label: "🍳 Đồ ăn bếp" },
          { id: "drink", label: "🍹 Đồ uống quầy bar" },
          { id: "service", label: "🛎️ Dịch vụ & Khác" }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`bg-transparent text-xs font-semibold px-4 py-2 border-b-2 cursor-pointer transition-all ${
              activeTab === tab.id 
                ? "border-indigo-500 text-indigo-400" 
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Lưới danh sách món ăn/dịch vụ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredDichVu.map((dv) => (
          <div key={dv.madv} className="bg-[#1e293b]/30 border border-gray-800/80 rounded-xl p-4 flex flex-col justify-between shadow-sm hover:border-gray-700 transition-all">
            <div>
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-mono font-bold text-indigo-400">{dv.madv}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-gray-800 text-gray-400 font-medium">
                  {dv.donvitinh}
                </span>
              </div>
              <h3 className="m-0 text-xs font-bold text-white tracking-wide">{dv.tendv}</h3>
            </div>
            <div className="text-right mt-3 pt-2 border-t border-gray-800/40">
              <span className="text-xs font-bold text-emerald-400">{dv.dongia.toLocaleString("vi-VN")}đ</span>
            </div>
          </div>
        ))}
      </div>

      {/* Nhật ký sử dụng dịch vụ gần đây */}
      <div className="pt-4">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Nhật ký gọi dịch vụ (Bảng sudungdv)</h2>
        <div className="bg-[#1e293b]/20 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider font-semibold bg-[#0f172a]/40">
                  <th className="px-4 py-3.5">ID</th>
                  <th className="px-4 py-3.5">Mã đặt (madat)</th>
                  <th className="px-4 py-3.5">Tên Dịch vụ / Đồ ăn</th>
                  <th className="px-4 py-3.5 text-center">Số lượng</th>
                  <th className="px-4 py-3.5">Đơn giá</th>
                  <th className="px-4 py-3.5">Thành tiền</th>
                  <th className="px-4 py-3.5">Ngày dùng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/40">
                {sudungdv.length > 0 ? (
                  sudungdv.map((item) => {
                    const dvInfo = dichvu.find(d => d.madv === item.madv);
                    return (
                      <tr key={item.id} className="hover:bg-gray-800/10 transition-colors">
                        <td className="px-4 py-3.5 font-mono text-gray-500">{item.id}</td>
                        <td className="px-4 py-3.5 font-mono font-bold text-indigo-400">{item.madat}</td>
                        <td className="px-4 py-3.5 font-semibold text-white">{dvInfo ? dvInfo.tendv : item.madv}</td>
                        <td className="px-4 py-3.5 text-center font-mono text-gray-200">{item.soluong}</td>
                        <td className="px-4 py-3.5 text-gray-400">{dvInfo?.dongia.toLocaleString("vi-VN")}đ</td>
                        <td className="px-4 py-3.5 font-semibold text-emerald-400">
                          {dvInfo ? (dvInfo.dongia * item.soluong).toLocaleString("vi-VN") : 0}đ
                        </td>
                        <td className="px-4 py-3.5 text-gray-400">
                          {new Date(item.ngaysudung).toLocaleDateString("vi-VN")}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="px-4 py-6 text-center text-gray-500 text-xs">
                      Chưa có phòng nào gọi đồ uống hay dịch vụ.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL GỌI DỊCH VỤ (POPUP FORM) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e293b] border border-gray-800 w-full max-w-md rounded-xl p-6 shadow-2xl text-gray-300">
            
            <div className="flex items-center justify-between border-b border-gray-800/60 pb-3 mb-4">
              <div>
                <h2 className="text-sm font-bold text-white m-0">Ghi nhận dịch vụ phòng</h2>
                <p className="text-[11px] text-gray-400 m-0 mt-0.5">Hệ thống tự động map sang khóa ngoại [madat]</p>
              </div>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white bg-transparent border-none text-xl cursor-pointer">&times;</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">Chọn phòng đang có khách</label>
                {activeRooms.length > 0 ? (
                  <select
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    className="w-full bg-[#0f172a] border border-gray-800 text-gray-200 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    {activeRooms.map(p => (
                      <option key={p.maphong} value={p.maphong}>Phòng {p.maphong} ({p.loaiphong})</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-xs text-rose-400 m-0 bg-rose-500/5 p-2 rounded-lg border border-rose-500/20">Không có phòng nào đang ở!</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Chọn đồ ăn / dịch vụ (madv)</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-[#0f172a] border border-gray-800 text-gray-200 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  {dichvu.map(dv => (
                    <option key={dv.madv} value={dv.madv}>{dv.tendv} ({dv.dongia.toLocaleString("vi-VN")}đ)</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Số lượng (soluong)</label>
                <input
                  type="number" required min={1} max={50}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full bg-[#0f172a] border border-gray-800 text-gray-200 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-800/60 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white px-4 py-2 rounded-lg text-xs font-medium border-none cursor-pointer">Hủy bỏ</button>
                <button type="submit" disabled={activeRooms.length === 0} className={`px-5 py-2 rounded-lg text-xs font-semibold border-none cursor-pointer shadow-md transition-colors ${activeRooms.length === 0 ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 text-white"}`}>Xác nhận</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}