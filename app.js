const password = document.querySelector('#password');
const copyButton = document.querySelector('.copy');
const length = document.querySelector('#length');
const lengthText = document.querySelector('#lengthText pre');
const symbols = document.querySelector('#symbols');
const numbers = document.querySelector('#numbers');
const lovercase = document.querySelector('#lowercase');
const uppercase = document.querySelector('#uppercase');
const similar = document.querySelector('#similar');

let symbolsArray;
let numbersArray;
let lowercaseCharsArray;
let uppercaseCharsArray;
let similarCharsArray;

const inputsArray = [symbols, numbers, lovercase, uppercase, similar];

const getResultArray = () => {
  let resultArray = [];

  if (symbols.checked == true) {
    symbolsArray = ['@', '#', '$', '%'];
  } else symbolsArray = [];

  if (numbers.checked == true) {
    numbersArray = [1, 2, 3, 4];
  } else numbersArray = [];

  if (lowercase.checked == true) {
    lowercaseCharsArray = ['a', 'b', 'c', 'd'];
  } else lowercaseCharsArray = [];

  if (uppercase.checked == true) {
    uppercaseCharsArray = ['A', 'B', 'C', 'D'];
  } else uppercaseCharsArray = [];

  if (similar.checked == true) {
    similarCharsArray = ['i', 'l', '1', 'L', 'o', '0', 'O'];
  } else similarCharsArray = [];

  console.log(symbolsArray.concat(numbersArray, lowercaseCharsArray, uppercaseCharsArray, similarCharsArray));
  resultArray = symbolsArray.concat(numbersArray, lowercaseCharsArray, uppercaseCharsArray, similarCharsArray);
  if (resultArray.length != 0) {
    return symbolsArray.concat(numbersArray, lowercaseCharsArray, uppercaseCharsArray, similarCharsArray);
  } else return 0;
};

Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
};

const getPassword = (array) => {
  let result = '';

  if (array != 0) {
    for (let i = 0; i < length.value; i++) {
      result += array.random();
    }
    password.value = result;
  }
  else password.value = 'Check the checkbox!';
};

getPassword(getResultArray());

length.addEventListener('input', () => {
  lengthText.innerHTML = length.value + ' ';
  getPassword(getResultArray());
});

inputsArray.forEach(inputsArrayElement => {
  inputsArrayElement.addEventListener('change', () => {
    getPassword(getResultArray());
  });
});

const copyToggler = () => {
  copyButton.classList.add('copied');
  navigator.clipboard.writeText(password.value)
    .then(() => {
      password.style.color = 'green';
    })
    .catch(err => {
      console.log('Can not copy password!', err);
    })
};

const copyReset = () => {
  copyButton.classList.remove('copied');
  password.style.color = 'black';
};

copyButton.addEventListener('click', () => {
  copyToggler();
  setTimeout(copyReset, 5000);
});
