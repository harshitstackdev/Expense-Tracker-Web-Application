import React, { useState } from 'react';
import {
  PlusCircle,
  TrendingDown,
  TrendingUp,
  Tag,
  CreditCard,
  Calendar,
  FileText,
  Sparkles,
} from 'lucide-react';
import {
  Transaction,
  TransactionType,
  PaymentMethod,
  CATEGORIES,
  PAYMENT_METHODS,
  Budget,
} from '../types';
import { CategoryIcon } from './CategoryIcon';

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
  budget: Budget;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  onAddTransaction,
  budget,
}) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('groceries');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  const [showSuccessBadge, setShowSuccessBadge] = useState(false);

  // Available categories based on selected type
  const availableCategories = CATEGORIES.filter((c) => c.type === type);

  // Auto-switch category default when type toggles
  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    const firstCat = CATEGORIES.find((c) => c.type === newType);
    if (firstCat) {
      setCategory(firstCat.id);
    }
  };

  // Quick Presets for everyday convenience
  const quickPresets =
    type === 'expense'
      ? [
          { label: '🛒 Groceries', title: 'Supermarket Groceries', amount: 1500, cat: 'groceries', pay: 'Credit / Debit Card' as PaymentMethod },
          { label: '🍽️ Dining / Lunch', title: 'Restaurant Lunch', amount: 350, cat: 'food', pay: 'UPI' as PaymentMethod },
          { label: '⚡ Utilities / Wifi', title: 'Internet & Electricity Bill', amount: 1200, cat: 'utilities', pay: 'UPI' as PaymentMethod },
          { label: '⛽ Transit / Fuel', title: 'Fuel / Metro Pass', amount: 400, cat: 'transport', pay: 'UPI' as PaymentMethod },
          { label: '☕ Coffee / Snack', title: 'Coffee & Snacks', amount: 120, cat: 'food', pay: 'UPI' as PaymentMethod },
        ]
      : [
          { label: '💼 Salary', title: 'Monthly Salary', amount: 40000, cat: 'salary', pay: 'Bank Transfer' as PaymentMethod },
          { label: '💻 Freelance', title: 'Freelance Project Payment', amount: 6500, cat: 'freelance', pay: 'UPI' as PaymentMethod },
          { label: '📈 Investments', title: 'Investment Dividend / Return', amount: 2000, cat: 'investments', pay: 'Bank Transfer' as PaymentMethod },
        ];

  const applyPreset = (preset: typeof quickPresets[0]) => {
    setTitle(preset.title);
    setAmount(preset.amount.toString());
    setCategory(preset.cat);
    setPaymentMethod(preset.pay);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!title.trim() || isNaN(parsedAmount) || parsedAmount <= 0) {
      return;
    }

    onAddTransaction({
      title: title.trim(),
      amount: parsedAmount,
      type,
      category,
      paymentMethod,
      date,
      note: note.trim() || undefined,
    });

    // Reset inputs
    setTitle('');
    setAmount('');
    setNote('');
    setShowSuccessBadge(true);
    setTimeout(() => setShowSuccessBadge(false), 2500);
  };

  const selectedCategoryObj = CATEGORIES.find((c) => c.id === category);

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Add Transaction</span>
            {showSuccessBadge && (
              <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md animate-in fade-in">
                ✓ Recorded successfully
              </span>
            )}
          </h2>
          <p className="text-xs text-slate-500">
            Quickly log an expense or an incoming payment
          </p>
        </div>

        {/* Type Toggle: Expense vs Income */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            type="button"
            id="type-expense-btn"
            onClick={() => handleTypeChange('expense')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              type === 'expense'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Expense</span>
          </button>
          <button
            type="button"
            id="type-income-btn"
            onClick={() => handleTypeChange('income')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              type === 'income'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Income</span>
          </button>
        </div>
      </div>

      {/* Quick Fill Presets */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 mb-1.5">
          <Sparkles className="w-3 h-3 text-indigo-500" />
          <span>Quick Shortcuts:</span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {quickPresets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(preset)}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Title input */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Description / Item Name *
            </label>
            <input
              id="tx-title-input"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                type === 'expense'
                  ? 'e.g., Grocery shopping, Electricity bill, Dinner'
                  : 'e.g., Monthly salary, Freelance web project, Dividends'
              }
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            />
          </div>

          {/* Amount input */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Amount ({budget.currency}) *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                {budget.currency}
              </span>
              <input
                id="tx-amount-input"
                type="number"
                step="0.01"
                min="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 pr-3 py-2 text-sm font-semibold text-slate-900 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>
          </div>

          {/* Category selection */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
              <Tag className="w-3 h-3 text-slate-400" />
              <span>Category *</span>
            </label>
            <div className="relative">
              <select
                id="tx-category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 appearance-none cursor-pointer"
              >
                {availableCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {selectedCategoryObj && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                  <CategoryIcon iconName={selectedCategoryObj.iconName} className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
              <CreditCard className="w-3 h-3 text-slate-400" />
              <span>Payment Mode</span>
            </label>
            <select
              id="tx-payment-select"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 cursor-pointer"
            >
              {PAYMENT_METHODS.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>

          {/* Date input */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>Date</span>
            </label>
            <input
              id="tx-date-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            />
          </div>

          {/* Optional Note */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
              <FileText className="w-3 h-3 text-slate-400" />
              <span>Note / Remarks (Optional)</span>
            </label>
            <input
              id="tx-note-input"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Split with friends, invoice number, or memo"
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            />
          </div>
        </div>

        {/* Submit button */}
        <button
          id="add-transaction-btn"
          type="submit"
          className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
            type === 'expense'
              ? 'bg-rose-600 hover:bg-rose-700'
              : 'bg-emerald-600 hover:bg-emerald-700'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add {type === 'expense' ? 'Expense' : 'Income'}</span>
        </button>
      </form>
    </div>
  );
};
