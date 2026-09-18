import React, { useState } from 'react';
import {
  Wallet,
  Download,
  RotateCcw,
  Sparkles,
  Target,
  Check,
} from 'lucide-react';
import { Budget } from '../types';

interface HeaderProps {
  budget: Budget;
  onUpdateBudget: (newLimit: number, currency: string) => void;
  onLoadDemoData: () => void;
  onClearData: () => void;
  onExportCSV: () => void;
  transactionCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  budget,
  onUpdateBudget,
  onLoadDemoData,
  onClearData,
  onExportCSV,
  transactionCount,
}) => {
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [tempLimit, setTempLimit] = useState(budget.monthlyLimit.toString());
  const [tempCurrency, setTempCurrency] = useState(budget.currency);

  const handleSaveBudget = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(tempLimit);
    if (!isNaN(parsed) && parsed >= 0) {
      onUpdateBudget(parsed, tempCurrency);
      setShowBudgetModal(false);
    }
  };

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Logo & Clean Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs shrink-0">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  Expense Tracker
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Private & Offline
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Track your daily income, spending, and monthly budget
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              id="set-budget-btn"
              type="button"
              onClick={() => {
                setTempLimit(budget.monthlyLimit.toString());
                setTempCurrency(budget.currency);
                setShowBudgetModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 cursor-pointer"
              title="Change your monthly budget target and currency"
            >
              <Target className="w-3.5 h-3.5 text-indigo-600" />
              <span>Budget: {budget.currency}{budget.monthlyLimit.toLocaleString()}</span>
            </button>

            <button
              id="load-demo-btn"
              type="button"
              onClick={onLoadDemoData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-200 cursor-pointer"
              title="Load sample transactions"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Sample Data</span>
            </button>

            <button
              id="export-csv-btn"
              type="button"
              onClick={onExportCSV}
              disabled={transactionCount === 0}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors border border-slate-200 cursor-pointer"
              title="Export all transactions to CSV file"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            {transactionCount > 0 && (
              <button
                id="clear-all-btn"
                type="button"
                onClick={onClearData}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-50 rounded-lg transition-colors border border-rose-200 cursor-pointer"
                title="Reset all entries"
              >
                <RotateCcw className="w-3.5 h-3.5 text-rose-500" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Budget & Currency Config Modal */}
      {showBudgetModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-sm w-full p-6">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Monthly Budget Goal</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Set your target monthly spending limit and preferred currency.
            </p>

            <form onSubmit={handleSaveBudget} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Currency Symbol
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['₹', '$', '€', '£'].map((curr) => (
                    <button
                      key={curr}
                      type="button"
                      onClick={() => setTempCurrency(curr)}
                      className={`py-1.5 text-sm font-semibold rounded-lg border transition-all cursor-pointer ${
                        tempCurrency === curr
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Monthly Budget Limit ({tempCurrency})
                </label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={tempLimit}
                  onChange={(e) => setTempLimit(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                  placeholder="e.g. 25000"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowBudgetModal(false)}
                  className="px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
