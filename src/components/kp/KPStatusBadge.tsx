import { Badge } from "@/components/ui/badge";
import type { KPStatus } from "@/types/kp";

const statusConfig: Record<KPStatus, { label: string; className: string }> = {
  draft: { label: "Черновик", className: "bg-gray-100 text-gray-700 hover:bg-gray-200" },
  sent: { label: "Отправлено", className: "bg-blue-100 text-blue-700 hover:bg-blue-200" },
  accepted: { label: "Принято", className: "bg-green-100 text-green-700 hover:bg-green-200" },
  rejected: { label: "Отклонено", className: "bg-red-100 text-red-700 hover:bg-red-200" },
};

interface KPStatusBadgeProps {
  status: KPStatus;
  onClick?: () => void;
}

export function KPStatusBadge({ status, onClick }: KPStatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge className={config.className} variant="outline" onClick={onClick}>
      {config.label}
    </Badge>
  );
}
