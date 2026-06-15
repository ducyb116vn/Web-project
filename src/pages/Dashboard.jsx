import { useHotel } from "../context/HotelContext";

export default function Dashboard() {
  const { hoadon, phong, khachhang, sudungdv } = useHotel();

  // 1. Tính toán các chỉ số Core Metrics
  const tongDoanhThu = hoadon.reduce((sum, hd) => sum + hd.tongtien, 0);
  const soPhongDangO = phong.filter(p => p.tinhtrang === "Đang ở").length;
  const tongSoKhach = khachhang.length;
  const tongLuotDichVu = sudungdv.reduce((sum, item) => sum + item.soluong, 0);

  // 2. Tính tỷ lệ lấp đầy phòng (%)
  const tyLeLapDay = phong.length > 0 ? Math.round((soPhongDangO / phong.length) * 100) : 0;

  // 3. Phân tích trạng thái phòng chi tiết
  const phongTrong = phong.filter(p => p.tinhtrang === "Trống").length;

  // 4. Lấy danh sách 5 hóa đơn vừa xuất gần đây nhất
  const ganDayHoaDon = [...hoadon].reverse().slice(0, 5);

  return (
    <div className="space-y-6 text-gray-300">
      {/* Khối chào mừng & Thời gian */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="m-0 text-xl font-bold text-white tracking-wide">Hệ thống Quản trị Tổng quan</h1>
          <p className="text-xs text-gray-400 mt-1">Số liệu phân tích tổng hợp thời gian thực từ các phân hệ dữ liệu</p>
        </div>
        <div className="text-xs bg-[#1e293b]/40 border border-gray-800 px-3 py-1.5 rounded-lg text-gray-400 font-mono self-start sm:self-auto">
          Cập nhật: Mới nhất
        </div>
      </div>

      {/* LƯỚI CARD SỐ LIỆU CHÍNH (CORE METRICS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Doanh thu */}
        <div className="bg-[#1e293b]/30 border border-gray-800 rounded-xl p-4 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">Tổng Doanh Thu</span>
          <h2 className="m-0 text-xl font-black text-emerald-400 font-mono tracking-tight">
            {tongDoanhThu.toLocaleString("vi-VN")}đ
          </h2>
          <p className="text-[10px] text-gray-500 m-0 mt-2">Gom từ tất cả thực thể [hoadon]</p>
        </div>

        {/* Card 2: Phòng đang ở */}
        <div className="bg-[#1e293b]/30 border border-gray-800 rounded-xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">Công Suất Phòng</span>
          <h2 className="m-0 text-xl font-black text-white font-mono">
            {soPhongDangO} <span className="text-xs font-normal text-gray-400">/ {phong.length} Phòng</span>
          </h2>
          <p className="text-[10px] text-amber-400 m-0 mt-2 font-medium">Tỷ lệ lấp đầy: {tyLeLapDay}%</p>
        </div>

        {/* Card 3: Khách hàng */}
        <div className="bg-[#1e293b]/30 border border-gray-800 rounded-xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">Hồ Sơ Khách Hàng</span>
          <h2 className="m-0 text-xl font-black text-indigo-400 font-mono">
            {tongSoKhach} <span className="text-xs font-normal text-gray-400">thành viên</span>
          </h2>
          <p className="text-[10px] text-gray-500 m-0 mt-2">Dữ liệu định danh thực thể [khachhang]</p>
        </div>

        {/* Card 4: Dịch vụ tiêu thụ */}
        <div className="bg-[#1e293b]/30 border border-gray-800 rounded-xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">Sản Phẩm Tiêu Thụ</span>
          <h2 className="m-0 text-xl font-black text-blue-400 font-mono">
            {tongLuotDichVu} <span className="text-xs font-normal text-gray-400">lượt gọi</span>
          </h2>
          <p className="text-[10px] text-gray-500 m-0 mt-2">Thống kê sản lượng từ [sudungdv]</p>
        </div>

      </div>

      {/* KHU VỰC THỒNG KÊ CHI TIẾT & TIẾN TRÌNH */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Cột trái: Trạng thái vận hành thực tế */}
        <div className="bg-[#1e293b]/20 border border-gray-800 rounded-xl p-5 space-y-4 lg:col-span-1">
          <h3 className="m-0 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-800 pb-2">
            📊 Trạng thái vận hành phòng
          </h3>
          
          <div className="space-y-3 pt-1">
            {/* Thanh tiến trình phòng đang ở */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-300 font-medium">Đang có khách lưu trú</span>
                <span className="font-mono text-amber-400 font-bold">{soPhongDangO} phòng</span>
              </div>
              <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full transition-all duration-500" style={{ width: `${tyLeLapDay}%` }}></div>
              </div>
            </div>

            {/* Thanh tiến trình phòng trống */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-300 font-medium">Phòng trống sẵn sàng đón</span>
                <span className="font-mono text-emerald-400 font-bold">{phongTrong} phòng</span>
              </div>
              <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${phong.length > 0 ? (phongTrong / phong.length) * 100 : 0}%` }}></div>
              </div>
            </div>
          </div>

          <div className="bg-[#0f172a]/50 p-3 rounded-lg border border-gray-800 text-[11px] text-gray-400 leading-relaxed mt-2">
            <strong className="text-gray-300 block mb-0.5">💡 Khuyến nghị điều phối:</strong>
            {tyLeLapDay > 70 
              ? "Công suất phòng đạt mức cao. Hãy nhắc nhở bộ phận buồng phòng dọn dẹp ngay khi khách check-out để gối đầu phòng."
              : "Lượng phòng trống còn nhiều. Đề xuất chạy các chương trình giảm giá combo dịch vụ đi kèm để thu hút khách."
            }
          </div>
        </div>

        {/* Cột phải: Giao dịch hóa đơn mới phát sinh */}
        <div className="bg-[#1e293b]/20 border border-gray-800 rounded-xl p-5 lg:col-span-2 space-y-3">
          <h3 className="m-0 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-800 pb-2">
            ⏱️ Hóa đơn vừa xử lý mới nhất
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="text-gray-400 border-b border-gray-800 font-semibold bg-[#0f172a]/20">
                  <th className="py-2.5 px-2">Mã HD</th>
                  <th className="py-2.5 px-2">Mã Đặt</th>
                  <th className="py-2.5 px-2">Ngày Xuất</th>
                  <th className="py-2.5 px-2 text-right">Tổng Tiền</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/40">
                {ganDayHoaDon.length > 0 ? (
                  ganDayHoaDon.map((hd) => (
                    <tr key={hd.mahd} className="hover:bg-gray-800/10">
                      <td className="py-3 px-2 font-mono font-bold text-indigo-400">{hd.mahd}</td>
                      <td className="py-3 px-2 font-mono text-gray-400">{hd.madat}</td>
                      <td className="py-3 px-2 text-gray-400">{new Date(hd.ngaylap).toLocaleDateString("vi-VN")}</td>
                      <td className="py-3 px-2 text-right font-bold font-mono text-emerald-400">
                        {hd.tongtien.toLocaleString("vi-VN")}đ
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-6 text-center text-gray-500 text-[11px]">
                      Chưa phát sinh giao dịch thanh toán nào trong phiên làm việc này.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}