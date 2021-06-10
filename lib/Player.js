const Potion = require('../lib/Potion');

function Player(name = '') {
    this.name = name;
  
    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);
    this.inventory = [new Potion('health'), new Potion()];

    // returns an object with various player properties
    // this.getStats = function() {
    //   return {
    //     potions: this.inventory.length,
    //     health: this.health,
    //     strength: this.strength,
    //     agility: this.agility
    //   };
    // };

    // returns the inventory array or false if empty
    // this.getInventory = function() {
    //   if (this.inventory.length) {
    //     return this.inventory;
    //   }
    //   return false;
    // };
    
}

//when using prototype you are only creating the method once on the constructor itself
//new player objects inherit the method from the cconstrutor rather than having their own instances of that method
Player.prototype.getStats = function() {
  return {
    potions: this.inventory.length,
    health: this.health,
    strength: this.strength,
    agility: this.agility
  };
};

Player.prototype.getInventory = function() {
  if (this.inventory.length) {
    return this.inventory;
  }
  return false;
};
  
Player.prototype.getHealth = function() {
  return `${this.name}'s health is now ${this.health}!`;
};

Player.prototype.isAlive = function() {
  if (this.health === 0) {
    return false;
  }
  return true;
};

Player.prototype.reduceHealth = function(health) {
  this.health -= health;

  if (this.health < 0) {
    this.health = 0;
  }
};

Player.prototype.getAttackValue = function() {
  //min and max for making this function a little easier to maintain
  const min = this.strength - 5;
  const max = this.strength + 5;

  return Math.floor(Math.random() * (max - min) + min);
};

Player.prototype.addPotion = function(potion) {
  //.push() is an Array method that adds an item to the end of an array
  this.inventory.push(potion);
};

Player.prototype.usePotion = function(index) {
  //the .splice method removes items from an array and returns the removed ite(s) as a new array
    //the original inventory array has a single potion removed at the specified index value and put into a new "removed items" array
    //the potion at index [0] of this "removed items" array is saved in a potion variable
  const potion = this.getInventory().splice(index, 1)[0];

  switch (potion.name) {
    case 'agility':
      this.agility += potion.value;
      break;
    case 'health':
      this.health += potion.value;
      break;
    case 'strength':
      this.strength += potion.value;
      break;
  }
};
  module.exports = Player;