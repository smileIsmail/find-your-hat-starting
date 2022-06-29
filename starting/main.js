const prompt = require('prompt-sync')();

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this._field = field;
        this._height = this._field.length;
        this._width = this._field[0].length;
        this._position = this.findPosition();
        this._currentPositionX = this._position[0];
        this._currentPositionY = this._position[1];
}

print() {
    const numOfRows = this._field.length;
    for (let i = 0; i<numOfRows; i++) {
        const row =this._field[i];
        const rowString = row.join('');
        console.log(rowString);
    }
}

findPosition() {
    for (let i=0; i<this._height; i++) {
        for (let j=0; j<this._width; j++) {
            if (this._field[i][j] === '*') {
                return [j, i];
            }
        }
    }
}

startGame() {
    this.print();
    let gameState = 'continue'
    //console.log(this._position)
    while (gameState === 'continue') {
        const nextMove = prompt('"wasd" to move. So... Which way? ');
        this.move(nextMove);
        gameState = this.checkingCollisions();
    }
    
}

move(nextMove) {
    switch (nextMove) {
        case 'w':
        case 'W':
            this.potentialNewY = this._currentPositionY -1;
            this.potentialNewX = this._currentPositionX
            break;
        case 's':
        case 'S':
            this.potentialNewY = this._currentPositionY +1;
            this.potentialNewX = this._currentPositionX
            break;
        case 'a':
        case 'A':
            this.potentialNewX = this._currentPositionX - 1;
            this.potentialNewY = this._currentPositionY
            break;
        case 'd':
        case 'D':
            this.potentialNewX = this._currentPositionX + 1;
            this.potentialNewY = this._currentPositionY
            break;
    }
}

checkingCollisions() {
  //console.log(this.potentialNewX, this.potentialNewY)
    let newPositionValue = this._field[this.potentialNewY][this.potentialNewX]
    if (newPositionValue === 'O') {
        return this.endGame('hole');
    } else if (newPositionValue === '^') {
        return this.endGame('win');
    } else if (!newPositionValue || this.potentialNewY < 0 || this.potentialNewX <0) {
        return this.endGame('outOfBounds')
    } else if (newPositionValue === '░' || newPositionValue === '*') {
        this.updateField();
        return 'continue'
    }
}

updateField() {
    this._field[this.potentialNewY][this.potentialNewX] = '*';
    this._currentPositionX = this.potentialNewX;
    this._currentPositionY = this.potentialNewY;
    return this.print();
}

endGame(reasonGameEnding) {
    switch (reasonGameEnding) {
        case 'hole':
            console.log('You fell in a whole and LOST!')
            return 'game ends'
        case 'win':
            console.log('You found your hat and WON!!!')
            return 'game ends'
        case 'outOfBounds':
            console.log('You stepped out of bounds and LOST!')
            return 'game ends'
    }
}

static generateField(height, width, percentage) {
    const size = height * width;
    const numberOfHoles = size*percentage;
    let holeHatStartLocations = new Array(size);
    for (let i=0; i<numberOfHoles; i++) {
        newLocationFinder(1);
    }
    newLocationFinder('Hat');
    newLocationFinder('Start');
    return createField();





    function createField() {
        let createdField = [];
        for (let i=0; i<height; i++) {
            let widthArray = [];
            for (let j=(i*width); j<(i*width+width); j++) {
                if (holeHatStartLocations[j] && holeHatStartLocations[j] != 'Hat' && holeHatStartLocations[j] != 'Start') {
                    widthArray.push('O');
                } else if (holeHatStartLocations[j] === 'Hat') widthArray.push('^');
                else if (holeHatStartLocations[j] === 'Start') widthArray.push('*');
                else widthArray.push('░');
            }
            createdField.push(widthArray);
        }
        return createdField;
    }



    function newLocationFinder(start_Hat_or_1) {
        let newLocation = false;
        while (!newLocation) {
            const testLocation = Math.floor(Math.random() * size + 1);
            if (!holeHatStartLocations[testLocation]) {
                newLocation = true;
                holeHatStartLocations[testLocation] = (start_Hat_or_1)
            }
        }
    }
}

}

const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);


const generatedField1 = Field.generateField(5,4,.30);

const gameWithGeneratedField1 = new Field(generatedField1)
//myField.startGame();
gameWithGeneratedField1.startGame();