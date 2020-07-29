
export const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];

export const operations = ['/', 'x', '-', '+'];

function keyIsValid (formula, key) {
    if (numbers.includes (key))
    return true;
    if (operations.includes (key))
    return true;
    return false
} 

function executeCalculation (formula) {
    let result = 0;

    const operators = {
        '+': (x, y) => x + y,
        '-': (x, y) => x - y,
        '/': (x, y) => x / y,
        'x': (x, y) => x * y
    };
    let numberEntered = ""
    let currentOperation = '+';
    for (const keypress of formula) {
        const currentNumber = parseFloat(numberEntered);
        if  (numbers.includes(keypress) || (numberEntered === "" && keypress === "-")) {
            numberEntered += keypress;
        } 
        else if (operations.includes(keypress) && !isNaN(currentNumber)) {
            result = operators[currentOperation](result, currentNumber);
            numberEntered = "";
            currentOperation = keypress;
        } 
    }
    const currentNumber = parseFloat(numberEntered);
    if ( !isNaN(currentNumber)) {
        result = operators[currentOperation](result, currentNumber);
    } 
    return result;
}

// The action creators are here: 
const KEYPRESS = "KEYPRESS";
const CLEAR = "CLEAR";
const EQUAL = "EQUAL";

export const actionCreators = {

    keyPressed (key) {
        return {
            type: KEYPRESS, 
            key
        }
    }, 
    reset () {
        return {
            type: CLEAR
        }
    },
    equal () {
        return {
            type: EQUAL
        }
    },
}
// Define initial state

const initialState = {
    formulaEntered: [],
    currentValue: 0
};

// The reducer here: 

export const calculatorReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR:
          return initialState;
        
        case KEYPRESS:
           if(keyIsValid(state.formulaEntered, action.key)) {
               return {
                   formulaEntered: [...state.formulaEntered, action.key],
                   currentValue: action.key
               }
           } else return state;
        case EQUAL:
            const currentCalculatedResult = executeCalculation(state.formulaEntered);
            return {
                formulaEntered: currentCalculatedResult.toString().split(""),
                currentValue: currentCalculatedResult.toString()
            }   
        default: 

        return state;
            
    }
}

// creating redux store below
