export type UserRole = 'ADMIN' | 'COACH' | 'PARENT';

export interface DashboardStats {
  totalRevenue: number;
  totalStudents: number;
  totalCoaches: number;
  totalPrograms: number;
  monthlyRevenue: { month: string; amount: number }[];
  enrollmentTrend: { month: string; count: number }[];
}

export interface PaymentStatus {
  PENDING: 'PENDING';
  PAID: 'PAID';
  OVERDUE: 'OVERDUE';
  CANCELLED: 'CANCELLED';
}

export interface AttendanceStatus {
  PRESENT: 'PRESENT';
  ABSENT: 'ABSENT';
  EXCUSED: 'EXCUSED';
  LATE: 'LATE';
}
