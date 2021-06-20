
export const utilService = {
  delay,
  getRandomInt,
  formatNewTask,
  makeId,
  isFalse,
  formatNewGroup,
  getFormattedDate,
  timeAgo,
  deepClone,
  getIsOverflowY,
  mapArrayToObject,
  hexToRGB,
  randColor
}

function delay(ms = 1500) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function makeId(length = 5) {
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function isFalse(el) {
  return Array.isArray(el) ? !!el.length : !!el
}

function formatNewTask(task) {
  const id = makeId()
  return { id, description: '', comments: [], checklists: [], members: [], ...task }
}

function formatNewGroup(group) {
  return { id: makeId(), style: {}, tasks: [], ...group }
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];


function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
  const newDate = new Date(date)
  const month = MONTH_NAMES[newDate.getMonth()];
  const day = newDate.getUTCDate();
  return `${month.slice(0, 3)} ${day}`;
}

function deepClone(el) {
  return JSON.parse(JSON.stringify(el))
}

// --- Main function
function timeAgo(dateParam) {
  if (!dateParam) {
    return null;
  }

  const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const today = new Date();
  const yesterday = new Date(today - DAY_IN_MS);
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const isToday = today.toDateString() === date.toDateString();
  const isYesterday = yesterday.toDateString() === date.toDateString();
  const isThisYear = today.getFullYear() === date.getFullYear();


  if (seconds < 5) {
    return 'now';
  } else if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (seconds < 90) {
    return 'about a minute ago';
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (isToday) {
    return getFormattedDate(date, 'Today'); // Today at 10:20
  } else if (isYesterday) {
    return getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
  } else if (isThisYear) {
    return getFormattedDate(date, false, true); // 10. January at 10:20
  }


  return getFormattedDate(date); // 10. January 2017. at 10:20
}

function getIsOverflowY(height, { clientY }, el = document.documentElement) {
  const diff = height + clientY - el.clientHeight
  return diff > 0 ? diff : false
}


function mapArrayToObject(arr) {
  return Object.assign({}, arr);
}


function hexToRGB(h, isPct) {
  let r = 0, g = 0, b = 0;
  isPct = isPct === true;

  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];

  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }

  if (isPct) {
    r = +(r / 255 * 100).toFixed(1);
    g = +(g / 255 * 100).toFixed(1);
    b = +(b / 255 * 100).toFixed(1);
  }

  return "rgb(" + (isPct ? r + "%," + g + "%," + b + "%" : +r + "," + +g + "," + +b) + ")";
}

function randColor(count) {

  var colorArray = [
    ['rgba(85, 239, 196,0.5)', 'rgba(0, 184, 148,1.0)'],
    ['rgba(129, 236, 236,0.5)','rgba(0, 206, 201,1.0)'],
    ['rgba(116, 185, 255,0.5)','rgba(9, 132, 227,1.0)'],
    ['rgba(162, 155, 254,0.5)','rgba(108, 92, 231,1.0)'],
    ['rgba(223, 230, 233,0.5)','rgba(178, 190, 195,1.0)'],
    ['rgba(255, 234, 167,0.5)','rgba(253, 203, 110,1.0)'],
    ['rgba(250, 177, 160,0.5)','rgba(225, 112, 85,1.0)'],
    ['rgba(255, 118, 117, 0.5)','rgba(214, 48, 49,1.0)'],
    ['rgba(253, 121, 168,0.5)','rgba(232, 67, 147,1.0)'],
    ['rgba(99, 110, 114,0.5)','rgba(45, 52, 54,1.0)'],
  ];
  const colors = [];
  let randNum;
  for (let index = 0; index < count; index++) {
    randNum = this.getRandomInt(1, colorArray.length);
    console.log(randNum);
    colors.push(colorArray[randNum])
    colorArray.splice(randNum,1)
  }

  return colors
}