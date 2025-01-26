export function formatMessageTime(date) {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }
  //formatMessageTime function takes a date as an argument and returns the time in 24-hour format. The time is formatted using the toLocaleTimeString method of the Date object. The options object passed to toLocaleTimeString specifies that the time should be displayed in 24-hour format with hours and minutes separated by a colon.