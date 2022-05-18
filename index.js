class Calc {
  constructor(prevDisplay, curDisplay) {
    this.prevDisplay = prevDisplay;
    this.curDisplay = curDisplay;
    this.clear();
  }

  clear() {
    this.prev = '';
    this.cur = '';
    this.op = null;
  }

  del() {
    this.cur = String(this.cur).slice(0, -1);
  }

  appendNum(num) {
    if (num === '.' && this.cur.includes('.')) {
      return;
    }
    this.cur += num;
  }

  chooseOp(op) {
    if (this.cur) {
      if (this.prev) {
        this.compute();
      }
      this.prev = this.cur;
      this.cur = '';
      this.op = op;
    }
  }

  compute() {
    let res;
    const c = parseFloat(this.cur);
    const p = parseFloat(this.prev);
    if (p && c) {
      switch (this.op) {
        case '+':
          res = p + c;
          break;
        case '-':
          res = p - c;
          break;
        case '*':
          res = p * c;
          break;
        case '/':
          res = p / c;
          break;

        default:
          break;
      }
      this.cur = res;
      this.op = null;
      this.prev = '';
    }
  }

  getDisplayNum(num) {
    const str = String(num);
    const intDigits = parseFloat(str.split('.')[0]);
    const decDigits = str.split('.')[1];
    let intDisplay;
    if (intDigits) {
      intDisplay = intDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    } else {
      intDisplay = '';
    }
    if (decDigits) {
      return `${intDisplay}.${decDigits}`;
    } else {
      return intDisplay;
    }
  }

  updateDisplay() {
    if (this.op) {
      this.prevDisplay.textContent = `${this.getDisplayNum(this.prev)} ${
        this.op
      }`;
    } else {
      this.prevDisplay.textContent = this.getDisplayNum(this.prev);
    }
    this.curDisplay.textContent = this.getDisplayNum(this.cur);
  }
}

const numBtns = document.querySelectorAll('.num');
const opBtns = document.querySelectorAll('.op');
const curDisplay = document.querySelector('.cur');
const prevDisplay = document.querySelector('.prev');
const acBtn = document.querySelector('.ac');
const delBtn = document.querySelector('.del');
const eqBtn = document.querySelector('.equals');

const calc = new Calc(prevDisplay, curDisplay);

numBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    calc.appendNum(btn.textContent);
    calc.updateDisplay();
  });
});

opBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    calc.chooseOp(btn.textContent);
    calc.updateDisplay();
  });
});

eqBtn.addEventListener('click', () => {
  calc.compute();
  calc.updateDisplay();
});

acBtn.addEventListener('click', () => {
  calc.clear();
  calc.updateDisplay();
});

delBtn.addEventListener('click', () => {
  calc.del();
  calc.updateDisplay();
});
/* 

delBtn.addEventListener('click', del);
 */
/* function updateDisplay(val) {
  curDisplay.textContent += val;
}

function calc(op) {
  if (curDisplay.textContent) {
    prevDisplay.textContent = `${curDisplay.textContent} ${op}`;
    curDisplay.textContent = '';
  }
} */
