import { createContext, useContext, useState } from "react";

const HotelContext = createContext();

export function HotelProvider({ children }) {
  // 1. BẢNG phong (maphong, loaiphong, dongia, tinhtrang)
  const [phong, setPhong] = useState([
    // TẦNG 1 - Phòng Đơn (Giá mềm)
    { maphong: "P101", loaiphong: "Đơn", dongia: 300000, tinhtrang: "Trống" },
    { maphong: "P102", loaiphong: "Đơn", dongia: 300000, tinhtrang: "Đang ở" },
    { maphong: "P103", loaiphong: "Đơn", dongia: 300000, tinhtrang: "Trống" },
    { maphong: "P104", loaiphong: "Đơn", dongia: 300000, tinhtrang: "Trống" },
    { maphong: "P105", loaiphong: "Đơn", dongia: 300000, tinhtrang: "Trống" },

    // TẦNG 2 - Phòng Đôi (Phù hợp gia đình/cặp đôi)
    { maphong: "P201", loaiphong: "Đôi", dongia: 500000, tinhtrang: "Trống" },
    { maphong: "P202", loaiphong: "Đôi", dongia: 500000, tinhtrang: "Trống" },
    { maphong: "P203", loaiphong: "Đôi", dongia: 500000, tinhtrang: "Trống" },
    { maphong: "P204", loaiphong: "Đôi", dongia: 500000, tinhtrang: "Trống" },
    { maphong: "P205", loaiphong: "Đôi", dongia: 500000, tinhtrang: "Trống" },

    // TẦNG 3 - Phòng VIP (Không gian rộng, view đẹp)
    { maphong: "P301", loaiphong: "VIP", dongia: 800000, tinhtrang: "Trống" },
    { maphong: "P302", loaiphong: "VIP", dongia: 800000, tinhtrang: "Trống" },
    { maphong: "P303", loaiphong: "VIP", dongia: 800000, tinhtrang: "Trống" },
    { maphong: "P304", loaiphong: "VIP", dongia: 800000, tinhtrang: "Trống" },
    { maphong: "P305", loaiphong: "VIP", dongia: 800000, tinhtrang: "Trống" },

    // TẦNG 4 - Phòng Tổng Thống (Luxury Suite)
    { maphong: "P401", loaiphong: "VIP Premium", dongia: 1500000, tinhtrang: "Trống" },
    { maphong: "P402", loaiphong: "VIP Premium", dongia: 1500000, tinhtrang: "Trống" },
    { maphong: "P403", loaiphong: "VIP Premium", dongia: 1500000, tinhtrang: "Trống" },
    { maphong: "P404", loaiphong: "VIP Premium", dongia: 1500000, tinhtrang: "Trống" },
    { maphong: "P405", loaiphong: "VIP Premium", dongia: 1500000, tinhtrang: "Trống" }
  ]);

  // 2. BẢNG khachhang (makh, hoten, ngaysinh, gioitinh, diachi, email, sdt, cccd)
  const [khachhang, setKhachhang] = useState([
    { makh: "KH001", hoten: "Nguyễn Văn Đạt", ngaysinh: "1998-05-20", gioitinh: "Nam", diachi: "Hà Nội", email: "dat@gmail.com", sdt: "0912345678", cccd: "001200012345" },
  ]);

  // 3. BẢNG nhanvien (manv, hoten, sdt, email, catruc)
  const [nhanvien, setNhanvien] = useState([
    { manv: "NV001", hoten: "Trần Thị Ngọc Anh", sdt: "0933333333", email: "anhnv@hotel.com", catruc: "Sáng", matkhau: "123456" },
    { manv: "NV002", hoten: "Phạm Minh Hoàng", sdt: "0944444444", email: "ducpm@hotel.com", catruc: "Tối", matkhau: "123456" }
  ]);

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("hotel_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [dichvu, setDichvu] = useState([
    // BỘ PHẬN ĐỒ UỐNG (MINIBAR)
    { madv: "DV001", tendv: "Nước khoáng Lavie", dongia: 15000, donvitinh: "Chai" },
    { madv: "DV002", tendv: "Coca Cola / Pepsi", dongia: 20000, donvitinh: "Lon" },
    { madv: "DV003", tendv: "Bia Heineken", dongia: 35000, donvitinh: "Lon" },
    { madv: "DV004", tendv: "Cà phê sữa đá", dongia: 30000, donvitinh: "Ly" },
    { madv: "DV005", tendv: "Nước ép cam tươi", dongia: 45000, donvitinh: "Ly" },

    // BỘ PHẬN BẾP (ROOM SERVICE)
    { madv: "DV006", tendv: "Mì xào bò phi lê", dongia: 65000, donvitinh: "Đĩa" },
    { madv: "DV007", tendv: "Cơm chiên hải sản", dongia: 85000, donvitinh: "Đĩa" },
    { madv: "DV008", tendv: "Phở bò đặc biệt", dongia: 75000, donvitinh: "Tô" },
    { madv: "DV009", tendv: "Trái cây đĩa thập cẩm", dongia: 50000, donvitinh: "Đĩa" },
    { madv: "DV010", tendv: "Bánh mì ốp la xúc xích", dongia: 40000, donvitinh: "Suất" },

    // BỘ PHẬN TIỆN ÍCH & DI CHUYỂN
    { madv: "DV011", tendv: "Giặt là lấy ngay", dongia: 50000, donvitinh: "Lượt" },
    { madv: "DV012", tendv: "Thuê xe máy tay ga", dongia: 150000, donvitinh: "Ngày" },
    { madv: "DV013", tendv: "Trang trí phòng tuần trăng mật", dongia: 500000, donvitinh: "Gói" }
  ]);

  // 5. BẢNG datphong (madat, makh, maphong, manv, ngaydat, ngaynhan, ngaytra, songuoi)
  const [datphong, setDatphong] = useState([
    { madat: "DP001", makh: "KH001", maphong: "P102", manv: "NV001", ngaydat: "2026-06-10", ngaynhan: "2026-06-12", ngaytra: "2026-06-15", songuoi: 2 }
  ]);

  // 6. BẢNG sudungdv (id, madat, madv, soluong, ngaysudung)
  const [sudungdv, setSudungdv] = useState([
    { id: 1, madat: "DP001", madv: "DV002", soluong: 3, ngaysudung: "2026-06-13" }
  ]);

  // 7. BẢNG hoadon (mahd, madat, ngaylap, tongtien)
  const [hoadon, setHoadon] = useState([]);

  // 8. BẢNG thanhtoan (matt, mahd, ngaytt, phuongthuc, sotien)
  const [thanhtoan, setThanhtoan] = useState([]);


  // --- CÁC HÀM LOGIC XỬ LÝ (MAPPING GIỮA CÁC BẢNG) ---

  // Luồng Lập đơn đặt phòng mới (Insert vào bảng datphong & Update trạng thái bảng phong)
  const datPhongMoi = (datData) => {
    const maDatMoi = `DP${String(datphong.length + 1).padStart(3, "0")}`;
    const donMoi = {
      madat: maDatMoi,
      makh: datData.makh,
      maphong: datData.maphong,
      manv: datData.manv || "NV001",
      ngaydat: new Date().toISOString().split('T')[0],
      ngaynhan: datData.ngaynhan,
      ngaytra: datData.ngaytra,
      songuoi: parseInt(datData.songuoi)
    };

    setDatphong(prev => [donMoi, ...prev]);
    setPhong(prev => prev.map(p => p.maphong === datData.maphong ? { ...p, tinhtrang: "Đang ở" } : p));
    return true;
  };

  // Luồng Gọi thêm dịch vụ (Insert vào bảng sudungdv)
  const goiDichVu = (maDat, maDv, soLuong) => {
    const idMoi = sudungdv.length > 0 ? Math.max(...sudungdv.map(s => s.id)) + 1 : 1;
    const giaHanMoi = {
      id: idMoi,
      madat: maDat,
      madv: maDv,
      soluong: parseInt(soLuong),
      ngaysudung: new Date().toISOString().split('T')[0]
    };
    setSudungdv(prev => [...prev, giaHanMoi]);
  };

  const [phanhoi, setPhanhoi] = useState([
    { maph: "PH001", makh: "KH001", madat: "DP001", diem: 5, noidung: "Phòng sạch sẽ, nhân viên nhiệt tình!" }
  ]);

  // Luồng Trả phòng & Xuất hóa đơn (Tính toán tiền phòng + tiền dịch vụ để đẩy vào hoadon)
  const tinhToanVaXuatHoaDon = (maDat, phuongthuc, feedbackData) => {
    const thongTinDon = datphong.find(d => d.madat === maDat);
    if (!thongTinDon) return null;

    const thongTinPhong = phong.find(p => p.maphong === thongTinDon.maphong);

    // 1. Tính tiền phòng = Số đêm * Đơn giá phòng
    const checkIn = new Date(thongTinDon.ngaynhan);
    const checkOut = new Date(thongTinDon.ngaytra);
    const soDem = Math.max(1, Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)));
    const tienPhong = soDem * (thongTinPhong?.dongia || 0);

    // 2. Tính tiền dịch vụ từ bảng sudungdv
    const dsDichVuDaDung = sudungdv.filter(s => s.madat === maDat);
    const tienDichVu = dsDichVuDaDung.reduce((tong, item) => {
      const dv = dichvu.find(d => d.madv === item.madv);
      return tong + (item.soluong * (dv?.dongia || 0));
    }, 0);

    const tongTienPhaiTra = tienPhong + tienDichVu;
    const maHdMoi = `HD${String(hoadon.length + 1).padStart(3, "0")}`;

    // 3. Khởi tạo đối tượng hóa đơn (Gộp luôn thuộc tính phương thức thanh toán)
    const hoaDonMoi = {
      mahd: maHdMoi,
      madat: maDat,
      ngaylap: new Date().toISOString().split('T')[0],
      tongtien: tongTienPhaiTra,
      phuongthuc: phuongthuc // Gộp thực thể thanh toán vào đây
    };

    // 4. Cập nhật state Hóa đơn
    setHoadon(prev => [hoaDonMoi, ...prev]);

    // 5. Trả phòng xong thì giải phóng phòng về trạng thái 'Trống'
    setPhong(prev => prev.map(p => p.maphong === thongTinDon.maphong ? { ...p, tinhtrang: "Trống" } : p));

    // 6. Kiểm tra và ghi nhận thực thể Phản hồi [phanhoi] nếu có nội dung
    if (feedbackData && feedbackData.noidung?.trim() !== "") {
      const maPhMoi = `PH${String(phanhoi.length + 1).padStart(3, "0")}`;
      const phanHoiMoi = {
        maph: maPhMoi,
        makh: thongTinDon.makh, // Lấy mã khách hàng từ đơn đặt phòng gốc
        madat: maDat,
        diem: feedbackData.diem,
        noidung: feedbackData.noidung
      };
      setPhanhoi(prev => [phanHoiMoi, ...prev]);
    }

    return hoaDonMoi;
  };

  const loginEmployee = (manv, matkhau) => {
    const nv = nhanvien.find(n => n.manv === manv && n.matkhau === matkhau);
    if (nv) {
      setCurrentUser(nv);

      // 💾 LƯU VÀO BỘ NHỚ: Lưu nguyên Object nhân viên dưới dạng chuỗi JSON
      localStorage.setItem("hotel_user", JSON.stringify(nv));
      return true;
    }
    return false;
  };

  const logoutEmployee = () => {
    setCurrentUser(null);

    // ❌ XÓA KHỎI BỘ NHỚ: Khi đăng xuất thì xóa dấu vết luôn
    localStorage.removeItem("hotel_user");
  };

  return (
    <HotelContext.Provider value={{
      phong, khachhang, nhanvien, currentUser, dichvu, datphong, sudungdv, hoadon, thanhtoan, phanhoi,
      setKhachhang, datPhongMoi, goiDichVu, tinhToanVaXuatHoaDon, setNhanvien, loginEmployee, logoutEmployee
    }}>
      {children}
    </HotelContext.Provider>
  );
}

export const useHotel = () => useContext(HotelContext);
