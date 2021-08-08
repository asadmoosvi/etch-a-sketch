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

function createGrid(size) {
  sketchGrid.innerHTML = '';
  for (let i = 0; i < size * size; i++) {
    let newBox = document.createElement('div');
    newBox.classList.add('.sketch__box');
    sketchGrid.appendChild(newBox);
    newBox.addEventListener('mouseover', () => {
      let newColor = color.value;
      if (rainbowBtn.classList.contains('btn_rainbow_active')) {
        newColor = getRandomColor();
      }
      newBox.style.backgroundColor = newColor;
    });
  }
  sketchGrid.style.gridTemplateColumns = `repeat(${size}, 1fr`;
  sketchGrid.style.gridTemplateRows = `repeat(${size}, 1fr`;
}

//initial grid size
createGrid(16);

clearGrid.addEventListener('click', () => {
  createGrid(gridSizeRange.value);
});

gridSizeRange.addEventListener('change', () => {
  clearGrid.click();
});

// rainbow
rainbowBtn.addEventListener('click', () => {
  rainbowBtn.classList.toggle('btn_rainbow_active');
});
