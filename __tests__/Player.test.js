//when requiring modules it is not necessary to include the .js file extension because
    //Node will assume that the file is a JS file if no extension is specified
//imports the Potion() constructor into the test, establishing Potion as a usable variable.
const Potion = require('../lib/Potion');
//mocks or replaces the constructor's implementation with our faked data
jest.mock('../lib/Potion');

console.log(new Potion());

const Player = require('../lib/Player');

test('creates a player object', () => {
    const player = new Player('Dave');
  
    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));

    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
      );
  });