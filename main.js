'use strict';

console.clear();

{
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();

  function getCalendarHead() {
    const dates = [];
    const d = new Date(year, month, 0).getDate();
    const n = new Date(year, month, 1).getDay();

    for (let i = 0; i < n; i++) {
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true,
      });
    }

    return dates;
  }

  function getCalendarBody() {
    const dates = []; 
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }

    if (year === today.getFullYear() && month === today.getMonth()) {
      dates[today.getDate() - 1].isToday = true;
    }

    return dates;
  }

  function getCalendarTail() {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay();

    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }

    return dates;
  }

  function clearCalendar() {
    const tbody = document.querySelector('tbody');

    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }

  function renderTitle() {
    const title = `${year}/${String(month + 1).padStart(2, '0')}`;
    document.getElementById('title').textContent = title;
  }

  function renderWeeks() {
    const dates = [
      ...getCalendarHead(),
      ...getCalendarBody(),
      ...getCalendarTail(),
    ];
    const weeks = [];
    const weeksCount = dates.length / 7;

    for (let i = 0; i < weeksCount; i++) {
      weeks.push(dates.splice(0, 7));
    }

    weeks.forEach(week => {
      const tr = document.createElement('tr');
      week.forEach(date => {
        const td = document.createElement('td');

        td.textContent = date.date;
        if (date.isToday) {
          td.classList.add('today');
        }
        if (date.isDisabled) {
          td.classList.add('disabled');
        }

        tr.appendChild(td);
      });
      document.querySelector('tbody').appendChild(tr);
    });
  }

  function createCalendar() {
    clearCalendar();
    renderTitle();
    renderWeeks();
  }

  document.getElementById('prev').addEventListener('click', () => {
    month--;
    if (month < 0) {
      year--;
      month = 11;
    }

    createCalendar();
  });

  document.getElementById('next').addEventListener('click', () => {
    month++;
    if (month > 11) {
      year++;
      month = 0;
    }

    createCalendar();
  });

  document.getElementById('today').addEventListener('click', () => {
    year = today.getFullYear();
    month = today.getMonth();

    createCalendar();
  });

  createCalendar();
}

var realTimeDatetimeDisplay = function() {
    var dateObj        = new Date(),
        dateYear       = dateObj.getFullYear(),
        dateMonth      = dateObj.getMonth() + 1,
        dateDay        = dateObj.getDate(),
        dateWeek       = dateObj.getDay(),
        timeHour       = dateObj.getHours(),
        timeMinutes    = dateObj.getMinutes(),
        timeSeconds    = dateObj.getSeconds(),
        weekNames      = ['日', '月', '火', '水', '木', '金', '土'],
        displayElement = document.getElementById('real-clockbox'),
        str            = '';
 
    // 一桁の場合は0を追加
    if (timeHour < 10) {
        timeHour = '0' + timeHour;
    }
    if (timeMinutes < 10) {
        timeMinutes = '0' + timeMinutes;
    }
    if (timeSeconds < 10) {
        timeSeconds = '0' + timeSeconds;
    }
 
    // 文字列の結合
    str  = dateYear + '年' + dateMonth + '月' + dateDay + '日' + '（' + weekNames[dateWeek] + '） ';
    str += timeHour + '時' + timeMinutes + '分' + timeSeconds + '秒';
 
    // 出力
    if (displayElement) {
        displayElement.innerHTML = str;
    }
 
    // 繰り返し実行
    setTimeout(realTimeDatetimeDisplay, 1000);
};
 
// 実行
realTimeDatetimeDisplay();
