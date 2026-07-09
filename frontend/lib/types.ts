// Backend DTO'larının TypeScript karşılıkları (enum'lar lowercase string union).

export type Role =
  | "super_admin" | "admin" | "developer" | "designer"
  | "seo_specialist" | "viewer" | "accountant";

export type TaskStatus =
  | "open" | "in_progress" | "in_review" | "completed" | "cancelled" | "delayed";
export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type ProjectStatus =
  | "proposal" | "approved" | "in_progress" | "testing" | "live"
  | "maintenance" | "cancelled" | "completed";
export type LeadStatus =
  | "new" | "contacted" | "meeting_scheduled" | "proposal_sent" | "won" | "lost" | "on_hold";
export type Currency = "eur" | "try" | "usd";

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  status: string;
  avatarUrl?: string | null;
  hourlyRate?: number | null;
  expertiseTags: string[];
  preferredLanguage: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string | null;
  projectId?: string | null;
  dueDate?: string | null;
  completedAt?: string | null;
  createdBy: string;
  tags: string[];
  estimatedHours?: number | null;
  actualHours?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface TaskComment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface TaskFile {
  id: string;
  taskId: string;
  fileName: string;
  fileUrl: string;
  fileSizeBytes?: number | null;
  uploadedAt: string;
}

export interface TaskDetail {
  task: Task;
  comments: TaskComment[];
  files: TaskFile[];
}

export interface Project {
  id: string;
  name: string;
  customerId?: string | null;
  description?: string | null;
  status: ProjectStatus;
  budgetAmount?: number | null;
  budgetCurrency: Currency;
  startDate?: string | null;
  endDate?: string | null;
  profitShareDev: number;
  profitShareDesign: number;
  profitSharePm: number;
  profitShareCompany: number;
  createdAt: string;
}

export interface Customer {
  id: string;
  companyName: string;
  taxNumber?: string | null;
  contactPerson?: string | null;
  email?: string | null;
  phone?: string | null;
  country?: string | null;
  city?: string | null;
  address?: string | null;
  website?: string | null;
  notes?: string | null;
  createdAt: string;
}

export interface Lead {
  id: string;
  customerId?: string | null;
  source?: string | null;
  sourceDetail?: string | null;
  status: LeadStatus;
  expectedValue?: number | null;
  currency: Currency;
  assignedTo?: string | null;
  notes?: string | null;
  contactName?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Finance {
  id: string;
  type: "income" | "expense";
  category?: string | null;
  projectId?: string | null;
  amount: number;
  currency: Currency;
  exchangeRate: number;
  amountEur?: number | null;
  description?: string | null;
  date: string;
  createdAt: string;
}

export interface DashboardStats {
  totalTasks: number;
  openTasks: number;
  completedTasks: number;
  delayedTasks: number;
  totalProjects: number;
  activeProjects: number;
  monthlyIncome: number;
  monthlyExpense: number;
}

export interface Activity {
  id: string;
  userId?: string | null;
  action: string;
  entityType?: string | null;
  entityId?: string | null;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: string;
  activeFrom?: string | null;
  activeUntil?: string | null;
  createdAt: string;
}

export interface Paged<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
