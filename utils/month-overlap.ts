export function isDateRangeInMonth(startDate: Date, endDate: Date, year: number, month: number): boolean {
    // Get the first and last days of the given month
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0); // Last day of the month
    
    // Check for overlap
    return !(endDate < firstDayOfMonth || startDate > lastDayOfMonth);
  }