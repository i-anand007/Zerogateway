export default function getDaysDifference(date: Date): number {
    const today = new Date()
    const oneDayInMs = 24 * 60 * 60 * 1000; // Number of milliseconds in one day
    const differenceInMs = date.getTime() - today.getTime(); // Difference in milliseconds
    return Math.round(differenceInMs / oneDayInMs); // Convert milliseconds to days
  }