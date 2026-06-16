import { createContext, useContext, useState, useEffect } from "react";

const HotelContext = createContext();

export function HotelProvider({ children }) {
  
  // BẢNG phong
  const [phong, setPhong] = useState(() => {
    const saved = localStorage.getItem("hotel_phong");
    return saved ? JSON.parse(saved) : [
      { maphong: "P101", loaiphong: "Đơn", dongia: 300000, tinhtrang: "Trống" },
      { maphong: "P102", loaiphong: "Đơn", dongia: 300000, tinhtrang: "Đang ở" },
      { maphong: "P103", loaiphong: "Đơn", dongia: 300000, tinhtrang: "Trống" },
      { maphong: "P104", loaiphong: "Đơn", dongia: 300000, tinhtrang: "Trống" },
      { maphong: "P105", loaiphong: "Đơn", dongia: 300000, tinhtrang: "Trống" },
      { maphong: "P201", loaiphong: "Đôi", dongia: 500000, tinhtrang: "Trống" },
      { maphong: "P202", loaiphong: "Đôi", dongia: 500000, tinhtrang: "Trống" },
      { maphong: "P203", loaiphong: "Đôi", dongia: 500000, tinhtrang: "Trống" },
      { maphong: "P204", loaiphong: "Đôi", dongia: 500000, tinhtrang: "Trống" },
      { maphong: "P205", loaiphong: "Đôi", dongia: 500000, tinhtrang: "Trống" },
      { maphong: "P301", loaiphong: "VIP", dongia: 800000, tinhtrang: "Trống" },
      { maphong: "P302", loaiphong: "VIP", dongia: 800000, tinhtrang: "Trống" },
      { maphong: "P303", loaiphong: "VIP", dongia: 800000, tinhtrang: "Trống" },
      { maphong: "P304", loaiphong: "VIP", dongia: 800000, tinhtrang: "Trống" },
      { maphong: "P305", loaiphong: "VIP", dongia: 800000, tinhtrang: "Trống" },
      { maphong: "P401", loaiphong: "VIP Premium", dongia: 1500000, tinhtrang: "Trống" },
      { maphong: "P402", loaiphong: "VIP Premium", dongia: 1500000, tinhtrang: "Trống" },
      { maphong: "P403", loaiphong: "VIP Premium", dongia: 1500000, tinhtrang: "Trống" },
      { maphong: "P404", loaiphong: "VIP Premium", dongia: 1500000, tinhtrang: "Trống" },
      { maphong: "P405", loaiphong: "VIP Premium", dongia: 1500000, tinhtrang: "Trống" }
    ];
  });

  // BẢNG khachhang
  const [khachhang, setKhachhang] = useState(() => {
    const saved = localStorage.getItem("hotel_khachhang");
    return saved ? JSON.parse(saved) : [
      { makh: "KH001", hoten: "Nguyễn Văn Đạt", ngaysinh: "1998-05-20", gioitinh: "Nam", diachi: "Hà Nội", email: "dat@gmail.com", sdt: "0912345678", cccd: "001200012345" }
    ];
  });

  // BẢNG nhanvien
  const [nhanvien, setNhanvien] = useState(() => {
    const saved = localStorage.getItem("hotel_nhanvien");
    return saved ? JSON.parse(saved) : [
      { manv: "NV001", hoten: "Trần Thị Ngọc Anh", sdt: "0933333333", email: "anhnv@hotel.com", catruc: "Sáng", matkhau: "123456" },
      { manv: "NV002", hoten: "Phạm Minh Hoàng", sdt: "0944444444", email: "ducpm@hotel.com", catruc: "Tối", matkhau: "123456" }
    ];
  });

  // NHÂN VIÊN ĐANG ĐĂNG NHẬP (currentUser)
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("hotel_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // BẢNG danh mục dichvu
  const [dichvu, setDichvu] = useState([
    { madv: "DV001", tendv: "Nước khoáng Lavie", dongia: 15000, donvitinh: "Chai" },
    { madv: "DV002", tendv: "Coca Cola / Pepsi", dongia: 20000, donvitinh: "Lon" },
    { madv: "DV003", tendv: "Bia Heineken", dongia: 35000, donvitinh: "Lon" },
    { madv: "DV004", tendv: "Cà phê sữa đá", dongia: 30000, donvitinh: "Ly" },
    { madv: "DV005", tendv: "Nước ép cam tươi", dongia: 45000, donvitinh: "Ly" },
    { madv: "DV006", tendv: "Mì xào bò phi lê", dongia: 65000, donvitinh: "Đĩa" },
    { madv: "DV007", tendv: "Cơm chiên hải sản", dongia: 85000, donvitinh: "Đĩa" },
    { madv: "DV008", tendv: "Phở bò đặc biệt", dongia: 75000, donvitinh: "Tô" },
    { madv: "DV009", tendv: "Trái cây đĩa thập cẩm", dongia: 50000, donvitinh: "Đĩa" },
    { madv: "DV010", tendv: "Bánh mì ốp la xúc xích", dongia: 40000, donvitinh: "Suất" },
    { madv: "DV011", tendv: "Giặt là lấy ngay", dongia: 50000, donvitinh: "Lượt" },
    { madv: "DV012", tendv: "Thuê xe máy tay ga", dongia: 150000, donvitinh: "Ngày" },
    { madv: "DV013", tendv: "Trang trí phòng tuần trăng mật", dongia: 500000, donvitinh: "Gói" }
  ]);

  // BẢNG datphong
  const [datphong, setDatphong] = useState(() => {
    const saved = localStorage.getItem("hotel_datphong");
    return saved ? JSON.parse(saved) : [
      { madat: "DP001", makh: "KH001", maphong: "P102", manv: "NV001", ngaydat: "2026-06-10", ngaynhan: "2026-06-12", ngaytra: "2026-06-15", songuoi: 2 }
    ];
  });

  // BẢNG sudungdv
  const [sudungdv, setSudungdv] = useState(() => {
    const saved = localStorage.getItem("hotel_sudungdv");
    return saved ? JSON.parse(saved) : [
      { id: 1, madat: "DP001", madv: "DV002", soluong: 3, ngaysudung: "2026-06-13" }
    ];
  });

  // BẢNG hoadon
  const [hoadon, setHoadon] = useState(() => {
    const saved = localStorage.getItem("hotel_hoadon");
    return saved ? JSON.parse(saved) : [];
  });

  // BẢNG thanhtoan
  const [thanhtoan, setThanhtoan] = useState(() => {
    const saved = localStorage.getItem("hotel_thanhtoan");
    return saved ? JSON.parse(saved) : [];
  });

  // BẢNG phanhoi
  const [phanhoi, setPhanhoi] = useState(() => {
    const saved = localStorage.getItem("hotel_phanhoi");
    return saved ? JSON.parse(saved) : [
      { maph: "PH001", makh: "KH001", madat: "DP001", diem: 5, noidung: "Phòng sạch sẽ, nhân viên nhiệt tình!" }
    ];
  });


  // ==========================================================
  // 🔥 2. HỆ THỐNG TỰ ĐỘNG LƯU (ĐỒNG BỘ MỖI KHI STATE THAY ĐỔI)
  // ==========================================================
  useEffect(() => { localStorage.setItem("hotel_phong", JSON.stringify(phong)); }, [phong]);
  useEffect(() => { localStorage.setItem("hotel_khachhang", JSON.stringify(khachhang)); }, [khachhang]);
  useEffect(() => { localStorage.setItem("hotel_nhanvien", JSON.stringify(nhanvien)); }, [nhanvien]);
  useEffect(() => { localStorage.setItem("hotel_datphong", JSON.stringify(datphong)); }, [datphong]);
  useEffect(() => { localStorage.setItem("hotel_sudungdv", JSON.stringify(sudungdv)); }, [sudungdv]);
  useEffect(() => { localStorage.setItem("hotel_hoadon", JSON.stringify(hoadon)); }, [hoadon]);
  useEffect(() => { localStorage.setItem("hotel_thanhtoan", JSON.stringify(thanhtoan)); }, [thanhtoan]);
  useEffect(() => { localStorage.setItem("hotel_phanhoi", JSON.stringify(phanhoi)); }, [phanhoi]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("hotel_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("hotel_user");
    }
  }, [currentUser]);


  // ==========================================================
  // 🛠️ 3. CÁC HÀM LOGIC XỬ LÝ (MAPPING GIỮA CÁC BẢNG)
  // ==========================================================

  // Luồng Lập đơn đặt phòng mới
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

  // Luồng Gọi thêm dịch vụ
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

  // Luồng Trả phòng & Xuất hóa đơn
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

    // 3. Khởi tạo đối tượng hóa đơn
    const hoaDonMoi = {
      mahd: maHdMoi,
      madat: maDat,
      ngaylap: new Date().toISOString().split('T')[0],
      tongtien: tongTienPhaiTra,
      phuongthuc: phuongthuc
    };

    // 4. Cập nhật các state liên quan (Sẽ kích hoạt tự lưu localStorage nhờ bộ useEffect phía trên)
    setHoadon(prev => [hoaDonMoi, ...prev]);
    setPhong(prev => prev.map(p => p.maphong === thongTinDon.maphong ? { ...p, tinhtrang: "Trống" } : p));

    // 5. Ghi nhận thực thể Phản hồi nếu có
    if (feedbackData && feedbackData.noidung?.trim() !== "") {
      const maPhMoi = `PH${String(phanhoi.length + 1).padStart(3, "0")}`;
      const phanHoiMoi = {
        maph: maPhMoi,
        makh: thongTinDon.makh,
        madat: maDat,
        diem: feedbackData.diem,
        noidung: feedbackData.noidung
      };
      setPhanhoi(prev => [phanHoiMoi, ...prev]);
    }

    return hoaDonMoi;
  };

  // Đăng nhập hệ thống
  const loginEmployee = (manv, matkhau) => {
    const nv = nhanvien.find(n => n.manv === manv && n.matkhau === matkhau);
    if (nv) {
      setCurrentUser(nv);
      return true;
    }
    return false;
  };

  // Đăng xuất hệ thống
  const logoutEmployee = () => {
    setCurrentUser(null);
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
