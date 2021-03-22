var bars = [
  {
    id: "millennium",
    max: 10,
    value: function () {
      return (parseInt(now.getFullYear().toString().s(-3, -1)) / 10);
    },
    text: "Millennium"
  },
  {
    id: "century",
    max: 10,
    value: function () {
      return (parseInt(now.getFullYear().toString().s(-2, -1)) / 10);
    },
    text: "Century"
  },
  {
    id: "decade",
    max: 10,
    value: function () {
      return (parseInt(now.getYear().toString().s(-1)));
    },
    text: "Decade"
  },
  {
    id: "year",
    max: 356,
    value: function () {
      var start = new Date(now.getFullYear(), 0, 0);
      var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
      var oneDay = 1000 * 60 * 60 * 24;
      var day = Math.floor(diff / oneDay);
      return (day);
    },
    text: "Year"
  },
  {
    id: "month",
    max: 30,
    value: function () {
      return (now.getMonth());
    },
    text: "Month"
  },
  {
    id: "day",
    max: 24,
    value: function () {
      return (now.getHours());
    },
    text: "Day"
  },
  {
    id: "hour",
    max: 60,
    value: function () {
      return (now.getMinutes());
    },
    text: "Hour"
  },
  {
    id: "minute",
    max: 60,
    value: function () {
      return (now.getSeconds());
    },
    text: "Minute"
  },
  {
    id: "second",
    max: 100,
    value: function () {
      return (Math.round(now.getMilliseconds() / 10));
    },
    text: "Second"
  },
]