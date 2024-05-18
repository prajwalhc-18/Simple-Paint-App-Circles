# Simple Paint App

## Overview

The Simple Paint App is a two-module web application that allows users to create circles on a canvas in the first module and then play a hit/miss game with those circles in the second module. The circles created in Module 1 are saved and transferred to Module 2 for the "Hit" & "Miss" Play.

## Project Structure

Simple-Paint-App/
│
├── module-1/
│   ├── index.html         // HTML file for Module 1
│   ├── app.js             // JavaScript file for Module 1
│   └── styles.css         // CSS file for Module 1
│
├── module-2/
│   ├── page.html          // HTML file for Module 2
│   ├── script.js          // JavaScript file for Module 2
│   └── style.css          // CSS file for Module 2
│
└── README.md              // Project documentation

## Getting Started

### Prerequisites

To run this project, you need a local web server. You can use `http-server`, which can be installed via npm:

```bash
npm install -g http-server
```

### Running the Application

1. **Start the Local Server**:
   Navigate to the root directory of the project and start the server:

   ```bash
   cd path/to/Simple-Paint-App/
   http-server
   ```

2. **Access the Modules**:
   Open your browser and navigate to the following URLs:

   - Module 1: `http://localhost:8080/module-1/index.html`
   - Module 2: `http://localhost:8080/module-2/page.html`

## Module 1: Circle Creation

### index.html

This file contains the structure of the page where users can create circles on a canvas. It includes a button to reset the canvas and another to save the circles and navigate to Module 2.

### app.js

This script handles the logic for creating, drawing, and resizing circles on the canvas. It also saves the circle data to `localStorage` and navigates to Module 2.

### styles.css

This file contains the styling for the canvas and the page layout.

## Module 2: Hit/Miss Play

### page.html

This file contains the structure of the page where users can play the hit/miss play with the circles created in Module 1. It includes a button to reset the play and navigate back to Module 1.

### script.js

This script retrieves the circle data from `localStorage`, draws the circles on the canvas, and handles the hit/miss logic when the user clicks on the canvas.

### style.css

This file contains the styling for the canvas and the page layout.

## Features

- **Module 1**:
  - Draw circles on a canvas with random colors.
  - Resize circles by dragging.
  - Save circles and navigate to the hit/miss play.

- **Module 2**:
  - Display circles created in Module 1.
  - Hit/miss play logic based on user clicks.
  - Double-click to remove circles.

## Usage

1. **Creating Circles**:
   - Open Module 1.
   - Click on the canvas to create circles.
   - Drag to resize circles.
   - Click "Save & Go to Module 2" to save circles and start the hit/miss game.

2. **Playing Hit/Miss Game**:
   - Open Module 2.
   - Click on the canvas to check if you hit any circle.
   - Double-click on circles to remove them.
