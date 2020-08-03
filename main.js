const display_span = document.querySelector('.display');

const digit1_btn = document.querySelector('.digit1');
digit1_btn.addEventListener('click', () => populateDisplay(1));

const digit2_btn = document.querySelector('.digit2');
digit2_btn.addEventListener('click', () => populateDisplay(2));

const digit3_btn = document.querySelector('.digit3');
digit3_btn.addEventListener('click', () => populateDisplay(3));

const digit4_btn = document.querySelector('.digit4');
digit4_btn.addEventListener('click', () => populateDisplay(4));

const digit5_btn = document.querySelector('.digit5');
digit5_btn.addEventListener('click', () => populateDisplay(5));

const digit6_btn = document.querySelector('.digit6');
digit6_btn.addEventListener('click', () => populateDisplay(6));

const digit7_btn = document.querySelector('.digit7');
digit7_btn.addEventListener('click', () => populateDisplay(7));

const digit8_btn = document.querySelector('.digit8');
digit8_btn.addEventListener('click', () => populateDisplay(8));

const digit9_btn = document.querySelector('.digit9');
digit9_btn.addEventListener('click', () => populateDisplay(9));

const digit0_btn = document.querySelector('.digit0');
digit0_btn.addEventListener('click', () => populateDisplay(0));

const equals_btn = document.querySelector('.equals');
equals_btn.addEventListener('click', () => equals());

const clear_btn = document.querySelector('.clear');
clear_btn.addEventListener('click', () => clear());

const add_btn = document.querySelector('.add');
add_btn.addEventListener('click', () => setOperator('+'));

const substract_btn = document.querySelector('.substract');
substract_btn.addEventListener('click', () => setOperator('-'));

const multiply_btn = document.querySelector('.multiply');
multiply_btn.addEventListener('click', () => setOperator('*'));

const divide_btn = document.querySelector('.divide');
divide_btn.addEventListener('click', () => setOperator('/'));

let operator = '';
let operand1 = undefined;
let operand2 = undefined;

function add(num1, num2) {
  return round(num1 + num2);
}

function substract(num1, num2) {
  return round(num1 - num2);
}

function multiply(num1, num2) {
  return round(num1 * num2);
}

function divide(num1, num2) {
  if (num2 === 0) {
    return 'ERROR';
  }

  return round(num1 / num2);
}

function round(num) {
  return Math.round((num + Number.EPSILON) * 1000) / 1000;
}

function equals() {
  if (operand1 !== undefined && operand2 !== undefined) {
    display_span.textContent = operate(operator, operand1, operand2);
  }

  operand1 = undefined;
  operand2 = undefined;
  operator = '';
}

function operate(operator, num1, num2) {
  switch (operator) {
    case '+':
      return add(num1, num2);
      break;
    case '-':
      return substract(num1, num2);
      break;
    case '*':
      return multiply(num1, num2);
      break;
    case '/':
      return divide(num1, num2);
      break;
  }
}

function populateDisplay(num) {
  if (operator === '') {
    display_span.textContent += num;
    operand1 = Number(display_span.textContent);
  } else if (operator !== '' && operand2 === undefined) {
    display_span.textContent = '';
    display_span.textContent += num;
    operand2 = Number(display_span.textContent);
  } else {
    display_span.textContent += num;
    operand2 = Number(display_span.textContent);
  }
}

function setOperator(operation) {
  if (operand1 !== undefined && operand2 !== undefined && operator !== '') {
    display_span.textContent = operate(operator, operand1, operand2);
    operand1 = Number(display_span.textContent);
    operand2 = undefined;
  } else {
    operand1 = Number(display_span.textContent);
  }

  operator = operation;
}

function clear() {
  display_span.textContent = '';
  setOperator('');
  operand1 = undefined;
  operand2 = undefined;
}
