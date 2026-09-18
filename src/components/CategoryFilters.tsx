import React from 'react';
import {
  Search,
  SlidersHorizontal,
  ArrowDownUp,
  X,
  Filter,
} from 'lucide-react';
import {
  FilterState,
  SortOption,
  CATEGORIES,
} from '../types';

interface CategoryFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  availableMonths: string[];
  totalCount: number;
  incomeCount: number;
  expenseCount: number;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  filters,
  onFilterChange,
  availableMonths,
  totalCount,
  incomeCount,
  expenseCount,
}) => {
  const activeFiltersCount =
    (filters.type !== 'all' ? 1 : 0) +
    (filters.category !== 'all' ? 1 : 0) +
    (filters.selectedMonth !== 'all' ? 1 : 0) +
    (filters.searchQuery.trim() !== '' ? 1 : 0);

  const clearAllFilters = () => {
    onFilterChange({
      type: 'all',
      category: 'all',
      searchQuery: '',
      sortBy: 'date-desc',
      selectedMonth: 'all',
    });
  };

  // Filter categories by type tab if selected
  const displayedCategories =
    filters.type === 'all'
      ? CATEGORIES
      : CATEGORIES.filter((c) => c.type === filters.type);

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
      {/* Top Row: Type Pills & Search Box */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Type Tabs */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 self-start">
          <button
            type="button"
            id="filter-type-all"
            onClick={() => onFilterChange({ type: 'all', category: 'all' })}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filters.type === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({totalCount})
          </button>
          <button
            type="button"
            id="filter-type-expense"
            onClick={() => onFilterChange({ type: 'expense', category: 'all' })}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filters.type === 'expense'
                ? 'bg-rose-50 text-rose-700 border border-rose-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Expenses ({expenseCount})
          </button>
          <button
            type="button"
            id="filter-type-income"
            onClick={() => onFilterChange({ type: 'income', category: 'all' })}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filters.type === 'income'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Income ({incomeCount})
          </button>
        </div>

        {/* Live Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="filter-search-input"
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Search by title, note, or category..."
            className="w-full pl-9 pr-8 py-1.5 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ searchQuery: '' })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Second Row: Category Dropdown, Month Filter & Sort Selector */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
        {/* Category selector */}
        <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <select
            id="filter-category-select"
            value={filters.category}
            onChange={(e) => onFilterChange({ category: e.target.value })}
            className="bg-transparent text-slate-700 font-medium focus:outline-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            {displayedCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Month Selector */}
        {availableMonths.length > 0 && (
          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <select
              id="filter-month-select"
              value={filters.selectedMonth}
              onChange={(e) => onFilterChange({ selectedMonth: e.target.value })}
              className="bg-transparent text-slate-700 font-medium focus:outline-none cursor-pointer"
            >
              <option value="all">All Months</option>
              {availableMonths.map((month) => {
                const dateObj = new Date(`${month}-01T00:00:00`);
                const formatted = dateObj.toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                });
                return (
                  <option key={month} value={month}>
                    {formatted}
                  </option>
                );
              })}
            </select>
          </div>
        )}

        {/* Sort By Selector */}
        <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200 ml-auto">
          <ArrowDownUp className="w-3.5 h-3.5 text-slate-500" />
          <select
            id="filter-sort-select"
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as SortOption })}
            className="bg-transparent text-slate-700 font-medium focus:outline-none cursor-pointer"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>

        {/* Clear Filters Reset button */}
        {activeFiltersCount > 0 && (
          <button
            id="clear-filters-btn"
            onClick={clearAllFilters}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium underline underline-offset-2 px-1 py-1"
          >
            Reset Filters ({activeFiltersCount})
          </button>
        )}
      </div>
    </div>
  );
};
