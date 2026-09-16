import React from "react";
import { Link } from "react-router-dom";
import { Tag, Package, TrendingUp, Target, ChevronLeft } from "lucide-react";
import { useFinancialModel } from "../../hooks/FinancialModelContext";
import { STATUS_META } from "../../components/dashboard/DashboardWidgets";
import { WhatIfPlayground } from "../../components/dashboard/WhatIfPlayground";
import { Card } from "../../components/ui/primitives";
import { ExportButtons } from "../../components/reports/ReportControls";
import { exportToExcel } from "../../exports/excelExport";
import { formatToman } from "../../utils/format";

const QUESTIONS = [
  { to: "/recommended-price", icon: Tag, title: "قیمت مناسب من چقدر است؟", desc: "پیشنهاد قیمت فروش هر دستگاه" },
  { to: "/sales-volume", icon: Package, title: "چند دستگاه باید بفروشم؟", desc: "تعداد لازم برای سربه‌سر یا سود دلخواه" },
  { to: "/sales", icon: TrendingUp, title: "با این قیمت چقدر سود می‌کنم؟", desc: "وضعیت سود و زیان فروش فعلی" },
  { to: "/target-profit", icon: Target, title: "می‌خواهم ماهی X تومان سود کنم", desc: "قیمت و تعداد لازم برای رسیدن به آن" },
];

export default function Dashboard() {
  const m = useFinancialModel();
  const { snapshot } = m;
  const meta = STATUS_META[snapshot.status];
  const toneCls = meta.textClass;
  const bg = {
    loss: "bg-rose-50 border-rose-200 dark:bg-rose-950/40 dark:border-rose-800",
    breakeven: "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800",
    profit: "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800",
  }[snapshot.status];

  const headline =
    snapshot.status === "profit"
      ? `سود می‌کنی — ماهانه حدود ${formatToman(snapshot.monthlyProfit)} سود داری.`
      : snapshot.status === "breakeven"
      ? "تقریباً سربه‌سر هستی — از فروش هر دستگاه چیزی برای هزینه‌های ثابت باقی نمی‌ماند."
      : `زیان می‌کنی — ماهانه حدود ${formatToman(Math.abs(snapshot.monthlyProfit))} از دست می‌دهی.`;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">امروز می‌خواهی چه چیزی بفهمی؟</h1>
        <p className="text-sm mt-1 text-slate-500 dark:text-slate-400">یکی از گزینه‌های زیر را انتخاب کن.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {QUESTIONS.map((q) => (
          <Link
            key={q.to}
            to={q.to}
            className="group flex items-center gap-4 rounded-2xl border p-5 bg-white dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 shadow-sm hover:border-teal-600 hover:shadow-md transition-all"
          >
            <div className="shrink-0 w-11 h-11 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 flex items-center justify-center">
              <q.icon size={20} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-slate-800 dark:text-slate-100">{q.title}</div>
              <div className="text-xs mt-0.5 text-slate-500 dark:text-slate-400">{q.desc}</div>
            </div>
            <ChevronLeft size={18} className="text-slate-300 dark:text-slate-600 group-hover:text-teal-600 transition-colors shrink-0" />
          </Link>
        ))}
      </div>

      <div className={`rounded-2xl border p-5 flex items-center justify-between gap-4 ${bg}`}>
        <div className="flex items-center gap-3">
          <span className="text-3xl leading-none">{meta.emoji}</span>
          <p className={`text-sm sm:text-base font-semibold ${toneCls}`}>{headline}</p>
        </div>
      </div>

      <WhatIfPlayground />

      <Card className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          می‌خواهی جزئیات کامل هزینه‌ها، دستگاه، سناریوها و نمودارها را ببینی؟
        </p>
        <div className="flex gap-2 no-print">
          <Link to="/device" className="text-sm font-medium text-teal-700 hover:underline">اطلاعات دستگاه</Link>
          <span className="text-slate-300 dark:text-slate-600">·</span>
          <Link to="/costs" className="text-sm font-medium text-teal-700 hover:underline">هزینه‌های ماهانه</Link>
          <span className="text-slate-300 dark:text-slate-600">·</span>
          <Link to="/reports" className="text-sm font-medium text-teal-700 hover:underline">گزارش و نمودارها</Link>
        </div>
      </Card>

      <ExportButtons
        onExportExcel={() =>
          exportToExcel({
            device: m.device, expenses: m.expenses, sales: m.sales, scenarios: m.scenarios,
            history: m.history, snapshot, fixedMonthlyCost: m.fixedMonthlyCost, totalVariableCostPerUnit: m.totalVariableCostPerUnit,
            targetProfit: m.targetProfit, isSampleData: m.isSampleData,
          })
        }
      />
    </div>
  );
}
