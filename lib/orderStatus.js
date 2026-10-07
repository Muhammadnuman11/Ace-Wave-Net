export const ORDER_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  { value: 'processing', label: 'Processing', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { value: 'confirmed', label: 'Confirmed', color: 'bg-teal-100 text-teal-800 border-teal-200' },
  { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800 border-green-200' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800 border-red-200' },
];

export function getStatusMeta(status) {
  return ORDER_STATUSES.find((s) => s.value === status) || ORDER_STATUSES[0];
}
