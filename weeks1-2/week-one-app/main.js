import './style.css';
import p5 from 'p5';
import sketch from './sketch';

// this object stores the coordinate positions of each shape as it is placed on the canvas, as well as which shape is selected from the legend
let appState = {
  selectedShape: "none",
  sunPosition: null,
  oakTreePosition: null,
  pineTreePosition: null,
  cloudPosition: null,
  skyColor: null,
  earthColor: null,
  butterflyPosition: null,
};

// add listeners to all the buttons and the two sliders
document.getElementById('sunButton').addEventListener('click', () => {
  appState.selectedShape = 'sun';
});

document.getElementById('oakTreeButton').addEventListener('click', () => {
  appState.selectedShape = 'oakTree';
});

document.getElementById('pineTreeButton').addEventListener('click', () => {
  appState.selectedShape = 'pineTree';
});

document.getElementById('cloudButton').addEventListener('click', () => {
  appState.selectedShape = 'cloud';
});

document.getElementById('butterflyButton').addEventListener('click', () => {
  appState.selectedShape = 'butterfly';
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

document.getElementById('clearButton').addEventListener('click', clearCanvas);

document.getElementById('downloadButton').addEventListener('click', () => {
  if (appState.pInstance) {
    appState.pInstance.downloadCanvas();
  }
});


// adding and removing a class as a shape is selected or deselected
const shapeButtons = document.querySelectorAll('#shape-legend button');
shapeButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    // remove 'active' class from all buttons
    shapeButtons.forEach(btn => btn.classList.remove('active'));
    // add 'active' class to clicked button
    event.currentTarget.classList.add('active');
  });
});

// clicking on the clear button resets the properties in appState
function clearCanvas() {
  
  Object.assign(appState, {
    selectedShape: "none",
    sunPosition: null,
    oakTreePosition: null,
    pineTreePosition: null,
    cloudPosition: null,
    butterflyPosition: null,
    skyColor: null,
    earthColor: null,
  });

  // reset the slider positions
  document.getElementById('skySlider').value = "1";
  document.getElementById('earthSlider').value = "1";

   // remove 'active' class from all shape buttons
   const shapeButtons = document.querySelectorAll('#shape-legend button');
   shapeButtons.forEach(button => button.classList.remove('active'));

  // trigger redraw - empty appState means empty canvas
  if (appState.pInstance) {
    appState.pInstance.redraw();
  }
}

// rip it & ship it
const myp5 = new p5(p => sketch(p, appState));