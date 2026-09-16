import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home, Wallet, Package, BarChart3, Target, DollarSign, GitCompare, LineChart, X, RotateCcw, Eraser, Tag, Printer,
} from "lucide-react";
import { useFinancialModel } from "../../hooks/FinancialModelContext";

const NAV_GROUPS: Array<{ label: string; items: Array<{ to: string; label: string; icon: typeof Home; end?: boolean }> }> = [
  {
    label: "پرسش‌های سریع",
    items: [
      { to: "/", label: "خانه", icon: Home, end: true },
      { to: "/recommended-price", label: "قیمت مناسب من", icon: Tag },
      { to: "/sales-volume", label: "چند تا بفروشم؟", icon: Target },
      { to: "/sales", label: "فروش فعلی", icon: BarChart3 },
      { to: "/target-profit", label: "چقدر سود می‌خواهم؟", icon: DollarSign },
    ],
  },
  {
    label: "تنظیمات و جزئیات",
    items: [
      { to: "/costs", label: "هزینه‌های ماهانه", icon: Wallet },
      { to: "/device", label: "اطلاعات دستگاه", icon: Package },
    ],
  },
  {
    label: "ابزارهای پیشرفته",
    items: [
      { to: "/scenarios", label: "مقایسه سناریوها", icon: GitCompare },
      { to: "/reports", label: "گزارش و نمودارها", icon: LineChart },
      { to: "/print-report", label: "چاپ گزارش مدیریتی", icon: Printer },
    ],
  },
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const m = useFinancialModel();

  function handleClearSample() {
    const ok = window.confirm(
      "داده‌های نمونه پاک می‌شوند و همه فیلدها صفر می‌شوند. ادامه می‌دهید؟"
    );
    if (ok) m.clearSampleData();
  }

  function handleRestoreSample() {
    const ok = window.confirm("داده‌های فعلی با داده‌های نمونه جایگزین می‌شوند. ادامه می‌دهید؟");
    if (ok) m.resetToSampleData();
  }

  return (
    <>
      <aside
        className={`no-print fixed lg:static inset-y-0 right-0 z-30 w-64 border-l transform transition-transform lg:translate-x-0 flex flex-col
          ${open ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
          bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800`}
      >
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100">ماشین حساب کارتخوان</div>
            <div className="text-xs text-slate-400 dark:text-slate-500">سود و قیمت فروش</div>
          </div>
          <button className="lg:hidden p-2 -m-2" onClick={onClose} aria-label="بستن منو">
            <X size={18} className="text-slate-600 dark:text-slate-300" />
          </button>
        </div>
        <nav className="p-3 space-y-4 flex-1 overflow-y-auto">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <div className="px-3 mb-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500">{group.label}</div>
              <div className="space-y-1">
                {group.items.map((n) => (
                  <NavLink
                    key={n.to}
                    to={n.to}
                    end={n.end}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `w-full flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-teal-700 text-white"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`
                    }
                  >
                    <n.icon size={16} />
                    {n.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
          {m.isSampleData ? (
            <>
              <p className="text-[11px] leading-5 text-slate-400 dark:text-slate-500 px-1">
                در حال کار با داده‌های نمونه هستید.
              </p>
              <button
                onClick={handleClearSample}
                className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <Eraser size={14} />
                پاک‌کردن نمونه و شروع از صفر
              </button>
            </>
          ) : (
            <button
              onClick={handleRestoreSample}
              className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <RotateCcw size={14} />
              بازگشت به داده‌های نمونه
            </button>
          )}
        </div>
      </aside>
      {open && <div className="fixed inset-0 bg-black/30 z-20 lg:hidden" onClick={onClose} />}
    </>
  );
}
