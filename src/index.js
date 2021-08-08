const sketchGrid = document.querySelector('.sketch__grid');
const color = document.querySelector('#color');
const clearGrid = document.querySelector('.sketch__clear-btn');
const gridSizeRange = document.querySelector('#range');
const rainbowBtn = document.querySelector('.sketch__rainbow-btn');

function getRandomColor() {
  function getRandomNumber() {
    return Math.floor(Math.random() * 256);
  }
  return `rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`;
}

function colorBox(box) {
  let newColor = color.value;
  if (rainbowBtn.classList.contains('btn_rainbow_active')) {
    newColor = getRandomColor();
  }
  box.style.backgroundColor = newColor;
}
function createGrid(size) {
  sketchGrid.innerHTML = '';
  for (let i = 0; i < size * size; i++) {
    let newBox = document.createElement('div');
    newBox.classList.add('sketch__box');
    sketchGrid.appendChild(newBox);
    newBox.addEventListener('mouseover', () => {
      colorBox(newBox);
    });
    newBox.addEventListener('touchmove', (e) => {
      let touchX = e.touches[0].clientX;
      let touchY = e.touches[0].clientY;
      let boxTouched = document.elementFromPoint(touchX, touchY);
      if (boxTouched && boxTouched.classList.contains('sketch__box')) {
        colorBox(boxTouched);
      }
    });
  }
  sketchGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  sketchGrid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
}

//initial grid size
createGrid(16);

clearGrid.addEventListener('click', () => {
  let boxes = document.querySelectorAll('.sketch__box');
  boxes.forEach((box) => {
    box.style.backgroundColor = 'white';
  });
});

gridSizeRange.addEventListener('change', () => {
  createGrid(gridSizeRange.value);
});

// rainbow
rainbowBtn.addEventListener('click', () => {
  rainbowBtn.classList.toggle('btn_rainbow_active');
});
