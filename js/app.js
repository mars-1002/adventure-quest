/*------- Constants -------*/
//winning condition is to clear all 3 stages
const winCondition = true;
var game;

/*------- Variables (state) -------*/
//dynamic variables to account for player stats, enemies imported as well as stage and whether win con is met
import player from "./playerData.js"
import enemy from "./enemyData.js"
import stage from "./stageData.js";
var clearedStages = 0, turn, enemySelected = 0, cooldown = 1;

var enemyData1, enemyData2, enemyData3, enemyData4, enemyData5, enemyData6;

/*------- Cached Element References -------*/
//general cached
const screenEl = document.getElementById("main") 
//cached elements for menus

//cached elements for header section
const settingEl = document.getElementById("settings")
const soundEl = document.getElementById("sound")

//cached elements for action section
const playerIcon = document.getElementById("player-icon")
const enemyIcon = [...document.getElementsByClassName("enemy")]
const combatText = document.getElementById("combat-text")
const playerMoves = [...document.getElementsByClassName("player-moves")]


/*------- Classes -------*/
class Stage {
  constructor(stage) {
    this.stageLevel = stage.level
    this.enemies = stage.enemy
    this.background = stage.background
    this.playerMoves = [...document.getElementsByClassName("player-moves")]
  }
}

/*------- Event Listeners -------*/
//general 
// screenEl.addEventListener('click', ping)

//main menu


//header
settingEl.addEventListener('click', ping)
soundEl.addEventListener('click', ping)

//action
playerMoves.forEach(click => click.addEventListener('click', handleClick))
enemyIcon.forEach(click => click.addEventListener('click', enemySelector))
//turn updatePlayerTurn into a handleClick to run logic

/*------- Functions -------*/
function handleClick(event) {
  if(!enemySelected) return // conditional to check if an enemy is selected
  if(!levelClear) return gameCleared()//condition to see if all enemies are cleared
  //fix gameCleared and levelClear once enemies are in

  flipCooldown() // makes unable to switch "enemySelected"
  setTimeout(() => flipCooldown(), 4000) //reallows "enemySelected"
  getEnemyData()
  enemyActiveCheck(enemyData1)
  updatePlayerTurn(event) // update HTML "combat-text"
  setTimeout(() => updateEnemyTurn(), 2000) // update HTML "combat-text"
  setTimeout(() => updateCombatText(), 4000) //restart to "your turn"
}
function renderPlayerTurn(){

}

function renderEnemyTurn(){

}

function gameCleared() {
  combatText.textContent = "You cleared the game!"
}

function ping(evt) {
  console.log(evt.target.id)
  console.log(game)
  return evt.target.id
}

function flipCooldown() {
  cooldown = cooldown * -1;
  if(cooldown == -1) { // greys out player actions to make UI more understandable
    playerMoves.forEach(move => move.classList.add("player-moves-disable"))
  }
  else playerMoves.forEach(move => move.classList.remove("player-moves-disable")) // whites in player action btns
}

function init() { //init game
  clearedStages = 1; //remove later once gameStart works
  game = new Stage(stage[clearedStages])
  turn = 1;
  renderBoard();
  renderAction();
}

function renderBoard() {
  for(let i=0; i<enemy.length-1; i++) {
    if(game.enemies[i] == "") {
      enemyIcon[i].textContent = "empty"
    }else enemyIcon[i].textContent = game.enemies[i]
  }
}
function renderAction() {
  updateCombatText();
  updateActionScene();
}

function levelClear() {
  for(let i=0; i<enemy.length-1; i++) {
    if(!game.enemies[i] == "") {
      return true
    }else return false
  }
}

function getEnemyData() {
  // game.enemies.forEach(enemy => console.log(enemy))
  // for(let i=0; i<enemyIcon.length; i++) {
    if(!game.enemies == "") {
      enemy.forEach(enemy => {
        // console.log(game.enemies[i] + " at i=" + i)
        if(enemy.name == game.enemies[0]) {
          console.log("0")
          enemyData1 = enemy
          console.log(enemyData1)
        }
        else if(enemy.name == game.enemies[1]){
          enemyData2 = enemy
          console.log("1")
          console.log(enemyData2)
        }
        else if(enemy.name == game.enemies[2]){
          enemyData3 = enemy
          console.log("2")
          console.log(enemyData3)
        }
        else if(enemy.name == game.enemies[3]){
          enemyData4 = enemy
          console.log("3")
          console.log(enemyData4)
        }
        else if(enemy.name == game.enemies[4]){
          enemyData5 = enemy
          console.log("4")
          console.log(enemyData5)
        }
        else if(enemy.name == game.enemies[5]){
          enemyData6 = enemy
          console.log("5")
          console.log(enemyData6)
        }
      })
    }
  // }
}

function updatePlayerTurn(event) {
  if(event.srcElement.id == "attack"){ //updateCombatText
    combatText.textContent = "you chose attack!"
    // attackMove(player[0], enemyData)
  } else if (event.srcElement.id == "heal") {
    combatText.textContent = "you chose heal!"
    healMove(player[0])
  } else if (event.srcElement.id == "fireball") {
    combatText.textContent = "you chose fireball!"
    // mAttackMove(player[0], enemyData)
  }

}

function enemyActiveCheck(enemy) {
  console.log(enemy)
}


function updateEnemyTurn() { // currently takes in the length of active enemies
  //change func to only account for 1 enemy turn
  //add in logic for hp checks

  for(let i=0; i<enemyIcon.length; i++) { //move into a sep func
    if(!game.enemies[i] == "") {
      var enemyTurn = Math.floor(Math.random() * 3)
      if(enemyTurn == 0) {
        combatText.textContent = `${game.enemies[i]} chose attack!`
        // attackMove(enemyData, player[0])
      }
      else if(enemyTurn == 1) {
        combatText.textContent = `${game.enemies[i]} chose fireball!`
        // mAttackMove(enemyData, player[0])
      }
      else {
        combatText.textContent = `${game.enemies[i]} chose heal!`
        // healMove(enemyData)
      }
    }
  }
}

function enemySelector(event) { //selects/deselects enemy
  if(cooldown == 1){
    if(enemyTileActive(event.target.id.charAt(5))) return // conditional check if enemyTile is active
    for(let i=0; i<enemyIcon.length; i++) { // remove previous selection
      enemyIcon[i].classList.remove("enemy-selected")
    }
    event.target.classList.add("enemy-selected") // add visual indicator
    enemySelected = event.target.id // add enemy ID to enemySelected
}
}

function enemyTileActive(enemyNum) {
  if(enemyIcon[enemyNum-1].textContent == "empty") return true
  else return false
}

function updateActionScene() {
  playerIcon.textContent = player[0].name
  // enemyIcon.forEach(enemy => enemy.textContent = "enemy") //add func to class to assign individual enemy id
  console.log(game)

}

function updateCombatText() {
  if(turn = 1) {
    combatText.textContent = "Your turn!"
  } 
}

function attackMove(actor, target) {
  console.log(`${actor.name} attacked ${target.name} for ${actor.attack} damage!`)
}

function mAttackMove(actor, target) {
  console.log(`${actor.name} attacked ${target.name} for ${actor.magicAttack} magic damage!`)
}

function healMove(actor) {
  console.log(`${actor.name} healed for ${actor.magicAttack} health!`)
}

function gameStart() { //when pressing start button on title screen
  clearedStages = 0;
  game = new Stage(stage[clearedStages])
  init();
}

init(); //remove later to turn gamestart into action btn