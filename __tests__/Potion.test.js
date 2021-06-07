const Potion = require('../lib/Potion.js');

test('creates a health potion object', () => {
    //use the new keyword to create a new Potion object
    const potion = new Potion('health');
  
    //the expect.any() method takes a constructor as an argument
        //this general test allows us to avoid testing the random number generator hundreds of times to make sure that it works
    //name property equal to health
    expect(potion.name).toBe('health');
    //value property that is a number
    expect(potion.value).toEqual(expect.any(Number));
  });