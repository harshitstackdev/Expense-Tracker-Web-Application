import React from 'react';
import { HardDrive, ShieldCheck } from 'lucide-react';

interface FooterProps {
  transactionCount: number;
}

export const Footer: React.FC<FooterProps> = ({ transactionCount }) => {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white py-6 text-slate-500 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            100% Private & Client-Side. Your financial data never leaves your browser.
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-[11px]">
          <HardDrive className="w-3.5 h-3.5 text-slate-500" />
          <span>
            {transactionCount} {transactionCount === 1 ? 'transaction' : 'transactions'} saved locally in localStorage
          </span>
        </div>
      </div>
    </footer>
  );
};
