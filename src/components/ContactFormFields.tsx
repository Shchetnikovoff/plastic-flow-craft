import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  inn: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  inn?: string;
}

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const trimmedName = data.name.trim();
  if (!trimmedName) {
    errors.name = "Введите имя";
  } else if (trimmedName.length > 100) {
    errors.name = "Имя не более 100 символов";
  }

  const trimmedEmail = data.email.trim();
  if (!trimmedEmail) {
    errors.email = "Введите email";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = "Некорректный email";
  }

  const trimmedPhone = data.phone.trim();
  if (!trimmedPhone) {
    errors.phone = "Введите телефон";
  } else if (!/^[\d\s\+\-\(\)]{7,20}$/.test(trimmedPhone)) {
    errors.phone = "Некорректный номер телефона";
  }

  const trimmedInn = data.inn.trim();
  if (!trimmedInn) {
    errors.inn = "Введите ИНН";
  } else if (!/^\d{10}(\d{2})?$/.test(trimmedInn)) {
    errors.inn = "ИНН должен содержать 10 или 12 цифр";
  }

  return errors;
}

interface ContactFormFieldsProps {
  data: ContactFormData;
  errors: ContactFormErrors;
  onChange: (field: keyof ContactFormData, value: string) => void;
}

const ContactFormFields = ({ data, errors, onChange }: ContactFormFieldsProps) => {
  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="contact-name">Имя *</Label>
        <Input
          id="contact-name"
          placeholder="Иван Иванов"
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
          className={errors.name ? "border-destructive" : ""}
          maxLength={100}
        />
        {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
      </div>
      <div>
        <Label htmlFor="contact-email">Email *</Label>
        <Input
          id="contact-email"
          type="email"
          placeholder="ivanov@company.ru"
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
          className={errors.email ? "border-destructive" : ""}
          maxLength={255}
        />
        {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
      </div>
      <div>
        <Label htmlFor="contact-phone">Телефон *</Label>
        <Input
          id="contact-phone"
          type="tel"
          placeholder="+7 900 000-00-00"
          value={data.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          className={errors.phone ? "border-destructive" : ""}
          maxLength={20}
        />
        {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
      </div>
      <div>
        <Label htmlFor="contact-inn">ИНН организации *</Label>
        <Input
          id="contact-inn"
          placeholder="1234567890"
          value={data.inn}
          onChange={(e) => onChange("inn", e.target.value.replace(/\D/g, ""))}
          className={errors.inn ? "border-destructive" : ""}
          maxLength={12}
        />
        {errors.inn && <p className="text-xs text-destructive mt-1">{errors.inn}</p>}
      </div>
    </div>
  );
};

export default ContactFormFields;
