const fishingButton = document.querySelector(".button");
const logText = document.querySelector(".fish-log");
const logFish = document.getElementById("log-fish");
const logFishActive = document.querySelector(".fish-log-active");
const levelText = document.querySelector(".level");
const previousFish = document.querySelector(".previous")
const totalCaught = document.querySelector(".caught")
const weatherText = document.querySelector(".weather");
const bestCatchText = document.querySelector(".fish-log-best");
const userCashText = document.querySelector(".cash");

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
let userCash = 0;
let bestCatchValue = 0;

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
    {fish: "Carp",              weight: 25, weather: "", minLevel: 1,  minSize: 10,  maxSize: 30, minBiteTime:5, maxBiteTime: 15,  baseExp: 2, baseValue: 0.1, caught: 0, link: document.querySelector(".carp"), image: document.getElementById("carp").src, ftext: ""},
    {fish: "Trout",             weight: 25, weather: "", minLevel: 2,  minSize: 15,  maxSize: 35, minBiteTime:7, maxBiteTime: 13,  baseExp: 2, baseValue: 0.1,  caught: 0, link: document.querySelector(".trout"),image: document.getElementById("trout").src, ftext: ""},
    {fish: "Silver Anchovy",    weight: 15, weather: "", minLevel: 5,  minSize: 3,   maxSize: 12, minBiteTime:4, maxBiteTime: 13,  baseExp: 6, baseValue: 0.05,  caught: 0, link: document.querySelector(".silver-anchovy"),image: document.getElementById("silver-anchovy").src, ftext: ""},
    {fish: "Bass",              weight: 10, weather: "", minLevel: 7,  minSize: 4,   maxSize: 16, minBiteTime:10, maxBiteTime: 15,  baseExp: 5, baseValue: 0.2,  caught: 0, link: document.querySelector(".bass"),image: document.getElementById("bass").src, ftext: ""},
    {fish: "Shark",             weight: 10, weather: "", minLevel: 9, minSize: 50,  maxSize: 100, minBiteTime:20, maxBiteTime: 25, baseExp: 1, baseValue: 0.4,  caught: 0, link: document.querySelector(".shark"),image: document.getElementById("shark").src, ftext: "Something big awaits..."},
    {fish: "Gar",               weight: 5,  weather: "", minLevel: 12, minSize: 22,  maxSize: 30, minBiteTime:15, maxBiteTime: 25,  baseExp: 3, baseValue: 0.5,  caught: 0, link: document.querySelector(".gar"),image: document.getElementById("gar").src, ftext: ""},
    {fish: "Rainbow Trout",     weight: 4,  weather: "", minLevel: 14, minSize: 15,  maxSize: 35, minBiteTime:15, maxBiteTime: 20,  baseExp: 10, baseValue: 0.3, caught: 0, link: document.querySelector(".rainbow-trout"),image: document.getElementById("rainbow-trout").src, ftext: "Something glistens in the water...."},
    {fish: "Rainbow Gar",       weight: 10, weather: "Heavy Rain", minLevel: 16, minSize: 20,  maxSize: 45, minBiteTime:20, maxBiteTime: 30,  baseExp: 8, baseValue: 0.8,  caught: 0, link: document.querySelector(".rainbow-gar"),image: document.getElementById("rainbow-gar").src, ftext: "Something glistens in the water...."},
    {fish: "Rainbow Bass",       weight: 10, weather: "Snow", minLevel: 18, minSize: 5,  maxSize: 25, minBiteTime:20, maxBiteTime: 30,  baseExp: 25, baseValue: 0.65,  caught: 0, link: document.querySelector(".rainbow-bass"),image: document.getElementById("rainbow-bass").src, ftext: "Something glistens in the water...."},
    {fish: "Great White",       weight: 10, weather: "Stormy", minLevel: 20, minSize: 100, maxSize: 300, minBiteTime:30, maxBiteTime: 40, baseExp: 1, baseValue: 1,  caught: 0, link: document.querySelector(".great-white"),image: document.getElementById("great-white").src, ftext: "Something big awaits..."},
    {fish: "The Ruby Dragon",   weight: 5,  weather: "Fog", minLevel: 10, minSize: 150, maxSize: 500, minBiteTime:27, maxBiteTime: 33, baseExp: 5, baseValue: 0.8,  caught: 0, link: document.querySelector(".the-ruby-dragon"),image: document.getElementById("the-ruby-dragon").src, ftext: "A beast approaches...."},
    {fish: "Prismatic Anchovy",   weight: 3,  weather: "Eclipse", minLevel: 10, minSize: 4, maxSize: 15, minBiteTime:15, maxBiteTime: 17, baseExp: 200, baseValue: 0.3,  caught: 0, link: document.querySelector(".prismatic-anchovy"),image: document.getElementById("prismatic-anchovy").src, ftext: "An unusual fish challenges the line..."},
    {fish: "Prismatic Bass",   weight: 3,  weather: "Fair Skies", minLevel: 10, minSize: 5, maxSize: 20, minBiteTime:20, maxBiteTime: 25, baseExp: 175, baseValue: 0.3,  caught: 0, link: document.querySelector(".prismatic-bass"),image: document.getElementById("prismatic-bass").src, ftext: "An unusual fish challenges the line..."},
    {fish: "Prismatic Carp",   weight: 3,  weather: "Clear Skies", minLevel: 10, minSize: 12, maxSize: 35, minBiteTime:10, maxBiteTime: 15, baseExp: 75, baseValue: 0.3,  caught: 0, link: document.querySelector(".prismatic-carp"),image: document.getElementById("prismatic-carp").src, ftext: "An unusual fish challenges the line..."},
    {fish: "Prismatic Gar",   weight: 3,  weather: "Windy", minLevel: 10, minSize: 15, maxSize: 50, minBiteTime:30, maxBiteTime: 32, baseExp: 75, baseValue: 0.4,  caught: 0, link: document.querySelector(".prismatic-gar"),image: document.getElementById("prismatic-gar").src, ftext: "An unusual fish challenges the line..."},
    {fish: "Prismatic Shark",   weight: 3,  weather: "Blizzards", minLevel: 10, minSize: 45, maxSize: 450, minBiteTime:40, maxBiteTime: 50, baseExp: 10, baseValue: 0.35,  caught: 0, link: document.querySelector(".prismatic-shark"),image: document.getElementById("prismatic-shark").src, ftext: "An unusual fish challenges the line..."},
];

runTests();

function runTests() {
    //moneyTest();
    expTest();
}

function moneyTest() {
    /* USE FOR MONEY BALANCE */
    console.log("$");
    for (let i = 0; i < fishPool.length; i++) {
    let averageExp = (fishPool[i].maxSize + fishPool[i].minSize) / 2 * fishPool[i].baseValue * fishPool[i].baseExp;;
    console.log(fishPool[i].fish, "$" + averageExp.toFixed(2));
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
                console.log("Fish is too high Level!");
                selectFishFromPool();
                return;
            }
            else if (_fish.weather != "") {
                if (currentWeather == _fish.weather) {
                    console.log("A rare sight! This fish needs " + _fish.weather + " and it is currently " + currentWeather);
                    beginReelIn(_fish, i);
                    return;
                } else { 
                    console.log("Wrong weather! This fish needs " + _fish.weather + " and it is currently " + currentWeather);
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
    _fish.caught++;
    _fish.link.innerHTML = _fish.fish + " | " + fishPool[id].caught;

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

    if (autoMode) {
        console.log("going again");
        isFishing = true;
        setTimeout(function() { 
            startFishing();
        }, 2000);
    }
}

function checkLevel () {   
    while (userExp >= expRequired) {
        userLevel++;
        expRequired = Math.round((expRequired + 100) * 1.1);
    }
    levelText.innerHTML = "Level: " + userLevel + " | EXP: " + userExp + " / " + expRequired;
}
