const locations1 = {
    angielska: { xMin: 0, xMax: 0, yMin: 0, yMax: 0 },
    francuska: { xMin: 0, xMax: 0, yMin: 0, yMax: 0 },
    niemiecka: { xMin: 0, xMax: 0, yMin: 0, yMax: 0 },
    polska: { xMin: 0, xMax: 0, yMin: 0, yMax: 0 },
    wschodnioeuropejska: { xMin: 0, xMax: 0, yMin: 0, yMax: 0 },
    fińskie: { xMin: 0, xMax: 0, yMin: 0, yMax: 0 },
    czarnomorska: { xMin: 0, xMax: 0, yMin: 0, yMax: 0 },
    nadkaspijska: { xMin: 0, xMax: 0, yMin: 0, yMax: 0 },
    wielka: { xMin: 0, xMax: 0, yMin: 0, yMax: 0 },
    niska: { xMin: 0, xMax: 0, yMin: 0, yMax: 0 },
    węgierska: { xMin: 0, xMax: 0, yMin: 0, yMax: 0 },
    padanska: { xMin: 0, xMax: 0, yMin: 0, yMax: 0 },
    andaluzyjska: { xMin: 0, xMax: 0, yMin: 0, yMax: 0 },
    środkowoduńska: { xMin: 0, xMax: 0, yMin: 0, yMax: 0 }
};

const locations2 = {
    ural: { xMin: 830, xMax: 830, yMin: 29, yMax: 29 },
    skandynawskie: { xMin: 486, xMax: 486, yMin: 105, yMax: 105 },
    kaledońskie: { xMin: 296, xMax: 296, yMin: 219, yMax: 219 },
    grampiony: {xMin: 305, xMax: 305, yMin: 233, yMax: 233},
    penińskie: { xMin: 310, xMax: 310, yMin: 276, yMax: 276 },
    kambryjskie: { xMin: 289, xMax: 289, yMin: 305, yMax: 305 },
    kantabryjskie: { xMin: 213, xMax: 213, yMin: 452, yMax: 452 },
    kastylijskie: { xMin: 204, xMax: 204, yMin: 489, yMax: 489 },
    betyckie: { xMin: 211, xMax: 211, yMin: 557, yMax: 557 },
    pireneje: { xMin: 268, xMax: 268, yMin: 481, yMax: 481 },
    sudety: { xMin: 491, xMax: 491, yMin: 372, yMax: 372 },
    alpy: { xMin: 410, xMax: 410, yMin: 455, yMax: 455 },
    karpaty: { xMin: 535, xMax: 535, yMin: 391, yMax: 391 },
    apeniny: { xMin: 437, xMax: 437, yMin: 504, yMax: 504 },
    dynarskie: { xMin: 481, xMax: 481, yMin: 491, yMax: 491 },
    bałkany: { xMin: 513, xMax: 513, yMin: 510, yMax: 510 },
    pindos: { xMin: 529, xMax: 529, yMin: 554, yMax: 554 }
};

const locations3 = {
    św_mikołaja_lapońska: { xMin: 547, xMax: 547, yMin: 53, yMax: 53 },
    północnoszwedzka: { xMin: 489, xMax: 489, yMin: 136, yMax: 136 },
    kastylijska: { xMin: 209, xMax: 209, yMin: 507, yMax: 507 },
    masyw_centralny: { xMin: 325, xMax: 325, yMin: 445, yMax: 445 },
    bawarska: { xMin: 436, xMax: 436, yMin: 401, yMax: 401 },
    podlaska: { xMin: 554, xMax: 554, yMin: 347, yMax: 347 },
    wołyńska: { xMin: 581, xMax: 581, yMin: 375, yMax: 375 },
    czesko_morawska: { xMin: 470, xMax: 470, yMin: 398, yMax: 398 },
    transylwańska: { xMin: 573, xMax: 573, yMin: 444, yMax: 444 },
};

let locations = {}

function chooseLocations(type) {
    if (type === "niziny") {
        locations = locations1;
    } else if (type === "gory") {
        locations = locations2;
    } else if (type === "wyzyny") {
        locations = locations3;
    }
    remainingLocations = Object.keys(locations);
    dotsContainer.innerHTML = ""; 
    addDots();
    setNewTarget();
}

const message = document.getElementById('message');
const dotsContainer = document.getElementById('dots-container');


let remainingLocations = Object.keys(locations);
let currentTarget = null;

function setNewTarget() {
    if (remainingLocations.length === 0) {
        message.textContent = "Znaleziono wszystkie";
        return;
    }
    const randomIndex = Math.floor(Math.random() * remainingLocations.length);
    currentTarget = remainingLocations[randomIndex];
    message.textContent = `Znajdź ${currentTarget.charAt(0).toUpperCase() + currentTarget.slice(1)}`;
}


function addDots() {
    const mapElement = document.getElementById('map');
    const mapWidth = mapElement.clientWidth;
    const mapHeight = mapElement.clientHeight;

    
    const originalWidth = 967; 
    const originalHeight = 659; 

    for (const [city, area] of Object.entries(locations)) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.id = city;

        
        const centerX = (area.xMin / originalWidth) * mapWidth;
        const centerY = (area.yMin / originalHeight) * mapHeight;

        dot.style.left = `${centerX}px`;
        dot.style.top = `${centerY}px`;

        dot.addEventListener('click', () => handleDotClick(city, dot));

        dotsContainer.appendChild(dot);
    }
}


function handleDotClick(city, dotElement) {
    if (city === currentTarget) {
        message.textContent = `Brawo`;
        message.style.color = "green";

        
        dotElement.style.backgroundColor = "green";

        
        remainingLocations = remainingLocations.filter(location => location !== currentTarget);
        setTimeout(() => {
            message.style.color = "white";
            setNewTarget();
        }, 300); 
    } else {
        message.textContent = "Źle";
        message.style.color = "red";
    }
}


addDots();
setNewTarget();