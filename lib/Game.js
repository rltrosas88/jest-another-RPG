//the inquirer package provides user-friendly options for prompting a user on the command line.
//the user's answers are then returned in asynchronous callback functions
const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

//wont interface with potions directly
//will need to acces Player and Enemy for the game logic to work
function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
}

//the initializeGame method is where we'll set up the Enemy and Player objects
Game.prototype.initializeGame = function() {
    //the enemies array 
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));
    this.currentEnemy = this.enemies[0];

    inquirer
  .prompt({
    type: 'text',
    name: 'name',
    message: 'What is your name?'
  })
  // destructure name from the prompt object
  .then(({ name }) => {
    this.player = new Player(name);

    // test the object creation
    //console.log(this.currentEnemy, this.player);

    //this.startNewBattle() calls this.battle();
    this.startNewBattle();
  });
};

Game.prototype.startNewBattle = function() {
    if (this.player.agility > this.currentEnemy.agility) {
      this.isPlayerTurn = true;
    } else {
      this.isPlayerTurn = false;
    }
    //presents the stats in an easy-to-read table instead of a series of strings/
    console.log('Your stats are as follows:');
    console.table(this.player.getStats());

    console.log(this.currentEnemy.getDescription());

    //battle() method will be responsible for each individual turn in the round
    //the battle() method is the main event of the game that will run an indefinite number of times
    this.battle();
  };

  Game.prototype.battle = function() {
        //if Player turn 
        if (this.isPlayerTurn) {
            // player prompts will go here
            inquirer
                .prompt({
                    type: 'list',
                    message: 'What would you like to do?',
                    name: 'action',
                    choices: ['Attack', 'Use potion']
                })
                .then(({ action }) => {
                    //if using potion
                     if (action === 'Use potion') {
                        // follow-up prompt will go here
                        //if Player doesn't have any Potions
                        if (!this.player.getInventory()) {
                            console.log("You don't have any potions!");
                            return;
                          }
                          //display list of Potion objects to user
                          inquirer
                            .prompt({
                              type: 'list',
                              message: 'Which potion would you like to use?',
                              name: 'action',
                              //the map() method creates a new array based on the results of a callback function used in the original array
                              //adding 1 to index is because some users might not know arrays start at 0
                              choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                            })
                            .then(({ action }) => {
                                const potionDetails = action.split(': ');
                            
                                this.player.usePotion(potionDetails[0] - 1);
                                console.log(`You used a ${potionDetails[1]} potion.`);
                              });
                    //else subtrack health from the Enemy based on Player attack value
                    } else {
                        const damage = this.player.getAttackValue();
                        this.currentEnemy.reduceHealth(damage);
                
                        console.log(`You attacked the ${this.currentEnemy.name}`);
                        console.log(this.currentEnemy.getHealth());
                      }     
                });
        //if enemy turn:subtrackt health from the Player base on Enemy attack value
        } else {
            const damage = this.currentEnemy.getAttackValue();
            this.player.reduceHealth(damage);
    
            console.log(`You were attacked by the ${this.currentEnemy.name}`);
            console.log(this.player.getHealth());
        }
  };

module.exports = Game;