const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
const chars = ['*', '/', '-', '+', '='];
let output = '';

function calculate(btnValue) {
  if (btnValue === '=' && btnValue !== '') {
    output = eval(output);
  } else if (btnValue === 'AC') {
    output = '';
  } else if (chars.includes(btnValue)) {
    if (output.length === 0) {
      output += btnValue;
    } else {
      const lastChar = output.charAt(output.length - 1);
      if (chars.includes(lastChar)) {
        // Если последний символ в output - символ из массива chars, заменяем его
        output = output.slice(0, -1) + btnValue;
      } else {
        output += btnValue;
      }
    }
  } else {
    output += btnValue;
  }
  display.value = output;
}

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    calculate(e.target.dataset.value);
  });
});

// Добавляем обработчик события клавиатуры к window
window.addEventListener('keydown', (e) => {
  const key = e.key;
  if (/\d/.test(key)) {
    // Если нажата цифровая клавиша, добавляем ее к выводу
    calculate(key);
  } else if (key === 'Enter') {
    // Если нажата клавиша Enter, вычисляем результат и выводим его
    calculate('=');
    display.value = output;
  } else if (key === 'Backspace') {
    // Если нажата клавиша Backspace, удаляем последний символ из вывода
    output = output.slice(0, -1);
    display.value = output;
  } else if (chars.includes(key)) {
    if (output.length === 0) {
      calculate(key);
    } else {
      const lastChar = output.charAt(output.length - 1);
      if (chars.includes(lastChar)) {
        // Если последний символ в output - символ из массива chars, заменяем его
        output = output.slice(0, -1) + key;
      } else {
        calculate(key);
      }
    }
  }
});
