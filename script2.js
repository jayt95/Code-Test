{\rtf1\ansi\ansicpg1252\cocoartf2708
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const canvas = document.getElementById('pong');\
const ctx = canvas.getContext('2d');\
\
const paddleWidth = 10;\
const paddleHeight = 100;\
const ballSize = 8;\
\
const leftPaddle = \{\
    x: 10,\
    y: canvas.height / 2 - paddleHeight / 2,\
    width: paddleWidth,\
    height: paddleHeight,\
    dy: 4\
\};\
\
const rightPaddle = \{\
    x: canvas.width - 10 - paddleWidth,\
    y: canvas.height / 2 - paddleHeight / 2,\
    width: paddleWidth,\
    height: paddleHeight,\
    dy: 4\
\};\
\
const ball = \{\
    x: canvas.width / 2,\
    y: canvas.height / 2,\
    size: ballSize,\
    dx: 4,\
    dy: 4\
\};\
\
function drawPaddle(x, y, width, height) \{\
    ctx.fillStyle = 'white';\
    ctx.fillRect(x, y, width, height);\
\}\
\
function drawBall(x, y, size) \{\
    ctx.fillStyle = 'white';\
    ctx.beginPath();\
    ctx.arc(x, y, size, 0, Math.PI * 2);\
    ctx.fill();\
\}\
\
function movePaddles() \{\
    leftPaddle.y += leftPaddle.dy;\
    rightPaddle.y -= rightPaddle.dy;\
\
    if (leftPaddle.y < 0 || leftPaddle.y + leftPaddle.height > canvas.height) \{\
        leftPaddle.dy *= -1;\
    \}\
\
    if (rightPaddle.y < 0 || rightPaddle.y + rightPaddle.height > canvas.height) \{\
        rightPaddle.dy *= -1;\
    \}\
\}\
\
function moveBall() \{\
    ball.x += ball.dx;\
    ball.y += ball.dy;\
\
    if (ball.y < 0 || ball.y + ball.size > canvas.height) \{\
        ball.dy *= -1;\
    \}\
\
    if (ball.x < 0 || ball.x + ball.size > canvas.width) \{\
        ball.x = canvas.width / 2;\
        ball.y = canvas.height / 2;\
    \}\
\
    if (ball.x < leftPaddle.x + leftPaddle.width && ball.y > leftPaddle.y && ball.y < leftPaddle.y + leftPaddle.height) \{\
        ball.dx *= -1;\
    \}\
\
    if (ball.x + ball.size > rightPaddle.x && ball.y > rightPaddle.y && ball.y < rightPaddle.y + rightPaddle.height) \{\
        ball.dx *= -1;\
    \}\
\}\
\
function draw() \{\
    ctx.clearRect(0, 0, canvas.width, canvas.height);\
\
    drawPaddle(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);\
    drawPaddle(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);\
    drawBall(ball.x, ball.y, ball.size);\
\
    movePaddles();\
    moveBall();\
\
    requestAnimationFrame(draw);\
\}\
\
draw();\
}