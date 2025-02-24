import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DatePickerProps {
  valueYear: string | undefined;
  setValueYear: (value?: string) => void;
  onChange: (value?: number) => void;
  placeholder?: string;
  reset?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  valueYear,
  setValueYear,
  onChange,
  placeholder,
}) => {

  const currentYear = new Date().getFullYear();

  const handleYearChange = (value: string) => {
    setValueYear(value)
    const year = parseInt(value, 10);
    onChange(year);
  };

  const years = Array.from(
    { length: currentYear - 1920 + 1 },
    (_, index) => 1920 + index
  );

  return (
    <div className="flex-1 items-center gap-2">
      <Select
        value={valueYear}
        onValueChange={handleYearChange}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder || "Select year"} />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={String(year)}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export { DatePicker };
