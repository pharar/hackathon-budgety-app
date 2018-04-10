import * as budgetCtrl from './BudgetController';
import * as UICtrl from './UIController';
import * as localStorageCtrl from './LocalStorage';
// import initSpeechRecognitionCtrl from './SpeechRecognition';

function updateBudget() {
  // 1. Calculate the budget
  budgetCtrl.calculateBudget();

  // 2. Return the budget
  const budget = budgetCtrl.getBudget();

  // 3. Display the budget on the UI
  UICtrl.displayBudget(budget);
}

function updatePercentages() {
  // 1. Calculate percentages
  budgetCtrl.calculatePercentages();

  // 2. Read percentages from the budget controller
  const percentages = budgetCtrl.getPercentages();

  // 3. Update the UI with the new percentages
  UICtrl.displayPercentages(percentages);
}

/* 
    saveDataToLS - Function created to call the localStorageController
    to persist the data.
*/
function saveDataToLS() {
  const data = budgetCtrl.getData();
  localStorageCtrl.persistData(data);
}

function updateAndSaveData() {
  // 1. Calculate and update budget
  updateBudget();

  // 2. Calculate and update percentages
  updatePercentages();

  // 3. Persist data in localStorage
  saveDataToLS();
}

/* 
		speechReconHandler - Receive the data from Speech Recognition controller
		and added to the UI and local storage
*/
function speechReconHandler(e) {
  let description;
  const { type, transcript } = e.detail;

  if (type === 'inc') {
    description = transcript.slice(transcript.indexOf('income') + 1);
  } else if (type === 'exp') {
    description = transcript.slice(transcript.indexOf('expense') + 1);
  }

  if (description.length <= 1) {
    return;
  }

  const value = parseInt(transcript[transcript.length - 1]);

  if (Number.isNaN(value)) {
    UICtrl.fillInputValue(type, description);
    return;
  }

  description.pop();

  const newItem = budgetCtrl.addItem(type, description.join(' '), value);
  UICtrl.addListItem(newItem, type);
  updateAndSaveData();
}

/*
    Load data from Local Storage and show in the UI
*/
function loadDatafromLS() {
  const data = localStorageCtrl.loadData();

  if (!data) return;

  function addNewItem(type) {
    data.allItems[type].forEach(item => {
      const newItem = budgetCtrl.addItem(type, item.description, item.value);
      UICtrl.addListItem(newItem, type);
    });
  }

  Object.keys(data.allItems).forEach(key => addNewItem(key));

  updateBudget();
  updatePercentages();
}

function ctrlAddItem() {
  let newItem;

  // 1. Get the field input data
  const input = UICtrl.getInput();

  if (
    input.description !== '' &&
    !Number.isNaN(input.value) &&
    input.value > 0
  ) {
    // 2. Add the item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    // 3. Add the item to the UI
    UICtrl.addListItem(newItem, input.type);

    // 4. Clear the fields
    UICtrl.clearFields();

    // 5. Update and Save data
    updateAndSaveData();
  }
}

function ctrlDeleteItem(event) {
  let itemID;
  let type;
  let ID;

  /*
    Fix for work in FireFox
  */
  function findParent(el, className) {
    let currentEl = el.parentElement;
    while (!currentEl.classList.contains(className)) {
      currentEl = currentEl.parentElement;
    }
    return currentEl;
  }

  const itemDelete = findParent(event.target, 'item__delete');
  if (itemDelete) itemID = itemDelete.parentNode.parentNode.id;

  if (itemID) {
    // inc-1
    [type, ID] = itemID.split('-');
    ID = parseInt(ID);

    // 1. delete the item from the data structure
    budgetCtrl.deleteItem(type, ID);

    // 2. Delete the item from the UI
    UICtrl.deleteListItem(itemID);

    // 3. Update and save data
    updateAndSaveData();
  }
}

// GLOBAL APP CONTROLLER
function setupEventListeners() {
  const DOM = UICtrl.getDOMstrings();

  document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

  document.addEventListener('keypress', event => {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });

  document
    .querySelector(DOM.container)
    .addEventListener('click', ctrlDeleteItem);

  document
    .querySelector(DOM.inputType)
    .addEventListener('change', UICtrl.changedType);

  // Event listener for the custom event listener speechRecognize
  document.addEventListener('speechRecognize', speechReconHandler);
}

export default function init() {
  console.log('Application has started.');
  UICtrl.displayMonth();
  UICtrl.displayBudget({
    budget: 0,
    totalInc: 0,
    totalExp: 0,
    percentage: -1,
  });
  loadDatafromLS();
  setupEventListeners();
  // initSpeechRecognitionCtrl();
}
