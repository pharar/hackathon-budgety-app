/**
 * UI CONTROLLER
 */

// Keys to connect with the DOM.
const DOMstrings = {
  inputType: '.add__type',
  inputDescription: '.add__description',
  inputValue: '.add__value',
  inputBtn: '.add__btn',
  incomeContainer: '.income__list',
  expensesContainer: '.expenses__list',
  budgetLabel: '.budget__value',
  incomeLabel: '.budget__income--value',
  expensesLabel: '.budget__expenses--value',
  percentageLabel: '.budget__expenses--percentage',
  container: '.container',
  expensesPercLabel: '.item__percentage',
  dateLabel: '.budget__title--month',
};

// Utility for the DOM.
// Method to prettify the format of the numbers.
function formatNumber(number, type) {
  const num = Math.abs(number).toFixed(2);
  // num = num.toFixed(2);

  const numSplit = num.split('.');

  let int = numSplit[0];

  if (int.length > 3) {
    int = `${int.substr(0, int.length - 3)},${int.substr(int.length - 3, 3)}`; // input 23510, output 23,510
    // int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
  }

  const dec = numSplit[1];

  return `${type === 'exp' ? '-' : '+'} ${int}.${dec}`;
  // (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
}

function nodeListForEach(list, callback) {
  for (let i = 0; i < list.length; i += 1) {
    callback(list[i], i);
  }
}

export function getInput() {
  return {
    type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
    description: document.querySelector(DOMstrings.inputDescription).value,
    value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
  };
}

// Create HTML string with placeholder text
export function addListItem(obj, type) {
  let html;
  let newHtml;
  let element;

  if (type === 'inc') {
    element = DOMstrings.incomeContainer;

    html =
      '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
  } else if (type === 'exp') {
    element = DOMstrings.expensesContainer;

    html =
      '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
  }

  // Replace the placeholder text with some actual data
  newHtml = html.replace('%id%', obj.id);
  newHtml = newHtml.replace('%description%', obj.description);
  newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

  // Insert the HTML into the DOM
  document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
}

export function deleteListItem(selectorID) {
  const el = document.getElementById(selectorID);
  el.parentNode.removeChild(el);
}

export function clearFields() {
  const fields = document.querySelectorAll(
    `${DOMstrings.inputDescription}, ${DOMstrings.inputValue}`,
  );

  const fieldsArr = Array.prototype.slice.call(fields);

  fieldsArr.forEach(current => {
    const cur = current;
    cur.value = '';
  });

  fieldsArr[0].focus();
}

export function displayBudget(obj) {
  const type = obj.budget > 0 ? 'inc' : 'exp';

  // obj.budget > 0 ? (type = 'inc') : (type = 'exp');

  document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(
    obj.budget,
    type,
  );
  document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(
    obj.totalInc,
    'inc',
  );
  document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(
    obj.totalExp,
    'exp',
  );

  if (obj.percentage > 0) {
    document.querySelector(DOMstrings.percentageLabel).textContent = `${
      obj.percentage
    }%`;
  } else {
    document.querySelector(DOMstrings.percentageLabel).textContent = '---';
  }
}

export function displayPercentages(percentages) {
  const fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

  nodeListForEach(fields, (current, index) => {
    const cur = current;
    if (percentages[index] > 0) {
      cur.textContent = `${percentages[index]}%`;
    } else {
      cur.textContent = '---';
    }
  });
}

export function displayMonth() {
  const now = new Date();
  // var christmas = new Date(2016, 11, 25);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const month = now.getMonth();

  const year = now.getFullYear();

  document.querySelector(DOMstrings.dateLabel).textContent = `${
    months[month]
  } ${year}`;
}

export function changedType() {
  const fields = document.querySelectorAll(
    `${DOMstrings.inputType},${DOMstrings.inputDescription},${
      DOMstrings.inputValue
    }`,
  );

  nodeListForEach(fields, cur => {
    cur.classList.toggle('red-focus');
  });

  document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
}

export function getDOMstrings() {
  return DOMstrings;
}

export function fillInputValue(type, description) {
  document.querySelector(DOMstrings.inputType).value = type;
  document.querySelector(DOMstrings.inputDescription).focus();
  document.querySelector(DOMstrings.inputDescription).value = description.join(
    ' ',
  );
}
