let selecting = false;
let carts = [];
function identifyGame(g) {
    for (let i = 4; i < game.length; i++) {
        if (g == game[i][2]) {
            console.log("Game identified as " + game[i][0]);
            return i;
        };
    };
};
function displayCarts() {
    document.getElementById("carts").remove();
    const cartridges = document.createElement("div");
    cartridges.id = "carts";
    const addCart = document.createElement("img");
    addCart.src = "../c/00.png";
    addCart.alt = "[+]";
    addCart.id = "addCart";
    addCart.title = "Add new Game";
    addCart.setAttribute("onclick", "newCart()");
    cartridges.appendChild(addCart);
    for (let i = carts.length-1; i > -1; i--) {
        const newCart = document.createElement("img");
        const ID = identifyGame(carts[i]);
        newCart.src = "../c/"+game[ID][2]+".png";
        newCart.alt = game[ID][0];
        newCart.className = "cart";
        newCart.title = "Pokémon " + game[ID][0];
        newCart.setAttribute("onclick", "removeCart(\""+game[ID][2]+"\")");
        cartridges.appendChild(newCart);
    };
    document.querySelector(".carts").appendChild(cartridges);
    carts.length > 0 ? document.getElementById("scan").style.display = "block" : document.getElementById("scan").style.display = "none";
    console.log("Cartridge Display Updated");
};
function removeCart(g) {
    if (!selecting) {
        const index = carts.indexOf(g);
        if (index != -1) {
            carts.splice(index, 1);
            displayCarts();
        };
    };
};
function addCart(g) {
    if (selecting) {
        const index = carts.indexOf(g);
        if (index == -1) {
            carts[carts.length] = g;
            displayCarts();
        };
        document.getElementById("cardselect").style.display = "none";
        selecting = false;
    }
};
function newCart() {
    if (!selecting) {
        selecting = true;
        document.getElementById("scan").style.display = "none";
        document.getElementById("cards").remove();
        const gen = carts.length > 0 ? game[identifyGame(carts[0])][3] : 5;
        const cartridges = document.createElement("div");
        cartridges.id = "cards";
        for (let i = game.length-1; i > 3; i--) {
            if (gen >= game[i][3]) {
                if (carts.indexOf(game[i][2]) == -1) {
                    const cartridge = document.createElement("img");
                    cartridge.src = "../c/"+game[i][2]+".png";
                    cartridge.alt = game[i][0];
                    cartridge.title = "Pokémon " + game[i][0];
                    cartridge.setAttribute("onclick", "addCart(\""+game[i][2]+"\")");
                    cartridges.appendChild(cartridge);
                };
            };
        };
        document.getElementById("cardselect").appendChild(cartridges);
        document.getElementById("cardselect").style.display = "block";
    } else {
        document.getElementById("cardselect").style.display = "none";
        selecting = false;
        displayCarts();
    };
};
function scanPokedex() {
    document.getElementById("scan").style.display = "none";
    document.getElementById("addCart").remove();
    const cards = document.querySelectorAll(".cart");
    for (let i = 0; i < cards.length; i++) {
        cards[i].removeAttribute("onclick");
    };
    let gameList = [];
    for (let i = 0; i < carts.length; i++) {
        gameList[i] = identifyGame(carts[i]);
    };
    const generation = game[gameList[0]][3];
    let i = 0;
    let count = 0;
    let gameCount = [];
    for (let z = 0; z < gameList.length; z++) {
        gameCount[z] = 0;
    };
    let pokemon = [];
    let pokedex = [];
    let poketrue = [];
    for (let gen = 0; gen < generation; gen++) {
        for (let pkmn = 0; pkmn < pkdx[gen].length; pkmn++) {
            pokemon[i] = pkdx[gen][pkmn].name;
            for (let g = 0; g < gameList.length; g++) {
                if (pkdx[gen][pkmn].game[gameList[g]]) {
                    pokedex[i] = game[gameList[g]][2];
                    poketrue[i] = true;
                    gameCount[g]++;
                    count++;
                    break;
                } else {
                    pokedex[i] = "00";
                    poketrue[i] = false;
                };
            };
            i++;
        };
    };
    console.log(i);
    console.log(count);
    console.log(gameCount);
    console.log(pokemon);
    console.log(pokedex);
    console.log(poketrue);
    document.getElementById("logo").src = "../l/" + game[gameList[0]][2] + ".png";
    let combined = 0;
    for (let z = 0; z < gameList.length; z++) {
        combined += gameCount[z];
    };
    document.getElementById("caught").style.flex = Math.floor(((combined / (game[gameList[0]][5] - game[gameList[0]][6])) * 100)*10)/10 + "%";
    document.getElementById("uncaught").style.flex = Math.floor((100 - ((combined / (game[gameList[0]][5] - game[gameList[0]][6]))) * 100)*10)/10 + "%";
    document.getElementById("complete-text").innerHTML = Math.floor(((combined / (game[gameList[0]][5] - game[gameList[0]][6])) * 100)*10)/10 + "% Completed<br>(" + combined + "/" + (game[gameList[0]][5] - game[gameList[0]][6]) + ")";
    const advCompletion = document.getElementById("advanced-completion");
    const statistic = document.getElementById("statistic");
    let percentages = [];
    let string = "";
    for (let z = 0; z < gameList.length; z++) {
        percentages[z] = Math.floor(((gameCount[z] / (game[gameList[0]][5] - game[gameList[0]][6])) * 100)*10)/10 + "%";
        const comp = document.createElement("div");
        comp.style.flex = percentages[z];
        comp.style.backgroundImage = "var(--" + game[gameList[z]][2] + "-image)";
        advCompletion.appendChild(comp);
        string += game[gameList[z]][0] + " contributes to:<br>" + gameCount[z] + "/" + (game[gameList[0]][5] - game[gameList[0]][6]) + " (" + percentages[z] + ")<br><br>";
    };
    const comp = document.createElement("div");
    comp.style.flex = Math.floor((100 - ((combined / (game[gameList[0]][5] - game[gameList[0]][6]))) * 100)*10)/10 + "%";
    comp.style.backgroundImage = "var(--00-image)";
    advCompletion.appendChild(comp);
    string += "Pokédex is currently missing:<br>" + ((game[gameList[0]][5] - game[gameList[0]][6]) - combined) + "/" + (game[gameList[0]][5] - game[gameList[0]][6]) + " (" + Math.floor((100 - ((combined / (game[gameList[0]][5] - game[gameList[0]][6]))) * 100)*10)/10 + "%)";
    statistic.innerHTML = string;
    const dex = document.getElementById("pokedex");
    for (let d = 1; d < game[gameList[0]][5]; d++) {
        const poke = document.createElement("img");
        poke.src = "../b/" + d + ".png";
        poke.className = "pokes";
        pokedex[d-1] != "00" ? poke.title = pokemon[d-1] + " can be caught in " + game[identifyGame(pokedex[d-1])][0] : poke.title = pokemon[d-1] + " cannot be caught";
        poke.style.backgroundImage = "var(--" + pokedex[d-1] + "-image)";
        dex.appendChild(poke);
    };
    document.querySelector(".container").style.display = "block";
};