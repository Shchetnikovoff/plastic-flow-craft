import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { KPClient } from "@/types/kp";

interface KPClientFormProps {
  client: KPClient;
  onChange: (client: KPClient) => void;
  savedClients: KPClient[];
}

export function KPClientForm({ client, onChange, savedClients }: KPClientFormProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filtered = savedClients.filter(
    (c) =>
      c.organization.toLowerCase().includes(client.organization.toLowerCase()) ||
      c.name.toLowerCase().includes(client.name.toLowerCase())
  );

  const selectClient = (c: KPClient) => {
    onChange(c);
    setShowSuggestions(false);
  };

  const updateField = (field: keyof KPClient, value: string) => {
    onChange({ ...client, [field]: field === "inn" ? value.replace(/\D/g, "") : value });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700">Данные клиента</h3>
      <div className="relative">
        <Label htmlFor="kp-org">Организация *</Label>
        <Input
          id="kp-org"
          value={client.organization}
          onChange={(e) => { updateField("organization", e.target.value); setShowSuggestions(true); }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder='ООО "Водоканал"'
        />
        {showSuggestions && filtered.length > 0 && client.organization.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto">
            {filtered.map((c, i) => (
              <button key={i} type="button" className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                onMouseDown={() => selectClient(c)}>
                <div className="font-medium">{c.organization}</div>
                <div className="text-xs text-gray-500">{c.name}</div>
              </button>
            ))}
          </div>
        )}
      </div>
      <div>
        <Label htmlFor="kp-name">ФИО контакта *</Label>
        <Input id="kp-name" value={client.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Иванов Иван Иванович" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="kp-email">Email</Label>
          <Input id="kp-email" type="email" value={client.email || ""} onChange={(e) => updateField("email", e.target.value)} placeholder="ivanov@company.ru" />
        </div>
        <div>
          <Label htmlFor="kp-phone">Телефон</Label>
          <Input id="kp-phone" type="tel" value={client.phone || ""} onChange={(e) => updateField("phone", e.target.value)} placeholder="+7 (900) 123-45-67" />
        </div>
      </div>
      <div>
        <Label htmlFor="kp-inn">ИНН</Label>
        <Input id="kp-inn" value={client.inn || ""} onChange={(e) => updateField("inn", e.target.value)} placeholder="7712345678" maxLength={12} />
      </div>
    </div>
  );
}
