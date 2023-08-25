let gold = 0;
let miner = 0;
let goods = 0;
let caravan = 0;
let minerPrice = 2; //gold
let goodsBuyPrice = 2; //gold
let goodsSellPrice = 2; //gold
let caravanCost = 5; //goods

const goldButton = document.getElementById("goldButton");
const mineGoldButton = document.getElementById("mineGoldButton");
const minerInfo = document.getElementById("minerInfo");
const buyGoodsButton = document.getElementById("buyGoodsButton");
const sellGoodsButton = document.getElementById("sellGoodsButton");
const createCaravanButton = document.getElementById("createCaravan");
const caravanTimerDisplay = document.getElementById("caravanTimer");

mineGoldButton.style.display = "none";
minerInfo.style.display = "none";

function refreshResources() {
  document.getElementById("gold").innerHTML = gold;
  document.getElementById("miner").innerHTML = miner;
  document.getElementById("goods").innerHTML = goods;
  document.getElementById("caravan").innerHTML = caravan;
}

//Costs
document.getElementById("minerPrice").innerHTML = minerPrice;
document.getElementById("goodsBuyPrice").innerHTML = goodsBuyPrice;
document.getElementById("goodsSellPrice").innerHTML = goodsSellPrice;
document.getElementById("goodsSellPrice").innerHTML = goodsSellPrice;
document.getElementById("caravanCost").innerHTML = caravanCost;

function refreshCosts() {
  document.getElementById("minerPrice").innerHTML = minerPrice;
  document.getElementById("goodsBuyPrice").innerHTML = goodsBuyPrice;
  document.getElementById("goodsSellPrice").innerHTML = goodsSellPrice;
  document.getElementById("goodsSellPrice").innerHTML = goodsSellPrice;
  document.getElementById("caravanCost").innerHTML = caravanCost;
}

//Initialise gold to 0 at start
if (gold === 0) {
  refreshResources();
  console.log("gold refreshed");
}

//Add gold function
function increaseGold() {
  gold = gold + 1;
  refreshResources();
  showMiner();
  console.log("gold increased by 1");
}
//Add miner for gold function
function increaseGoldMiner() {
  if (gold < minerPrice) {
    console.log("Not enough Gold!");
  } else {
    miner = miner + 1;
    gold = gold - minerPrice;
    refreshResources();
    console.log("gold miner increased by 1");
    if (miner >= 5 && miner < 10) {
      // Adjusted condition
      minerPrice = minerPrice * 2;
      refreshCosts();
    } else if (miner >= 10) {
      // Adjusted condition
      minerPrice = minerPrice * 2;
      refreshCosts();
    }
  }
}
//Purchase goods
function buyGoods() {
  if (gold < goodsBuyPrice) {
    console.log("Not enough gold!");
  } else {
    goods = goods + 1;
    gold = gold - goodsBuyPrice;
    refreshResources();
    console.log("goods bought");
  }
}
//Sell goods
function sellGoods() {
  goods = goods - 1;
  gold = gold + goodsSellPrice;
  refreshResources();
  console.log("goods sold");
}
// button event listeners
goldButton.addEventListener("click", increaseGold);
mineGoldButton.addEventListener("click", increaseGoldMiner);
buyGoodsButton.addEventListener("click", buyGoods);
sellGoodsButton.addEventListener("click", sellGoods);
createCaravanButton.addEventListener("click", createCaravan);

//initilate intervals for increasing ticks
let mineGoldInterval;
//let sellGoodsInterval;

mineGoldTimer();

function mineGoldTimer() {
  mineGoldInterval = window.setInterval(mineGold, 1000);
}

function mineGold() {
  let minerAmount = miner;
  gold = minerAmount + gold;
  refreshResources();
}

function createCaravan() {
  if (goods < caravanCost) {
    console.log("Not enough goods");
  } else {
    caravan = caravan + 1;
    goods = goods - caravanCost;
    caravanTimer();
  }
}

function caravanTimer() {
  let durationOfCaravan = 5;
  let timerId = setInterval(countdown, 1000);

  function countdown() {
    if (durationOfCaravan === -1) {
      clearTimeout(timerId);
      caravanReturn();
    } else {
      caravanTimerDisplay.innerHTML = durationOfCaravan + " seconds remaining";
      durationOfCaravan--;
    }
  }
}

function caravanReturn() {
  caravan = caravan - 1;
  gold = gold + 100;
}

//Show/Hide elements

function showMiner() {
  if (gold >= 10) {
    mineGoldButton.style.display = "block";
    minerInfo.style.display = "block";
  }
}
showMiner();
