// UI CONTROLLER
var DOMstrings = {
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

function formatNumber(num, type) {
  var numSplit, int, dec, type;
  /*
            + or - before number
            exactly 2 decimal points
            comma separating the thousands

            2310.4567 -> + 2,310.46
            2000 -> + 2,000.00
            */

  num = Math.abs(num);
  num = num.toFixed(2);

  numSplit = num.split('.');

  int = numSplit[0];
  if (int.length > 3) {
    int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); //input 23510, output 23,510
  }

  dec = numSplit[1];

  return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
}

function nodeListForEach(list, callback) {
  for (var i = 0; i < list.length; i++) {
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

export function addListItem(obj, type) {
  var html, newHtml, element;
  // Create HTML string with placeholder text

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
  var el = document.getElementById(selectorID);
  el.parentNode.removeChild(el);
}

export function clearFields() {
  var fields, fieldsArr;

  fields = document.querySelectorAll(
    DOMstrings.inputDescription + ', ' + DOMstrings.inputValue,
  );

  fieldsArr = Array.prototype.slice.call(fields);

  fieldsArr.forEach(function(current, index, array) {
    current.value = '';
  });

  fieldsArr[0].focus();
}

export function displayBudget(obj) {
  var type;
  obj.budget > 0 ? (type = 'inc') : (type = 'exp');

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
    document.querySelector(DOMstrings.percentageLabel).textContent =
      obj.percentage + '%';
  } else {
    document.querySelector(DOMstrings.percentageLabel).textContent = '---';
  }
}

export function displayPercentages(percentages) {
  var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

  nodeListForEach(fields, function(current, index) {
    if (percentages[index] > 0) {
      current.textContent = percentages[index] + '%';
    } else {
      current.textContent = '---';
    }
  });
}

export function displayMonth() {
  var now, months, month, year;

  now = new Date();
  //var christmas = new Date(2016, 11, 25);

  months = [
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
  month = now.getMonth();

  year = now.getFullYear();
  document.querySelector(DOMstrings.dateLabel).textContent =
    months[month] + ' ' + year;
}

export function changedType() {
  var fields = document.querySelectorAll(
    DOMstrings.inputType +
      ',' +
      DOMstrings.inputDescription +
      ',' +
      DOMstrings.inputValue,
  );

  nodeListForEach(fields, function(cur) {
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
