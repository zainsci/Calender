document.addEventListener("DOMContentLoaded", () => {
  const d = new Date();
  const calendar = getCalender(d.getFullYear(), d.getMonth() + 1);
  printCalendar(calendar);
});

const dayName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Month In DOM
function printCalendar(calendar) {
  const monthGridDOM = document.getElementById("monthGrid");
  monthGridDOM.innerHTML = "";

  const div = document.createElement("div");
  div.className = "days-row";
  const ul = document.createElement("ul");

  for (let i = 0; i < calendar.length; i++) {
    const li = document.createElement("li");

    if (calendar[i] > 7 && i < 7) {
      li.classList = "previous-month date box";
    } else if (calendar[i] < 14 && i > 28) {
      li.classList = "next-month date box";
    } else {
      li.classList = "this-month date box";

      li.addEventListener("click", () => {
        showDateAndEvents(calendar[i], i);
      });
    }
    li.innerHTML = calendar[i];

    ul.appendChild(li);
  }

  div.appendChild(ul);
  monthGridDOM.appendChild(div);
}

function showDateAndEvents(day, i) {
  const year = document.getElementById("HeaderYear").innerHTML;
  const month = document.getElementById("HeaderMonth").innerHTML;
  const daysName = dayName[i % 7];
  document.getElementById("select").innerHTML = `
  ${month.slice(0, 3)} ${day}, ${year} - ${daysName.slice(0, 3)}
  `;
  document.getElementById("selectedDay").innerHTML = day;
  showEventsInSection(month, day);
}

//
function getCalender(y, m) {
  const calendarGrid = [];
  y = parseInt(y, 10);
  m = parseInt(m, 10);

  const preYear = y - 1;
  const nextYear = y + 1;
  const preMonth = m == 1 ? 12 : m - 1;
  const nextMonth = m == 12 ? 1 : m + 1;

  const wDay = getWeekDay(y, m, 1);

  const DaysInMonth = getMonthDays(y, m);
  const DaysInPrevMonth = getMonthDays(preYear, preMonth);

  const preMonthDaysInGrid = wDay - 1;

  for (
    let i = DaysInPrevMonth - preMonthDaysInGrid;
    i <= DaysInPrevMonth;
    i++
  ) {
    calendarGrid.push(i);
  }
  for (let i = 1; i <= DaysInMonth; i++) {
    calendarGrid.push(i);
  }
  const l = calendarGrid.length;
  for (let i = l; i < 42; i++) {
    calendarGrid.push(i - l + 1);
  }

  return calendarGrid;
}

// To get the day of the week
function getWeekDay(y, m, d) {
  let day = new Date(y, m - 1, d).getDay();
  if (day == 0) {
    return 7;
  } else {
    return day;
  }
}

// To get the days in a month
function getMonthDays(y, m) {
  const daysIn = [
    31,
    isLeap(y) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  return daysIn[m - 1];
}

// To check if the year is a leap year
function isLeap(y) {
  return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;
}

function findPreMonthDays() {
  let sunday = date.getDate() - date.getDay();
  sunday = ((sunday % 7) - 7 - 1) % -7;
  sunday = `${sunday}`;
  let noOfDays = +sunday.slice(1);

  if (noOfDays == 0) {
    noOfDays = 7;
  }
  return noOfDays;
}
