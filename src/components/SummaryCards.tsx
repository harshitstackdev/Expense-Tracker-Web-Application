import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PiggyBank,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { Budget } from '../types';

interface SummaryCardsProps {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  budget: Budget;
  transactionCount: number;
  currentMonthExpenses: number;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalBalance,
  totalIncome,
  totalExpenses,
  budget,
  transactionCount,
  currentMonthExpenses,
}) => {
  const currency = budget.currency;
  const budgetLimit = budget.monthlyLimit;
  const percentSpent = budgetLimit > 0 ? Math.min(100, Math.round((currentMonthExpenses / budgetLimit) * 100)) : 0;
  const remainingAllowance = budgetLimit - currentMonthExpenses;
  const isOverBudget = currentMonthExpenses > budgetLimit;

  // Calculate savings rate
  const savingsRate = totalIncome > 0 ? Math.max(0, Math.round(((totalIncome - totalExpenses) / totalIncome) * 100)) : 0;

  return (
    <div className="space-y-4">
      {/* 3 Main Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Net Balance Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs relative overflow-hidden transition-all hover:border-slate-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Balance
            </span>
            <div
              className={`p-2 rounded-xl ${
                totalBalance >= 0 ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'
              }`}
            >
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {currency}{totalBalance.toLocaleString()}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs">
            {totalBalance >= 0 ? (
              <span className="text-emerald-700 font-medium flex items-center gap-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Positive balance • {savingsRate}% saved
              </span>
            ) : (
              <span className="text-rose-700 font-medium flex items-center gap-0.5">
                <AlertCircle className="w-3.5 h-3.5" />
                Negative balance
              </span>
            )}
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">{transactionCount} entries</span>
          </div>
        </div>

        {/* Total Income Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs relative overflow-hidden transition-all hover:border-slate-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Income
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 tracking-tight">
              +{currency}{totalIncome.toLocaleString()}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
            <PiggyBank className="w-3.5 h-3.5 text-emerald-600" />
            <span>Salary, freelancing & other income</span>
          </div>
        </div>

        {/* Total Expenses Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs relative overflow-hidden transition-all hover:border-slate-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Expenses
            </span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-rose-700 tracking-tight">
              -{currency}{totalExpenses.toLocaleString()}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
            <span>Rent, groceries, bills & essentials</span>
          </div>
        </div>
      </div>

      {/* Monthly Budget Progress Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Monthly Budget Progress
            </span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
              Limit: {currency}{budgetLimit.toLocaleString()}
            </span>
          </div>

          <div className="text-xs font-medium text-slate-600">
            {isOverBudget ? (
              <span className="text-rose-600 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 inline" />
                Over budget by {currency}{Math.abs(remainingAllowance).toLocaleString()}
              </span>
            ) : (
              <span>
                {currency}{remainingAllowance.toLocaleString()} remaining to spend this month ({100 - percentSpent}% left)
              </span>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isOverBudget
                ? 'bg-rose-500'
                : percentSpent > 85
                ? 'bg-amber-500'
                : 'bg-indigo-600'
            }`}
            style={{ width: `${Math.min(100, Math.max(2, percentSpent))}%` }}
          />
        </div>

        <div className="flex justify-between items-center mt-2 text-[11px] text-slate-500">
          <span>Spent this month: <strong className="text-slate-800">{currency}{currentMonthExpenses.toLocaleString()}</strong> ({percentSpent}%)</span>
          <span className="hidden sm:inline">
            {percentSpent < 70
              ? 'On track with your monthly target'
              : percentSpent < 90
              ? 'Approaching your monthly limit'
              : 'Attention: You have reached or exceeded your limit'}
          </span>
        </div>
      </div>
    </div>
  );
};
