window.onload = function () {
  const canvas = document.getElementById("canva");
  const ctx = canvas.getContext("2d");
  let circles = [];
  let selectedCircle = null;
  let drag = false;
  let startX, startY;
  let lastClickTime = 0;
  let dragged = false;

  // Set canvas size to match its container
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  // Function to generate a random color
  function getRandomColor() {
    return (
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
    );
  }

  // Function to draw a circle with random fill color
  function drawCircle(circle) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = circle.color; // Fill color
    ctx.fill();
    ctx.strokeStyle = "#000"; // Border color
    ctx.lineWidth = 2; // Border width
    ctx.stroke();
    ctx.closePath();
  }

  // Function to check if mouse or touch is inside the circle
  function isInsideCircle(circle, x, y) {
    const dx = x - circle.x;
    const dy = y - circle.y;
    return dx * dx + dy * dy <= circle.radius * circle.radius;
  }

  // EvL for mouse down
  canvas.addEventListener("mousedown", (event) => {
    handlePointerDown(event.clientX, event.clientY);
  });

  // EvL touch start
  canvas.addEventListener("touchstart", (event) => {
    const touch = event.touches[0];
    handlePointerDown(touch.clientX, touch.clientY);
  });

  // Function to handle pointer down event
  function handlePointerDown(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    dragged = false;

    // Check if pointer is inside any existing circle
    for (const circle of circles) {
      if (isInsideCircle(circle, x, y)) {
        selectedCircle = circle;
        startX = x;
        startY = y;
        drag = true;
        break;
      }
    }
  }

  // EvL for mouse move
  canvas.addEventListener("mousemove", (event) => {
    handlePointerMove(event.clientX, event.clientY);
  });

  // EvL for touch move
  canvas.addEventListener("touchmove", (event) => {
    const touch = event.touches[0];
    handlePointerMove(touch.clientX, touch.clientY);
  });

  // Function to handle pointer move event
  function handlePointerMove(clientX, clientY) {
    if (drag && selectedCircle) {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const dx = x - startX;
      const dy = y - startY;
      selectedCircle.radius += (dx + dy) / 2;
      if (selectedCircle.radius < 0) {
        selectedCircle.radius = 0;
      }
      startX = x;
      startY = y;
      dragged = true;
      redraw();
    }
  }

  // EvL for mouse up
  canvas.addEventListener("mouseup", () => {
    if (drag && selectedCircle && selectedCircle.radius <= 0) {
      circles = circles.filter((circle) => circle !== selectedCircle);
    }
    drag = false;
    selectedCircle = null;
  });

  // EvL for touch end
  canvas.addEventListener("touchend", () => {
    if (drag && selectedCircle && selectedCircle.radius <= 0) {
      circles = circles.filter((circle) => circle !== selectedCircle);
    }
    drag = false;
    selectedCircle = null;
  });

  // EvL for mouse click
  canvas.addEventListener("click", (event) => {
    if (dragged) {
      return; // If a drag operation happening do not creates a new circle
    }

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if double-clicked
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastClickTime;
    if (timeDiff < 300) {
      // Double-click detected, prevent default action
      event.preventDefault();

      // Check if mouse is inside any existing circle
      for (const circle of circles) {
        if (isInsideCircle(circle, x, y)) {
          // Increase the size of the selected circle
          circle.radius += 5;
          redraw();
          return;
        }
      }
    }

    // Update last click time
    lastClickTime = currentTime;

    // Generate a random color for the new circle
    const newColor = getRandomColor();

    // Create a new circle object with random color
    circles.push({ x, y, radius: 20, color: newColor });
    redraw();
  });

  // Function to redraw the canvas
  function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const circle of circles) {
      drawCircle(circle);
    }
  }

  // Function to reset circles
  window.resetCircles = function () {
    circles = [];
    redraw();
  };

  // Function to save circles and navigate to Module
  window.saveAndNavigate = function () {
    localStorage.setItem("circles", JSON.stringify(circles));
    window.location.href = "../Module-2/page.html"; 
  };
};
