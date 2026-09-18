import React from 'react';
import { PieChart, TrendingDown } from 'lucide-react';
import { Transaction, CATEGORIES, Budget } from '../types';
import { CategoryIcon } from './CategoryIcon';

interface CategoryBreakdownProps {
  transactions: Transaction[];
  budget: Budget;
}

export const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({
  transactions,
  budget,
}) => {
  // Only calculate for expenses
  const expenses = transactions.filter((t) => t.type === 'expense');
  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  // Group by category
  const categoryTotals = expenses.reduce<Record<string, number>>((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});

  // Convert to sorted array
  const sortedBreakdown = Object.entries(categoryTotals)
    .map(([catId, amount]) => {
      const catInfo = CATEGORIES.find((c) => c.id === catId) || {
        id: catId,
        name: catId,
        type: 'expense' as const,
        iconName: 'CircleDot',
        color: 'slate',
        bgColor: 'bg-slate-100',
        textColor: 'text-slate-700',
      };
      const percentage = totalExpense > 0 ? Math.round((amount / totalExpense) * 100) : 0;
      return {
        catInfo,
        amount,
        percentage,
      };
    })
    .sort((a, b) => b.amount - a.amount);

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs text-center py-8">
        <PieChart className="w-8 h-8 text-slate-300 mx-auto mb-2" />
        <p className="text-xs text-slate-500 font-medium">No expenses logged yet</p>
        <p className="text-[11px] text-slate-400 mt-1">
          Add an expense entry or load sample data to view your spending breakdown
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
            <TrendingDown className="w-4 h-4 text-rose-500" />
            <span>Category Spending Breakdown</span>
          </h3>
          <p className="text-xs text-slate-500">
            Overview of where your expenses go
          </p>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
          {sortedBreakdown.length} {sortedBreakdown.length === 1 ? 'Category' : 'Categories'}
        </span>
      </div>

      <div className="space-y-3">
        {sortedBreakdown.map(({ catInfo, amount, percentage }) => (
          <div key={catInfo.id} className="group">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${catInfo.bgColor} ${catInfo.textColor}`}>
                  <CategoryIcon iconName={catInfo.iconName} className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold text-slate-800">{catInfo.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">
                  {budget.currency}{amount.toLocaleString()}
                </span>
                <span className="text-slate-400 font-medium w-8 text-right">
                  {percentage}%
                </span>
              </div>
            </div>

            {/* Visual Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-300 group-hover:bg-indigo-700"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
