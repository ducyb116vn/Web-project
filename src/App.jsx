import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Phong from "./pages/Phong"; 
import DatPhong from "./pages/DatPhong"; 
import KhachHang from "./pages/KhachHang";
import DichVu from "./pages/DichVu";
import HoaDon from "./pages/HoaDon";
import Login from "./pages/Login"; // Import thêm trang Login vừa làm
import { HotelProvider, useHotel } from "./context/HotelContext"; // Import thêm useHotel hook

function AppContent() {
  // Lấy thông tin phiên đăng nhập từ bộ Context chung
  const { currentUser, logoutEmployee } = useHotel();
  
  // State quản lý menu nào đang được hiển thị
  const [activeNav, setActiveNav] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  // BẢO VỆ HỆ THỐNG: Nếu nhân viên chưa đăng nhập, ép hiển thị màn hình Login
  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="flex flex-row w-screen h-screen overflow-hidden select-none">

      <Sidebar
        active={activeNav}
        onNav={setActiveNav}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />

      <main className="flex-1 h-screen overflow-y-auto p-6 bg-[#0f172a] text-gray-300 font-sans">
        
        {/* THANH TOPBAR: Hiển thị góc phải thông tin tài khoản đang thao tác */}
        <div className="flex justify-end items-center gap-3 mb-6 border-b border-gray-800 pb-3 text-xs text-gray-400">
          <span>
            Nhân viên: <strong className="text-indigo-400 font-semibold">{currentUser.hoten}</strong> (Ca {currentUser.catruc})
          </span>
          <button
            onClick={logoutEmployee}
            className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 px-2.5 py-1 rounded-lg cursor-pointer transition-colors text-[11px] font-medium"
          >
            Đăng xuất
          </button>
        </div>

        {/* NỘI DUNG ĐIỀU HƯỚNG TRANG */}
        {activeNav === "dashboard" && <Dashboard />}
        {activeNav === "phong" && <Phong />}
        {activeNav === "datphong" && <DatPhong />}
        {activeNav === "khachhang" && <KhachHang />} 
        {activeNav === "employees" && <Employees />}
        {activeNav === "dichvu" && <DichVu />}
        {activeNav === "hoadon" && <HoaDon />}
      </main>

    </div>
  );
}

// Component gốc giữ vai trò cung cấp dữ liệu toàn cục cho toàn bộ nhánh con
export default function App() {
  return (
    <HotelProvider>
      <AppContent />
    </HotelProvider>
  );
}