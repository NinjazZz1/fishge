const fishingButton = document.querySelector(".button");
const logText = document.querySelector(".fish-log");
const logFish = document.getElementById("log-fish");
const levelText = document.querySelector(".level");
const previousFish = document.querySelector(".previous")
const totalCaught = document.querySelector(".caught")

const defaultLogImage = "/images/rod.png";

fishingButton.addEventListener("click", function() {
    if(isFishing === false) {
        isFishing = true;
        startFishing();
    }
});

let totalFishCaught = 0;

let isFishing = false;
let autoMode = true;

let userLevel = 1;
let expRequired = 100;
let userExp = 0;

let currentWeather = "";

let castTime = 5000;
let simulationSeconds = 0;
let simulationHours = 0;

let defaultLogText = "Press the 'Start Fishing' button to fish!";

logText.innerHTML = defaultLogText;

let fishPool = [
    {fish: "Carp",              weight: 25, weather: "", minLevel: 1,  minSize: 10,  maxSize: 30, minBiteTime:5, maxBiteTime: 15,  baseExp: 2,  caught: 0, link: document.querySelector(".carp"), image: document.getElementById("carp").src},
    {fish: "Trout",             weight: 25, weather: "", minLevel: 1,  minSize: 15,  maxSize: 25, minBiteTime:7, maxBiteTime: 13,  baseExp: 2,  caught: 0, link: document.querySelector(".trout"),image: document.getElementById("trout").src},
    {fish: "Silver Anchovy",    weight: 15, weather: "", minLevel: 1,  minSize: 5,   maxSize: 10, minBiteTime:4, maxBiteTime: 13,  baseExp: 6,  caught: 0, link: document.querySelector(".silver-anchovy"),image: document.getElementById("silver-anchovy").src},
    {fish: "Bass",              weight: 10, weather: "", minLevel: 5,  minSize: 7,   maxSize: 12, minBiteTime:10, maxBiteTime: 15,  baseExp: 5,  caught: 0, link: document.querySelector(".bass"),image: document.getElementById("bass").src},
    {fish: "Shark",             weight: 10, weather: "", minLevel: 10,  minSize: 30,  maxSize: 100, minBiteTime:20, maxBiteTime: 25, baseExp: 1,  caught: 0, link: document.querySelector(".shark"),image: document.getElementById("shark").src},
    {fish: "Gar",               weight: 5,  weather: "", minLevel: 15,  minSize: 20,  maxSize: 40, minBiteTime:15, maxBiteTime: 25,  baseExp: 3,  caught: 0, link: document.querySelector(".gar"),image: document.getElementById("gar").src},
    {fish: "Rainbow Trout",     weight: 4,  weather: "", minLevel: 30, minSize: 20,  maxSize: 25, minBiteTime:15, maxBiteTime: 20,  baseExp: 10, caught: 0, link: document.querySelector(".rainbow-trout"),image: document.getElementById("rainbow-trout").src},
    {fish: "Rainbow Gar",       weight: 3,  weather: "", minLevel: 30, minSize: 25,  maxSize: 35, minBiteTime:20, maxBiteTime: 30,  baseExp: 8,  caught: 0, link: document.querySelector(".rainbow-gar"),image: document.getElementById("rainbow-gar").src},
    {fish: "Great White",       weight: 2,  weather: "", minLevel: 20, minSize: 100, maxSize: 300, minBiteTime:30, maxBiteTime: 40, baseExp: 1,  caught: 0, link: document.querySelector(".great-white"),image: document.getElementById("great-white").src},
    {fish: "The Ruby Dragon",   weight: 1,  weather: "", minLevel: 25, minSize: 150, maxSize: 500, minBiteTime:27, maxBiteTime: 33, baseExp: 2,  caught: 0, link: document.querySelector(".the-ruby-dragon"),image: document.getElementById("the-ruby-dragon").src},
];

/* USE FOR TESTING EXP BALANCE */

for (let i = 0; i < fishPool.length; i++) {
    let averageExp = (fishPool[i].maxSize + fishPool[i].minSize) / 2 * fishPool[i].baseExp;
    console.log(fishPool[i].fish, averageExp);
}

function startFishing() {
    logFish.src = "/images/rod.png";
    selectFishFromPool();
}

function selectFishFromPool() {
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
                console.log("Fish is too high Level!");
                selectFishFromPool();
                return;
            }
            else if (_fish.weather !== "") {
                if (currentWeather === _fish.weather) {
                    beginReelIn(_fish, i);
                } else { 
                    console.log("Wrong weather!");
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

    setTimeout(function() { 
        updateStats(_fish, size, id);
    }, castTime);
}

function updateStats (_fish, _size, id) {
    _fish.caught++;
    _fish.link.innerHTML = _fish.fish + " | " + fishPool[id].caught;

    let expGained = Math.round((_fish.baseExp * _size));
    userExp += expGained;
    checkLevel();
    totalFishCaught++;
    logText.innerHTML = "You caught a " + _fish.fish + " measuring " + _size + " lbs";
    console.log("You caught a " + _fish.fish + " measuring " + _size + " lbs! / " + "Level: " + userLevel + " / EXP:" + userExp + "/" + expRequired + "(+" + expGained + ")" + "/ Total Fish Caught: " + totalFishCaught + " / Playtime: " + simulationHours);
    isFishing = false;

    logFish.src = fishPool[id].image;
    previousFish.src = fishPool[id].image;

    if (autoMode) {
        isFishing = true;
        startFishing();
    }
    return;
}

function checkLevel () {   
    while (userExp >= expRequired) {
        userLevel++;
        expRequired = Math.round((expRequired + 100) * 1.1);
    }
    levelText.innerHTML = "Level: " + userLevel + " | EXP: " + userExp + " / " + expRequired;
}
