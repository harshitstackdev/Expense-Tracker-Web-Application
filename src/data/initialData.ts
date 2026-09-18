import { Transaction } from '../types';

export const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    title: 'Monthly Salary Deposit',
    amount: 45000,
    type: 'income',
    category: 'salary',
    paymentMethod: 'Bank Transfer',
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    note: 'Direct payroll bank deposit',
    createdAt: Date.now() - 6 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'tx-2',
    title: 'House / Apartment Rent',
    amount: 14000,
    type: 'expense',
    category: 'housing',
    paymentMethod: 'UPI',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    note: 'Monthly rental payment',
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'tx-3',
    title: 'Weekly Supermarket Groceries',
    amount: 2450,
    type: 'expense',
    category: 'groceries',
    paymentMethod: 'Credit / Debit Card',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    note: 'Fresh vegetables, fruits & kitchen essentials',
    createdAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'tx-4',
    title: 'Freelance Design / Consulting Gig',
    amount: 8500,
    type: 'income',
    category: 'freelance',
    paymentMethod: 'UPI',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    note: 'Completed client website milestone',
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'tx-5',
    title: 'High-speed Fiber & Electricity Bill',
    amount: 1650,
    type: 'expense',
    category: 'utilities',
    paymentMethod: 'UPI',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    note: 'Monthly internet & home power bill',
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'tx-6',
    title: 'Fuel & Commute Transit Pass',
    amount: 900,
    type: 'expense',
    category: 'transport',
    paymentMethod: 'Credit / Debit Card',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    note: 'Petrol refill & metro card balance',
    createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'tx-7',
    title: 'Dinner with Friends',
    amount: 820,
    type: 'expense',
    category: 'food',
    paymentMethod: 'UPI',
    date: new Date().toISOString().split('T')[0],
    note: 'Casual evening dining',
    createdAt: Date.now(),
  },
];

// Default initial state is completely empty
export const INITIAL_TRANSACTIONS: Transaction[] = [];

// Compatibility exports
export const INITIAL_STUDENT_TRANSACTIONS = INITIAL_TRANSACTIONS;

