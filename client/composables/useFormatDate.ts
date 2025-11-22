/**
 * Composable for consistent date formatting across the application
 * Formats dates as HH:mm DD/MM/YYYY in Norwegian locale (no-NO)
 */
export const useFormatDate = () => {
  /**
   * Format a date string or Date object to Norwegian format with time
   * @param dateInput - Date string, Date object, or null/undefined
   * @returns Formatted string "HH:mm DD/MM/YYYY" or empty string if invalid
   */
  const formatDateTime = (dateInput: string | Date | null | undefined): string => {
    if (!dateInput) return "";
    
    const date = new Date(dateInput);
    
    // Check if date is valid
    if (isNaN(date.getTime())) return "";
    
    return date.toLocaleString("no-NO", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  /**
   * Format a date string or Date object to Norwegian date format without time
   * @param dateInput - Date string, Date object, or null/undefined
   * @returns Formatted string "DD/MM/YYYY" or empty string if invalid
   */
  const formatDate = (dateInput: string | Date | null | undefined): string => {
    if (!dateInput) return "";
    
    const date = new Date(dateInput);
    
    // Check if date is valid
    if (isNaN(date.getTime())) return "";
    
    return date.toLocaleDateString("no-NO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return {
    formatDateTime,
    formatDate,
  };
};
