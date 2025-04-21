const fishingButton = document.querySelector(".button");

fishingButton.addEventListener("click", function() {
    if(amountToFish >= 0 && isFishing === false) {
        isFishing = true;
        startFishing();
    }
});

let totalFishCaught = 0;
let amountToFish = 100;

let isFishing = false;
let autoMode = true;

let userLevel = 1;
let expRequired = 1000;
let userExp = 0;

let fishPool = [
    {fish: "Carp",              weight: 25, minLevel: 1, minSize: 10,    maxSize: 30,  baseExp: 10, caught: 0, link: document.querySelector(".carp")},
    {fish: "Trout",             weight: 25, minLevel: 1, minSize: 15,    maxSize: 25,  baseExp: 10, caught: 0, link: document.querySelector(".trout")},
    {fish: "Silver Anchovy",    weight: 15, minLevel: 1, minSize: 5,     maxSize: 10,  baseExp: 30, caught: 0, link: document.querySelector(".silver-anchovy")},
    {fish: "Bass",              weight: 10, minLevel: 5, minSize: 7,     maxSize: 12,  baseExp: 40, caught: 0, link: document.querySelector(".bass")},
    {fish: "Shark",             weight: 10, minLevel: 5, minSize: 30,    maxSize: 100, baseExp: 20, caught: 0, link: document.querySelector(".shark")},
    {fish: "Gar",               weight: 5,  minLevel: 10, minSize: 20,    maxSize: 40,  baseExp: 25, caught: 0, link: document.querySelector(".gar")},
    {fish: "Rainbow Trout",     weight: 4,  minLevel: 15, minSize: 20,    maxSize: 25,  baseExp: 50, caught: 0, link: document.querySelector(".rainbow-trout")},
    {fish: "Rainbow Gar",       weight: 3,  minLevel: 15, minSize: 25,    maxSize: 35,  baseExp: 45, caught: 0, link: document.querySelector(".rainbow-gar")},
    {fish: "Great White",       weight: 2,  minLevel: 20, minSize: 100,   maxSize: 300, baseExp: 20, caught: 0, link: document.querySelector(".great-white")},
    {fish: "The Ruby Dragon",   weight: 1,  minLevel: 25, minSize: 150,   maxSize: 500, baseExp: 40, caught: 0, link: document.querySelector(".the-ruby-dragon")},
];

function startFishing() {
    setTimeout(fish, 1000);
}

function fish() {
    let totalWeight = 0
    for (let i = 0; i < fishPool.length; i++) {
        totalWeight+=fishPool[i].weight;
    }

    let randomNumber = Math.floor(Math.random() * totalWeight);

    for (let i = 0; i < fishPool.length; i++) {
        randomNumber -= fishPool[i].weight;

        if (randomNumber < 0) {
            let _fish = fishPool[i];
            if (_fish.minLevel > userLevel) {
                console.log("The fish gets away...");
                if (autoMode) { 
                    startFishing()
                }
                return;
            }

            _fish.caught++;
            _fish.link.innerHTML = fishPool[i].caught;

            let size = Math.round(Math.random() * (_fish.maxSize - _fish.minSize) + _fish.minSize);
            let expGained = (_fish.baseExp * size);
            userExp += expGained;
            checkLevel();
            console.log("You caught a " + _fish.fish + " measuring " + size + " lbs! / " + "Level: " + userLevel + " / EXP:" + userExp + "/" + expRequired + "(+" + expGained + ")");
            fishCaught()
            return;
        }
    }
}

function fishCaught() {
    totalFishCaught++;
    amountToFish--;
    isFishing = false;

    if (autoMode) {
        isFishing = true;
        startFishing();
    }
}

function checkLevel () {
    while (userExp >= expRequired) {
        userLevel++;
        expRequired = Math.round((expRequired * 1.2));
    }
}
