const NAV = [
  { id: "dashboard", icon: "🏠", label: "Tổng quan" },
  { id: "khachhang", icon: "👥", label: "Khách hàng" },
  { id: "phong", icon: "🛏️", label: "Phòng" },
  { id: "dichvu", icon: "💼", label: "Dịch vụ" },
  { id: "hoadon", icon: "🧾", label: "Hóa đơn" },
];

export default function Sidebar({ active, onNav, collapsed, onToggle }) {
  return (
    <aside style={{
      width: collapsed ? 64 : 220,
      minHeight: "100vh",
      background: "#111827",
      display: "flex",
      flexDirection: "column",
      transition: "width 0.2s",
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{
        padding: collapsed ? "20px 0" : "20px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "space-between",
        borderBottom: "1px solid #1f2937",
      }}>
        {!collapsed && (
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, letterSpacing: "0.02em" }}>LuxStay</div>
            <div style={{ color: "#6b7280", fontSize: 11 }}>Quản lý khách sạn</div>
          </div>
        )}
        <button onClick={onToggle} style={{
          background: "none", border: "none", color: "#6b7280",
          cursor: "pointer", fontSize: 18, padding: 4, lineHeight: 1,
          display: "flex", alignItems: "center",
        }}>☰</button>
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: "12px 0" }}>
        {NAV.map(item => {
          const isActive = active === item.id;
          return (
            <button key={item.id} onClick={() => onNav(item.id)} style={{
              width: "100%", display: "flex", alignItems: "center",
              gap: collapsed ? 0 : 12,
              padding: collapsed ? "10px 0" : "10px 16px",
              justifyContent: collapsed ? "center" : "flex-start",
              background: isActive ? "#1f2937" : "none",
              border: "none", cursor: "pointer",
              color: isActive ? "#fff" : "#9ca3af",
              borderLeft: isActive ? "3px solid #6366f1" : "3px solid transparent",
              transition: "all 0.15s",
              fontSize: 14, fontWeight: isActive ? 500 : 400,
            }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: collapsed ? "16px 0" : "16px", borderTop: "1px solid #1f2937" }}>
        {collapsed ? (
          <div style={{ textAlign: "center", fontSize: 20 }}>👤</div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "#6366f1", display: "flex", alignItems: "center",
              justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 600,
            }}>QT</div>
            <div>
              <div style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>Quản trị viên</div>
              <div style={{ color: "#6b7280", fontSize: 11 }}>admin@luxstay.vn</div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}