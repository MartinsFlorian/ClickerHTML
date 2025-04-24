let score=0;
let money=0;
let autoClickers = 0;
let autoClickerPrice = 50;
let convertScorePrice = 2;
let buyNekoPrice =10;

function updateDisplay(){
	document.getElementById("viewScore").innerText = score;
	document.getElementById("viewMoney").innerText = money;
	document.getElementById("viewAuto").innerText = autoClickers;
}
function updateTooltips() {
	document.getElementById('autoClickerPriceText').textContent = autoClickerPrice;
	document.getElementById('convertScorePriceText').textContent = convertScorePrice;
	document.getElementById('buyNekoPriceText').textContent = buyNekoPrice;
}
function increaseScore(){
	score++;
	updateDisplay();
}
function convertScore() {
  if (score >= convertScorePrice) {
	score -= convertScorePrice;
    money += 1;

    updateDisplay();
    updateTooltips();
  } else {
    alert("Not enough score to convert!");
  }
}
function buyAutoClicker() {
  if (money >= autoClickerPrice) {
    money -= autoClickerPrice;
    autoClickers++;
    autoClickerPrice = Math.floor(autoClickerPrice * 1.5);

    updateDisplay();
    updateTooltips();
  } else {
    alert("Not enough money for an auto-clicker!");
  }
}
setInterval(() => {
  if (autoClickers > 0) {
    score += autoClickers;
    updateDisplay();
  }
}, 1000);
function buyNeko() {
  if (money >= buyNekoPrice) {
    money -= buyNekoPrice;
    buyNekoPrice = Math.floor(buyNekoPrice * 1.5);

    updateDisplay();
    updateTooltips();
	fetchNeko();
  } else {
    alert("Not enough money to buy Neko!");
  }
}
function getRandomRarity() {
  const rarities = ['common', 'rare', 'epic', 'legendary'];
  const randomIndex = Math.floor(Math.random() * rarities.length);
  return rarities[randomIndex];
}
function fetchNeko() {
  const apiUrl = 'https://nekos.best/api/v2/neko';

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const url = data.results[0].url;
      const rarity = getRandomRarity();
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
    case 'common':
      score += 1;
      giftMessage = 'You received 1 score!';
      break;
    case 'rare':
      score += 5;
      giftMessage = 'You received 5 score!';
      break;
    case 'epic':
      score += 10;
      money += 5;
      giftMessage = 'You received 10 score and 5 money!';
      break;
    case 'legendary':
      score += 50;
      money += 10;
      giftMessage = 'You received 50 score and 10 money!';
      break;
    default:
      giftMessage = 'No gift for this rarity.';
  }
  alert(giftMessage);
  updateDisplay()
}