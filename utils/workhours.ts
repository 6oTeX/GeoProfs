export function calculateWorkingHours(startDate: Date, endDate: Date, workStartHour = 9, workEndHour = 17): number {
    let totalHours = 0;
  
    // Ensure the start date is before or equal to the end date
    if (startDate > endDate) {
      throw new Error("Start date must be before or equal to end date.");
    }
  
    // Clone start date to iterate through days
    const currentDate = new Date(startDate);
  
    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
  
      // Check if it's a weekday (Monday = 1, ..., Friday = 5)
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        totalHours += workEndHour - workStartHour;
      }
  
      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return totalHours;
  }

  