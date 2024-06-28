window.onload = function () {
  const canvas = document.getElementById("canva");
  const ctx = canvas.getContext("2d");
  const messageDiv = document.getElementById("message");

  // Matching canvas width to container
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  // Function to draw a circle 
  function drawCircle(circle) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = circle.color; // Fill color
    ctx.fill();
    ctx.strokeStyle = "#000"; 
    ctx.lineWidth = 2; 
    ctx.stroke();
    ctx.closePath();
  }

  // Function to check if mouse is inside the circle
  function isInsideCircle(circle, x, y) {
    const dx = x - circle.x;
    const dy = y - circle.y;
    return dx * dx + dy * dy <= circle.radius * circle.radius;
  }

  // Loading circles data from localStorage
  let circles = JSON.parse(localStorage.getItem('circles')) || [];

  // Initial draw of all circles
  function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const circle of circles) {
      drawCircle(circle);
    }
  }

  redraw();

  // EvL for mouse click
  canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    let hit = false;
    for (const circle of circles) {
      if (isInsideCircle(circle, x, y)) {
        hit = true;
        break;
      }
    }
    messageDiv.textContent = hit ? "Hit" : "Miss";
    messageDiv.style.display = "block";
    setTimeout(() => {
      messageDiv.style.display = "none";
    }, 1000);
  });

  // EvL for double click
  canvas.addEventListener("dblclick", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    for (let i = 0; i < circles.length; i++) {
      if (isInsideCircle(circles[i], x, y)) {
        circles.splice(i, 1);
        redraw();
        break;
      }
    }
  });
};
