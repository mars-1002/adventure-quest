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

var enemyData1, enemyData2, enemyData3, enemyData4, enemyData5, enemyData6, enemyUpdater;

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

  renderPlayerTurn(event)
  renderEnemyTurn()
}
function renderPlayerTurn(event){
  enemyActiveCheck(enemySelected) //console.log for seleceted enemy
  updatePlayerTurn(event) // update HTML "combat-text"
}

function renderEnemyTurn(){
  setTimeout(() => updateEnemyTurn(), 2000) // update HTML "combat-text"
  setTimeout(() => updateCombatText(), 4000) //restart to "your turn"

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
  getEnemyData() // assigns game.enemies to enemyData variables
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
    if(!game.enemies == "") {
      enemy.forEach(enemy => {
        // console.log(game.enemies[i] + " at i=" + i)
        if(enemy.name == game.enemies[0]) {
          enemyData1 = enemy
          console.log("0")
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
}

function updatePlayerTurn(event) {
  if(event.srcElement.id == "attack"){ //updateCombatText
    combatText.textContent = `You attacked ${enemySelected.name}!`
    attackMove(player[0], enemySelected)
    updateEnemyHealth()
  } else if (event.srcElement.id == "heal") {
    combatText.textContent = "you chose heal!"
    healMove(player[0])
  } else if (event.srcElement.id == "fireball") {
    combatText.textContent = `You casted a fireball on ${enemySelected.name}!`
    mAttackMove(player[0], enemySelected)
    updateEnemyHealth()
  }

}

function enemyActiveCheck(enemy) { //check if tile selected is still occupied, if not, deselect
  // console.log(enemy) 
}


function updateEnemyTurn() { // currently takes in the length of active enemies
  //change func to only account for 1 enemy turn
  //add in logic for hp checks

  for(let i=0; i<enemyIcon.length; i++) { //move for into a sep func for each enemy
    if(!game.enemies[i] == "") {
      var enemyTurn = Math.floor(Math.random() * 2)
      if(enemyTurn == 0) {
        combatText.textContent = `${game.enemies[i]} chose attack!`
        console.log(`${game.enemies[i]} chose attack!`)
        if(i == 0){
          attackMove(enemyData1,player[0])
        } else if(i == 1) {
          attackMove(enemyData2, player[0])
        } else if(i == 2) {
          attackMove(enemyData3, player[0])
        } else if(i == 3) {
          attackMove(enemyData4, player[0])
        } else if(i == 4) {
          attackMove(enemyData5, player[0])
        } else if(i == 5) {
          attackMove(enemyData6, player[0])
        }
      }
      else if(enemyTurn == 1) {
        combatText.textContent = `${game.enemies[i]} chose fireball!`
        console.log(`${game.enemies[i]} chose fireball!`)
        if(i == 0){
          mAttackMove(enemyData1,player[0])
        } else if(i == 1) {
          mAttackMove(enemyData2, player[0])
        } else if(i == 2) {
          mAttackMove(enemyData3, player[0])
        } else if(i == 3) {
          mAttackMove(enemyData4, player[0])
        } else if(i == 4) {
          mAttackMove(enemyData5, player[0])
        } else if(i == 5) {
          mAttackMove(enemyData6, player[0])
        }
      }
      else {
        combatText.textContent = `${game.enemies[i]} chose heal!`
        console.log(`${game.enemies[i]} chose heal!`)
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
    enemySelected = event.target.innerText // add enemy ID to enemySelected temp
    let id = parseInt(event.target.id.charAt(5))-1
    console.log(id)
    if(id == 0) { //assigns enemySelected to current enemy
      enemySelected = enemyData1
      enemyUpdater = "enemy1"
    }else if(id == 1) {
      enemySelected = enemyData2
      enemyUpdater = "enemy2"
    }else if(id == 2) {
      enemySelected = enemyData3
      enemyUpdater = "enemy3"
    }else if(id == 3) {
      enemySelected = enemyData4
      enemyUpdater = "enemy4"
    }else if(id == 4) {
      enemySelected = enemyData5
      enemyUpdater = "enemy5"
    }else if(id == 5) {
      enemySelected = enemyData6 
      enemyUpdater = "enemy6"
    }
    console.log(enemySelected)
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
  console.log(`${target.name}'s HP went from ${target.health} to ${target.health-actor.attack}`)
  target.health -= actor.attack
  console.log(target.health)
}

function mAttackMove(actor, target) {
  console.log(`${actor.name} attacked ${target.name} for ${actor.magicAttack} magic damage!`)
  console.log(`${target.name}'s HP went from ${target.health} to ${target.health-actor.magicAttack}`)
  target.health -= actor.magicAttack
  console.log(target.health)
}

function healMove(actor) {
  console.log(`${actor.name} healed for ${actor.magicAttack} health!`)
}

function updateEnemyHealth() {
  if(enemyUpdater == 1){
  enemyData1 = enemySelected
  } else if(enemyUpdater == 2) {
    enemyData2 = enemySelected
  } else if(enemyUpdater == 3) {
    enemyData3 = enemySelected
  } else if(enemyUpdater == 4) {
    enemyData4 = enemySelected
  } else if(enemyUpdater == 5) {
    enemyData5 = enemySelected
  } else if(enemyUpdater == 6) {
    enemyData6 = enemySelected
  }
}

function gameStart() { //when pressing start button on title screen
  clearedStages = 0;
  game = new Stage(stage[clearedStages])
  init();
}

init(); //remove later to turn gamestart into action btn