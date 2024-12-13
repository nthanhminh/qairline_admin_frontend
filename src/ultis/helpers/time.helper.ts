export const handleTime = (
    departureTime: string,
    duration: number
  ): { startTime: string; endTime: string; date: string } => {
    const departureDate = new Date(departureTime);
  
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
  
    const dateOptions: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
  
    const date = departureDate.toLocaleDateString("en-US", dateOptions);

    const startTime = departureDate.toLocaleTimeString("en-US", timeOptions).slice(0, 5);
  
    departureDate.setSeconds(departureDate.getSeconds() + duration);
  
    const endTime = departureDate.toLocaleTimeString("en-US", timeOptions).slice(0, 5);
  
    return { startTime, endTime, date };
  };
  

export const convertSecondsToHHMM = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600); 
    const minutes = Math.floor((seconds % 3600) / 60); 
    return `${hours}h${minutes < 10 ? '0' + minutes : minutes}m`;
};