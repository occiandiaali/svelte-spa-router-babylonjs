export const getFormattedDate = () => {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${month}/${day}/${year}`;
};

/**
 * @param {string | number | Date} inputDateTime
 */
export function compareDateTimeLocal(inputDateTime) {
  const currentDateTime = new Date();
  const inputDateTimeObj = new Date(inputDateTime);

  if (inputDateTimeObj < currentDateTime) {
    return "before";
  } else if (inputDateTimeObj > currentDateTime) {
    return "after";
  } else {
    return "same";
  }
}