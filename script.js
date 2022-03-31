"use strict";

let operandOne = "";
let operandTwo = "";
let operator = "";
let symbol;

const numbersBtns = document.querySelectorAll("[data-number]");
const operatorsBtns = document.querySelectorAll("[data-operator]");
const equalBtn = document.querySelector("[data-equal]");
const deleteBtn = document.querySelector("#deleteBtn");
const clearBtn = document.querySelector("#clearBtn");
const lowerScreen = document.querySelector("#screenLower");
const upperScreen = document.querySelector("#screenUpper");

/* math operations */
const add = function (a, b) {
  return Number(a) + Number(b);
};

const subtract = function (a, b) {
  return Number(a) - Number(b);
};

const multiply = function (a, b) {
  return Number(a) * Number(b);
};

const divide = function (a, b) {
  return Math.round((Number(a) / Number(b)) * (100000 * 100000)) / (100000 * 100000);
};

const setSymbol = function () {
  symbol = operator;
  if (operator === "*") symbol = "&#xd7;";
  if (operator === "/") symbol = "&#xf7;";
};

/* get operands and operator */
const getOperands = function (e) {
  setSymbol();

  if (!operator) {
    if (operandOne == "0") {
      operandOne = e.target.getAttribute("data-number");
      lowerScreen.textContent = `${operandOne}`;
    } else {
      operandOne += e.target.getAttribute("data-number");
      lowerScreen.textContent = `${operandOne}`;
    }
  } else {
    if (operandTwo == "0") {
      operandTwo = e.target.getAttribute("data-number");
      lowerScreen.textContent = `${operandTwo}`;
    } else {
      operandTwo += e.target.getAttribute("data-number");
      upperScreen.innerHTML = `${operandOne} ${symbol}`;
      lowerScreen.textContent = `${operandTwo}`;
    }
  }
};

const getOperator = function (e) {
  if (operandOne && operandTwo && operator) {
    getResult();
    upperScreen.innerHTML = `${operandOne} ${symbol} `;
    lowerScreen.textContent = `${result}`;
  }

  operator = e.target.getAttribute("data-operator");
  setSymbol();
  upperScreen.innerHTML = `${operandOne} ${symbol}`;

  if (!operandOne) {
    operandOne = "0";
    upperScreen.innerHTML = `${operandOne} ${symbol}`;
  }
};

/* clear button resets everything, delete button deletes last digit */

const clearAll = function () {
  operandOne = "";
  operandTwo = "";
  operator = "";
  lowerScreen.textContent = "";
  upperScreen.textContent = "";
};

const deleteLast = function () {
  let temp;
  if (!operandTwo && !operator) {
    temp = String(operandOne).slice(0, operandOne.length - 1);
    operandOne = temp;
    lowerScreen.textContent = operandOne;
  }

  if (operandOne && operator) {
    temp = String(operandTwo).slice(0, operandTwo.length - 1);
    operandTwo = temp;
    lowerScreen.textContent = operandTwo;
  }
};

/* does math computation depening on operator and displays result
&#xf7; -> division sign | &#xd7; -> multiplication sign */

const displayResult = function () {
  lowerScreen.textContent = `${operandOne}`;
  operandTwo = "";
  operator = "";
};

const getResult = function () {
  if (!operandOne || !operandTwo || !operator) {
    return;
  }

  switch (operator) {
    case "+":
      operandOne = add(operandOne, operandTwo);
      upperScreen.textContent = `${operandOne} ${operator} ${operandTwo} =`;
      displayResult();
      break;
    case "-":
      operandOne = subtract(operandOne, operandTwo);
      upperScreen.textContent = `${operandOne} ${operator} ${operandTwo} =`;
      displayResult();
      break;
    case "/":
      if (operandTwo == "0") {
        alert("disivion by 0");
        operandTwo = "";
        break;
      }
      operandOne = divide(operandOne, operandTwo);
      upperScreen.innerHTML = `${operandOne} &#xf7; ${operandTwo} =`;
      displayResult();
      break;
    case "*":
      operandOne = multiply(operandOne, operandTwo);
      upperScreen.innerHTML = `${operandOne} &#xd7; ${operandTwo} =`;
      displayResult();
      break;
  }
};

numbersBtns.forEach((btn) => {
  btn.addEventListener("click", getOperands);
});

operatorsBtns.forEach((btn) => {
  btn.addEventListener("click", getOperator);
});

equalBtn.addEventListener("click", getResult);
deleteBtn.addEventListener("click", deleteLast);
clearBtn.addEventListener("click", clearAll);
