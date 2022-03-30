"use strict";

let operandOne = "";
let operandTwo = "";
let operator = "";

const numbersBtns = document.querySelectorAll("[data-number]");
const operatorsBtns = document.querySelectorAll("[data-operator]");
const equalBtn = document.querySelector("[data-equal]");
const lowerScreen = document.querySelector("#screenLower");
const upperScreen = document.querySelector("#screenUpper");

console.log(equalBtn);

/* math operations */
const add = function (...args) {
  return args.reduce((total, val) => total + val);
};

const subtract = function (...args) {
  let n = args[0];
  for (let i = 1; i < args.length; i++) {
    n -= args[i];
  }

  return n;
};

const multiply = function (...args) {
  return args.reduce((total, val) => total * val);
};

const divide = function (...args) {
  let n = args[0];
  for (let i = 1; i < args.length; i++) {
    if (i !== 0 && args[i] === 0) {
      alert("Cant divide by 0");
      return (n = 0);
    }
    n /= args[i];
  }

  return n;
};

/* get operands and operator */

const getOperands = function (e) {
  if (!operandOne && operator) {
    operandOne = "0";
    upperScreen.textContent = "0";
  }
  if (!operator) {
    operandOne += e.target.getAttribute("data-number");
    lowerScreen.textContent = `${operandOne}`;
  } else {
    operandTwo += e.target.getAttribute("data-number");
    lowerScreen.textContent = `${operandTwo}`;
  }
};

const getOperator = function (e) {
  operator = e.target.getAttribute("data-operator");
  upperScreen.textContent = `${operandOne} ${operator}`;
  lowerScreen.textContent = "";
};

numbersBtns.forEach((btn) => {
  btn.addEventListener("click", getOperands);
});

operatorsBtns.forEach((btn) => {
  btn.addEventListener("click", getOperator);
});

// const operands = function (operandOne, operator, operandTwo) {
//   let result;
//   if (operator === "+") result = add(operandOne, operandTwo);
//   if (operator === "-") result = subtract(operandOne, operandTwo);
//   if (operator === "*") result = multiply(operandOne, operandTwo);
//   if (result === "/") result = divide(operandOne, operandTwo);

//   return result;
// };

// /* get operands and operator values */

// const getOperands = function (e) {
//   let val = e.target.textContent;

//   console.log(val);

//   if ((!isNaN(val) && operator === "") || (val === "." && operandTwo === "")) {
//     if (!operandOne.includes(".") && val === ".") {
//       operandOne += ".";
//     } else operandOne += String(val);
//   }
//   if (isNaN(val) && val !== "=" && val !== "." && val !== "") operator = val;
//   if (!isNaN(val) && operator !== "") {
//     if (!operandTwo.includes(".") && val === ".") operandTwo += ".";
//     operandTwo += String(val);
//   }

//   console.log(operandOne);
//   console.log(operator);
//   console.log(operandTwo);
// };

// buttons.forEach((button) => {
//   button.addEventListener("click", getOperands);
// });
