import { useState } from "react";
import { useHotel } from "../context/HotelContext";

export default function HoaDon() {
  const { phong, datphong, khachhang, dichvu, sudungdv, hoadon, tinhToanVaXuatHoaDon } = useHotel();

  const [previewBooking, setPreviewBooking] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [phuongthuc, setPhuongthuc] = useState("Chuyển khoản");

  // State quản lý phần phản hồi khách hàng tích hợp
  const [diemDanhGia, setDiemDanhGia] = useState(5);
  const [noidungPhanHoi, setNoidungPhanHoi] = useState("");

  const activeBookings = datphong.filter(dp => {
    const p = phong.find(room => room.maphong === dp.maphong);
    return p?.tinhtrang === "Đang ở";
  });

  const getBillDetails = (booking) => {
    if (!booking) return null;
    const room = phong.find(p => p.maphong === booking.maphong);
    const kh = khachhang.find(k => k.makh === booking.makh);

    const checkIn = new Date(booking.ngaynhan);
    const checkOut = new Date(booking.ngaytra);
    const soDem = Math.max(1, Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)));
    const tienPhong = soDem * (room?.dongia || 0);

    const dsDichVu = sudungdv.filter(s => s.madat === booking.madat).map(s => {
      const dv = dichvu.find(d => d.madv === s.madv);
      return {
        tendv: dv?.tendv || s.madv,
        soluong: s.soluong,
        dongia: dv?.dongia || 0,
        thanhtien: s.soluong * (dv?.dongia || 0)
      };
    });

    const tienDichVu = dsDichVu.reduce((tong, item) => tong + item.thanhtien, 0);
    const tongTien = tienPhong + tienDichVu;

    return { room, kh, soDem, tienPhong, dsDichVu, tienDichVu, tongTien };
  };

  // Gửi kèm thông tin phản hồi xuống hàm xử lý xuất hóa đơn
  const handleCheckout = (madat) => {
    const feedbackData = {
      diem: diemDanhGia,
      noidung: noidungPhanHoi
    };

    const configuration = tinhToanVaXuatHoaDon(madat, phuongthuc, feedbackData);
    if (configuration) {
      alert(`Đã xuất hóa đơn ${configuration.mahd}. Hệ thống đã ghi nhận phản hồi của khách hàng!`);
      // Reset form phản hồi về mặc định
      setDiemDanhGia(5);
      setNoidungPhanHoi("");
      setPreviewBooking(null);
    }
  };

  return (
    <div className="space-y-6 text-gray-300">
      <div>
        <h1 className="m-0 text-xl font-bold text-white tracking-wide">Quản lý Hóa đơn & Thanh toán</h1>
        <p className="text-xs text-gray-400 mt-1">Lập hóa đơn thanh toán đồng thời ghi nhận phản hồi ý kiến khách hàng thực thể [phanhoi]</p>
      </div>

      {/* KHU VỰC 1: PHÒNG CHỜ THANH TOÁN */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-wider m-0">🛎️ Phòng đang ở - Chờ thanh lý</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {activeBookings.length > 0 ? (
            activeBookings.map((dp) => {
              const kh = khachhang.find(k => k.makh === dp.makh);
              return (
                <div key={dp.madat} className="bg-[#1e293b]/30 border border-amber-500/20 rounded-xl p-4 flex flex-col justify-between hover:border-amber-500/50 transition-all">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-base font-bold font-mono text-white">Phòng {dp.maphong}</span>
                      <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded font-semibold">{dp.madat}</span>
                    </div>
                    <p className="text-xs text-gray-300 m-0 font-medium">Khách thuê: {kh?.hoten || dp.makh}</p>
                    <p className="text-[11px] text-gray-400 m-0 mt-1">Thời gian: {dp.ngaynhan} → {dp.ngaytra}</p>
                  </div>
                  <button
                    onClick={() => setPreviewBooking(dp)}
                    className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-2 rounded-lg border-none cursor-pointer transition-colors"
                  >
                    Xem hóa đơn & Trả phòng
                  </button>
                </div>
              );
            })
          ) : (
            <div className="col-span-full bg-[#1e293b]/10 border border-gray-800 text-center py-6 rounded-xl text-xs text-gray-500">
              Hiện tại không có phòng nào ở trạng thái "Đang ở".
            </div>
          )}
        </div>
      </div>

      {/* KHU VỰC 2: LỊCH SỬ HÓA ĐƠN */}
      <div className="pt-4 space-y-3">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider m-0">📁 Lịch sử hóa đơn đã lập</h2>
        <div className="bg-[#1e293b]/20 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider font-semibold bg-[#0f172a]/40">
                  <th className="px-4 py-3.5">Mã Hóa đơn</th>
                  <th className="px-4 py-3.5">Mã Đặt phòng</th>
                  <th className="px-4 py-3.5">Ngày lập</th>
                  <th className="px-4 py-3.5">Tổng tiền</th>
                  <th className="px-4 py-3.5 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/40">
                {hoadon.length > 0 ? (
                  hoadon.map((hd) => (
                    <tr key={hd.mahd} className="hover:bg-gray-800/10 transition-colors">
                      <td className="px-4 py-3.5 font-mono font-bold text-emerald-400">{hd.mahd}</td>
                      <td className="px-4 py-3.5 font-mono text-indigo-400">{hd.madat}</td>
                      <td className="px-4 py-3.5 text-gray-400">{new Date(hd.ngaylap).toLocaleDateString("vi-VN")}</td>
                      <td className="px-4 py-3.5 font-semibold text-white">{hd.tongtien.toLocaleString("vi-VN")}đ</td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => {
                            const pastBooking = datphong.find(d => d.madat === hd.madat);
                            if (pastBooking) setSelectedInvoice({ hd, details: getBillDetails(pastBooking) });
                          }}
                          className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-[11px] px-3 py-1 rounded border border-gray-700 cursor-pointer"
                        >
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500 text-xs">
                      Chưa có hóa đơn nào được lưu trữ.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL CHECKOUT + TÍCH HỢP FORM PHẢN HỒI KHÁCH HÀNG */}
      {previewBooking && (() => {
        const bill = getBillDetails(previewBooking);
        return (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="bg-[#1e293b] border border-gray-800 w-full max-w-md rounded-xl p-6 shadow-2xl text-gray-300 max-h-[90vh] overflow-y-auto">
              
              <div className="text-center border-b border-gray-800 pb-3 mb-4">
                <h3 className="m-0 text-base font-bold text-white uppercase tracking-wider">Hóa Đơn & Phiếu Khảo Sát</h3>
                <p className="text-[11px] text-indigo-400 font-mono m-0 mt-0.5">Mã đặt phòng: {previewBooking.madat}</p>
              </div>

              {/* Thông tin hóa đơn dịch vụ phòng */}
              <div className="text-xs space-y-1 mb-4 bg-[#0f172a]/40 p-3 rounded-lg border border-gray-800/60">
                <p className="m-0 text-gray-400">Khách hàng: <span className="text-white font-semibold">{bill.kh?.hoten}</span></p>
                <p className="m-0 text-gray-400">Phòng ở: <span className="text-white font-mono">{previewBooking.maphong} ({bill.room?.loaiphong})</span></p>
                <p className="m-0 text-gray-400">Chi phí phòng: <span className="text-gray-300">{bill.soDem} đêm × {bill.room?.dongia.toLocaleString()}đ = {bill.tienPhong.toLocaleString()}đ</span></p>
                <p className="m-0 text-gray-400">Chi phí dịch vụ: <span className="text-gray-300">{bill.tienDichVu.toLocaleString()}đ</span></p>
              </div>

              {/* TÍCH HỢP PHẦN PHẢN HỒI [PHANHOI] */}
              <div className="border-t border-gray-800 pt-3 mt-3 space-y-3">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wide m-0">📝 Khảo sát ý kiến khách hàng</h4>
                
                {/* Chọn số sao / Điểm đánh giá */}
                <div className="space-y-1">
                  <label className="text-[11px] text-gray-400 block">Đánh giá độ hài lòng (1 - 5 Sao):</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setDiemDanhGia(num)}
                        className={`text-sm px-2.5 py-1 rounded font-bold cursor-pointer border transition-colors ${
                          diemDanhGia >= num 
                            ? "bg-amber-500/20 text-amber-400 border-amber-500/50" 
                            : "bg-gray-800 text-gray-500 border-gray-700"
                        }`}
                      >
                        {num} ★
                      </button>
                    ))}
                  </div>
                </div>

                {/* Nhập nội dung văn bản phản hồi */}
                <div className="space-y-1">
                  <label className="text-[11px] text-gray-400 block">Ý kiến đóng góp cụ thể:</label>
                  <textarea
                    rows="2"
                    value={noidungPhanHoi}
                    onChange={(e) => setNoidungPhanHoi(e.target.value)}
                    placeholder="Khách khen ngợi phòng sạch hay góp ý thái độ phục vụ..."
                    className="w-full bg-[#0f172a] border border-gray-800 text-gray-200 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-amber-500 resize-none font-sans"
                  />
                </div>
              </div>

              {/* Hình thức thanh toán */}
              <div className="space-y-1 mb-4 border-t border-gray-800 pt-3 mt-3">
                <label className="text-[11px] font-semibold text-gray-400 uppercase">Phương thức thanh toán</label>
                <select
                  value={phuongthuc}
                  onChange={(e) => setPhuongthuc(e.target.value)}
                  className="w-full bg-[#0f172a] border border-gray-800 text-gray-200 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="Chuyển khoản">Chuyển khoản ngân hàng (QR)</option>
                  <option value="Tiền mặt">Tiền mặt tại quầy</option>
                  <option value="Thẻ tín dụng">Thẻ tín dụng (POS)</option>
                </select>
              </div>

              {/* Tổng cộng */}
              <div className="flex justify-between items-center bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg mb-4">
                <span className="text-xs font-bold text-emerald-400 uppercase">Tổng thanh toán:</span>
                <span className="text-base font-black font-mono text-emerald-400">{bill.tongTien.toLocaleString("vi-VN")}đ</span>
              </div>

              {/* Nút điều hướng */}
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setPreviewBooking(null)} className="bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white px-4 py-2 rounded-lg text-xs font-medium border-none cursor-pointer">Đóng</button>
                <button
                  type="button"
                  onClick={() => handleCheckout(previewBooking.madat)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-semibold border-none cursor-pointer transition-colors"
                >
                  Xác nhận & Trả phòng
                </button>
              </div>

            </div>
          </div>
        );
      })()}

      {/* MODAL 2: XEM LẠI HÓA ĐƠN QUÁ KHỨ */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e293b] border border-gray-800 w-full max-w-md rounded-xl p-6 shadow-2xl text-gray-300">
            <div className="text-center border-b border-gray-800 pb-3 mb-4">
              <h3 className="m-0 text-base font-bold text-emerald-400 uppercase">Hóa Đơn Khách Sạn</h3>
              <p className="text-[11px] text-gray-400 font-mono m-0 mt-0.5">Mã số: {selectedInvoice.hd.mahd}</p>
            </div>
            <div className="text-xs space-y-1 mb-4 bg-[#0f172a]/40 p-3 rounded-lg border border-gray-800/60">
              <p className="m-0 text-gray-400">Khách hàng: <span className="text-white font-semibold">{selectedInvoice.details.kh?.hoten}</span></p>
              <p className="m-0 text-gray-400">Phòng đã thuê: <span className="text-white font-mono">{selectedInvoice.details.room?.maphong}</span></p>
            </div>
            <div className="flex justify-between items-center bg-gray-800/80 p-3 rounded-lg mb-5 border border-gray-700">
              <span className="text-xs font-bold text-gray-400">Tổng tiền đã trả:</span>
              <span className="text-base font-bold font-mono text-white">{selectedInvoice.hd.tongtien.toLocaleString("vi-VN")}đ</span>
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={() => setSelectedInvoice(null)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-xs font-semibold border-none cursor-pointer">
                Đóng phiếu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}