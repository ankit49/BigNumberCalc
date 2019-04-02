class OperatorStack {
    constructor(){
        this.items = []
    }

    push(element){
        this.items.push(element)
    }

    pop(element) {
        return this.items.length == 0 ? "" : this.items.pop()
    }

    peek(){
        return this.items[this.items.length - 1];
    }

    isEmpty(){
        return this.items.length == 0;
    }
}

class OperandStack {
    constructor(){
        this.items = []
    }

    push(element){
        this.items.push(element)
    }

    pop(element) {
        return this.items.length == 0 ? "0" : this.items.pop()
    }

    peek(){
        return this.items[this.items.length - 1];
    }

    isEmpty(){
        return this.items.length == 0;
    }
}

let operatorStack = new OperatorStack()
let operandStack = new OperandStack()

function calcExpression(expression) {
    let i = 0 , currentInteger = ''

    while(i<expression.length){
        if(expression.charAt(i) >= '0' && expression.charAt(i) <= '9' || expression.charAt(i) == '.'){
            currentInteger = expression.charAt(i) + ''
            i++
            while (i != expression.length && (expression.charAt(i) >= '0' && expression.charAt(i) <= '9' || expression.charAt(i) == '.')) {
                currentInteger = currentInteger + expression.charAt(i);
                i++;
            }
            operandStack.push(currentInteger)
        }else{
            if (expression.charAt(i) == ')'){
                while(operatorStack.peek() != '('){
                    performOperation(operandStack,operatorStack)
                }
                operatorStack.pop()
            }else {
                let currentOperator = expression.charAt(i)
                let lastOperator = operatorStack.isEmpty() ? null : operatorStack.peek()
                
                if (lastOperator != null && checkPrecedence(currentOperator, lastOperator)) {
                    performOperation(operandStack, operatorStack);
                }
                operatorStack.push(expression.charAt(i));
            }
            i++
        }
    }

    while (!operatorStack.isEmpty()) {
        performOperation(operandStack, operatorStack);
    }
    let finalResult =  operandStack.pop();
    return Number(finalResult).toString()
}

function performOperation(operandStack, operatorStack){
    let value1 = operandStack.pop();
    let value2 = operandStack.pop();
    let operator = operatorStack.pop();

    let intermediateResult = arithmeticOperation(value1, value2, operator);
    operandStack.push(intermediateResult)
}

function checkPrecedence(operator1, operator2){
    precedenceList = ['(',')','/','*','+','-']
    if(operator2 == '(') return false
    if (precedenceList.indexOf(operator1) > precedenceList.indexOf(operator2)) {
        return true;
    } else {
        return false;
    }
}

function arithmeticOperation(value1, value2, operator){
    let result 
    console.log(value2 , value1)
    switch(operator){
        case '+': result = adder(String(value2) , String(value1))
            break
        case '-': result = subtractor(String(value2) , String(value1))
            break
        case '*': result = Number(value2) * Number(value1)
            break
        case '/': result = Number(value2) / Number(value1)
            break
        default: result = Number(value2) + Number(value1)
    }
    return result
}
