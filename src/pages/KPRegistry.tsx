import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useKP } from "@/contexts/KPContext";
import { KPStatusBadge } from "@/components/kp/KPStatusBadge";
import { generateKPPdf } from "@/lib/generateKPPdf";
import { exportKPToExcel } from "@/lib/kpExcelExport";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Download,
  Search,
  MoreHorizontal,
  FileDown,
  Copy,
  Pencil,
  Trash2,
} from "lucide-react";
import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import type { KPStatus } from "@/types/kp";

const STATUS_OPTIONS: { value: KPStatus | "all"; label: string }[] = [
  { value: "all", label: "Все статусы" },
  { value: "draft", label: "Черновик" },
  { value: "sent", label: "Отправлено" },
  { value: "accepted", label: "Принято" },
  { value: "rejected", label: "Отклонено" },
];

export default function KPRegistry() {
  const navigate = useNavigate();
  const { documents, deleteKP, duplicateKP, setStatus, searchKP } = useKP();

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<KPStatus | "all">("all");

  const filtered = useMemo(() => {
    let list = query.trim() ? searchKP(query) : documents;
    if (statusFilter !== "all") {
      list = list.filter((d) => d.status === statusFilter);
    }
    return list.slice().sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [documents, query, statusFilter, searchKP]);

  const handleRowClick = (id: string) => {
    navigate(`/kp/${id}`);
  };

  const handleDuplicate = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const dup = duplicateKP(id);
    navigate(`/kp/${dup.id}`);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm("Удалить коммерческое предложение?")) {
      deleteKP(id);
    }
  };

  const handlePdf = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const doc = documents.find((d) => d.id === id);
    if (doc) await generateKPPdf(doc);
  };

  const handleStatusChange = (e: React.MouseEvent, id: string, status: KPStatus) => {
    e.stopPropagation();
    setStatus(id, status);
  };

  const handleExcelExport = () => {
    exportKPToExcel(filtered);
  };

  return (
    <CorporatePageShell
      breadcrumbs={[{ label: "Реестр КП" }]}
      title="Реестр коммерческих"
      accentWord="предложений"
      hideCTA
    >
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Поиск по номеру, клиенту..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as KPStatus | "all")}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleExcelExport}>
              <Download className="h-4 w-4 mr-2" />
              Экспорт Excel
            </Button>
            <Button onClick={() => navigate("/kp/new")}>
              <Plus className="h-4 w-4 mr-2" />
              Создать КП
            </Button>
          </div>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border rounded-lg border-dashed">
            <div className="text-gray-400 text-5xl mb-4">📄</div>
            <div className="text-lg font-semibold text-gray-600 mb-1">
              {query || statusFilter !== "all"
                ? "Ничего не найдено"
                : "Нет коммерческих предложений"}
            </div>
            <div className="text-sm text-gray-400 mb-6">
              {query || statusFilter !== "all"
                ? "Попробуйте изменить фильтры"
                : "Создайте первое КП для клиента"}
            </div>
            {!query && statusFilter === "all" && (
              <Button onClick={() => navigate("/kp/new")}>
                <Plus className="h-4 w-4 mr-2" />
                Создать КП
              </Button>
            )}
          </div>
        ) : (
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="w-[130px]">№ КП</TableHead>
                  <TableHead className="w-[100px]">Дата</TableHead>
                  <TableHead>Клиент</TableHead>
                  <TableHead className="w-[80px] text-center">Позиций</TableHead>
                  <TableHead className="w-[140px] text-right">Сумма с НДС</TableHead>
                  <TableHead className="w-[160px]">Статус</TableHead>
                  <TableHead className="w-[48px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((doc) => (
                  <TableRow
                    key={doc.id}
                    className="cursor-pointer hover:bg-slate-50"
                    onClick={() => handleRowClick(doc.id)}
                  >
                    <TableCell className="font-mono text-xs font-medium text-blue-700">
                      {doc.number}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{doc.date}</TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">{doc.client.organization}</div>
                      <div className="text-xs text-gray-500">{doc.client.name}</div>
                    </TableCell>
                    <TableCell className="text-center text-sm">{doc.items.length}</TableCell>
                    <TableCell className="text-right text-sm font-semibold">
                      {doc.totalWithVat.toLocaleString("ru-RU")} ₽
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Select
                        value={doc.status}
                        onValueChange={(v) =>
                          setStatus(doc.id, v as KPStatus)
                        }
                      >
                        <SelectTrigger
                          className="h-8 border-0 shadow-none p-0 bg-transparent focus:ring-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <KPStatusBadge status={doc.status} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Черновик</SelectItem>
                          <SelectItem value="sent">Отправлено</SelectItem>
                          <SelectItem value="accepted">Принято</SelectItem>
                          <SelectItem value="rejected">Отклонено</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => { e.stopPropagation(); navigate(`/kp/${doc.id}`); }}
                          >
                            <Pencil className="h-4 w-4 mr-2" />
                            Редактировать
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => handlePdf(e, doc.id)}>
                            <FileDown className="h-4 w-4 mr-2" />
                            Скачать PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => handleDuplicate(e, doc.id)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Дублировать
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={(e) => handleDelete(e, doc.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Удалить
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </section>
    </CorporatePageShell>
  );
}
