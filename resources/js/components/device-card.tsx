import { cn } from '@/lib/utils';
import { AlertTriangle, Battery, Check, Cpu, Satellite } from 'lucide-react';

export type DeviceCardProps = {
  title: string;
  subtitle?: string;
  batteryDays: string;
  sensorPackDays: string;
  batteryProgress?: number;
  sensorProgress?: number;
  status?: 'ok' | 'alert';
  subscriptionStatus?: 'subscribed' | 'not-subscribed';
  replacementLabel?: string;
  replacementDetail?: string;
  showAlertIcon?: boolean;
  onOrderClick?: () => void;
  className?: string;
};

export default function DeviceCard({
  title,
  subtitle,
  batteryDays,
  sensorPackDays,
  batteryProgress = 35,
  sensorProgress = 10,
  status = 'ok',
  subscriptionStatus = 'subscribed',
  replacementLabel = 'Replacement status',
  replacementDetail = 'Delivered on 2026-03-04',
  showAlertIcon = true,
  onOrderClick,
  className,
}: DeviceCardProps) {
  const isAlert = status === 'alert';
  const isSubscribed = subscriptionStatus === 'subscribed';

  const indicatorColor = isAlert ? 'text-rose-400' : 'text-emerald-400';
  const borderClass = isAlert ? 'border-t-4 border-rose-500' : '';
  const actionButtonClass = cn(
    'inline-flex items-center justify-center rounded-md bg-[#153ce4] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1b4de6] focus:outline-none focus:ring-2 focus:ring-[#4e7cff]/50',
    !onOrderClick && 'cursor-default opacity-80'
  );

  return (
    <div
      className={cn(
        'w-full max-w-2xl overflow-hidden rounded-[18px] border border-slate-800 bg-[#20203b] shadow-[0_20px_80px_rgba(0,0,0,0.20)]',
        borderClass,
        className
      )}
    >
      <div className="space-y-6 p-5">
        <div className="flex flex-col gap-4 sm:items-end sm:justify-between sm:flex-row">
          <div className="flex min-w-0 items-start gap-3">
            {isAlert && showAlertIcon ? (
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-300">
                <AlertTriangle size={20} />
              </div>
            ) : null}

            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-white">{title}</p>
              {isAlert && subtitle ? (
                <p className="mt-1 truncate text-sm text-slate-400">{subtitle}</p>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-300">
            <div className={cn('inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900', indicatorColor)}>
              <Battery size={18} />
            </div>
            <div className={cn('inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900', indicatorColor)}>
              <Cpu size={18} />
            </div>
            <div className={cn('inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900', indicatorColor)}>
              <Satellite size={18} />
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-3">
            <div className="flex items-end justify-between gap-3 text-sm text-white">
              <span className="font-semibold">Battery charge</span>
              <span className="font-medium text-slate-200">{batteryDays}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-950">
              <div
                className="h-full rounded-full bg-rose-500"
                style={{ width: `${Math.max(0, Math.min(100, batteryProgress))}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-end justify-between gap-3 text-sm text-white">
              <span className="font-semibold">Sensor pack</span>
              <span className="font-medium text-slate-200">{sensorPackDays}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-950">
              <div
                className="h-full rounded-full bg-rose-500"
                style={{ width: `${Math.max(0, Math.min(100, sensorProgress))}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 bg-[#2b2b4e] px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-white">SondeCare+</p>
          <span
            className={cn(
              'inline-flex items-center gap-2 rounded-md border px-3 py-1 text-sm font-medium',
              isSubscribed ? 'border-emerald-500 text-emerald-200' : 'border-slate-600 text-slate-200'
            )}
          >
            {isSubscribed ? <Check size={14} /> : null}
            {isSubscribed ? 'Subscribed' : 'Not subscribed'}
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-300">{replacementLabel}</p>
            {isSubscribed ? (
              <p className="mt-1 text-sm text-slate-100 underline">{replacementDetail}</p>
            ) : (
              <p className="mt-1 text-sm text-slate-400">{replacementDetail ?? 'No replacement information available'}</p>
            )}
          </div>

          {!isSubscribed ? (
            <button type="button" className={actionButtonClass} onClick={onOrderClick}>
              Order now
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
