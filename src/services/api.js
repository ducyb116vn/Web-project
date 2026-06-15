const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
};

// ---------- Dashboard ----------
export const getDashboardStats = () => request("/dashboard/stats");
export const getRecentBookings = () => request("/dashboard/recent-bookings");
export const getRevenueChart = (period = "week") => request(`/dashboard/revenue?period=${period}`);

// ---------- Rooms ----------
export const getRooms = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return request(`/rooms${q ? "?" + q : ""}`);
};
export const getRoomById = (id) => request(`/rooms/${id}`);
export const createRoom = (data) => request("/rooms", { method: "POST", body: JSON.stringify(data) });
export const updateRoom = (id, data) => request(`/rooms/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteRoom = (id) => request(`/rooms/${id}`, { method: "DELETE" });

// ---------- Bookings ----------
export const getBookings = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return request(`/bookings${q ? "?" + q : ""}`);
};
export const getBookingById = (id) => request(`/bookings/${id}`);
export const createBooking = (data) => request("/bookings", { method: "POST", body: JSON.stringify(data) });
export const updateBooking = (id, data) => request(`/bookings/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const cancelBooking = (id) => request(`/bookings/${id}/cancel`, { method: "PATCH" });

// ---------- Customers ----------
export const getCustomers = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return request(`/customers${q ? "?" + q : ""}`);
};
export const getCustomerById = (id) => request(`/customers/${id}`);
export const createCustomer = (data) => request("/customers", { method: "POST", body: JSON.stringify(data) });
export const updateCustomer = (id, data) => request(`/customers/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteCustomer = (id) => request(`/customers/${id}`, { method: "DELETE" });

// ---------- Staff ----------
export const getStaff = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return request(`/staff${q ? "?" + q : ""}`);
};
export const getStaffById = (id) => request(`/staff/${id}`);
export const createStaff = (data) => request("/staff", { method: "POST", body: JSON.stringify(data) });
export const updateStaff = (id, data) => request(`/staff/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteStaff = (id) => request(`/staff/${id}`, { method: "DELETE" });

// ---------- Reports ----------
export const getRevenueReport = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return request(`/reports/revenue${q ? "?" + q : ""}`);
};
export const getOccupancyReport = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return request(`/reports/occupancy${q ? "?" + q : ""}`);
};
export const exportReport = (type, params = {}) => {
  const q = new URLSearchParams(params).toString();
  return request(`/reports/export/${type}${q ? "?" + q : ""}`);
};