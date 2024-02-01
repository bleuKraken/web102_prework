/*****************************************************************************
 // * Challenge 2: Review the provided code. The provided code includes:
 // * -> Statements that import data from games.js
 // * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 // * Challenge 3: Add data about each game as a card to the games-container
 // * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// * local images
const imageFrostHaven = "/assets/frosthaven.png";
const imageCubeMonster = "/assets/cube_monster.png";

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // * Step 1
  // * loop through each item and create card with template
  for (const game of games) {
    // * Step 2
    // New basic card element
    const singleGame = document.createElement("div");
    singleGame.classList.add("game-card");

    // * Step 3
    // Template literal to set the inner HTML
    singleGame.innerHTML = `
        <img src="${game.img}" alt="${game.name}" class="game-img">
        <h3>${game.name}</h3>
        <p>${game.description}</p>
        <p>Backers: ${game.backers}</p>
      `;

    // Append the card to the games container
    const gamesContainer = document.getElementById("games-container");
    gamesContainer.appendChild(singleGame);
  }

  // * code: 1 + seafoam + GAMES_JSON
  // * Key: 11seafoamGAMES_JSON
}

// Call the function with the correct variable
addGamesToPage(GAMES_JSON);

// later, we'll call this function using a different list of games

/*************************************************************************************
 * * Challenge 4: Create the summary statistics at the top of the page displaying the
 * * total number of contributions, amount donated, and number of games on the site.
 * * Skills used: arrow functions, reduce, template literals
 * 
 * * REDUCE function: Reduce collapses a list into a single value
 * * - reduce takes two arguments: a CALLBACK and the INITIAL VALUE.
 * 
 * * KEY
 * * 19187 + 800268 + BRAIN 
 * * 19187800268BRAIN

 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// * ADDED
// Calculate total contributions (backers)
// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce(
  (accumulator, game) => accumulator + game.backers,
  0
);

// * ADDED
// set the inner HTML using a template literal and toLocaleString to get a number with commas
// Update contributions card
contributionsCard.textContent = totalContributions.toLocaleString();

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// * ADDED
// Calculate total amount pledged
const totalPledged = GAMES_JSON.reduce(
  (accumulator, game) => accumulator + game.pledged,
  0
);

// * ADDED
// Update raised card
// set inner HTML using template literal
raisedCard.textContent = `$${totalPledged.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

// * ADDED
// Display total number of games
gamesCard.textContent = GAMES_JSON.length;
/*************************************************************************************
 * * Challenge 5: Add functions to filter the funded and unfunded games
 * * total number of contributions, amount donated, and number of games on the site.
 * * Skills used: functions, filter
 */

// * 7 + 4 + FLANNEL + click +

// * 74FLANNELclick

// ! Step 1
// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // * ADDED
  // use filter() to get a list of games that have not yet met their goal
  const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);

  // * ADDED
  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(unfundedGames);
  console.log("unfiltered: " + unfundedGames);
}

// ! step 2
// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // * added
  // use filter() to get a list of games that have met or exceeded their goal
  const fundedOnly = GAMES_JSON.filter((game) => game.pledged > game.goal);

  // * ADDED
  // use the function we previously created to add unfunded games to the DOM
  addGamesToPage(fundedOnly);
  console.log("Funded only: " + fundedOnly);
}

// ! step 3
// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // * ADDED
  // add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);
}

// ! step 4
// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
// * ADDED
// Add event listener to the unfunded button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 ** Challenge 6: Add more information at the top of the page about the company.
 ** Skills used: template literals, ternary operator

 ** toLocaleString + div + 1 + ivy

 ** toLocaleString<div>1ivy

 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// * ADDED
// ! Might be wrong
// * figure out how to sum using reduce or filter
// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(
  (game) => game.pledged < game.goal
).length;

console.log("Number of Unfunded Games:", unfundedGamesCount);

// * ADDED
// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `Money raised is ${MONEY_RAISED} for ${GAME_COUNT}. Currently, ${INT_GAMES_LEFT} game remains unfunded. We need your help to fund these amazing games!`;

const displayStr2 = `Money raised is ${MONEY_RAISED} for ${GAME_COUNT}. Currently, ${INT_GAMES_LEFT} games remain unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * *  Challenge 7: Select & display the top 2 games
 * * Skills used: spread operator, destructuring, template literals, sort
 * 
 * * + + CEDAR
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// Array of sorted games
const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

console.log("Sorted games:" + sortedGames);

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...restOfGames] = sortedGames;

console.log("First Game:" + firstGame);
console.log("Second Game:" + secondGame);

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topFundedGameName = sortedGames[0].name;
const firstGameElement = document.createElement('div');
firstGameElement.textContent = `Top Funded Game: ${topFundedGameName}`;
// appending
firstGameContainer.appendChild(firstGameElement);


// do the same for the runner up item
const secondFundedGameName = sortedGames[1].name;
const secondGameElement = document.createElement('div');
secondGameElement.textContent = `Second Most Funded Game: ${secondFundedGameName}`;
// appending
secondGameContainer.appendChild(secondGameElement);