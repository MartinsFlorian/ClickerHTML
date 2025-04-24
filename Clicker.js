let money=100000;
let click=1;
let clickAdd=1;
let clickUpgradePrice=100;
let clickUpgardeLevel=0;
let autoClickers = 0;
let autoClickersMultiplier =1;
let autoClickerPrice = 10;
let autoClickersUpgradePrice=250;
let autoClickersUpgardeLevel=0;
let buyNekoPrice =10;

function loadStart(){
	updateDisplay();
	updateTooltips();
}
function updateDisplay(){
	document.getElementById("viewMoney").innerText = money;
	document.getElementById("viewAuto").innerText = autoClickers;
	document.getElementById("viewClick").innerText = click;
	document.getElementById("viewClickUpgrade").innerText = clickUpgardeLevel;
	document.getElementById("viewAutoClickUpgrade").innerText = autoClickersUpgardeLevel;
	document.getElementById("viewAutoClickMultiplier").innerText = autoClickersMultiplier;
}
function updateTooltips() {
	document.getElementById('autoClickerPriceText').textContent = autoClickerPrice;
	document.getElementById('buyNekoPriceText').textContent = buyNekoPrice;
	document.getElementById('clickPriceText').textContent = clickUpgradePrice;
	document.getElementById('clickAddText').textContent = clickAdd;
	document.getElementById('autoClickerUpgradePriceText').textContent = autoClickersUpgradePrice;
}
function increaseMoney(){
	money+=click;
	updateDisplay();
}
function upgradeClick(){
	if(money >= clickUpgradePrice){
		money-=clickUpgradePrice;
		click+=clickAdd;
		clickUpgardeLevel++;
		clickUpgradePrice = Math.floor(clickUpgradePrice * 1.5);
		
		updateDisplay();
		updateTooltips();
	}else{
		alert("Not enough money for upgrade Click!");
	}
}
function buyAutoClicker() {
  if (money >= autoClickerPrice) {
    money -= autoClickerPrice;
    autoClickers++;
    autoClickerPrice = Math.floor(autoClickerPrice * 1.1);

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
    autoClickersUpgradePrice = Math.floor(autoClickersUpgradePrice * 1.1);

    updateDisplay();
    updateTooltips();
  } else {
    alert("Not enough money for upgrade Auto-Clickers!");
  }
}
function buyNeko() {
  if (money >= buyNekoPrice) {
    money -= buyNekoPrice;
    buyNekoPrice = Math.floor(buyNekoPrice * 1.1);

    updateDisplay();
    updateTooltips();
	fetchNeko();
  } else {
    alert("Not enough money to buy Neko!");
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