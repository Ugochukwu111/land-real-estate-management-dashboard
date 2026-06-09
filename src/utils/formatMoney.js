/**
 * Formats a number as Nigerian Naira (NGN)
 * @param {number} amount - The number to format
 * @returns {string} - Formatted currency string (e.g., "₦1,250.00")
 */
export const formatNaira = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};