/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Transaction,
  Budget,
  FilterState,
  CATEGORIES,
} from './types';
import { SAMPLE_TRANSACTIONS } from './data/initialData';
import { Header } from './components/Header';
import { SummaryCards } from './components/SummaryCards';
import { TransactionForm } from './components/TransactionForm';
import { CategoryFilters } from './components/CategoryFilters';
import { TransactionList } from './components/TransactionList';
import { CategoryBreakdown } from './components/CategoryBreakdown';
import { Footer } from './components/Footer';

const STORAGE_KEY_TRANSACTIONS = 'expense_tracker_transactions_v2';
const STORAGE_KEY_BUDGET = 'expense_tracker_budget_v2';

export default function App() {
  // 1. Transactions state with LocalStorage persistence - defaults to empty array
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TRANSACTIONS);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading transactions from localStorage', e);
    }
    return [];
  });

  // 2. Monthly Budget limit & currency state
  const [budget, setBudget] = useState<Budget>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BUDGET);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error reading budget from localStorage', e);
    }
    return {
      monthlyLimit: 25000,
      currency: '₹',
    };
  });

  // 3. Category & type filters state
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    category: 'all',
    searchQuery: '',
    sortBy: 'date-desc',
    selectedMonth: 'all',
  });

  // Sync transactions to LocalStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(transactions));
    } catch (e) {
      console.error('Failed to save transactions to localStorage', e);
    }
  }, [transactions]);

  // Sync budget to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BUDGET, JSON.stringify(budget));
    } catch (e) {
      console.error('Failed to save budget to localStorage', e);
    }
  }, [budget]);

  // Dynamic balance & summary calculations using array methods
  const { totalIncome, totalExpenses, totalBalance, currentMonthExpenses } = useMemo(() => {
    let income = 0;
    let expense = 0;
    let thisMonthExpense = 0;

    const currentYearMonth = new Date().toISOString().slice(0, 7); // e.g. "2026-09"

    for (const tx of transactions) {
      if (tx.type === 'income') {
        income += tx.amount;
      } else if (tx.type === 'expense') {
        expense += tx.amount;
        if (tx.date.startsWith(currentYearMonth)) {
          thisMonthExpense += tx.amount;
        }
      }
    }

    return {
      totalIncome: income,
      totalExpenses: expense,
      totalBalance: income - expense,
      currentMonthExpenses: thisMonthExpense,
    };
  }, [transactions]);

  // Extract distinct available months for filtering
  const availableMonths = useMemo(() => {
    const monthsSet = new Set<string>();
    transactions.forEach((tx) => {
      if (tx.date && tx.date.length >= 7) {
        monthsSet.add(tx.date.slice(0, 7));
      }
    });
    return Array.from(monthsSet).sort().reverse();
  }, [transactions]);

  // Filter and sort transactions dynamically using array methods
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => {
        // Type filter
        if (filters.type !== 'all' && tx.type !== filters.type) {
          return false;
        }

        // Category filter
        if (filters.category !== 'all' && tx.category !== filters.category) {
          return false;
        }

        // Month filter
        if (filters.selectedMonth !== 'all' && !tx.date.startsWith(filters.selectedMonth)) {
          return false;
        }

        // Search query filter (matches title, note, or category label)
        if (filters.searchQuery.trim()) {
          const query = filters.searchQuery.toLowerCase();
          const categoryName = CATEGORIES.find((c) => c.id === tx.category)?.name.toLowerCase() || '';
          const matchesTitle = tx.title.toLowerCase().includes(query);
          const matchesNote = tx.note ? tx.note.toLowerCase().includes(query) : false;
          const matchesCategory = categoryName.includes(query);

          if (!matchesTitle && !matchesNote && !matchesCategory) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'date-desc') {
          return new Date(b.date).getTime() - new Date(a.date).getTime() || b.createdAt - a.createdAt;
        }
        if (filters.sortBy === 'date-asc') {
          return new Date(a.date).getTime() - new Date(b.date).getTime() || a.createdAt - b.createdAt;
        }
        if (filters.sortBy === 'amount-desc') {
          return b.amount - a.amount;
        }
        if (filters.sortBy === 'amount-asc') {
          return a.amount - b.amount;
        }
        return 0;
      });
  }, [transactions, filters]);

  // Transaction counts for filter pills
  const counts = useMemo(() => {
    let inc = 0;
    let exp = 0;
    for (const tx of transactions) {
      if (tx.type === 'income') inc++;
      else exp++;
    }
    return {
      total: transactions.length,
      income: inc,
      expense: exp,
    };
  }, [transactions]);

  // Handlers
  const handleAddTransaction = (newTxData: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTransaction: Transaction = {
      ...newTxData,
      id: 'tx-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      createdAt: Date.now(),
    };

    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  const handleUpdateBudget = (newLimit: number, currency: string) => {
    setBudget({
      monthlyLimit: newLimit,
      currency,
    });
  };

  const handleLoadDemoData = () => {
    setTransactions(SAMPLE_TRANSACTIONS);
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all transactions from LocalStorage?')) {
      setTransactions([]);
    }
  };

  // Export transactions to CSV spreadsheet
  const handleExportCSV = () => {
    if (transactions.length === 0) return;

    const headers = ['Date', 'Title', 'Type', 'Category', 'Payment Method', `Amount (${budget.currency})`, 'Note'];
    const rows = transactions.map((t) => {
      const catObj = CATEGORIES.find((c) => c.id === t.category);
      const catName = catObj ? catObj.name : t.category;
      return [
        t.date,
        `"${t.title.replace(/"/g, '""')}"`,
        t.type.toUpperCase(),
        `"${catName}"`,
        t.paymentMethod,
        t.amount,
        `"${(t.note || '').replace(/"/g, '""')}"`,
      ];
    });

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `expenses_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Application Header */}
      <Header
        budget={budget}
        onUpdateBudget={handleUpdateBudget}
        onLoadDemoData={handleLoadDemoData}
        onClearData={handleClearData}
        onExportCSV={handleExportCSV}
        transactionCount={transactions.length}
      />

      {/* Main Content Dashboard */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Dynamic Balance, Income, Expense & Monthly Budget Cards */}
        <SummaryCards
          totalBalance={totalBalance}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          budget={budget}
          transactionCount={transactions.length}
          currentMonthExpenses={currentMonthExpenses}
        />

        {/* Two Column Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Add Transaction Form & Spending Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            <TransactionForm
              onAddTransaction={handleAddTransaction}
              budget={budget}
            />

            <CategoryBreakdown
              transactions={transactions}
              budget={budget}
            />
          </div>

          {/* Right Column: Filters & Transaction History List */}
          <div className="lg:col-span-7 space-y-4">
            <CategoryFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              availableMonths={availableMonths}
              totalCount={counts.total}
              incomeCount={counts.income}
              expenseCount={counts.expense}
            />

            <TransactionList
              transactions={filteredTransactions}
              onDeleteTransaction={handleDeleteTransaction}
              budget={budget}
              onLoadDemoData={handleLoadDemoData}
            />
          </div>
        </div>
      </main>

      {/* Private Local Storage Footer */}
      <Footer transactionCount={transactions.length} />
    </div>
  );
}
