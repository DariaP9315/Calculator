const calculatorInput = document.querySelector('.calculator__input');

const equal = document.getElementById('equal');
const arrow = document.getElementById('arrow');
const decimalBtn = document.getElementById('decimal');
const clean = document.getElementById('clean');
const plusMinusToggle = document.getElementById('negative');

const numButton = document.querySelectorAll('.number');
const signButton = document.querySelectorAll('.sign');

let memoryCurrentNum = 0;
let memoryNewNum = false;
let memoryPendingOperation = '';
let result;

const numPress = (number) => {
  if (memoryNewNum) {
    calculatorInput.value = number;
    memoryNewNum = false;
  } else {
    if (calculatorInput.value === '0') {
      calculatorInput.value = number;
    } else {
      calculatorInput.value += number;
    }
  }
};

const operation = (sign) => {
  let localOperMem = calculatorInput.value;

  if (memoryNewNum && memoryPendingOperation !== '=') {
    calculatorInput.value = memoryCurrentNum;
  } else {
    memoryNewNum = true;
    if (memoryPendingOperation === '+') {
      result = memoryCurrentNum + parseFloat(localOperMem);
    } else if (memoryPendingOperation === '-') {
      result = memoryCurrentNum - parseFloat(localOperMem);
    } else if (memoryPendingOperation === 'x') {
      result = memoryCurrentNum * parseFloat(localOperMem);
    } else if (memoryPendingOperation === '/') {
      result =
        parseFloat(localOperMem) !== 0 ? memoryCurrentNum / parseFloat(localOperMem) : 'oops(';
    } else {
      memoryCurrentNum = parseFloat(localOperMem);
    }
    calculatorInput.value = memoryCurrentNum;
    memoryPendingOperation = sign;
    return result;
  }
};

const decimal = () => {
  let localDecMem = calculatorInput.value;
  if (memoryNewNum) {
    localDecMem = '0.';
    memoryNewNum = false;
  } else {
    if (localDecMem.indexOf('.') === -1) {
      localDecMem += '.';
    }
  }
  calculatorInput.value = localDecMem;
};

const cleanAll = () => {
  memoryCurrentNum = '';
  memoryNewNum = '';
  memoryPendingOperation = '';
  calculatorInput.value = 0;
};

const makeOpposite = () => {
  calculatorInput.value = -calculatorInput.value;
};

const removeLastSymbol = () => {
  calculatorInput.value = calculatorInput.value.slice(0, -1);
};

numButton.forEach((number) =>
  number.addEventListener('click', (e) => {
    numPress(e.target.textContent);
  }),
);

signButton.forEach((button) => {
  button.addEventListener('click', (e) => {
    operation(e.target.textContent);
  });
});

equal.addEventListener('click', () => {
  if (typeof result == 'string' || Number.isInteger(result)) {
    calculatorInput.value = result;
  } else {
    calculatorInput.value = parseFloat(result.toFixed(5));
  }
});
decimalBtn.addEventListener('click', (e) => {
  decimal(e.target.textContent);
});
clean.addEventListener('click', cleanAll);
arrow.addEventListener('click', removeLastSymbol);
plusMinusToggle.addEventListener('click', makeOpposite);
