// Define initial resources
let trinkets = 0;
let gold = 0;
let itemCounts = {};
let inventory = new Map();

// Get reference to HTML elements
const trinketsButton = document.getElementById("trinketsButton");
const appraiseButton = document.getElementById("appraiseButton");
const autoTrinketSearchBtn = document.getElementById("autoTrinketSearchBtn");
const resultDisplay = document.getElementById("resultDisplay");
const inventoryDisplay = document.getElementById("inventoryDisplay");

// Arrays for generating item names and values
const descriptive = [
  "glittery",
  "shiny",
  "glowing",
  "golden",
  "silver",
  "spiny"
];
const item = ["rock", "pebble", "lamp", "hat", "earring"];
const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Define class for appraised trinkets
class AppraisedTrinket {
  static all = [];

  constructor(name, value) {
    this.name = name;
    this.value = value;
    AppraisedTrinket.all.push(this);
  }
}

// Generate a random item name
function generateRandomItemName() {
  const randomDescriptive =
    descriptive[Math.floor(Math.random() * descriptive.length)];
  const randomItem = item[Math.floor(Math.random() * item.length)];
  return `${
    randomDescriptive.charAt(0).toUpperCase() + randomDescriptive.slice(1)
  } ${randomItem.charAt(0).toUpperCase() + randomItem.slice(1)}`;
}

// Create a new AppraisedTrinket with random name and value
function createRandomTrinket() {
  const randomItemName = generateRandomItemName();
  const randomValue = value[Math.floor(Math.random() * value.length)];
  return new AppraisedTrinket(randomItemName, randomValue);
}
// Initialize inventory array
const trinketTypes = AppraisedTrinket.all;

// Update the itemCounts object
function updateItemCounts() {
  itemCounts = {};
  inventory.forEach((item) => {
    const itemName = item.name;
    itemCounts[itemName] = (itemCounts[itemName] || 0) + 1;
  });
}

// Appraise trinkets
function appraiseTrinkets() {
  if (trinkets <= 0) {
    console.log("You do not have enough trinkets");
  } else {
    trinkets -= 1;

    const obtainedItem = createRandomTrinket();

    // Update the inventory using the Map
    if (inventory.has(obtainedItem.name)) {
      inventory.set(obtainedItem.name, inventory.get(obtainedItem.name) + 1);
    } else {
      inventory.set(obtainedItem.name, 1);
    }

    resultDisplay.textContent = `You obtained: ${obtainedItem.name}. Value: (${obtainedItem.value})`;
    updateInventoryDisplay();
    refreshResources();
  }
}

// Create a handler for selling items
function createSellHandler(itemName) {
  return function () {
    if (inventory.has(itemName) && inventory.get(itemName) > 0) {
      inventory.set(itemName, inventory.get(itemName) - 1);
      gold += trinketTypes.find((type) => type.name === itemName).value;
      refreshResources();
      updateInventoryDisplay();
    } else {
      console.log("You can't sell nothing");
    }
  };
}

// Update the inventory display
function updateInventoryDisplay() {
  const inventoryDisplay = document.getElementById("inventoryDisplay");
  inventoryDisplay.innerHTML = "<br>Appraised items:<br>";

  inventory.forEach((count, itemName) => {
    const itemElement = document.createElement("div");
    itemElement.innerHTML = `${itemName}: ${count} (${
      trinketTypes.find((type) => type.name === itemName)?.value || 0
    })`;
    itemElement.classList.add("inventory-item");

    const itemSellButton = document.createElement("div");
    if (count >= 1) {
      const sellHandler = createSellHandler(itemName);
      itemSellButton.innerHTML = `<button>Sell</button><br>`;
      itemSellButton.addEventListener("click", sellHandler);
    }

    const itemContainer = document.createElement("div");
    itemContainer.classList.add("inventory-item-container");
    itemContainer.appendChild(itemElement);
    itemContainer.appendChild(itemSellButton);

    inventoryDisplay.appendChild(itemContainer);
  });
}

// Show the appraise button based on trinket count
function showAppraise() {
  appraiseButton.style.display = trinkets >= 1 ? "block" : "none";
}

// Show the hire workers button based on gold count
function showHireWorkersTrinkets() {
  autoTrinketSearchBtn.style.display = gold >= 10 ? "block" : "none";
}

// Refresh resource values displayed in HTML
function refreshResources() {
  document.getElementById("trinkets").innerHTML = trinkets;
  document.getElementById("gold").innerHTML = gold;
}

// Event listener for clicking the "Collect Trinkets" button
trinketsButton.addEventListener("click", () => {
  trinkets += 1;
  refreshResources();
  showAppraise();
});

// Event listener for clicking the "Appraise" button
appraiseButton.addEventListener("click", () => {
  appraiseTrinkets();
});

// Initial UI setup
showAppraise();
showHireWorkersTrinkets();
refreshResources();
