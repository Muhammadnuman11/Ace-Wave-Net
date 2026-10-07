import { getStatusMeta } from '@/lib/orderStatus';

export default function StatusBadge({ status }) {
  const meta = getStatusMeta(status);
  return (
    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${meta.color}`}>
      {meta.label}
    </span>
  );
}
