let V = "none";
let VI = "none"

const header = document.getElementById("header");
const left = document.getElementById("genV");
const right = document.getElementById("genVI");
const search = document.getElementById("begin-search");

const list = document.getElementById("loaded-pokes");

function loadV(x) {
    V = x;
    left.style.backgroundImage = "url('./i/"+V+".png')";
    isSelected();
}
function loadVI(x) {
    VI = x;
    right.style.backgroundImage = "url('./i/"+VI+".png')";
    isSelected();
}
function isSelected() {
    if (V !== "none" && VI !== "none") {
        search.style.display = "block";
    }
}
function loadSearch() {
    search.style.display = "none";
    header.style.display = "none";

    for (let gen = 0; gen < 7; gen++) {
        for (let pokemon = 0; pokemon < pkdx[gen].length; pokemon++) {
            fetchPokemon(gen, pokemon);
        }
    }
}
function fetchPokemon(gen, pokemon) {
    if (VI == "X1") {
        if (pkdx[gen][pokemon].X1 == true) {
            console.log(pkdx[gen][pokemon].name + " can be caught in " + VI);
            return;
        }
    } else if (VI == "Y1") {
        if (pkdx[gen][pokemon].Y1 == true) {
            console.log(pkdx[gen][pokemon].name + " can be caught in " + VI);
            return;
        }
    } else if (VI == "OR") {
        if (pkdx[gen][pokemon].OR == true) {
            console.log(pkdx[gen][pokemon].name + " can be caught in " + VI);
            return;
        }
    } else if (VI == "AS") {
        if (pkdx[gen][pokemon].AS == true) {
            console.log(pkdx[gen][pokemon].name + " can be caught in " + VI);
            return;
        }
    }

    if (V == "B1") {
        if (pkdx[gen][pokemon].B1 == true) {
            console.log(pkdx[gen][pokemon].name + " can be caught in " + V);
            displayPokemon(pkdx[gen][pokemon].name);
            return;
        }
    } else if (V == "W1") {
        if (pkdx[gen][pokemon].W1 == true) {
            console.log(pkdx[gen][pokemon].name + " can be caught in " + V);
            displayPokemon(pkdx[gen][pokemon].name);
            return;
        }
    } else if (V == "B2") {
        if (pkdx[gen][pokemon].B2 == true) {
            console.log(pkdx[gen][pokemon].name + " can be caught in " + V);
            displayPokemon(pkdx[gen][pokemon].name);
            return;
        }
    } else if (V == "W2") {
        if (pkdx[gen][pokemon].W2 == true) {
            console.log(pkdx[gen][pokemon].name + " can be caught in " + V);
            displayPokemon(pkdx[gen][pokemon].name);
            return;
        }
    }
}
function displayPokemon(name) {
    let image = document.createElement("img");
    image.className = "pokemon";
    image.src = "./a/V/"+name+".png"
    list.appendChild(image);
}