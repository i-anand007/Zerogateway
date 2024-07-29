export default function convertDateToISO (date: Date): string  {
    const isoDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return isoDate.toISOString();
  };