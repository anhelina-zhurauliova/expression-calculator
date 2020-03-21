function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr.split("+").join(" + ")
        .split("-").join(" - ")
        .split("*").join(" * ")
        .split("/").join(" / ")
        .split("(").join(" ( ")
        .split(")").join(" ) ")
        .split(" ").filter(e => e.length > 0);

    const prioritiesOfSigns = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2.
    }

    let numbers = [];
    let signs = [];

    function calculation() {
        let lastSign = signs.pop();
        let lastNumber = +numbers.pop();
        let previousNumber = +numbers.pop();
        let res;

        if (lastSign === '*') {
            res = previousNumber * lastNumber;
        }
        if (lastSign === '/') {
            if (lastNumber == 0) {
                throw new Error("TypeError: Division by zero.");
            }
            else {
                res = previousNumber / lastNumber;
            }
        }
        if (lastSign === '+') {
            res = previousNumber + lastNumber;
        }
        if (lastSign === '-') {
            res = previousNumber - lastNumber;
        }
        numbers.push(res)
    }


    let closed = expr.filter(item => item == ')');
    let opened = expr.filter(item => item == '(')
    if (opened.length === closed.length) {
        expr.forEach(el => {
            if (!isNaN(el)) {
                numbers.push(el)
            }
            else if (el === '(') {
                signs.push(el);
            }
            else if (prioritiesOfSigns[el] > prioritiesOfSigns[signs[signs.length - 1]]) {
                signs.push(el)
            }
            else if (signs.length === 0) {
                signs.push(el)
            }
            else if (el == ')') {
                while (signs[signs.length - 1] !== '(') {
                    calculation()
                }
                signs.pop();
            }
            else {
                while (prioritiesOfSigns[el] <= prioritiesOfSigns[signs[signs.length - 1]]) {
                    calculation()
                }
                signs.push(el);
            }
        });
        while (signs.length > 0) {
            calculation()
        }
    }

    else {
        throw new Error("ExpressionError: Brackets must be paired");
    }
    return numbers.pop();


}


module.exports = {
    expressionCalculator
}