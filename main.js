window.addEventListener('keypress', (e) => {
  switch (e.keyCode) {
    case 48:
      return populateDisplay(0);
    case 49:
      return populateDisplay(1);
    case 50:
      return populateDisplay(2);
    case 51:
      return populateDisplay(3);
    case 52:
      return populateDisplay(4);
    case 53:
      return populateDisplay(5);
    case 54:
      return populateDisplay(6);
    case 55:
      return populateDisplay(7);
    case 56:
      return populateDisplay(8);
    case 57:
      return populateDisplay(9);
    case 46:
      return populateDisplay('.');
    case 13:
      return equals();
    case 43:
      return setOperator('+');
    case 45:
      return setOperator('-');
    case 42:
      return setOperator('*');
    case 47:
      return setOperator('/');
  }
});

window.addEventListener('keydown', (e) => {
  switch (e.keyCode) {
    case 8:
      return backspace();
    case 27:
      return clear();
  }
});

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

const decimalPoint_btn = document.querySelector('.decimalPoint');
decimalPoint_btn.addEventListener('click', () => populateDisplay('.'));

const equals_btn = document.querySelector('.equals');
equals_btn.addEventListener('click', () => {
  equals();
  toggleBtn();
});

const clear_btn = document.querySelector('.clear');
clear_btn.addEventListener('click', () => {
  clear();
  toggleBtn();
});

const backspace_btn = document.querySelector('.backspace');
backspace_btn.addEventListener('click', () => backspace());

const add_btn = document.querySelector('.add');
add_btn.addEventListener('click', () => {
  setOperator('+');
  toggleBtn(add_btn);
});

const substract_btn = document.querySelector('.substract');
substract_btn.addEventListener('click', () => {
  setOperator('-');
  toggleBtn(substract_btn);
});

const multiply_btn = document.querySelector('.multiply');
multiply_btn.addEventListener('click', () => {
  setOperator('*');
  toggleBtn(multiply_btn);
});

const divide_btn = document.querySelector('.divide');
divide_btn.addEventListener('click', () => {
  setOperator('/');
  toggleBtn(divide_btn);
});

let operator = '';
let operand1 = undefined;
let operand2 = undefined;

function toggleBtn(btn) {
  divide_btn.classList.remove('button-active');
  multiply_btn.classList.remove('button-active');
  add_btn.classList.remove('button-active');
  substract_btn.classList.remove('button-active');

  if (btn === undefined) {
    return;
  }

  btn.classList.add('button-active');
}

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

function backspace() {
  display_span.textContent = display_span.textContent.slice(
    0,
    display_span.textContent.length - 1
  );

  if (display_span.textContent === '') {
    display_span.textContent = '0';
  }

  if (operator === '') {
    operand1 = Number(display_span.textContent);
  } else {
    operand2 = Number(display_span.textContent);
  }
}

function round(num) {
  return Math.round((num + Number.EPSILON) * 1000000) / 1000000;
}

function equals() {
  if (operand1 !== undefined && operand2 !== undefined) {
    display_span.textContent = operate(operator, operand1, operand2);

    if (display_span.textContent.length > 11) {
      display_span.textContent = 'ERROR';
    }
  }

  if (display_span.textContent === 'NaN') {
    display_span.textContent = 'ERROR';
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

/*
function numberWithoutCommas(num) {
  return num.replace("'", '');
}

function numberWithCommas(num) {
  numTemp = numberWithoutCommas(num);

  if (numTemp.length > 3 && numTemp.length < 7) {
    return numTemp.slice(0, 3) + "'" + numTemp.slice(3);
  } else if (numTemp.length > 6) {
    return (
      numTemp.slice(0, 3) + "'" + numTemp.slice(3, 6) + "'" + numTemp.slice(6)
    );
  } else {
    return numTemp;
  }
}
*/

function populateDisplay(num) {
  if (num === '.' && display_span.textContent.includes('.')) {
    return;
  }
  /*
  if (display_span.textContent === '0' && num === '.') {
    display_span.textContent = '0.';
  }
*/
  if (display_span.textContent === 'ERROR') {
    display_span.textContent = '';
  }

  if (
    operand1 === undefined &&
    operand2 === undefined &&
    operator === '' &&
    num !== '.'
  ) {
    display_span.textContent = '';
  }

  if (operator === '') {
    if (display_span.textContent.length === 11) {
      return;
    }

    if (display_span.textContent === '0' && num !== '.') {
      display_span.textContent = '';
    }

    display_span.textContent += num;
    operand1 = Number(display_span.textContent);
  } else if (operator !== '' && operand2 === undefined) {
    if (display_span.textContent === '0' && num !== '.') {
      display_span.textContent = '';
    }

    display_span.textContent = '';
    display_span.textContent += num;
    operand2 = Number(display_span.textContent);
  } else {
    if (display_span.textContent === '0' && num !== '.') {
      display_span.textContent = '';
    }

    if (display_span.textContent.length === 11) {
      return;
    }

    display_span.textContent += num;
    operand2 = Number(display_span.textContent);
  }
}

function setOperator(operation) {
  if (operand1 !== undefined && operand2 !== undefined && operator !== '') {
    display_span.textContent = operate(operator, operand1, operand2);

    if (display_span.textContent.length > 11) {
      display_span.textContent = 'ERROR';
    }

    operand1 = Number(display_span.textContent);
    operand2 = undefined;

    if (display_span.textContent === 'NaN') {
      display_span.textContent = 'ERROR';
    }
  } else {
    operand1 = Number(display_span.textContent);
  }

  operator = operation;
}

function clear() {
  display_span.textContent = '0';
  setOperator('');
  operand1 = undefined;
  operand2 = undefined;
}
