const MINUTE = 60000;
const HOUR = 3600000;
const DAY = 86400000;
const WEEK = 604800000;
const YEAR = 31557600000;

export function toTimeAgoString(timestamp) {
  if (timestamp) {
    var date = new Date(timestamp);
    var currentTime = new Date().getTime();
    var timeDifference = currentTime - date;
    if (timeDifference < MINUTE) {
      return "<1 minute ago";
    } else if (timeDifference < HOUR) {
      var numMinutes = Math.floor(timeDifference / MINUTE);
      var minuteString = numMinutes == 1 ? "minute" : "minutes";
      return numMinutes.toString() + " " + minuteString + " ago";
    } else if (timeDifference < DAY) {
      var numHours = Math.floor(timeDifference / HOUR);
      var hourString = numHours == 1 ? "hour" : "hours";
      return numHours.toString() + " " + hourString + " ago";
    } else if (timeDifference < WEEK) {
      var numDays = Math.floor(timeDifference / DAY);
      var dayString = numDays == 1 ? "day" : "days";
      return numDays.toString() + " " + dayString + " ago";
    } else if (timeDifference < YEAR) {
      var numWeeks = Math.floor(timeDifference / WEEK);
      var weekString = numWeeks == 1 ? "week" : "weeks";
      return numWeeks.toString() + " " + weekString + " ago";
    } else {
      var numYears = Math.floor(timeDifference / WEEK);
      var yearString = numYears == 1 ? "year" : "years";
      return numYears.toString() + " " + yearString + " ago";
    }
  } else {
    return "undefined";
  }
}
