
let money=100000;
let nekoCoins=1000000000000;
let autoClickers = 0;
let click=1;

let clickAdd=1;
let clickUpgradePrice=100;
let clickUpgardeLevel=0;

let autoClickersMultiplier =1;
let autoClickerPrice = 10;
let autoClickersUpgradePrice=250;
let autoClickersUpgardeLevel=0;

let buyNekoPrice =10;

let convertValuePrice=250;
let convertValueExchange=1;
let convertUpgradePrice=500;
let convertExchangeAdd=1;
let convertUpgradeLevel=0;

function loadStart(){
	updateDisplay();
	updateTooltips();
}
function updateDisplay(){
	document.getElementById("viewMoney").innerText = money;
  document.getElementById("viewNekoCoins").innerText = nekoCoins;
	document.getElementById("viewAuto").innerText = autoClickers;
	document.getElementById("viewClick").innerText = click;
	document.getElementById("viewClickUpgrade").innerText = clickUpgardeLevel;
	document.getElementById("viewAutoClickUpgrade").innerText = autoClickersUpgardeLevel;
	document.getElementById("viewAutoClickMultiplier").innerText = autoClickersMultiplier;
  document.getElementById("viewConvertUpgrade").innerText = convertUpgradeLevel;
}
function updateTooltips() {
	document.getElementById('autoClickerPriceText').textContent = autoClickerPrice;
	document.getElementById('buyNekoPriceText').textContent = buyNekoPrice;
	document.getElementById('clickPriceText').textContent = clickUpgradePrice;
	document.getElementById('clickAddText').textContent = clickAdd;
	document.getElementById('autoClickerUpgradePriceText').textContent = autoClickersUpgradePrice;
  document.getElementById('convertValuePriceText').textContent = convertValuePrice;
  document.getElementById('convertValueExchangeText').textContent = convertValueExchange;
  document.getElementById('convertUpgradePriceText').textContent = convertUpgradePrice;
  document.getElementById('convertExchangeAddText').textContent = convertExchangeAdd;
}
function increaseMoney(){
	money+=click;
	updateDisplay();
  spawnPawPrint();
}
function upgradeClick(){
	if(money >= clickUpgradePrice){
		money-=clickUpgradePrice;
		click+=clickAdd;
		clickUpgardeLevel++;
		clickUpgradePrice = Math.floor(clickUpgradePrice * 1.3);
		
		updateDisplay();
		updateTooltips();
	}else{
		alert("Not enough money for upgrade Click!");
	}
}
function convertMoneyToNekoCoins(){
  if (money >= convertValuePrice){
    money-=convertValuePrice;
    nekoCoins+=convertValueExchange;

    updateDisplay();
    updateTooltips();
  }else{
    alert("Not enough money to convert into neko coins!");
  }
}
function upgradeConverter(){
  if(money >= convertUpgradePrice){
    money-= convertUpgradePrice;
    convertValueExchange+=convertExchangeAdd;
    convertUpgradeLevel++;
    convertUpgradePrice = Math.floor(convertUpgradePrice * 2);

    updateDisplay();
    updateTooltips();
  }else{
    alert("Not enough money to upgrade the converter!");
  }
}
function buyAutoClicker() {
  if (money >= autoClickerPrice) {
    money -= autoClickerPrice;
    autoClickers++;
    autoClickerPrice = Math.floor(autoClickerPrice * 1.25);

    updateDisplay();
    updateTooltips();
  } else {
    alert("Not enough money for buy an auto-clicker!");
  }
}
setInterval(() => {
  if (autoClickers > 0) {
    money += autoClickers * autoClickersMultiplier;
    updateDisplay();
  }
}, 1000);
function upgradeAutoClick(){
	if (money >= autoClickersUpgradePrice) {
    money -= autoClickersUpgradePrice;
	autoClickersMultiplier++;
	autoClickersUpgardeLevel++;
    autoClickersUpgradePrice = Math.floor(autoClickersUpgradePrice * 1.3);

    updateDisplay();
    updateTooltips();
  } else {
    alert("Not enough money for upgrade Auto-Clickers!");
  }
}
function buyNeko() {
  if (nekoCoins >= buyNekoPrice) {
    nekoCoins -= buyNekoPrice;
    buyNekoPrice = Math.floor(buyNekoPrice * 1.2);

    updateDisplay();
    updateTooltips();
	fetchNeko();
  } else {
    alert("Not enough NekoCoins to buy Neko!");
  }
}
function getRandomRarity() {
    const roll = Math.random(); // 0.0 - 1.0

	 if (roll < 0.7292) return 'Common';
	 if (roll < 0.7292 + 0.2083) return 'Rare';
	 if (roll < 0.7292 + 0.2083 + 0.0521) return 'Epic';
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
	  autoClickers+=3;
      giftMessage = 'You received 50 Money, 5 Click and 3 Auto-Clickers!';
      break;
    case 'Epic':
      money += 250;
	  autoClickersMultiplier+=1;
	  click+=10;
	  autoClickers+=5;
      giftMessage = 'You received 250 Money, 10 Click, 5 Auto-Clickers and 1 Auto-Clickers Multiplier!';
      break;
    case 'Legendary':
      money += 1000;
	  autoClickersMultiplier+=5;
	  click+=25;
	  autoClickers+=10;
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