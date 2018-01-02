
//Create a custom object to contain calculator state variables
var appState = {
    primaryValue: null,
    secondValue: null,
    answerValue: null,
    isFunction: false,
    calcState: null,
        //1 = plus
        //2 = minus
        //3 = times
        //4 = divide
    isNeg: false,
    displayString: '0'
}
//feed the value into the updateDisplay() function
function numberButtonClicked(clickedNumber){
    //first check if current display is zero for determinig what to display
    //This seems a little brute force, I hope to cleverify later

//check if there is a value already
    if(appState.isFunction){
        appState.displayString = '0';
        appState.isFunction = false;
        appState.isNeg = appState.isNeg ? false : true;
    }

if(appState.displayString === '0')
{
    if(clickedNumber === '.'){
    appState.displayString += clickedNumber;
    updateDisplay()
    return;
    }
    else{
        appState.displayString = clickedNumber;
    }

}
else{
    appState.displayString += clickedNumber;
}

//not sure if this is the "best" way to do this, but I like the separation personally
updateDisplay();
}

//set the calcState variable and prepare for calculation
//if a function button is clicked the number value for the string must be stored
function functionButtonClicked(calcFunctionState){

    switch(calcFunctionState){
        case "clear":
            appState.displayString = "0";
            appState.primaryValue = null;
            appState.secondValue = null;
            appState.isNeg = false;
            appState.calcState = 0;
            appState.isFunction = null;
            updateDisplay(appState.displayString);
            break;

        case "sign":
            if(!appState.isNeg){
                appState.isNeg = true;
                appState.displayString = '-' + appState.displayString;
            }else{
                appState.isNeg = false;
                appState.displayString.substr(1);
            }
            updateDisplay();
            break;

        case "percent":
            var percentTemp = Number(appState.displayString);
            percentTemp *= .01;
            appState.displayString = percentTemp.toString();
            updateDisplay();
            break;
//for the arithmetic functions I need to parse the string into a firstNumber
//then I need to be ready to erase existing display as soon as next input is captured
        case "divide":
            calcState = 4;
            appState.isFunction = true;
            appState.primaryValue = Number(appState.displayString);
            break;

        case "multiply":
            calcState = 3;
            appState.isFunction = true;
            appState.primaryValue = Number(appState.displayString);
            break;

        case "minus":
            calcState = 2;
            appState.isFunction = true;
            appState.primaryValue = Number(appState.displayString);
            break;

        case "plus":
            calcState = 1;
            appState.isFunction = true;
            appState.primaryValue = Number(appState.displayString);
            break;

        default: break;

    }
}

//This function returns odd values depending on repeated presses of the equals button
//TODO - fix this haha
function calculateTotal(){

    switch(calcState){

        case 1: //Addition
        appState.secondValue = Number(appState.displayString);
        appState.primaryValue += appState.secondValue;
        appState.displayString = appState.primaryValue.toString();
        appState.isFunction = true;
        break;

        case 2: //Subtraction
        appState.secondValue = Number(appState.displayString);
        appState.primaryValue -= appState.secondValue;
        appState.displayString = appState.primaryValue.toString();
        appState.isFunction = true;
        break;

        case 3: //Multiply
        appState.secondValue = Number(appState.displayString);
        appState.primaryValue *= appState.secondValue;
        appState.displayString = appState.primaryValue.toString();
        appState.isFunction = true;
        break;

        case 4: // divide
        //TODO - catch divide by zero
        appState.secondValue = Number(appState.displayString);
        appState.primaryValue /= appState.secondValue;
        appState.displayString = appState.primaryValue.toString();
        appState.isFunction = true;
        break;

        default: return;
    }
    updateDisplay(appState.displayString);
    //calcState = 0;
}
//simply draws the desired number to the display div
function updateDisplay(){
//TODO - check string length and adjust accordingly
    document.getElementById('answerBox').innerHTML = appState.displayString;
}