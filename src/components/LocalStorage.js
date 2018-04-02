/*
* Local Storage Controller
*/
// Function to persist the data from Budget Controller
export function persistData(data) {
  try {
    localStorage.setItem('budgetApp', JSON.stringify(data));
  } catch (e) {
    console.log(`Error: ${e}`);
  }
}

// Function to load data from Data Storage
export function loadData() {
  try {
    const dataLS = JSON.parse(localStorage.getItem('budgetApp'));
    return dataLS;
  } catch (e) {
    return null;
  }
}
