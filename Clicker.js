let money = 0;
let nekoCoins = 0;
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
let unlockedNekoImages = [];

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
function displayUnlockedNekoImages(){
  const container = document.getElementById('image-container');
  Array.from(container.children).forEach(child =>{
    if(child.tagName !== "H2") child.remove();
  });

  for(const {url, rarity} of unlockedNekoImages){
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
  }
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
    converterUpgradePrice = Math.floor(converterUpgradePrice + 500);

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
    buyNekoPrice = Math.floor(buyNekoPrice + 5);

    updateDisplay();
    updateTooltips();
    fetchNeko();
  }else{
    alert("Not enough NekoCoins for buy Neko!")
  }
}
function getRandomRarity(){
  const roll = Math.random();

  if(roll < 0.7292) return 'common';
  if(roll < 0.7292 + 0.2083) return 'rare';
  if(roll < 0.7292 + 0.2083 + 0.0521) return 'epic';
  return 'legendary';
}
function fetchNeko() {
  const apiUrl = 'https://nekos.best/api/v2/neko';

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const url = data.results[0].url;
      let rarity = getRandomRarity();
      unlockedNekoImages.push({url, rarity});
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
      saveGame();
    })
    .catch(err => {
      console.error("Failed to fetch neko:", err);
    });
}
function provideGiftBasedOnRarity(rarity) {
  let giftMessage = '';
  switch (rarity) {
    case 'common':
      money += 5;
	    click+=3;
      giftMessage = 'You received 5 Money and 3 Click!';
      break;
    case 'rare':
      money += 50;
	    click+=5;
	    autoClicker+=3;
      giftMessage = 'You received 50 Money, 5 Click and 3 Auto-Clickers!';
      break;
    case 'epic':
      money += 250;
	    autoClickerMultiplier+=1;
	    click+=10;
	    autoClicker+=5;
      giftMessage = 'You received 250 Money, 10 Click, 5 Auto-Clickers and 1 Auto-Clickers Multiplier!';
      break;
    case 'legendary':
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
function saveGame(){
  const gameData ={
    money,
    nekoCoins,
    click,
    clickAdd,
    clickUpgradePrice,
    clickUpgradeLevel,
    autoClicker,
    autoClickerMultiplier,
    autoClickerPrice,
    autoClickerUpgradePrice,
    autoClickerUpgradeLevel,
    buyNekoPrice,
    unlockedNekoImages,
    converterValuePrice,
    converterValueExchange,
    converterExchangeAdd,
    converterUpgradePrice,
    converterUpgradeLevel
  };
  localStorage.setItem('nekoClickerSave',JSON.stringify(gameData));
}
function loadGame(){
  const savedGame = localStorage.getItem('nekoClickerSave');
  if(savedGame){
    const gameData = JSON.parse(savedGame);
    money = gameData.money ?? 0;
    nekoCoins = gameData.nekoCoins ?? 0;
    click = gameData.click ?? 1;
    clickAdd = gameData.clickAdd ?? 1;
    clickUpgradePrice = gameData.clickUpgradePrice ?? 100;
    clickUpgradeLevel = gameData.clickUpgradeLevel ?? 0;
    autoClicker = gameData.autoClicker ?? 0;
    autoClickerMultiplier = gameData.autoClickerMultiplier ?? 1;
    autoClickerPrice = gameData.autoClickerPrice ?? 10;
    autoClickerUpgradePrice = gameData.autoClickerUpgradePrice ?? 250;
    autoClickerUpgradeLevel = gameData.autoClickerUpgradeLevel ?? 0;
    buyNekoPrice = gameData.buyNekoPrice ?? 10;
    unlockedNekoImages = gameData.unlockedNekoImages ?? [];
    converterValuePrice = gameData.converterValuePrice ?? 250;
    converterValueExchange = gameData.converterValueExchange ?? 1;
    converterExchangeAdd = gameData.converterExchangeAdd ?? 1;
    converterUpgradePrice = gameData.converterUpgradePrice ?? 500;
    converterUpgradeLevel = gameData.converterUpgradeLevel ??0;

    updateDisplay();
    displayUnlockedNekoImages();
    updateTooltips();
  }
}
setInterval(saveGame,30000);
window.addEventListener('load',() =>{
  loadGame();
  loadStart();
});
function exportSave(){
  const gameData ={
    money,
    nekoCoins,
    click,
    clickAdd,
    clickUpgradePrice,
    clickUpgradeLevel,
    autoClicker,
    autoClickerMultiplier,
    autoClickerPrice,
    autoClickerUpgradePrice,
    autoClickerUpgradeLevel,
    buyNekoPrice,
    unlockedNekoImages,
    converterValuePrice,
    converterValueExchange,
    converterExchangeAdd,
    converterUpgradePrice,
    converterUpgradeLevel
  };
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(gameData));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "nekoClickerSave.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
function importSave(){
  document.getElementById('fileInput').click();
}
function handleFile(event){
  const file = event.target.files[0];
  if(!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const contents = e.target.result;
    try{
      const gameData = JSON.parse(contents);

      money = gameData.money ?? 0;
      nekoCoins = gameData.nekoCoins ?? 0;
      click = gameData.click ?? 1;
      clickAdd = gameData.clickAdd ?? 1;
      clickUpgradePrice = gameData.clickUpgradePrice ?? 100;
      clickUpgradeLevel = gameData.clickUpgradeLevel ?? 0;
      autoClicker = gameData.autoClicker ?? 0;
      autoClickerMultiplier = gameData.autoClickerMultiplier ?? 1;
      autoClickerPrice = gameData.autoClickerPrice ?? 10;
      autoClickerUpgradePrice = gameData.autoClickerUpgradePrice ?? 250;
      autoClickerUpgradeLevel = gameData.autoClickerUpgradeLevel ?? 0;
      buyNekoPrice = gameData.buyNekoPrice ?? 10;
      unlockedNekoImages = gameData.unlockedNekoImages ?? [];
      converterValuePrice = gameData.converterValuePrice ?? 250;
      converterValueExchange = gameData.converterValueExchange ?? 1;
      converterExchangeAdd = gameData.converterExchangeAdd ?? 1;
      converterUpgradePrice = gameData.converterUpgradePrice ?? 500;
      converterUpgradeLevel = gameData.converterUpgradeLevel ??0;

      updateDisplay();
      updateTooltips();
      displayUnlockedNekoImages();
      saveGame();
      alert("Save imported successfully!")
    }catch (error){
      alert("Failed to load save file!");
    }
  };
  reader.readAsText(file);
}
function clearSave(){
  if(confirm("Are you sure you want to delete your save data? This cannot be undone.")){
    localStorage.removeItem("nekoClickerSave");
    location.reload();
  }
}