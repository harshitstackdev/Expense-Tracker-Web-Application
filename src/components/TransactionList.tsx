import React, { useState } from 'react';
import {
  Trash2,
  Inbox,
  Clock,
  Calendar,
} from 'lucide-react';
import { Transaction, CATEGORIES, Budget } from '../types';
import { CategoryIcon } from './CategoryIcon';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
  budget: Budget;
  onLoadDemoData: () => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDeleteTransaction,
  budget,
  onLoadDemoData,
}) => {
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Group transactions by Date
  const groupedTransactions = transactions.reduce<Record<string, Transaction[]>>(
    (groups, tx) => {
      const dateKey = tx.date;
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(tx);
      return groups;
    },
    {}
  );

  const formatDateHeader = (dateStr: string) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    if (dateStr === todayStr) return 'Today';
    if (dateStr === yesterday) return 'Yesterday';

    try {
      const d = new Date(`${dateStr}T00:00:00`);
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs text-center">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
          <Inbox className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-slate-800 mb-1">
          No transactions found
        </h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
          Add your first expense or income above, adjust your search filters, or load sample entries to explore.
        </p>
        <button
          type="button"
          onClick={onLoadDemoData}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-200 cursor-pointer"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Load Sample Entries</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Object.entries(groupedTransactions).map(([dateStr, items]) => {
        const dayTotal = items.reduce((sum, item) => {
          return item.type === 'income' ? sum + item.amount : sum - item.amount;
        }, 0);

        return (
          <div key={dateStr} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Date Header */}
            <div className="bg-slate-50/80 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{formatDateHeader(dateStr)}</span>
              </div>
              <span
                className={`font-semibold ${
                  dayTotal >= 0 ? 'text-emerald-700' : 'text-slate-600'
                }`}
              >
                Net: {dayTotal >= 0 ? '+' : ''}{budget.currency}{dayTotal.toLocaleString()}
              </span>
            </div>

            {/* List Items */}
            <div className="divide-y divide-slate-100">
              {items.map((tx) => {
                const categoryObj = CATEGORIES.find((c) => c.id === tx.category) || {
                  id: tx.category,
                  name: tx.category,
                  type: tx.type,
                  iconName: 'CircleDot',
                  color: 'slate',
                  bgColor: 'bg-slate-100',
                  textColor: 'text-slate-700',
                };

                const isConfirmingDelete = deleteConfirmId === tx.id;

                return (
                  <div
                    key={tx.id}
                    className="p-3.5 sm:p-4 hover:bg-slate-50/70 transition-colors flex items-center justify-between gap-3 group"
                  >
                    {/* Left: Icon & Description */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${categoryObj.bgColor} ${categoryObj.textColor}`}
                      >
                        <CategoryIcon iconName={categoryObj.iconName} className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-semibold text-slate-900 truncate">
                            {tx.title}
                          </h4>
                          <span
                            className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${categoryObj.bgColor} ${categoryObj.textColor}`}
                          >
                            {categoryObj.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 flex-wrap">
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">
                            {tx.paymentMethod}
                          </span>
                          {tx.note && (
                            <span className="text-slate-400 text-xs italic truncate max-w-xs">
                              “{tx.note}”
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Amount & Delete Action */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span
                          className={`text-sm sm:text-base font-bold tracking-tight block ${
                            tx.type === 'income' ? 'text-emerald-700' : 'text-slate-900'
                          }`}
                        >
                          {tx.type === 'income' ? '+' : '-'}{budget.currency}
                          {tx.amount.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                          {tx.type}
                        </span>
                      </div>

                      {/* Delete Button */}
                      {isConfirmingDelete ? (
                        <div className="flex items-center gap-1 bg-rose-50 border border-rose-200 p-1 rounded-lg">
                          <button
                            type="button"
                            onClick={() => {
                              onDeleteTransaction(tx.id);
                              setDeleteConfirmId(null);
                            }}
                            className="px-2 py-1 text-[11px] font-bold text-white bg-rose-600 hover:bg-rose-700 rounded transition-colors cursor-pointer"
                            title="Confirm delete"
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(null)}
                            className="px-1.5 py-1 text-[11px] font-medium text-slate-600 hover:text-slate-800 cursor-pointer"
                            title="Cancel"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(tx.id)}
                          className="opacity-60 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                          title="Delete transaction"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
