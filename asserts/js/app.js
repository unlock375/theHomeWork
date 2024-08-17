const container = document.getElementById('container');
const clickCounter = document.getElementById('clickCounter');
const bigWord = document.getElementById('bigWord');
let clickCount = 0;
const containerWidth = window.innerWidth;
const containerHeight = window.innerHeight;

function createWord() {
  const word = document.createElement('div');
  word.style.position = 'absolute';
  word.style.fontSize = '18px';
  word.textContent = getRandomWord();
  word.style.color = getRandomColor();

  const startPosition = getRandomPosition();
  word.style.left = startPosition.x + 'px';
  word.style.top = startPosition.y + 'px';

  container.appendChild(word);

  animateWord(word);
}

function getRandomWord() {
  const words = ['ボン…！', 'ボン！', 'ボンバ…！', 'ボンバ！', 'ボンバイ…！', 'ボンバイ！', 'ボンバイエ！', 'ボンバイエ！！', 'ボン！ボン！ボンバイエ！', 'Rキーでカウントリセット！'];
  return words[Math.floor(Math.random() * words.length)];
}

function getRandomColor() {
  return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

function getRandomPosition() {
    const side = Math.floor(Math.random() * 4);
    const padding = 100;
    switch(side) {
      case 0: return { x: -padding, y: Math.random() * containerHeight }; // 左
      case 1: return { x: containerWidth + padding, y: Math.random() * containerHeight }; // 右
      case 2: return { x: Math.random() * containerWidth, y: -padding }; // 上
      case 3: return { x: Math.random() * containerWidth, y: containerHeight + padding }; // 下
    }
  }

function animateWord(word) {
  const targetX = Math.random() * containerWidth;
  const targetY = Math.random() * containerHeight;
  const duration = 5000 + Math.random() * 3000;

  word.animate([
    { left: word.style.left, top: word.style.top },
    { left: targetX + 'px', top: targetY + 'px' }
  ], {
    duration: duration,
    easing: 'linear',
    fill: 'forwards'
  }).onfinish = () => {
    container.removeChild(word);
  };
}

function updateClickCounter() {
    if (event.button === 0) {
        clickCount++;
    } else if (event.button === 2 && clickCount > 0) {
        clickCount--;
    }
    clickCounter.textContent = clickCount;
    clickCounter.style.display = 'block';
    clickCounter.style.color = getRandomColor();
    setTimeout(() => {
        clickCounter.style.display = 'none';
    }, 1000);
    for (let i = 0; i < 5; i++) {
        createWord();
    }
    if (clickCount % 20 === 0) {
      scrollBigWord();
    }
}

function scrollBigWord() {
    bigWord.textContent = `${clickCount}回達成です！！おめでとうございます！！`;
    bigWord.style.color = getRandomColor();
    bigWord.style.bottom = '-120%';
    bigWord.style.display = 'block';

  requestAnimationFrame(() => {
    bigWord.style.bottom = '120%';
  });

  setTimeout(() => {
    bigWord.style.display = 'none';
  }, 3000);
}

document.addEventListener('mousedown', function(event) {
    event.preventDefault(); // デフォルトの動作を防止
    updateClickCounter(event);
}, true);

document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    return false;
}, true);

clickCounter.style.position = 'fixed';
clickCounter.style.top = '50%';
clickCounter.style.left = '50%';
clickCounter.style.transform = 'translate(-50%, -50%)';
clickCounter.style.fontSize = '100px';
clickCounter.style.fontWeight = 'bold';
clickCounter.style.color = '#000';
clickCounter.style.display = 'none';
clickCounter.style.zIndex = '1000';