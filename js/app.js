/*------- Constants -------*/
//winning condition is to clear all 3 stages
const winCondition = 3;
let game;

/*------- Variables (state) -------*/
//dynamic variables to account for player stats, enemies imported as well as stage and whether win con is met
import player from "./playerData.js"
import enemy from "./enemyData.js"
import stage from "./stageData.js";
var clearedStages, move;



/*------- Cached Element References -------*/
//cached elements for menus
//cached elements for header section
const settingEl = document.getElementById("settings")
const soundEl = document.getElementById("sound")

//cached elements for action section
const attackEl = document.getElementById("attack")
const fireballEl = document.getElementById("fireball")
const healEl = document.getElementById("heal")
// const playerMoves = [...document.getElementsByClassName("player-moves")]
// console.log(playerMoves)

/*------- Classes -------*/
class Stage {
  constructor(stage) {
    this.stageLevel = stage.level
    this.enemies = stage.enemy
    this.background = stage.background
    this.playerMoves = [...document.getElementsByClassName("player-moves")]
    // console.log(Stage)
    // this.playerMoves = [...]
  }
  play () {
    this.turn = 1;
    //console.log(Stage)
    // console.log(this.move)
  }
  turn () {
    this.newConsole = this.playerMoves.forEach(click => click.addEventListener('click', console.log(Stage)))
    this.move = this.playerMoves.forEach(click => click.addEventListener('click', ping))
  }
  pingClass(evt) {
    console.log(evt.target.id)
    return evt.target.id
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
// playerMoves.forEach(click => click.addEventListener('click', ping))
/*------- Functions -------*/

function ping(evt) {
  console.log(evt.target.id)
  return evt.target.id
}

function init() { //main title screen
  clearedStages = 0;
}

function gameStart() { //when pressing start button on title screen
  clearedStages = 0; //add to init once done
  game = new Stage(stage[clearedStages])
  game.turn();
}

gameStart();