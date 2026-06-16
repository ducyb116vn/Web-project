import { useState } from "react";
import { useHotel } from "../context/HotelContext";

export default function Login() {
  const { loginEmployee } = useHotel();
  const [manv, setManv] = useState("");
  const [matkhau, setMatkhau] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!manv || !matkhau) {
      setError("Vui lòng điền đầy đủ Mã nhân viên và Mật khẩu!");
      return;
    }

    const success = loginEmployee(manv, matkhau);
    if (!success) {
      setError("Mã nhân viên hoặc Mật khẩu không chính xác.");
    } else {
      // 💾 LƯU VÀO BỘ NHỚ: Khi đăng nhập thành công, lưu lại mã nhân viên vào trình duyệt
      localStorage.setItem("manv_current", manv);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 font-sans text-gray-300">
      <div className="w-full max-w-sm bg-[#1e293b]/50 border border-gray-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
        
        <div className="text-center mb-6">
          <h2 className="m-0 text-xl font-black text-white uppercase tracking-wider">Hotel Admin System</h2>
          <p className="text-xs text-gray-400 mt-1">Hệ thống quản trị nội bộ khách sạn</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-2.5 rounded-lg text-center font-medium">
              ⚠️ {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Mã Nhân Viên</label>
            <input
              type="text"
              value={manv}
              onChange={(e) => setManv(e.target.value)}
              placeholder="Ví dụ: NV001"
              className="w-full bg-[#0f172a] border border-gray-800 text-gray-200 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Mật Khẩu</label>
            <input
              type="password"
              value={matkhau}
              onChange={(e) => setMatkhau(e.target.value)}
              placeholder="••••••"
              className="w-full bg-[#0f172a] border border-gray-800 text-gray-200 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-lg text-xs cursor-pointer transition-colors border-none"
          >
            Đăng nhập vào hệ thống
          </button>
        </form>

        <div className="mt-6 text-center text-[10px] text-gray-500 border-t border-gray-800/60 pt-3">
          Tài khoản mẫu: <span className="font-mono text-gray-400">NV001</span> | Mật khẩu: <span className="font-mono text-gray-400">123456</span>
        </div>
      </div>
    </div>
  );
}
