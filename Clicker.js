let score=0;
let money=0;
let autoGain=0;
function viewScore(){
	document.getElementById("viewScore").innerText = score;
}
function viewMoney(){
	document.getElementById("viewMoney").innerText = money;
}
function increaseScore(values){
	score+=values;
	viewScore();
	localStorage.setItem("score", score);
}
setInterval(() => {
    if (autoGain > 0) {
        score += autoGain;
        viewScore();
        localStorage.setItem("score", score);
    }
}, 1000);

function acheterAutoFarm() {
    let prix = 10;
    if (money >= prix) {
        money -= prix;
        autoGain += 1;
		
        viewScore();
		viewMoney();
        localStorage.setItem("money", money);
		localStorage.setItem("autoGain", autoGain);
    } else {
        alert("Pas assez de money !");
    }
}
function convertScore(){
	let convertPrice = 2;
	if(score >= convertPrice){
		score -= convertPrice;
		money +=1;
		viewMoney();
		viewScore();
		localStorage.setItem("score", score);
		localStorage.setItem("money", money);
	} else{
		alert("Pas assez de score !");
	}
}
