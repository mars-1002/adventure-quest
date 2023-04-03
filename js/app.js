/*------- Constants -------*/
//winning condition is to clear all 3 stages
const winCondition = 3;

/*------- Variables (state) -------*/
//dynamic variables to account for player stats, enemies imported as well as stage and whether win con is met
import player from "./playerData.js"
import enemy from "./enemyData.js"
import stage from "./stageData.js";
var clearedStages;


/*------- Cached Element References -------*/
//cached elements for header section
const settingEl = document.getElementById("settings")
const soundEl = document.getElementById("sound")

//cached elements for action section
const attackEl = document.getElementById("attack")
const fireballEl = document.getElementById("fireball")
const healEl = document.getElementById("heal")

/*------- Classes -------*/
class Stage {
  constructor(stage) {
    this.stageLevel = stage.level
  }
}

/*------- Event Listeners -------*/
//header
settingEl.addEventListener('click', ping)
soundEl.addEventListener('click', ping)

//action
attackEl.addEventListener('click', ping)
fireballEl.addEventListener('click', ping)
healEl.addEventListener('click', ping)
/*------- Functions -------*/

function ping() {
  console.log("ping")
}