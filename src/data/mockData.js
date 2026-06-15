export const mockStats = {
  totalRooms: 48,
  occupiedRooms: 35,
  todayBookings: 12,
  todayRevenue: 18450000,
  monthRevenue: 312000000,
  availableRooms: 13,
  checkInsToday: 8,
  checkOutsToday: 5,
};

export const mockRooms = [
  { id: 1, number: "101", type: "Standard", floor: 1, capacity: 2, price: 850000, status: "occupied", amenities: ["WiFi", "TV", "AC"] },
  { id: 2, number: "102", type: "Standard", floor: 1, capacity: 2, price: 850000, status: "available", amenities: ["WiFi", "TV", "AC"] },
  { id: 3, number: "201", type: "Deluxe", floor: 2, capacity: 2, price: 1200000, status: "occupied", amenities: ["WiFi", "TV", "AC", "Bathtub"] },
  { id: 4, number: "202", type: "Deluxe", floor: 2, capacity: 3, price: 1400000, status: "maintenance", amenities: ["WiFi", "TV", "AC", "Bathtub"] },
  { id: 5, number: "301", type: "Suite", floor: 3, capacity: 4, price: 2500000, status: "available", amenities: ["WiFi", "TV", "AC", "Bathtub", "Kitchenette", "Balcony"] },
  { id: 6, number: "302", type: "Suite", floor: 3, capacity: 4, price: 2800000, status: "occupied", amenities: ["WiFi", "TV", "AC", "Bathtub", "Kitchenette", "Balcony"] },
  { id: 7, number: "103", type: "Standard", floor: 1, capacity: 2, price: 850000, status: "available", amenities: ["WiFi", "TV", "AC"] },
  { id: 8, number: "203", type: "Deluxe", floor: 2, capacity: 2, price: 1200000, status: "available", amenities: ["WiFi", "TV", "AC", "Bathtub"] },
];

export const mockBookings = [
  { id: 1, bookingCode: "BK001", customerId: 1, customerName: "Nguyễn Văn An", roomNumber: "101", roomType: "Standard", checkIn: "2025-06-01", checkOut: "2025-06-05", nights: 4, totalAmount: 3400000, status: "checked-in", paymentStatus: "paid", createdAt: "2025-05-28" },
  { id: 2, bookingCode: "BK002", customerId: 2, customerName: "Trần Thị Bình", roomNumber: "201", roomType: "Deluxe", checkIn: "2025-06-02", checkOut: "2025-06-06", nights: 4, totalAmount: 4800000, status: "confirmed", paymentStatus: "paid", createdAt: "2025-05-29" },
  { id: 3, bookingCode: "BK003", customerId: 3, customerName: "Lê Minh Châu", roomNumber: "302", roomType: "Suite", checkIn: "2025-06-03", checkOut: "2025-06-07", nights: 4, totalAmount: 11200000, status: "checked-in", paymentStatus: "paid", createdAt: "2025-05-30" },
  { id: 4, bookingCode: "BK004", customerId: 4, customerName: "Phạm Thị Dung", roomNumber: "102", roomType: "Standard", checkIn: "2025-06-08", checkOut: "2025-06-10", nights: 2, totalAmount: 1700000, status: "pending", paymentStatus: "unpaid", createdAt: "2025-06-01" },
  { id: 5, bookingCode: "BK005", customerId: 5, customerName: "Hoàng Văn Em", roomNumber: "301", roomType: "Suite", checkIn: "2025-06-10", checkOut: "2025-06-15", nights: 5, totalAmount: 12500000, status: "confirmed", paymentStatus: "partial", createdAt: "2025-06-02" },
  { id: 6, bookingCode: "BK006", customerId: 1, customerName: "Nguyễn Văn An", roomNumber: "203", roomType: "Deluxe", checkIn: "2025-05-20", checkOut: "2025-05-25", nights: 5, totalAmount: 6000000, status: "checked-out", paymentStatus: "paid", createdAt: "2025-05-18" },
];

export const mockCustomers = [
  { id: 1, name: "Nguyễn Văn An", email: "an.nguyen@gmail.com", phone: "0912345678", idCard: "001234567890", nationality: "Việt Nam", totalBookings: 5, totalSpent: 18500000, lastVisit: "2025-06-01", vip: true },
  { id: 2, name: "Trần Thị Bình", email: "binh.tran@gmail.com", phone: "0923456789", idCard: "001234567891", nationality: "Việt Nam", totalBookings: 2, totalSpent: 9600000, lastVisit: "2025-06-02", vip: false },
  { id: 3, name: "Lê Minh Châu", email: "chau.le@gmail.com", phone: "0934567890", idCard: "001234567892", nationality: "Việt Nam", totalBookings: 3, totalSpent: 24000000, lastVisit: "2025-06-03", vip: true },
  { id: 4, name: "Phạm Thị Dung", email: "dung.pham@gmail.com", phone: "0945678901", idCard: "001234567893", nationality: "Việt Nam", totalBookings: 1, totalSpent: 1700000, lastVisit: "2025-06-08", vip: false },
  { id: 5, name: "Hoàng Văn Em", email: "em.hoang@gmail.com", phone: "0956789012", idCard: "001234567894", nationality: "Việt Nam", totalBookings: 4, totalSpent: 32000000, lastVisit: "2025-06-10", vip: true },
  { id: 6, name: "Vũ Thị Phương", email: "phuong.vu@gmail.com", phone: "0967890123", idCard: "001234567895", nationality: "Việt Nam", totalBookings: 2, totalSpent: 5500000, lastVisit: "2025-05-15", vip: false },
];

export const mockStaff = [
  { id: 1, name: "Đặng Minh Tuấn", email: "tuan.dang@hotel.com", phone: "0912000001", department: "Lễ tân", role: "Trưởng bộ phận", salary: 12000000, status: "active", joinDate: "2022-01-15", avatar: "ĐT" },
  { id: 2, name: "Ngô Thị Hoa", email: "hoa.ngo@hotel.com", phone: "0912000002", department: "Lễ tân", role: "Nhân viên", salary: 8000000, status: "active", joinDate: "2023-03-20", avatar: "NH" },
  { id: 3, name: "Bùi Văn Hùng", email: "hung.bui@hotel.com", phone: "0912000003", department: "Buồng phòng", role: "Trưởng bộ phận", salary: 11000000, status: "active", joinDate: "2021-07-01", avatar: "BH" },
  { id: 4, name: "Lý Thị Mai", email: "mai.ly@hotel.com", phone: "0912000004", department: "Buồng phòng", role: "Nhân viên", salary: 7500000, status: "active", joinDate: "2024-01-10", avatar: "LM" },
  { id: 5, name: "Trương Văn Nam", email: "nam.truong@hotel.com", phone: "0912000005", department: "Bảo vệ", role: "Trưởng bộ phận", salary: 10000000, status: "active", joinDate: "2022-06-15", avatar: "TN" },
  { id: 6, name: "Đinh Thị Oanh", email: "oanh.dinh@hotel.com", phone: "0912000006", department: "Nhà hàng", role: "Nhân viên", salary: 8500000, status: "on-leave", joinDate: "2023-09-01", avatar: "ĐO" },
];

export const mockRevenue = {
  monthly: [
    { month: "T1", revenue: 210000000, bookings: 145 },
    { month: "T2", revenue: 185000000, bookings: 128 },
    { month: "T3", revenue: 245000000, bookings: 168 },
    { month: "T4", revenue: 278000000, bookings: 192 },
    { month: "T5", revenue: 298000000, bookings: 205 },
    { month: "T6", revenue: 312000000, bookings: 218 },
  ],
  roomTypes: [
    { type: "Standard", revenue: 89000000, count: 62 },
    { type: "Deluxe", revenue: 124000000, count: 103 },
    { type: "Suite", revenue: 99000000, count: 53 },
  ],
};