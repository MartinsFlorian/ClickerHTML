let money = 100000000000;
let nekoCoins = 100000000000;
let autoClicker =0;
let click = 1;

let clickAdd = 1;
let clickUpgradePrice = 100;
let clickUpgradeLevel = 0;

let autoClickerMultiplier = 1;
let autoClickerPrice = 10;
let autoClickerUpgradePrice = 250;
let autoClickerUpgradeLevel = 0;

let buyNekoPrice = 10;

let converterValuePrice = 250;
let converterValueExchange = 1;
let converterExchangeAdd = 1;
let converterUpgradePrice = 500;
let converterUpgradeLevel = 0;

function loadStart(){
  updateDisplay();
  updateTooltips();
}
function updateDisplay(){
  document.getElementById("viewMoney").innerText = money;
  document.getElementById("viewNekoCoins").innerText = nekoCoins;
  document.getElementById("viewAutoClicker").innerText = autoClicker;
  document.getElementById("viewClick").innerText = click;
  document.getElementById("viewClickUpgrade").innerText = clickUpgradeLevel;
  document.getElementById("viewAutoClickerUpgrade").innerText = autoClickerUpgradeLevel;
  document.getElementById("viewAutoClickerMultiplier").innerText = autoClickerMultiplier;
  document.getElementById("viewConverterUpgrade").innerText = converterUpgradeLevel;
}
function updateTooltips(){
  document.getElementById("autoClickerPriceText").textContent = autoClickerPrice;
  document.getElementById("buyNekoPriceText").textContent = buyNekoPrice;
  document.getElementById("clickUpgradePriceText").textContent = clickUpgradePrice;
  document.getElementById("clickAddText").textContent = clickAdd;
  document.getElementById("autoClickerUpgradePriceText").textContent = autoClickerUpgradePrice;
  document.getElementById("converterValuePriceText").textContent = converterValuePrice;
  document.getElementById("converterValueExchangeText").textContent = converterValueExchange;
  document.getElementById("converterUpgradePriceText").textContent = converterUpgradePrice;
  document.getElementById("converterExchangeAddText").textContent = converterExchangeAdd;
}
function increaseMoney(){
  money += click;
  updateDisplay();
  spawnPawPrint();
}
function upgradeClick(){
  if(money >= clickUpgradePrice){
    money -= clickUpgradePrice;
    click += clickAdd;
    clickUpgradeLevel++;
    clickUpgradePrice = Math.floor(clickUpgradePrice * 1.3);

    updateDisplay();
    updateTooltips();
  }else{
    alert("Not enough Money for upgrade Click!")
  }
}
function convertMoneyToNekoCoins(){
  if(money >= converterValuePrice){
    money -= converterValuePrice;
    nekoCoins += converterValueExchange;

    updateDisplay();
    updateTooltips();
  }else{
    alert("Not enough Money to convert into NekoCoins!")
  }
}
function upgradeConverter(){
  if(money >= converterUpgradePrice){
    money -= converterUpgradePrice;
    converterValueExchange += converterExchangeAdd;
    converterUpgradeLevel++;
    converterUpgradePrice = Math.floor(converterUpgradePrice * 2);

    updateDisplay();
    updateTooltips();
  }else{
    alert("Not enough Money for upgrade converter!")
  }
}
function buyAutoClicker(){
  if(money >= autoClickerPrice){
    money -= autoClickerPrice;
    autoClicker++;
    autoClickerPrice = Math.floor(autoClickerPrice * 1.25);

    updateDisplay();
    updateTooltips();
  }else{
    alert("Not enough Money for buy Auto-Clicker!")
  }
}
setInterval(() => {
  if (autoClicker > 0) {
    money += autoClicker * autoClickerMultiplier;
    updateDisplay();
  }
}, 1000);
function upgradeAutoClicker(){
  if(money >= autoClickerUpgradePrice){
    money -= autoClickerUpgradePrice;
    autoClickerMultiplier++;
    autoClickerUpgradeLevel++;
    autoClickerUpgradePrice = Math.floor(autoClickerUpgradePrice * 1.3);

    updateDisplay();
    updateTooltips();
  }else{
    alert("Not enough Money for upgrade Auto-Clicker")
  }
}
function buyNeko(){
  if(nekoCoins >= buyNekoPrice){
    nekoCoins -= buyNekoPrice;
    buyNekoPrice = Math.floor(buyNekoPrice * 1.1);

    updateDisplay();
    updateTooltips();
    fetchNeko();
  }else{
    alert("Not enough NekoCoins for buy Neko!")
  }
}
function getRandomRarity(){
  const roll = Math.random();

  if(roll < 0.7292) return 'Common';
  if(roll < 0.7292 + 0.2083) return 'Rare';
  if(roll < 0.7292 + 0.2083 + 0.0521) return 'Epic';
  return 'Legendary';
}
function fetchNeko() {
  const apiUrl = 'https://nekos.best/api/v2/neko';

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const url = data.results[0].url;
      let rarity = getRandomRarity();
	  console.log(rarity);
      provideGiftBasedOnRarity(rarity);

      const container = document.getElementById('image-container');
      const nekoWrapper = document.createElement('div');
      nekoWrapper.classList.add('tooltip');

      const img = document.createElement('img');
      img.src = url;
      img.alt = 'Neko image';

      const tooltipText = document.createElement('span');
      tooltipText.textContent = rarity;
      tooltipText.className = `tooltiptext rarity-${rarity.toLowerCase()}`;

      nekoWrapper.appendChild(img);
      nekoWrapper.appendChild(tooltipText);
      container.appendChild(nekoWrapper);
    })
    .catch(err => {
      console.error("Failed to fetch neko:", err);
    });
}
function provideGiftBasedOnRarity(rarity) {
  let giftMessage = '';
  switch (rarity) {
    case 'Common':
      money += 5;
	    click+=3;
      giftMessage = 'You received 5 Money and 3 Click!';
      break;
    case 'Rare':
      money += 50;
	    click+=5;
	    autoClicker+=3;
      giftMessage = 'You received 50 Money, 5 Click and 3 Auto-Clickers!';
      break;
    case 'Epic':
      money += 250;
	    autoClickerMultiplier+=1;
	    click+=10;
	    autoClicker+=5;
      giftMessage = 'You received 250 Money, 10 Click, 5 Auto-Clickers and 1 Auto-Clickers Multiplier!';
      break;
    case 'Legendary':
      money += 1000;
	    autoClickerMultiplier+=5;
	    click+=25;
	    autoClicker+=10;
      giftMessage = 'You received 1000 Money, 25 Click, 10 Auto-Clickers and 5 Auto-Clickers Multiplier!';
      break;
    default:
      giftMessage = 'No gift for this rarity.';
  }
  alert(giftMessage);
  updateDisplay()
}
function spawnPawPrint() {
  const paw = document.createElement('div');
  paw.className = 'paw-print';
  paw.style.left = (Math.random() * window.innerWidth) + 'px';
  paw.style.top = (Math.random() * window.innerHeight) + 'px';
  document.body.appendChild(paw);

  setTimeout(() => paw.remove(), 1000);
}