/**
 * @param {any} userDate
 * @param {any} userTime
 */
export function checkDateTime(userDate, userTime) {
  // Combine user input date and time into a single Date object
  const userDateTime = new Date(`${userDate}T${userTime}`);

  // Get the current date and time
  const currentDateTime = new Date();

  // Compare the user input date and time with the current date and time
  if (userDateTime < currentDateTime) {
    return "before";
  } else if (userDateTime > currentDateTime) {
    return "after";
  } else {
    return "current";
  }
}

/**
 * @param {string | number | Date} datetimeLocal
 */
export function convertDateTimeTo12HourFormat(datetimeLocal) {
  const date = new Date(datetimeLocal);
  
  // Extract hours, minutes, and other components
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hours = hours % 12 || 12; // Adjust 0 to 12 for midnight

  // Format the time string
 // const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
  const formattedTime = `${hours.toString()}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
  
  // Format the date string
  const formattedDate = date.toISOString().split('T')[0];

  // Combine date and formatted time
  return `${formattedDate} ${formattedTime}`;
}

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

/**
 * @param {string} inputDate
 * @param {string} inputTime
 */
export function isDateTimeEqual(inputDate, inputTime) {
    const now = new Date();
    
    // Extract current date and time components
    const currentDate = now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const currentTime = now.toTimeString().split(' ')[0]; // Format: HH:MM:SS

    // Compare input date and time with current date and time
    return inputDate === currentDate && inputTime === currentTime;
}

/**
 * @param {any} dateString
 * @param {any} timeString
 */
export function isFutureDate(dateString, timeString) {
    // Combine the date and time arguments into a single Date object
    const inputDateTime = new Date(`${dateString}T${timeString}`);
    
    // Get the current date and time
    const currentDateTime = new Date();
    
    // Compare the input date and time with the current date and time
    return inputDateTime < currentDateTime;
}

// @ts-ignore
export function convertTo12HourFormat(time24) {
    // Split the input time into hours and minutes
    let [hours, minutes] = time24.split(':').map(Number);

    // Determine AM or PM
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12 || 12; // 0 becomes 12 in 12-hour format

    // Format the time with leading zeros if needed
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;

    return formattedTime;
}