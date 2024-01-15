# P5.js Learning Plan - Week One
**Required:**
* A javascript IDE (VSCode)
* Node.js installed
* Vite installed

---

### 1. Setting Up the Environment
**Objective:** Integrating P5.js into a Vite vanilla setup.

* Setting up a Vite vanilla project:
```bash
npm create vite
```
* Importing P5.js into the project:
```bash
npm install p5
```

* Create a P5.js Sketch file in the project folder (if a separate file would be beneficial)

---

### 2. P5.js Basics
**Objective:** Learn to create shapes, lines, and basic animations.

* Use draw() and other P5.js methods to create simple shapes
 (ellipse, rectangle, line, etc).
* Changing colors and stroke widths

---

### 3. Making a Responsive Canvas
**Objective:** Adapting the canvas to different screen sizes.

* Resizing canvas for mobile
* windowResized()
* resizeCanvas()

---

### 4. Transformations and Animations
**Objective:** Learn about transformations and animations

* Implementing transformations (translate, rotate, scale, etc).
* Creating basic animations (TBD)

---

### 5. Event Handling in P5.js
**Objective:** Learn about mouse and keyboard interactions, scroll wheel usage, timers.

* Creating interactive sketches (e.g., elements that react to mouse movement or clicks).
* Using timers for time-based events.

---

### 6. Practice App: Landscape Generator
**Objective:** An interactive canvas where users can design their own landscape scene by placing premade shapes like a sun, hills, trees, and clouds.

**Stack:**

* vanilla Vite build

---

**Some Features I Might Build:**

* Predefined Shapes: Have a set of shapes representing different landscape elements (such as a large yellow circle for the sun, green arcs or shapes for hills, fluffy white ellipses for clouds, brown rectangles and green circles for trees... etc.).

* Interactive Canvas: Clicking on the canvas places the selected landscape element.

* Shape Selection: Users can select which landscape element they want to add to their scene in what order, and customize them by size or colour.

* Responsive: Ensure that the canvas resizes appropriately with the window, maintaining the aspect ratio of the landscape.

---

**Planning out Some Steps:**

* Setup the Canvas: Initialize a P5.js sketch with a responsive canvas.

* Create Shape Functions: Write functions for each landscape element. For example, a function drawSun(x, y) that draws a yellow circle at (x, y).

* Implement mouse click event to place the selected shape on the canvas

* Add functionality to select different shapes - like clicking icons on a toolbar

* Allow users to modify properties of the shapes (like changing the size of the sun or the color of the hills) using a slider

* A Clear button to reset the scene or a save button to download the created landscape.

---


**Feature ideas to come back to:**
* Add animations, like a moving sun or drifting clouds

* Day and Night Cycle: a feature to switch between day and night scenes, changing the color scheme accordingly

* Random Landscape Generator (image engine): A button that generates a random landscape on click