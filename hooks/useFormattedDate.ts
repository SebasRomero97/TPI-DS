import { useCallback } from "react";

type FormatStyle = "dd-mm-yyyy" | "mm-dd-yyyy" | "yyyy-mm-dd";

export function useFormattedDate() {
  const formatDate = useCallback(
    (date?: Date | string, format: FormatStyle = "yyyy-mm-dd") => {
      if (!date) return "";

      const d = typeof date === "string" ? new Date(date) : date;
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();

      switch (format) {
        case "dd-mm-yyyy":
          return `${day}-${month}-${year}`;
        case "mm-dd-yyyy":
          return `${month}-${day}-${year}`;
        case "yyyy-mm-dd":
        default:
          return `${year}-${month}-${day}`;
      }
    },
    []
  );

  return { formatDate };
}


//como funciona
// const { formatDate } = useFormattedDate();

// const fecha = new Date("2025-08-26T00:00:00");
// const str1 = formatDate(fecha, "dd-mm-yyyy"); // "26-08-2025"
// const str2 = formatDate(fecha, "mm-dd-yyyy"); // "08-26-2025"
// const str3 = formatDate(fecha);               // "2025-08-26"
