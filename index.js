const fishingButton = document.querySelector(".button");
const autoButton = document.querySelector(".auto-button");
const logText = document.querySelector(".fish-log");
const logFish = document.getElementById("log-fish");
const logFishActive = document.querySelector(".fish-log-active");
const levelText = document.querySelector(".level");
const previousFish = document.querySelector(".previous")
const totalCaught = document.querySelector(".caught")
const weatherText = document.querySelector(".weather");
const bestCatchText = document.querySelector(".fish-log-best");
const userCashText = document.querySelector(".cash");

const defaultLogImage = "../images/rod.png";

fishingButton.addEventListener("click", function() {
    if(isFishing === false) {
        isFishing = true;
        startFishing();
    }
});

autoButton.addEventListener("click", function() {
    if (autoMode === true) {
        autoButton.style.setProperty("background-color", "var(--inactive)");
        autoMode = false
    } else {
        autoMode = true;
        autoButton.style.setProperty("background-color", "var(--active)");
        if(isFishing === false) {
            isFishing = true;
            startFishing();
        }
    }
});

let totalFishCaught = 0;

let isFishing = false;
let autoMode = false;

let userLevel = 1;
let expRequired = 100;
let userExp = 0;
let userCash = 0;
let bestCatchValue = 0;

let strength = 10;

let currentWeather = "Fair Skies";
let weatherList = ["Fair Skies", "Rain", "Fog", "Snow", "Eclipse", "Stormy", "Blizzards", "Windy", "Heavy Rain", "Clear Skies"];
let castTime = 5000;
let simulationSeconds = 0;
let simulationHours = 0;

let defaultLogText = "Press the 'Start Fishing' button to fish!";

logText.innerHTML = defaultLogText;
weatherText.innerHTML = currentWeather;
bestCatchText.innerHTML = "-";

let fishPool = [
    {fish: "Carp",              type: "common", weight: 20, weather: "", minLevel: 1,  minSize: 10,  maxSize: 30, minBiteTime:5, maxBiteTime: 15, evasion: 0,  baseExp: 2, baseValue: 0.1, caught: 0, image: "./images/carp.png", ftext: ""},
    {fish: "Trout",             type: "common", weight: 15, weather: "", minLevel: 2,  minSize: 15,  maxSize: 35, minBiteTime:7, maxBiteTime: 13, evasion: 0, baseExp: 2, baseValue: 0.1,  caught: 0, image: "./images/trout.png", ftext: ""},
    {fish: "Silver Anchovy",    type: "common", weight: 15, weather: "", minLevel: 5,  minSize: 3,   maxSize: 12, minBiteTime:4, maxBiteTime: 13, evasion: 0, baseExp: 6, baseValue: 0.05,  caught: 0, image: "./images/silver_anchovy.png", ftext: ""},
    {fish: "Bass",              type: "uncommon", weight: 15, weather: "", minLevel: 7,  minSize: 4,   maxSize: 16, minBiteTime:10, maxBiteTime: 15, evasion: 10, baseExp: 5, baseValue: 0.1,  caught: 0, image: "./images/bass.png", ftext: ""},
    {fish: "Shark",             type: "uncommon", weight: 10, weather: "", minLevel: 9, minSize: 50,  maxSize: 100, minBiteTime:20, maxBiteTime: 25, evasion: 60, baseExp: 1, baseValue: 0.3,  caught: 0, image: "./images/shark.png", ftext: "Something big awaits..."},
    {fish: "Gar",               type: "rare", weight: 12.5,  weather: "", minLevel: 12, minSize: 22,  maxSize: 30, minBiteTime:15, maxBiteTime: 25, evasion: 80, baseExp: 3, baseValue: 0.15,  caught: 0, image: "./images/gar.png", ftext: ""},
    {fish: "Rainbow Trout",     type: "rare", weight: 12.5,  weather: "", minLevel: 14, minSize: 15,  maxSize: 35, minBiteTime:15, maxBiteTime: 20, evasion: 50, baseExp: 10, baseValue: 0.1, caught: 0, image: "./images/rainbow_trout.png", ftext: "Something glistens in the water...."},
    {fish: "Rainbow Gar",       type: "legendary", weight: 15, weather: "Heavy Rain", minLevel: 16, minSize: 20,  maxSize: 45, minBiteTime:20, maxBiteTime: 30, evasion: 80, baseExp: 8, baseValue: 0.1,  caught: 0, image: "./images/rainbow_gar.png", ftext: "Something glistens in the water...."},
    {fish: "Rainbow Bass",      type: "legendary", weight: 15, weather: "Snow", minLevel: 18, minSize: 5,  maxSize: 25, minBiteTime:20, maxBiteTime: 30, evasion: 70, baseExp: 25, baseValue: 0.07,  caught: 0, image: "./images/rainbow_bass.png", ftext: "Something glistens in the water...."},
    {fish: "Great White",       type: "legendary", weight: 15, weather: "Stormy", minLevel: 20, minSize: 100, maxSize: 300, minBiteTime:30, maxBiteTime: 40, evasion: 170, baseExp: 1, baseValue: 0.15,  caught: 0, image: "./images/great_white.png", ftext: "Something big awaits..."},
    {fish: "The Ruby Dragon",   type: "legendary", weight: 5,  weather: "Fog", minLevel: 10, minSize: 150, maxSize: 500, minBiteTime:27, maxBiteTime: 33, evasion: 90, baseExp: 5, baseValue: 0.05,  caught: 0, image: "./images/the_ruby_dragon.png", ftext: "A beast approaches...."},
    {fish: "Prismatic Anchovy", type: "epic",weight: 3,  weather: "Eclipse", minLevel: 10, minSize: 4, maxSize: 15, minBiteTime:15, maxBiteTime: 17, evasion: 10, baseExp: 200, baseValue: 0.02,  caught: 0, image: "./images/prismatic_anchovy.png", ftext: "An unusual fish challenges the line..."},
    {fish: "Prismatic Bass",    type: "epic", weight: 3,  weather: "Fair Skies", minLevel: 10, minSize: 5, maxSize: 20, minBiteTime:20, maxBiteTime: 25, evasion: 10, baseExp: 175, baseValue: 0.025,  caught: 0, image: "./images/prismatic_bass.png", ftext: "An unusual fish challenges the line..."},
    {fish: "Prismatic Carp",    type: "epic", weight: 3,  weather: "Clear Skies", minLevel: 10, minSize: 12, maxSize: 35, minBiteTime:10, maxBiteTime: 15, evasion: 10, baseExp: 75, baseValue: 0.03,  caught: 0, image: "./images/prismatic_carp.png", ftext: "An unusual fish challenges the line..."},
    {fish: "Prismatic Gar",     type: "epic", weight: 3,  weather: "Windy", minLevel: 10, minSize: 15, maxSize: 50, minBiteTime:30, maxBiteTime: 32, evasion: 99, baseExp: 75, baseValue: 0.03,  caught: 0, image: "./images/prismatic_carp.png", ftext: "An unusual fish challenges the line..."},
    {fish: "Prismatic Shark",   type: "epic", weight: 3,  weather: "Blizzards", minLevel: 10, minSize: 45, maxSize: 450, minBiteTime:40, maxBiteTime: 50, evasion: 250, baseExp: 10, baseValue: 0.03,  caught: 0, image: "./images/prismatic_shark.png", ftext: "An unusual fish challenges the line..."},
];

let cardList = [];

runTests();

// testing for adding elements HTML

let testAmount = 10;

for (let i = 0; i < fishPool.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card");

    const para = document.createElement("p");
    para.innerHTML = "???";
    card.appendChild(para);

    const image = document.createElement("img");
    image.src = "./images/unknown.png";
    image.alt = "???";
    image.id = "???";

    const number = document.createElement("p");
    number.classList.add("Test");
    number.innerHTML = fishPool[i].caught;

    const cards = document.querySelector(".cards");
    cards.appendChild(card);
    card.appendChild(image);
    card.append(number);

    let type = "var(--" + fishPool[i].type + ")";

    card.style.setProperty("background-color", type);

    const myCard = {"container": card, "name": para, "icon": image, "amount": number};

    cardList.push(myCard);
}


function runTests() {
    //moneyTest();
    //expTest();
    checkCards();
}

function moneyTest() {
    /* USE FOR MONEY BALANCE */
    console.log("$");
    for (let i = 0; i < fishPool.length; i++) {
    let minExp = fishPool[i].minSize  * fishPool[i].baseValue * fishPool[i].baseExp;
    let maxExp = fishPool[i].maxSize  * fishPool[i].baseValue * fishPool[i].baseExp;
    let averageExp = (fishPool[i].maxSize + fishPool[i].minSize) / 2 * fishPool[i].baseValue * fishPool[i].baseExp;
    console.log(fishPool[i].fish, "$" + minExp.toFixed(2), "$" + averageExp.toFixed(2), "$" + maxExp.toFixed(2));
    } 
}

function expTest() {
    /* USE FOR TESTING EXP BALANCE */
    console.log("EXP");
    for (let i = 0; i < fishPool.length; i++) {
        let minExp = fishPool[i].minSize * fishPool[i].baseExp;
        let maxExp = fishPool[i].maxSize * fishPool[i].baseExp;
        let averageExp = (fishPool[i].maxSize + fishPool[i].minSize) / 2 * fishPool[i].baseExp;
        console.log(fishPool[i].fish, minExp, averageExp, maxExp);
    }

}

function startFishing() {
    logFish.src = "./images/rod.png";
    fishingButton.style.visibility = "hidden";
    selectFishFromPool();
}

function selectFishFromPool() {
    isFishing = true;
    let totalWeight = 0;
    for (let i = 0; i < fishPool.length; i++) {
        totalWeight += fishPool[i].weight;
    }

    let randomNumber = Math.floor(Math.random() * totalWeight);

    for (let i = 0; i < fishPool.length; i++) {
        randomNumber -= fishPool[i].weight;

        if (randomNumber < 0) {
            let _fish = fishPool[i];
            if (_fish.minLevel > userLevel) {
                selectFishFromPool();
                return;
            }
            else if (_fish.weather != "") {
                if (currentWeather == _fish.weather) {
                    beginReelIn(_fish, i);
                    return;
                } else { 
                    selectFishFromPool();
                    return;
                }
            } else {
                beginReelIn(_fish, i);
                return;
            }
        }
    }
}

function beginReelIn (_fish, id) {
    let size = (Math.random() * (_fish.maxSize - _fish.minSize) + _fish.minSize).toFixed(2);
    castTime = Math.round((Math.random() * (_fish.maxBiteTime - _fish.minBiteTime) + _fish.minBiteTime) * 1000);

    /* GAMEPLAY LOGIC WILL GO HERE */

    logText.innerHTML = "You cast out your line...";

    if (_fish.ftext != "") {
        logFishActive.innerHTML = _fish.ftext;
    } else {
        logFishActive.innerHTML = "";
    }

    setTimeout(function() { 
        updateStats(_fish, size, id);
    }, castTime);
}

function updateStats (_fish, _size, id) {
    let slipChance = Math.random() * strength;
    if (slipChance < _fish.evasion)
    {
        console.log("The fish got away with a evasion of " + _fish.evasion + " against " + slipChance);
        logFishActive.innerHTML = "The fish gets away...";
        fishingButton.style.visibility = "visible";
        isFishing = false;
        checkAuto()
        return;
    }

    if (cardList[id].name.innerHTML == "???") {
        cardList[id].name.innerHTML = _fish.fish;
        cardList[id].icon.src = _fish.image;
    }

    _fish.caught++;
    //_fish.link.innerHTML = fishPool[id].caught;
    cardList[id].amount.innerHTML = fishPool[id].caught;

    let expGained = (_fish.baseExp * _size);
    userExp += Math.round(expGained);
    checkLevel();
    totalFishCaught++;

    let fishValue = (expGained * _fish.baseValue);
    userCash += fishValue;
    userCashText.innerHTML = "Cash: $" + userCash.toFixed(2);

    if (fishValue > bestCatchValue) {
        bestCatchValue = fishValue;
        bestCatchText.innerHTML = _fish.fish + " | " + _size + " lbs | $" + fishValue.toFixed(2); 
        previousFish.src = fishPool[id].image;
    }

    logText.innerHTML = "You caught a " + _fish.fish + " measuring " + _size + " lbs worth $" + fishValue.toFixed(2);
    console.log("You caught a " + _fish.fish + " measuring " + _size + " lbs! / " + "Level: " + userLevel + " / EXP:" + userExp + "/" + expRequired + "(+" + expGained + ")" + "/ Total Fish Caught: " + totalFishCaught + " / Playtime: " + simulationHours);

    logFish.src = fishPool[id].image;
    totalCaught.innerHTML = "Fish Caught: " + totalFishCaught;

    let weatherChangeChance = Math.random() * 100;

    if (weatherChangeChance > 90) {
        let weatherToChoose = Math.round(Math.random() * weatherList.length);
        currentWeather = weatherList[weatherToChoose];
        console.log("Weather is now " + currentWeather);
        weatherText.innerHTML = currentWeather;
        logFishActive.innerHTML = "Weather is now " + currentWeather;

        isFishing = false;
    }
    isFishing = false;
    fishingButton.style.visibility = "visible";

    checkAuto()
}

function checkAuto() {
    if (autoMode) {
        isFishing = true;
        setTimeout(function() { 
            startFishing();
        }, 2000);
    }
}

function checkLevel () {   
    while (userExp >= expRequired) {
        userLevel++;
        strength += 10;
        expRequired = Math.round((expRequired + 100) * 1.1);
    }
    levelText.innerHTML = "Level: " + userLevel + " | EXP: " + userExp + " / " + expRequired;
}

function checkCards () {
    console.log(cardList);
}
