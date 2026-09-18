export type TransactionType = 'expense' | 'income';

export type PaymentMethod = 'UPI' | 'Cash' | 'Credit / Debit Card' | 'Bank Transfer' | 'Other';

export interface CategoryInfo {
  id: string;
  name: string;
  type: TransactionType;
  iconName: string;
  color: string;
  bgColor: string;
  textColor: string;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  paymentMethod: PaymentMethod;
  date: string; // ISO YYYY-MM-DD
  note?: string;
  createdAt: number;
}

export interface Budget {
  monthlyLimit: number;
  currency: string; // e.g. '₹', '$', '€', '£'
}

// Backward compatibility alias if needed
export type StudentBudget = Budget;

export type SortOption = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc';

export interface FilterState {
  type: 'all' | 'expense' | 'income';
  category: string;
  searchQuery: string;
  sortBy: SortOption;
  selectedMonth: string; // 'all' or 'YYYY-MM'
}

export const CATEGORIES: CategoryInfo[] = [
  // General Expense categories
  {
    id: 'food',
    name: 'Food & Dining',
    type: 'expense',
    iconName: 'Utensils',
    color: 'emerald',
    bgColor: 'bg-emerald-100 dark:bg-emerald-950/40',
    textColor: 'text-emerald-700 dark:text-emerald-400',
  },
  {
    id: 'groceries',
    name: 'Groceries & Supplies',
    type: 'expense',
    iconName: 'ShoppingBag',
    color: 'amber',
    bgColor: 'bg-amber-100 dark:bg-amber-950/40',
    textColor: 'text-amber-700 dark:text-amber-400',
  },
  {
    id: 'housing',
    name: 'Rent & Housing',
    type: 'expense',
    iconName: 'Home',
    color: 'indigo',
    bgColor: 'bg-indigo-100 dark:bg-indigo-950/40',
    textColor: 'text-indigo-700 dark:text-indigo-400',
  },
  {
    id: 'utilities',
    name: 'Bills & Utilities',
    type: 'expense',
    iconName: 'Zap',
    color: 'sky',
    bgColor: 'bg-sky-100 dark:bg-sky-950/40',
    textColor: 'text-sky-700 dark:text-sky-400',
  },
  {
    id: 'transport',
    name: 'Transport & Fuel',
    type: 'expense',
    iconName: 'Bus',
    color: 'blue',
    bgColor: 'bg-blue-100 dark:bg-blue-950/40',
    textColor: 'text-blue-700 dark:text-blue-400',
  },
  {
    id: 'shopping',
    name: 'Shopping & Personal',
    type: 'expense',
    iconName: 'Tag',
    color: 'purple',
    bgColor: 'bg-purple-100 dark:bg-purple-950/40',
    textColor: 'text-purple-700 dark:text-purple-400',
  },
  {
    id: 'entertainment',
    name: 'Entertainment & Leisure',
    type: 'expense',
    iconName: 'Film',
    color: 'rose',
    bgColor: 'bg-rose-100 dark:bg-rose-950/40',
    textColor: 'text-rose-700 dark:text-rose-400',
  },
  {
    id: 'health',
    name: 'Health & Medical',
    type: 'expense',
    iconName: 'HeartPulse',
    color: 'red',
    bgColor: 'bg-red-100 dark:bg-red-950/40',
    textColor: 'text-red-700 dark:text-red-400',
  },
  {
    id: 'education',
    name: 'Education & Courses',
    type: 'expense',
    iconName: 'BookOpen',
    color: 'teal',
    bgColor: 'bg-teal-100 dark:bg-teal-950/40',
    textColor: 'text-teal-700 dark:text-teal-400',
  },
  {
    id: 'other-expense',
    name: 'Other Expenses',
    type: 'expense',
    iconName: 'CircleDot',
    color: 'slate',
    bgColor: 'bg-slate-100 dark:bg-slate-800',
    textColor: 'text-slate-700 dark:text-slate-300',
  },

  // General Income categories
  {
    id: 'salary',
    name: 'Salary & Wages',
    type: 'income',
    iconName: 'Briefcase',
    color: 'emerald',
    bgColor: 'bg-emerald-100 dark:bg-emerald-950/40',
    textColor: 'text-emerald-700 dark:text-emerald-400',
  },
  {
    id: 'freelance',
    name: 'Freelance & Projects',
    type: 'income',
    iconName: 'Laptop',
    color: 'cyan',
    bgColor: 'bg-cyan-100 dark:bg-cyan-950/40',
    textColor: 'text-cyan-700 dark:text-cyan-400',
  },
  {
    id: 'investments',
    name: 'Investments & Returns',
    type: 'income',
    iconName: 'Coins',
    color: 'amber',
    bgColor: 'bg-amber-100 dark:bg-amber-950/40',
    textColor: 'text-amber-700 dark:text-amber-400',
  },
  {
    id: 'allowance-gifts',
    name: 'Gifts & Allowance',
    type: 'income',
    iconName: 'Gift',
    color: 'purple',
    bgColor: 'bg-purple-100 dark:bg-purple-950/40',
    textColor: 'text-purple-700 dark:text-purple-400',
  },
  {
    id: 'other-income',
    name: 'Other Income',
    type: 'income',
    iconName: 'ArrowDownLeft',
    color: 'green',
    bgColor: 'bg-green-100 dark:bg-green-950/40',
    textColor: 'text-green-700 dark:text-green-400',
  },
];

// Compatibility export
export const STUDENT_CATEGORIES = CATEGORIES;

export const PAYMENT_METHODS: PaymentMethod[] = [
  'UPI',
  'Cash',
  'Credit / Debit Card',
  'Bank Transfer',
  'Other',
];
