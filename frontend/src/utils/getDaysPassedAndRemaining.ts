const getDaysPassedAndRemaining = (startDate: Date, endDate: Date) => {
  try {

    const startDateTime = startDate instanceof Date ? startDate : new Date(startDate);
    const endDateTime = endDate instanceof Date ? endDate : new Date(endDate);

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in milliseconds between the current date and the start date
    const millisecondsPassed = currentDate.getTime() - startDateTime.getTime();

    // Calculate the difference in milliseconds between the end date and the start date
    const millisecondsTotal = endDateTime.getTime() - startDateTime.getTime();

    // Calculate the number of days passed and remaining
    const daysPassed = Math.floor(millisecondsPassed / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.max(0, Math.floor(millisecondsTotal / (1000 * 60 * 60 * 24)) - daysPassed)

    // Optionally, you can handle negative values if the current date is beyond the end date
    return {
      daysPassed,
      daysRemaining,
    };
  } catch (e) {
    console.log('Error calculating days passed and remaining.', e);
    return {
      daysPassed: 0,
      daysRemaining: 0,
    };
  }
} 

export default getDaysPassedAndRemaining;
