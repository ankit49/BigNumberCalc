document.getElementById('enter').addEventListener('click' ,() => {
    let expression = document.getElementById('exp').value
    let result = calcExpression(String(expression))

    let resultEl = document.createElement('p')
    resultEl.textContent = result
    document.getElementById('result').appendChild(resultEl)
})

document.getElementById('clean').addEventListener('click',() => {
    document.getElementById('result').innerHTML = ''
})