import './style.css';
import p5 from 'p5';
import sketch from './sketch';

let appState = {
  selectedShape: "none",
  sunPosition: null,
  treePosition: null,
  cloudPosition: null,
  skyColor: null,
  earthColor: null
};


document.getElementById('sunButton').addEventListener('click', () => {
  appState.selectedShape = 'sun';
});

document.getElementById('treeButton').addEventListener('click', () => {
  appState.selectedShape = 'tree';
});

document.getElementById('cloudButton').addEventListener('click', () => {
  appState.selectedShape = 'cloud';
});

document.getElementById('skySlider').addEventListener('input', (event) => {
  const sliderValue = event.target.value;
  switch (sliderValue) {
    case "0":
      appState.skyColor = 'dark';
      break;
    case "1":
      appState.skyColor = null;
      break;
    case "2":
      appState.skyColor = 'light';
      break;
  }
});

document.getElementById('earthSlider').addEventListener('input', (event) => {
  const sliderValue = event.target.value;
  switch (sliderValue) {
    case "0":
      appState.earthColor = 'dirt';
      break;
    case "1":
      appState.earthColor = null;
      break;
    case "2":
      appState.earthColor = 'grass';
      break;
  }
});




const shapeButtons = document.querySelectorAll('#shape-legend button');
shapeButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    // remove 'active' class from all buttons
    shapeButtons.forEach(btn => btn.classList.remove('active'));
    // add 'active' class to clicked button
    event.currentTarget.classList.add('active');
  });
});



new p5(p => sketch(p, appState));