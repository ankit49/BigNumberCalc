// NegativeResult to store boolean for (-)sign (for true result is negative)
let negativeResult = false, borrow = 0, result = [] 

function subtractor(num1,num2) {
    negativeResult =false
    result = []
    borrow = 0
    // split both numbers by decimal sign 
    num1 = num1.split('.')
    num2 = num2.split('.')
    // index [0] contain integer part and index[1] contains decimal part
    num1[0] = num1[0].length != 0 ? num1[0] : '0'
    num2[0] = num2[0].length != 0 ? num2[0] : '0'
    num1[1] = num1[1] != undefined ? num1[1] : '0'
    num2[1] = num2[1] != undefined ? num2[1] : '0'
    
    // check if number2 is bigger then number1
    // compare integer part of both numbers
    // if integer part of both numbers are equal then compare decimal part

    let swapResult = num1[0] === num2[0] ? isNum1Smaller(num1[1] , num2[1]) : isNum1Smaller(num1[0] , num2[0])

    // swap numbers if num2 is larger (THEY ARE NOW ARRAY) [integer , decimal]
    if(swapResult){
        negativeResult = true
        let temp = num1  
        num1 = num2 
        num2 = temp
    }
    // call substractorDeci Function to evaluate decimal part
    subtractorDeci(num1[1],num2[1]) 
    // call substractorInt Function to evaluate integer part
    subtractorInt(num1[0] , num2[0])

    // check negative result
    if(negativeResult){
        return '-' + result.reverse().join('')
    }else{
        return result.reverse().join('')
    }
}

function subtractorDeci(num1,num2){
    if(num1 == 0 && num2 == 0){
        result.push(num1)
    }else{
        num1 = num1.split('')
        num2 = num2.split('')
        let startLimit,endLimit,arr
        if(num1.length < num2.length){
            for(let count = num1.length ; count < num2.length ; count++){
                num1[count] = '0'
            }
        }
        for(let count = num1.length - 1 ; count >= num2.length ;count --){
            result.push(num1[count])
        }
        for(let count = num2.length -1 ; count >= 0 ; count--){
            let temp = Number(num1[count]) - Number(num2[count]) - borrow
            if(temp < 0){
                temp = temp + 10
                borrow = 1
            }else{
                borrow = 0
            }
            result.push(temp)
        }
    }
    result.push('.')
}

function subtractorInt(num1, num2) {
    //split and reverse both sttrings 
    num1 = num1.split('').reverse()
    num2 = num2.split('').reverse()

    // subtract num2 from num1 until the length of num2 
    // num1 is always bigger as we have already sorted
    for(let count = 0; count < num2.length; count++){
        let temp = num1[count] - num2[count] - borrow
        // check if temp is negative then add 10 to it and take a borrow 
        if(temp < 0){
            temp = temp + 10
            borrow = 1
        }else {
            borrow = 0     // if temp is positive then make sure to make borrow equl 0
        }
        result.push(temp)
    }

    // Subtrat remainging digits of number 1 
    for(let count = num2.length; count < num1.length ; count++){
        let temp = num1[count] - borrow
        // check if temp is negative then add 10 to it and take a borrow 
        if(temp < 0){
            temp = temp + 10
            borrow = 1
        }else {
            borrow = 0     // if temp is positive then make sure to make borrow equl 0
        }
        result.push(temp)
    }

}

function isNum1Smaller(num1,num2){
    if(num1.length > num2.length) return false
    if(num2.length > num1.length) return true   
    for(let count = 0 ; count < num1.length ;count ++){
        if(num1[count] > num2[count]) return false
        else if(num2[count] > num1[count]) return true
    }
}

// console.log(subtractor('.26484465874','8464'))
