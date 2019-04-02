// variables declaration
let sum = [] , carry = 0

function adder(num1,num2) {
        sum = []
        carry = 0
        num1 = num1.split('.')
        num2 = num2.split('.')
        adderDecimal(num1[1] ? num1[1] : '0', num2[1] ? num2[1] : '0')
        adderInt(num1[0].length == 0 ? '0' : num1[0] , num2[0].length == 0 ? '0' :num2[0])
            if(carry >0){
                sum.push(carry)
            }
    return sum.reverse().join('')
    // return sum
}

function adderDecimal(num1,num2) {
    if(num1 == 0 && num2 == 0) {
        sum.push(num1)
    }else {
        if(num1.length >= 1 || num2.length >= 1){
            if(num1.length < num2.length){
                num1 = num1 + num2
                num2 = num1.substring(0,num1.length - num2.length)
                num1 = num1.substring(num2.length)
            }
            num1 = num1.split('')
            num2 = num2.split('')
            let tempSum = num1.splice(num2.length , num1.length)
            sum.push(tempSum.join(''))
            adderInt(num1.join(''), num2.join(''))
        }
    }
    sum.push('.')
}

function adderInt(num1, num2) {
    //swap numbers if num2 is bigger
    if(num1.length < num2.length){
        num1 = num1 + num2
        num2 = num1.substring(0,num1.length - num2.length)
        num1 = num1.substring(num2.length)
    }
    // reverse both string and convert in array
    num1 = num1.split('').reverse()
    num2 = num2.split('').reverse()

    //loop for addition
    for(let count = 0; count < num2.length; count++){
        let tempSum = Number(num1[count]) + Number(num2[count]) + carry
        sum.push(tempSum % 10)
        carry = Math.floor(tempSum / 10)
    }
    for(let count = num2.length; count < num1.length; count++){
        if(carry > 0){
            let temp = Number(num1[count]) + carry
            sum.push(temp % 10)
            carry = Math.floor(temp / 10)
        }else{
            sum.push(num1[count])
        }
    }
    return sum    
}


// console.log(adder(adder("54.00", "95"),adder("52", "999")))
// console.log(adder('149.00', "1"))