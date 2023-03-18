const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 8;

const leftPaddle = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 4
};

const rightPaddle = {
    x: canvas.width - 10 - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: ballSize,
    dx: 4,
    dy: 4
};

function drawPaddle(x, y, width, height) {
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, width, height);
}

function drawBall(x, y, size) {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
}

function movePaddles() {
    leftPaddle.y += leftPaddle.dy;

    if (leftPaddle.y < 0 || leftPaddle.y + leftPaddle.height > canvas.height) {
        leftPaddle.dy *= -1;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y < 0 || ball.y + ball.size > canvas.height) {
        ball.dy *= -1;
    }

    if (ball.x < 0 || ball.x + ball.size > canvas.width) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
    }

    if (ball.x < leftPaddle.x + leftPaddle.width && ball.y > leftPaddle.y && ball.y < leftPaddle.y + leftPaddle.height) {
        ball.dx *= -1;
    }

    if (ball.x + ball.size > rightPaddle.x && ball.y > rightPaddle.y && ball.y < rightPaddle.y + rightPaddle.height) {
        ball.dx *= -1;
    }
}

function onMouseMove(event) {
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    rightPaddle.y = mouseY - rightPaddle.height / 2;

    if (rightPaddle.y < 0) {
        rightPaddle.y = 0;
    } else if (rightPaddle.y + rightPaddle.height > canvas.height) {
        rightPaddle.y = canvas.height - rightPaddle.height;
    }
}

canvas.addEventListener('mousemove', onMouseMove);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPaddle(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    drawPaddle(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
    drawBall(ball.x, ball.y, ball.size);

    movePaddles();
    moveBall();

    requestAnimationFrame(draw);
}

draw();
This code adds a new onMouseMove function and an event listener for the 'mousemove' event on the canvas element. When the mouse moves within the iframe, the right paddle's position will be updated to match the vertical position of the mouse cursor. The paddle will also be constrained within the bounds




Taylor Jay
what code should I add to the script.js to give the left paddle a simple AI to act as an opponent?
You can add a simple AI for the left paddle by updating its position based on the ball's position. Here's the updated script.js code that includes a simple AI opponent:

javascript
Copy code
const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 8;

const leftPaddle = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 4
};

const rightPaddle = {
    x: canvas.width - 10 - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: ballSize,
    dx: 4,
    dy: 4
};

function drawPaddle(x, y, width, height) {
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, width, height);
}

function drawBall(x, y, size) {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
}

function updateLeftPaddleAI() {
    const paddleCenter = leftPaddle.y + leftPaddle.height / 2;
    if (ball.y > paddleCenter) {
        leftPaddle.y += leftPaddle.dy;
    } else {
        leftPaddle.y -= leftPaddle.dy;
    }
    if (leftPaddle.y < 0) {
        leftPaddle.y = 0;
    } else if (leftPaddle.y + leftPaddle.height > canvas.height) {
        leftPaddle.y = canvas.height - leftPaddle.height;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y < 0 || ball.y + ball.size > canvas.height) {
        ball.dy *= -1;
    }

    if (ball.x < 0 || ball.x + ball.size > canvas.width) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
    }

    if (ball.x < leftPaddle.x + leftPaddle.width && ball.y > leftPaddle.y && ball.y < leftPaddle.y + leftPaddle.height) {
        ball.dx *= -1;
    }

    if (ball.x + ball.size > rightPaddle.x && ball.y > rightPaddle.y && ball.y < rightPaddle.y + rightPaddle.height) {
        ball.dx *= -1;
    }
}

function onMouseMove(event) {
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    rightPaddle.y = mouseY - rightPaddle.height / 2;

    if (rightPaddle.y < 0) {
        rightPaddle.y = 0;
    } else if (rightPaddle.y + rightPaddle.height > canvas.height) {
        rightPaddle.y = canvas.height - rightPaddle.height;
    }
}

canvas.addEventListener('mousemove', onMouseMove);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPaddle(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    drawPaddle(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
    drawBall(ball.x, ball.y, ball.size);

    updateLeftPaddleAI();
    moveBall();

    requestAnimationFrame(draw);
}

draw();

