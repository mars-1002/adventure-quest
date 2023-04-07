/*------- Constants -------*/
//winning condition is to clear all 3 stages
const winCondition = true;
var game;

/*------- Variables (state) -------*/
//dynamic variables to account for player stats, enemies imported as well as stage and whether win con is met
import player from "./playerData.js"
import enemy from "./enemyData.js"
import stage from "./stageData.js";
var clearedStages, turn, enemySelected = 0, cooldown = 1;

var enemyData1, enemyData2, enemyData3, enemyData4, enemyData5, enemyData6, enemyUpdater;

var enemyStillActive;

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
const playerHealthStatus = document.getElementById("health-status")
const playerManaStatus = document.getElementById("mana-status")
console.log(playerHealthStatus.innerText)


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

  flipCooldown() // makes unable to switch "enemySelected"
  setTimeout(() => flipCooldown(), 4000) //reallows "enemySelected"
  renderGameActions(event)
}

function renderPlayerHealth() {
  playerHealthStatus.innerText = `HP: ${player[0].health}`
}
function renderPlayerMana() {
  playerManaStatus.innerText = `MP: ${player[0].mana}`
}
function renderGameActions(event) {
  renderPlayerTurn(event)
  renderEnemyTurn()
  setTimeout(() => renderEndOfCombat(), 4000)
}
function renderPlayerTurn(event){
  updatePlayerTurn(event) // update HTML "combat-text"
  enemyActiveCheck(enemySelected) //removes selection if enemy is dead
  renderPlayerMana()
}

function renderEnemyTurn(){
  enemiesStillAlive()
  setTimeout(() => updateEnemyTurn(), 2000) // update HTML "combat-text"
  setTimeout(() => updateCombatText(), 4000) //restart to "your turn"

}

function renderEndOfCombat() {
  regenMana(player[0])
  console.log("end of turn has been reached")
  renderPlayerHealth()
  renderPlayerMana()
}

function renderBoard() {
  for(let i=0; i<enemy.length-1; i++) {
    if(game.enemies[i] == "") {
      enemyIcon[i].textContent = "empty"
    }else enemyIcon[i].textContent = game.enemies[i]
  }
  getEnemyData() // assigns game.enemies to enemyData variables
  renderPlayerHealth()
  renderPlayerMana()
}

function renderAction() {
  updateCombatText();
  updateActionScene();
}

function gameCleared() {
  combatText.textContent = "All Enemies defeated!"
}

function ping(evt) { //remove later
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
        if(enemy.name == game.enemies[0]) {
          enemyData1 = enemy
        }
        else if(enemy.name == game.enemies[1]){
          enemyData2 = enemy
        }
        else if(enemy.name == game.enemies[2]){
          enemyData3 = enemy
        }
        else if(enemy.name == game.enemies[3]){
          enemyData4 = enemy
        }
        else if(enemy.name == game.enemies[4]){
          enemyData5 = enemy
        }
        else if(enemy.name == game.enemies[5]){
          enemyData6 = enemy
        }
      })
    }
}

function enemiesStillAlive() {
  enemyStillActive = 0
  for(let i=0; i<enemyIcon.length; i++) { //move for into a sep func for each enemy
    let compare;
    if(i == 0) compare = enemyData1
    else if (i == 1) compare = enemyData2
    else if (i == 2) compare = enemyData3
    else if (i == 3) compare = enemyData4
    else if (i == 4) compare = enemyData5
    else if (i == 5) compare = enemyData6
    if(!(compare == undefined)){
      if(compare.health>0) enemyStillActive++
    }
  }
}

function updatePlayerTurn(event) {
  if(event.srcElement.id == "attack"){ //updateCombatText
    combatText.textContent = `You attacked ${enemySelected.name}!`
    attackMove(player[0], enemySelected)
    updateEnemyHealth()
  } else if (event.srcElement.id == "heal") {
    if(player[0].mana >= 20)combatText.textContent = "you chose heal!"
    else combatText.textContent = `You tried to cast a heal spell, but didn't have enough mana!`
    healMove(player[0])
    renderPlayerHealth()
  } else if (event.srcElement.id == "fireball") {
    if(player[0].mana >= 20)combatText.textContent = `You casted a fireball on ${enemySelected.name}!`
    else combatText.textContent = `You tried to cast fireball, but didn't have enough mana!`
    mAttackMove(player[0], enemySelected)
    updateEnemyHealth()
  }

}

function enemyActiveCheck(enemy) { //check if tile selected is still occupied, if not, deselect
  if(enemy.health <= 0) {
    for(let i=0; i<enemyIcon.length; i++) { // remove previous selection
    enemyIcon[i].classList.remove("enemy-selected")
    }
    if(enemyUpdater == "enemy1") {
      enemyIcon[0].classList.add("dead")
    } else if(enemyUpdater == "enemy2") {
      enemyIcon[1].classList.add("dead")
    } else if(enemyUpdater == "enemy3") {
      enemyIcon[2].classList.add("dead")
    } else if(enemyUpdater == "enemy4") {
      enemyIcon[3].classList.add("dead")
    } else if(enemyUpdater == "enemy5") {
      enemyIcon[4].classList.add("dead")
    } else if(enemyUpdater == "enemy6") {
      enemyIcon[5].classList.add("dead")
    }

  }
}


function updateEnemyTurn() {
  if(enemyStillActive > 0){
    combatText.textContent = `Enemies turn!`
    for(let i=0; i<enemyIcon.length; i++) {
      if(!game.enemies[i] == "") {
        var enemyTurn = Math.floor(Math.random() * 2)
        if(enemyTurn == 0) {
          if(i == 0 && enemyData1.health > 0){
            if(enemyStillActive == 1) combatText.textContent = `${game.enemies[i]} chose attack!`
            console.log(`${game.enemies[i]} chose attack!`)
            attackMove(enemyData1,player[0])
            regenMana(enemyData1)
          } else if(i == 1 && enemyData2.health > 0) {
            if(enemyStillActive == 1) combatText.textContent = `${game.enemies[i]} chose attack!`
            console.log(`${game.enemies[i]} chose attack!`)
            attackMove(enemyData2, player[0])
            regenMana(enemyData2)
          } else if(i == 2 && enemyData3.health > 0) {
            if(enemyStillActive == 1) combatText.textContent = `${game.enemies[i]} chose attack!`
            console.log(`${game.enemies[i]} chose attack!`)
            attackMove(enemyData3, player[0])
            regenMana(enemyData3)
          } else if(i == 3 && enemyData4.health > 0) {
            if(enemyStillActive == 1) combatText.textContent = `${game.enemies[i]} chose attack!`
            console.log(`${game.enemies[i]} chose attack!`)
            attackMove(enemyData4, player[0])
            regenMana(enemyData4)
          } else if(i == 4 && enemyData5.health > 0) {
            if(enemyStillActive == 1) combatText.textContent = `${game.enemies[i]} chose attack!`
            console.log(`${game.enemies[i]} chose attack!`)
            attackMove(enemyData5, player[0])
            regenMana(enemyData5)
          } else if(i == 5 && enemyData6.health > 0) {
            if(enemyStillActive == 1) combatText.textContent = `${game.enemies[i]} chose attack!`
            console.log(`${game.enemies[i]} chose attack!`)
            attackMove(enemyData6, player[0])
            regenMana(enemyData6)
          }
        }
        else if(enemyTurn == 1) {
          if(i == 0 && enemyData1.health > 0){
            if(enemyStillActive == 1) combatText.textContent = `${game.enemies[i]} chose fireball!`
            console.log(`${game.enemies[i]} chose fireball!`)
            mAttackMove(enemyData1,player[0])
            regenMana(enemyData1)
          } else if(i == 1 && enemyData2.health > 0) {
            if(enemyStillActive == 1) combatText.textContent = `${game.enemies[i]} chose fireball!`
            console.log(`${game.enemies[i]} chose fireball!`)
            mAttackMove(enemyData2, player[0])
            regenMana(enemyData2)
          } else if(i == 2 && enemyData3.health > 0) {
            if(enemyStillActive == 1) combatText.textContent = `${game.enemies[i]} chose fireball!`
            console.log(`${game.enemies[i]} chose fireball!`)
            mAttackMove(enemyData3, player[0])
            regenMana(enemyData3)
          } else if(i == 3 && enemyData4.health > 0) {
            if(enemyStillActive == 1) combatText.textContent = `${game.enemies[i]} chose fireball!`
            console.log(`${game.enemies[i]} chose fireball!`)
            mAttackMove(enemyData4, player[0])
            regenMana(enemyData4)
          } else if(i == 4 && enemyData5.health > 0) {
            if(enemyStillActive == 1) combatText.textContent = `${game.enemies[i]} chose fireball!`
            console.log(`${game.enemies[i]} chose fireball!`)
            mAttackMove(enemyData5, player[0])
            regenMana(enemyData5)
          } else if(i == 5 && enemyData6.health > 0) {
            if(enemyStillActive == 1) combatText.textContent = `${game.enemies[i]} chose fireball!`
            console.log(`${game.enemies[i]} chose fireball!`)
            mAttackMove(enemyData6, player[0])
            regenMana(enemyData6)
          }
        }
      }
    }
  } else {
    console.log("No more active enemies!")
    gameCleared()
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
}

function mAttackMove(actor, target) {
  if(actor.mana >= 20) {
    console.log(`${actor.name} attacked ${target.name} for ${actor.magicAttack} magic damage!`)
    console.log(`${target.name}'s HP went from ${target.health} to ${target.health-actor.magicAttack}`)
    target.health -= actor.magicAttack
    actor.mana -= 20
  }else {
    console.log(`${actor.name} doesnt have enough mana to cast fireball!`)
  }
}

function healMove(actor) {
  if(actor.mana >= 20) {
    console.log(`${actor.name} healed for ${actor.magicAttack} health! and now has ${actor.health + actor.magicAttack}`)
    actor.health += actor.magicAttack
    actor.mana -= 20
  }else {
    console.log(`${actor.name} doesnt have enough mana to cast fireball!`)
  }
}

function regenMana(actor) {
  actor.mana += 10
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
  game = new Stage(stage[clearedStages])
  init();
}

function init() { //init game
  clearedStages = 2; //remove later once gameStart works
  game = new Stage(stage[clearedStages])
  turn = 1;
  renderBoard();
  renderAction();
}

init(); //remove later to turn gamestart into action btn