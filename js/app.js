/*------- Constants -------*/
//winning condition is to clear all 3 stages
const winCondition = true;
var game;

/*------- Variables (state) -------*/
//dynamic variables to account for player stats, enemies imported as well as stage and whether win con is met
import player from "./playerData.js"
import enemy from "./enemyData.js"
import stage from "./stageData.js";
var clearedStages = 0, turn;



/*------- Cached Element References -------*/
//cached elements for menus
//cached elements for header section
const settingEl = document.getElementById("settings")
const soundEl = document.getElementById("sound")

//cached elements for action section
const playerIcon = document.getElementById("player-icon")
const enemyIcon = [...document.getElementsByClassName("enemy")]
const combatText = document.getElementById("combat-text")
const playerMoves = [...document.getElementsByClassName("player-moves")]


console.log(enemyIcon[0].textContent)
/*------- Classes -------*/
class Stage {
  constructor(stage) {
    this.stageLevel = stage.level
    this.enemies = stage.enemy
    this.background = stage.background
    this.playerMoves = [...document.getElementsByClassName("player-moves")]
  }
}

// console.log(new Stage(stage[2]))
/*------- Event Listeners -------*/
//main menu


//header
settingEl.addEventListener('click', ping)
soundEl.addEventListener('click', ping)

//action
// attackEl.addEventListener('click', ping)
// fireballEl.addEventListener('click', ping)
// healEl.addEventListener('click', ping)
playerMoves.forEach(click => click.addEventListener('click', handleClick))
//turn updatePlayerTurn into a handleClick to run logic
/*------- Functions -------*/
function handleClick(event) {
  updatePlayerTurn(event)
}
function ping(evt) {
  console.log(evt.target.id)
  console.log(game)
  return evt.target.id
}

function init() { //init game
  clearedStages = 0;
  game = new Stage(stage[clearedStages])
  turn = 1;
  render();
}
function render() {
  updateCombatText();
  updateActionScene();
}

function updatePlayerTurn(event) {
  console.log(event)
  if(event.srcElement.id == "attack"){ //updateCombatText
    combatText.textContent = "you chose attack!"
  } else if (event.srcElement.id == "heal") {
    combatText.textContent = "you chose heal!"
  } else if (event.srcElement.id == "fireball") {
    combatText.textContent = "you chose fireball!"
  }
}

function updateActionScene() {
  playerIcon.textContent = player[0].name
  enemyIcon.forEach(enemy => enemy.textContent = "enemy") //add func to class to assign individual enemy id
  console.log(game)

}

function updateCombatText() {
  if(turn = 1) {
    combatText.textContent = "Your turn!"
  } 
}

function gameStart() { //when pressing start button on title screen
  clearedStages = 0;
  game = new Stage(stage[clearedStages])
  init();
}

init(); //remove later to turn gamestart into action btn