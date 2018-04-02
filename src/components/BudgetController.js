// BUDGET CONTROLLER

const data = {
  allItems: {
    exp: [],
    inc: [],
  },
  totals: {
    exp: 0,
    inc: 0,
  },
  budget: 0,
  percentage: -1,
};

function Expense(id, description, value) {
  this.id = id;
  this.description = description;
  this.value = value;
  this.percentage = -1;
}

Expense.prototype.calcPercentage = totalIncome => {
  if (totalIncome > 0) {
    this.percentage = Math.round(this.value / totalIncome * 100);
  } else {
    this.percentage = -1;
  }
};

Expense.prototype.getPercentage = () => this.percentage;

function Income(id, description, value) {
  this.id = id;
  this.description = description;
  this.value = value;
}

function calculateTotal(type) {
  let sum = 0;
  data.allItems[type].forEach(cur => {
    sum += cur.value;
  });
  data.totals[type] = sum;
}

export function addItem(type, des, val) {
  let newItem;
  let ID;

  // Create new ID
  if (data.allItems[type].length > 0) {
    ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
  } else {
    ID = 0;
  }

  // Create new item based on 'inc' or 'exp' type
  if (type === 'exp') {
    newItem = new Expense(ID, des, val);
  } else if (type === 'inc') {
    newItem = new Income(ID, des, val);
  }

  // Push it into our data structure
  data.allItems[type].push(newItem);

  // Return the new element
  return newItem;
}

export function deleteItem(type, id) {
  const ids = data.allItems[type].map(current => current.id);

  const index = ids.indexOf(id);

  if (index !== -1) {
    data.allItems[type].splice(index, 1);
  }
}

export function calculateBudget() {
  // calculate total income and expenses
  calculateTotal('exp');
  calculateTotal('inc');

  // Calculate the budget: income - expenses
  data.budget = data.totals.inc - data.totals.exp;

  // calculate the percentage of income that we spent
  if (data.totals.inc > 0) {
    data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
  } else {
    data.percentage = -1;
  }

  // Expense = 100 and income 300, spent 33.333% = 100/300 = 0.3333 * 100
}

export function calculatePercentages() {
  data.allItems.exp.forEach(cur => {
    cur.calcPercentage(data.totals.inc);
  });
}

export function getPercentages() {
  const allPerc = data.allItems.exp.map(cur => cur.getPercentage());
  return allPerc;
}

export function getBudget() {
  return {
    budget: data.budget,
    totalInc: data.totals.inc,
    totalExp: data.totals.exp,
    percentage: data.percentage,
  };
}

export function testing() {
  console.log(data);
}

// Create function to return data structure
export function getData() {
  return data;
}
