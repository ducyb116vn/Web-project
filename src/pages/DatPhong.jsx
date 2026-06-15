import { useHotel } from "../context/HotelContext";

export default function DatPhong() {
  const { datPhongList } = useHotel();

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
              {datPhongList.map((bp) => (
                <tr key={bp.MADAT} className="hover:bg-gray-800/10 transition-colors">
                  <td className="px-4 py-3.5 font-mono font-bold text-indigo-400">{bp.MADAT}</td>
                  <td className="px-4 py-3.5 font-bold font-mono text-white">{bp.MAPHONG}</td>
                  <td className="px-4 py-3.5 font-mono text-gray-300">{bp.MAKH}</td>
                  <td className="px-4 py-3.5 text-gray-400">
                    {new Date(bp.NGAYDAT).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-3.5 text-emerald-400 font-medium">
                    {new Date(bp.NGAYNHAN).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-3.5 text-rose-400 font-medium">
                    {new Date(bp.NGAYTRA).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-3.5 text-center font-mono text-gray-200">{bp.SONGUOI}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}