import { useHotel } from "../context/HotelContext";

export default function DatPhong() {
  // 🔄 Đã đồng bộ đúng tên biến datphong từ HotelContext
  const { datphong } = useHotel();

  return (
    <div className="space-y-6 text-gray-300 p-6">
      <div>
        <h1 className="m-0 text-[22px] font-bold text-white tracking-wide">Nhật ký Đặt phòng</h1>
        <p className="text-xs text-gray-400 mt-1">Dữ liệu đồng bộ trực tiếp với thực thể DATPHONG (Lịch sử thuê phòng)</p>
      </div>

          {/* Bảng danh sách đặt phòng */}
      <div className="bg-[#1e293b]/20 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider font-semibold bg-[#0f172a]/40">
                <th className="px-4 py-3.5">Mã đặt (MADAT)</th>
                <th className="px-4 py-3.5">Mã Phòng (MAPHONG)</th>
                <th className="px-4 py-3.5">Mã Khách (MAKH)</th>
                <th className="px-4 py-3.5">Ngày đặt</th>
                <th className="px-4 py-3.5">Ngày nhận</th>
                <th className="px-4 py-3.5">Ngày trả</th>
                <th className="px-4 py-3.5 text-center">Số người</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/40">
              {datphong && datphong.length > 0 ? (
                datphong.map((bp) => (
                  <tr key={bp.madat} className="hover:bg-gray-800/10 transition-colors">
                    {/* 🔄 Chuyển toàn bộ key gọi dữ liệu sang chữ thường khớp với Context */}
                    <td className="px-4 py-3.5 font-mono font-bold text-indigo-400">{bp.madat}</td>
                    <td className="px-4 py-3.5 font-bold font-mono text-white">{bp.maphong}</td>
                    <td className="px-4 py-3.5 font-mono text-gray-300">{bp.makh}</td>
                    <td className="px-4 py-3.5 text-gray-400">
                      {bp.ngaydat ? new Date(bp.ngaydat).toLocaleDateString("vi-VN") : "---"}
                    </td>
                    <td className="px-4 py-3.5 text-emerald-400 font-medium">
                      {bp.ngaynhan ? new Date(bp.ngaynhan).toLocaleDateString("vi-VN") : "---"}
                    </td>
                    <td className="px-4 py-3.5 text-rose-400 font-medium">
                      {bp.ngaytra ? new Date(bp.ngaytra).toLocaleDateString("vi-VN") : "---"}
                    </td>
                    <td className="px-4 py-3.5 text-center font-mono text-gray-200">{bp.songuoi}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-gray-500 text-xs">
                    Chưa có lịch sử đặt phòng nào được ghi nhận.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
