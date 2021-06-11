// function Potion(name) {
//     this.name = name;
  
//     if (this.name === 'health') {
//       this.value = Math.floor(Math.random() * 10 + 30);
//     } else {
//       this.value = Math.floor(Math.random() * 5 + 7);
//     }
//   }
  
// function Potion(name) {
//     this.types = ['strength', 'agility', 'health'];
//classes are often called syntactic sugar because 
  //they are still constructor functions under the hood and use the same prototypal inheritance
  //they must be called with the new keyword
  //they are not hoisting which means
    //fuction declarations being put into memory before your code has executed
class Potion {
  //the constructor method is necessary here because it intended to receive arguments
  constructor(name) {
    this.types = ['strength', 'agility', 'health'];
    this.name = name || this.types[Math.floor(Math.random() * this.types.length)];
  
    if (this.name === 'health') {
      this.value = Math.floor(Math.random() * 10 + 30);
    } else {
      this.value = Math.floor(Math.random() * 5 + 7);
    }
  }
}
  
  module.exports = Potion;