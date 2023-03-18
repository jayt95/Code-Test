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
    dy: 4,
    score: 0
};

const rightPaddle = {
    x: canvas.width - 10 - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    score: 0
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: ballSize,
    dx: 4 * Math.cos(Math.PI / 6), // 30-degree angle
    dy: 4 * Math.sin(Math.PI / 6), // 30-degree angle
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

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText(leftPaddle.score, canvas.width / 4, 30);
    ctx.fillText(rightPaddle.score, (3 * canvas.width) / 4, 30);
}

function updateLeftPaddleAI() {
    const paddleCenter = leftPaddle.y + leftPaddle.height / 2;
    const distanceToBall = Math.abs(ball.y - paddleCenter);
    const randomFactor = Math.random() < 0.5; // 50% chance to follow the ball

    if (distanceToBall > 10 && randomFactor) {
        if (ball.y > paddleCenter) {
            leftPaddle.y += leftPaddle.dy;
        } else {
            leftPaddle.y -= leftPaddle.dy;
        }
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

    if (ball.x < 0) {
        rightPaddle.score++;
        resetBall();
    } else if (ball.x + ball.size > canvas.width) {
        leftPaddle.score++;
        resetBall();
    }

    if (ball.x < leftPaddle.x + leftPaddle.width && ball.y > leftPaddle.y && ball.y < leftPaddle.y + leftPaddle.height) {
        ball.dx *= -1;
    }

    if (ball.x + ball.size > rightPaddle.x && ball.y > rightPaddle.y && ball.y < rightPaddle.y + rightPaddle.height) {
        ball.dx *= -1;
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 4 * Math.cos(Math.PI / 6);
    ball.dy = 4 * Math.sin(Math.PI / 6);
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
    drawScore();

    updateLeftPaddleAI();
    moveBall();

    requestAnimationFrame(draw);
}

draw();
